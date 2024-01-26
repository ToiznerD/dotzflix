import { NextPageContext } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSession } from 'next-auth/react'
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from "next/router";
import axios from "axios";
import { Profile, User } from "@prisma/client";
import { FaPlus } from 'react-icons/fa'
import { signOut } from "next-auth/react";
import Mailer from "@/components/mailer";
import { Metadata } from 'next';
 

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }


}

export const metadata: Metadata = {
    title: 'Dotzflix | Choose Profile',
  };


const Profiles = () => {
    const router = useRouter();
    const { data: user } = useCurrentUser()

    const [profiles, setProfiles] = useState<Profile[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    const [addProfile, setAddProfile] = useState(false);

    

    useEffect(() => {
        (async () => {
            const userProfiles = await axios.get('/api/profiles')
            setProfiles(userProfiles.data);
        })()
    }, [])

    const createProfile = useCallback(async () => {
        console.log('Creating profile')
        const profileName = inputRef?.current?.value;
        const profilesUpdated = await axios.post('/api/profile', { profileName, user })
        console.log(profilesUpdated)
        setProfiles(profilesUpdated.data);
        setAddProfile(false);

    }, [inputRef, profiles, user])

    if (!user) {
        // Handle the case where user is not available
        return null
    }

    const handleVerifyRequest = async () => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: user.name, email: user.email, approve: false})
            })
            if (response.ok)
                alert('Email sent successfully')
            else
                alert('Something went wrong')
        } catch (error) {
            alert('Something went wrong')
        }
    }

    return (
        <div className="flex items-center h-full justify-center">
            {!user.emailVerified && (
                <div className="flex flex-col">
                    <div className="flex justify-center text-white text-2xl mx-auto">
                        You are not verified as dotz friend.
                    </div>
                    <Mailer user={user.name} email={user.email} />
                    <button onClick={() => signOut()} className="bg-red-700 py-3 text-white rounded-md w-full mt-10 hover:bg-red-600 transition">
                        Logout
                    </button>
                </div>
            )}
            {user.emailVerified && <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex flex-wrap gap-8 lg:gap-20 p-3 mt-10">

                    {profiles && profiles.length > 0 && (
                        <>
                            {profiles.map((profile: any) => (
                                <div key={profile.id} onClick={() => router.push(`/profile/${profile.id}`)}>
                                    <div className="group flex-row lg:w-46 md:w-28 w-24 mx-auto">
                                        <div className="lg:w-44 lg:h-44 md:w-28 md:h-28 w-24 h-24 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                            <img src="/images/default-blue.png" alt="" />
                                        </div>

                                        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                                            {profile.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {(addProfile ? (
                        <div
                            
                            className="group flex-col lg:w-46 md:w-28 w-24 mx-auto my-auto">
                            <div className="lg:w-44 lg:h-44 md:w-28 md:h-28 w-24 h-24 rounded-md flex items-center justify-center border-2 border-transparent overflow-hidden">
                                <img src="/images/default-blue.png" alt="" />
                            </div>

                            <div className="mt-4 p-1 flex flex-col justify-center items-center gap-2  text-gray-400 text-center group-hover:text-white">
                                <input
                                    placeholder="Profile Name"
                                    ref={inputRef}
                                    className="p-1 text-xl rounded-md w-36 mx-auto bg-neutral-800 border-gray-300 border "
                                    type="text"
                                />
                                <div
                                    onClick={createProfile}
                                    className="cursor-pointer mt-2 p-2 bg-neutral-800 h-10 w-10 border-[1px] border-gray-700 group rounded-full flex justify-center items-center">
                                    <FaPlus size={30} />
                                </div>
                            </div>
                        </div>
                    ) : (
                            
                        <div
                            onClick={() => setAddProfile(true)}
                            className="group p-2 flex justify-center items-center flex-col lg:w-46 md:w-28 w-24 text-2xl mx-auto my-auto transition cursor-pointer">
                            <div className="flex justify-center items-center lg:w-44 lg:h-44 md:w-28 md:h-28 w-24 h-24">
                                <FaPlus
                                    className="p-2 text-neutral-800 border-2 border-gray-800 rounded-full transition bg-gray-500 group-hover:text-gray-400"
                                    size={50} />
                            </div>
                            <div className="text-gray-400 group-hover:text-white">
                                Add Profile
                            </div>
                        </div>
                            
                    ))}
                </div>
            </div>
            }
            </div>
    );
}
 
export default Profiles;