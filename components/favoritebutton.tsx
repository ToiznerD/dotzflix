import axios from 'axios';
import React, { useCallback, useEffect, useMemo } from 'react'
import useFavorites from '@/hooks/useFavorites'
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Movie } from '@prisma/client';

interface FavoriteButtonProps{
    movieId: string;
    type?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId}) => {
    const router = useRouter();
    const { profileId } = router.query;
    const singleProfileId = Array.isArray(profileId) ? profileId[0] : profileId
    const { data: favoriteIds, mutate: mutateFavorites, isLoading } = useFavorites(singleProfileId ?? '');
    

    const isFavorite = useMemo(() => {
        if (!favoriteIds) return false;
        const list = favoriteIds.map((favorite: Movie) => favorite.id);

        return list.includes(movieId);
    }, [favoriteIds, movieId])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            console.log('Favorite')
            response = await axios.delete(`/api/favorite`, { data: { movieId, profileId: singleProfileId } })

        } else {
            console.log('Not favorite')
            response = await axios.post(`/api/favorite`, { movieId: movieId, profileId: singleProfileId })
        }


        mutateFavorites();
    }, [movieId, singleProfileId, isFavorite, mutateFavorites])

    if (isLoading) {
        return null;
    }

    return (
        <div
            onClick={toggleFavorites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white" size={25} />
        </div>
    )
}
export default FavoriteButton;