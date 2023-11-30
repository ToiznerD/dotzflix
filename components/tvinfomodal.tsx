import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import FavoriteButton from './favoritebutton'
import useTvInfoModal from '../hooks/useTvInfoModal'
import useSeasons from '../hooks/useSeasons'
import { AiOutlineLoading } from "react-icons/ai";
import { useRouter } from 'next/router'

interface TvInfoModalProps{
    visible?: boolean;
    onClose: any;
}

interface SeasonProps{
        "air_date": Date,
        "episode_count": number,
        "id": number,
        "name": string,
        "overview": string,
        "poster_path": string,
        "season_number": number,
        "vote_average": number
}


const TvInfoModal: React.FC<TvInfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(visible);
    const { tvId } = useTvInfoModal();
    const { data = {}, isLoading } = useSeasons(tvId);
    const [season, setSeason] = useState<SeasonProps>();
    const router = useRouter();
    const { profileId } = router.query;
    const profile = Array.isArray(profileId) ? profileId[0] : profileId;

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible])
    
    const handleClose = useCallback(() => {
        setIsVisible(false);
        setSeason(undefined)
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose])

    if (!visible || !tvId || !data) {
        return null
    }

    // useEffect(() => {
    //         const episodesArray = Array.from({ length: season?.episode_count ?? 0 }, (_, index) => index + 1);
    //         const episodes = episodesArray.map((_, index) => (
    //             <div
    //                 key={index}
    //                 onClick={() => handleEpisodeClick(index + 1)}
    //                 className="bg-black rounded-md p-2 hover:bg-gray-800 cursor-pointer"
    //             >
    //                 Episode {index + 1}
    //             </div>
    //         ));
    //         SetEpisodes(episodes);
    // }, [season]);

    const handleSeasonClick = (season: SeasonProps) => {
        console.log(season.name);
        setSeason(season);
    }

    const handleEpisodeClick = (episode: number) => {
        if(!season) return null
        router.push(`/profile/${profile}/tv/${tvId}?season=${season.season_number}&episode=${episode}`)
    }

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 p-3">
            <div className="relative w-auto mx-auto max-w-4xl max-h-full overflow-y-auto rounded-md overflow-hidden">
                {isLoading ? (
                    <AiOutlineLoading className="animate-spin text-white" size={30} />
                ) : (
                    <div className = {`${isVisible ? "scale-100" : "scale-0"} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                        <div className="relative h-96">
                            <video
                                className="w-full brightness-[60%] object-cover h-full"
                                autoPlay muted loop src={data?.videoUrl} poster={data?.tv?.thumbnailUrl}></video>
                            <div
                                className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                                onClick={handleClose}>
                                <AiOutlineClose className="text-white" size={20} />
                            </div>

                            <div className="absolute bottom-[10%] left-10">
                                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                    {data?.tv?.title}
                                </p>
                                <div className="flex flex-row gap-4 items-center">
                                    {/* <PlayButton movieId={data?.tv?.id} /> */}
                                    <FavoriteButton movieId={data?.tv?.id} />
                                </div>
                            </div>
                        </div>

                        <div className="px-12 py-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">
                                {data?.tv?.genre}
                            </p>
                            <p className="text-white text-lg">
                                {data?.tv?.description}
                            </p>
                            </div>
                            <div className="flex flex-wrap text-white font-bold gap-2 p-2">
                                {data?.seasons?.map((season: SeasonProps) => (
                                    <div
                                        key={season.id}
                                        onClick={() => handleSeasonClick(season)}
                                        className="bg-black rounded-md p-2 hover:bg-gray-800 cursor-pointer"
                                    >{season.name}</div>
                                ))}
                            </div>
                            
                            {season && (
                                <>
                                <div className="border border-neutral-500"/>
                                <div className="flex flex-wrap  text-white font-bold gap-2 p-1">
                                    {Array.from({ length: season.episode_count }, (_, index) => (
                                    <div
                                        key={index}
                                        className="bg-black rounded-md p-2 hover:bg-gray-800 cursor-pointer"
                                        onClick={() => handleEpisodeClick(index + 1)}
                                    >
                                        Episode {index + 1}
                                    </div>
                                    ))}
                                    </div>
                                </>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TvInfoModal;