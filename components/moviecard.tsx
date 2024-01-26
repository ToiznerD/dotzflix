import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs'
import FavoriteButton from './favoritebutton';
import { useRouter } from 'next/router';
import useInfoModal from '@/hooks/useInfoModal';
import { BiChevronDown } from 'react-icons/bi'
interface MovieCardProps {
    data: Record<string, any>;

}

const MovieCard: React.FC<MovieCardProps> = ({
    data
}) => {
    const { openModal } = useInfoModal();
    const router = useRouter();
    const { profileId } = router.query;
    return (
        <div className="group bg-zinc-900 flex flex-shrink-0 relative w-[200px] md:w-[300px] h-[234px] md:h-[400px] m-1">
            <img
                className="cursor-pointer  transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300  w-full"
                src={data.thumbnailUrl} alt="Thumbnail" />
            <div className="hidden lg:block opacity-0 absolute top-0 transition duration-200 z-10  delay-300  w-[150px] md:w-[300px] scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
                <img
                    className="cursor-pointer transition duration shadow-xl rounded-t-md  w-[150px] md:w-[300px] h-[234px] md:h-96"
                    src={data.thumbnailUrl} alt="Thumbnail" />
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <div
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300 "
                            onClick={() => router.push(`/profile/${profileId}/watch/${data?.id}`)}>
                            <BsFillPlayFill size={30} />
                        </div>
                        <FavoriteButton movieId={data?.id} type="movie"/>
                        <div
                            onClick={() => openModal(data?.id)}
                            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
                            <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300"/>
                        </div>
                    </div>
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2023</span>
                    </p>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data.duration}
                        </p>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data.genre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;