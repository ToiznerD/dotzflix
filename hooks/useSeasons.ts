import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useSeasons = (id?: string) => {
    const { data, error, isLoading, mutate } = useSWR(id ? `/api/tv/${id}` : null, fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useSeasons;