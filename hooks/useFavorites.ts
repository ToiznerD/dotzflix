import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useFavorites = (profileId: string) => {
    const { data, error, isLoading, mutate } = useSWR(`/api/favorites?profileId=${profileId}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useFavorites;