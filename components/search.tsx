import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import DisplayResults from './displayresults';
import { APIResponse } from '@/types';

interface SearchProps{
    visible: boolean;
    onClose: any;
}


const Search: React.FC<SearchProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(visible);
    const search = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('')
    const [searchResults, setSearchResults] = useState<APIResponse[]>([]);

    useEffect(() => {
        setIsVisible(!!visible)
    }, [visible])

    useEffect(() => {
        if (isVisible && search.current) {
            search.current.focus();
        }
      }, [isVisible]);
    
    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose])

    const handleSearch = async (query: string) => {
       
        const response = await axios.get(`/api/search?query=${query}`);
        setSearchResults(response.data);
      };

    const handleInputChange = (event: { target: { value: any; }; }) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        handleSearch(newQuery)
    }

    if (!visible) {
        return null
    }

    return ( 
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? "scale-100" : "scale-0"} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-24">
                        <div
                            className="cursor-pointer absolute top-3 right-3  h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                            onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>

                        <div className="absolute top-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                Search
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-20 p-3">
                        <input
                            ref={search}
                            placeholder="Search on Dotzflix"
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            className="outline-none w-64 md:w-[300px] bg-transparent border-b-2 border-slate-800 text-white"
                        />
                    </div>
                    <DisplayResults movies={searchResults} />
                </div>
            </div>
        </div>
     );
}
 
export default Search;