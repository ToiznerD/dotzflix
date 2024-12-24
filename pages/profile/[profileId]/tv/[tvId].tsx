import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft, AiOutlineLoading } from 'react-icons/ai';
import useSeasons from '@/hooks/useSeasons';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix',

};

const Watch = () => {
    const router = useRouter();
    const { tvId, profileId, season, episode } = router.query;
    console.log(tvId, profileId, season, episode);
    const { data, isLoading } = useSeasons(tvId as string);
    console.log(data);
    const contentSource = data?.tv.url.startsWith('tt') ? `imdb=${data?.tv.url}` : `tmdb=${data?.tv.url}`;
    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <AiOutlineArrowLeft onClick={() => router.push(`/profile/${profileId}`)} className="text-white cursor-pointer" size={40} />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching: 
                    </span>
                    {data?.tv.title} Season {season} Episode {episode}
                </p>
            </nav>
            {/* <video
                autoPlay
                controls
                className="h-full w-full"
                src={data?.videoUrl}></video> */}
            {isLoading ? (
                <AiOutlineLoading className="animate-spin text-white" size={30} />
            ) : (
                  <iframe
                src={`https://vidsrc.me/embed/tv?${contentSource}&season=${season}&episode=${episode}`}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                allowFullScreen
                
            ></iframe>  
            )}
            
        </div>
    )
}

export default Watch;
