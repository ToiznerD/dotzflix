import { APIResponse } from '@/types';
import React from 'react';

interface DisplayResultsProp {
    movies?: APIResponse[]
}

const DisplayResults = ({ movies }: DisplayResultsProp) => {
    
    return ( 
        <div className="flex flex-wrap max-h-64 md:max-h-[40vw] overflow-y-auto justify-center items-center transition duration-100">
      {!!movies && movies?.map((item) => {
        return (
          <div
            key={item.id}
            className="p-4 pb-10 relative hover:scale-[1.02] duration-300 ease-out"
          >
            
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                className={`md:w-72 md:h-96 w-40 h-[234px] object-cover`}
              ></img>
              <div className="absolute md:w-[290px] md:h-[400px] w-40 h-[250px] top-0 flex flex-col justify-between pt-3 ">
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