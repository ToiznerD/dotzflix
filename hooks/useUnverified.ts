import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useUnverified = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/unverified', fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    })

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUnverified;