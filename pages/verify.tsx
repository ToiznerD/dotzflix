import useUnverified from "@/hooks/useUnverified";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { User } from "@prisma/client";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix | Verify Friends',
};

const Verify = () => {
    const mock = [{ id: '65566b3a262df168acf18a02', name: 'dor', email: 'dor@gmail.com' }];
    const { data: unverifiedUsers, isLoading } = useUnverified();
    const [loading, setLoading] = useState('');
    const handleClick = async (user: User) => {
        setLoading(user.id);
        const response = await fetch('/api/verify/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: user.id})
        })

        const mailResponse = await fetch('/api/send-email/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: user.name, email: user.email, approve: true})
        })
        setLoading('');
    }

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <AiOutlineLoading className="animate-spin text-white" size={30} />
            </div>
        );
    }



    return (
        <>
            <div className="text-white text-2xl flex justify-center">
                Verify page
            </div>
            <div className="flex justify-center">
                <table className="w-[60%] p-2 text-center border-spacing-8 text-white text-2xl font-bold border">
                    <thead>
                        <tr>
                            <th className="w-[10%]">#</th>
                            <th className="w-[40%]">ID</th>
                            <th className="w-[20%]">Name</th>
                            <th className="w-[20%]">Email</th>
                            <th className="w-[10%]">Verify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unverifiedUsers.map((value: User, key: number) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{value.id}</td>
                                <td>{value.name}</td>
                                <td>{value.email}</td>
                                <td>
                                    {
                                        loading === value.id ? (
                                            <div className="flex justify-center">
                                                <AiOutlineLoading className="animate-spin text-white" size={30} />
                                            </div>
                                        ) : (
                                            <button
                                        onClick={() => handleClick(value)}
                                        className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 flex justify-center transition">Accept</button>        
                                        )
                                    }
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Verify;