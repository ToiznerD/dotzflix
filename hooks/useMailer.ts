import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

interface useMailerProps {
    user: string;
    email: string;
}

const useMailer = ({user, email}: useMailerProps) => {
    const { data, error, isLoading } = useSWR({ url: '/api/send-email', args: {user, email}}, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useMailer;