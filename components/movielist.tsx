import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash'
import MovieCard from './moviecard';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import useInfoModal from '@/hooks/useInfoModal';
interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {


    const getInitialCardsToShow = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1200) {
                return 6;
              } else if (window.innerWidth >= 992) {
                return 4;
              } else if (window.innerWidth >= 768) {
                return 3;
              } else {
                  return 2;
              }
        }
        return 2; // Default number of cards for small screens or server-side rendering
    };
  const { openModal } = useInfoModal();
    const [cardsToShow, setCardsToShow] = useState(getInitialCardsToShow());
    const [slider, setSlider] = useState(0);
    
    
    const handleBackClick = () => {
        setSlider((prevSlider) => Math.max(prevSlider - 1, 0));
      };
    
      const handleForwardClick = () => {
        // Calculate the maximum allowed slider value
        const maxSlider = (data.length - cardsToShow);
        // Update the slider value, ensuring it doesn't go beyond the maximum
        setSlider((prevSlider) => Math.min(prevSlider + 1, maxSlider));
      };
    
      if (isEmpty(data)) {
        return null;
    }

    
    return (
        <div className="px-4 md:px-12 mt-20 space-y-8 w-full ">
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
            <div className="group/item relative ">

                {/* Present movie list for lg screens */}
                    <div className="hidden lg:flex flex-row flex-nowrap transition-transform duration-1000" style={{ transform: `translateX(-${slider*350}px)` }}>
                        {data.map((movie) => (
                            <MovieCard key={movie.id} data={movie}/>
                        ))}
                    </div>
                {/* Present movie list for md & below screens */}
                  <div className="lg:hidden flex flex-row transition-transform duration-1000 overflow-x-auto  w-full no-scrollbar" style={{ transform: `translateX(-${slider*350}px)` }}>
                      {data.map((movie) => (
                          <div key={movie.id} onClick={() => openModal(movie.id)}>
                            <MovieCard key={movie.id} data={movie}/>
                          </div>
                      ))}
                  </div>
                    <div
                      onClick={handleBackClick}
                      className="lg:group-hover/item:block hidden absolute top-[50%] -left-5 text-white -translate-y-[-50%] rounded-full opacity-80 bg-neutral-500 p-2 transition cursor-pointer hover:bg-neutral-400"
                    >
                      <IoIosArrowBack size={40} />
                    </div>
                    <div
                      onClick={handleForwardClick}
                      className="lg:group-hover/item:block hidden absolute top-[50%] -right-5 text-white -translate-y-[-50%] rounded-full opacity-80 bg-neutral-500 p-2 transition cursor-pointer hover:bg-neutral-400"
                    >
                      <IoIosArrowForward size={40} />
                    </div>
          </div>
        </div>
      );
}
export default MovieList;