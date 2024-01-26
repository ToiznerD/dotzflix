import React from 'react';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix | Home',
};

const Watch = () => {
    const router = useRouter();
    const { movieId, profileId } = router.query;

    const { data } = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <AiOutlineArrowLeft onClick={() => router.push(`/profile/${profileId}`)} className="text-white cursor-pointer" size={40} />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching: 
                    </span>
                    {data?.title}
                </p>
            </nav>
            {/* <video
                autoPlay
                controls
                className="h-full w-full"
                src={data?.videoUrl}></video> */}
            <iframe
                src={`${data?.videoUrl}?start=300`}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media"
                allowFullScreen
                
            ></iframe>
{/* 
<iframe src="https://www.youtube-nocookie.com/embed/dug56u8NN7g?autoplay=1&mute=1" width="100%" height="100%" scrolling="no" allowFullScreen></iframe> */}
            {/* <ReactPlayer
                url={data?.videoUrl}
                playing={true}
                width="100%"
                height="100%"
            /> */}
        </div>
    )
}

export default Watch;
