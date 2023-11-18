import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useTVList = () => {
    const { data, error, isLoading } = useSWR('/api/tv', fetcher, {
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

export default useTVList;