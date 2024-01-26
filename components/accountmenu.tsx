
import useProfiles from "@/hooks/useProfiles";
import { Profile } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React from 'react';

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
    const { data, isLoading } = useProfiles();
    const router = useRouter();
    const { profileId } = router.query
    const singleCurrentProfile = Array.isArray(profileId) ? profileId[0] : profileId
    if (!visible || isLoading) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                {data.map((profile: Profile) => (
                    <div
                        key={profile.id}
                        onClick={() => router.push(`/profile/${profile.id}`)}
                        className="px-3 group/item flex flex-row gap-3 items-center w-full">
                        <img className="w-8 rounded-md" src="/images/default-blue.png" alt="" />
                        <p className={profile.id === singleCurrentProfile ? "font-bold text-white text-md group-hover/item:underline"
                            :
                            "text-gray-500 text-sm group-hover/item:underline group-hover/item:text-white"}>
                            {profile?.name}
                        </p>
                    </div>
                ))}
                
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of Dotzflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu;