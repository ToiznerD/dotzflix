import useInfoModal from '@/hooks/useInfoModal';
import useSearchModal from '@/hooks/useSearchModal';
import useTvInfoModal from '@/hooks/useTvInfoModal';
import { APIResponse } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

interface DisplayResultsProp {
    movies?: APIResponse[]
}

const DisplayResults = ({ movies }: DisplayResultsProp) => {
  const router = useRouter();
  const { profileId } = router.query;
  const { openModal: openMovieModal } = useInfoModal();
  const { openModal: openTVModal } = useTvInfoModal();
  const { closeModal } = useSearchModal();

  const handleClick = async (movie: APIResponse) => {
    let response;

    if (movie.media_type === 'tv') {
      response = await axios.post('/api/tv', { tv: movie })
    } else {
      response = await axios.post('/api/movie', { movie })
    }
    
    if (response.status === 200) {
      //movie.media_type === 'movie' ? router.push(`/profile/${profileId}/watch/${response.data.id}`) : router.push(`/profile/${profileId}/tv/${response.data.id}/1/1`)
      movie.media_type === 'movie' ? openMovieModal(response.data.id) : openTVModal(response.data.id)
      closeModal();
    }
  } 

    return ( 
        <div className="flex flex-wrap max-h-64 md:max-h-[20vw] lg:max-h-[40vw] overflow-y-auto justify-center items-center transition duration-100">
      {!!movies && movies?.map((item) => {
        return (
            <div
                onClick={() => handleClick(item)}
                key={item.id}
                className="cursor-pointer p-4 pb-10 relative hover:scale-[1.02] duration-300 ease-out"
          >
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              className={`lg:w-72 lg:h-96 md:w-52 md:h-72 w-40 h-[234px] object-cover`}
              alt="poster"
              ></img>
              <div className="absolute lg:w-72 lg:h-[400px] md:w-52 md:h-[306px] w-40 h-[255px] top-0 flex flex-col justify-between pt-3 ">
                <div className="flex justify-end w-full">
                  <h1 className="w-20 h-10 md:mr-[1px] mt-[3px] flex justify-center items-center rounded-md rounded-r-none rounded-tl-none bg-black text-white uppercase ">
                    {item.media_type}
                  </h1>
                </div>
                <div className="absolute bottom-0 left-0 w-full text-center p-2 bg-[rgba(0,0,0,0.7)] text-white rounded-md rounded-t-none">
                  { item.name || item.title || item.original_title}
                </div>
              </div>

          </div>
        );
      })}
    </div>
     );
}
 
export default DisplayResults;