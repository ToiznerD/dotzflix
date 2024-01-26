import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface MailerProps{
    user: string;
    email: string;
}

const Mailer = ({ user, email }: MailerProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('Ask Dotz to verify you!')
    const handleClick = async () => {
        try {
            setIsLoading(true);

            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: user, email})
            })

            setMsg('Request has sent successfully')
            setIsLoading(false);

        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }
    return ( 
        <button
            onClick={handleClick}
            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 flex justify-center transition"
            >
            {isLoading ? (
                <AiOutlineLoading className="animate-spin text-white" size={30} />
            ) : (
                msg
            )}
        </button>
     );
}
 
export default Mailer;