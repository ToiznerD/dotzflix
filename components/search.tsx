import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface SearchProps{
    visible: boolean;
    onClose: any;
}

const Search: React.FC<SearchProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(visible);
    const search = useRef<HTMLInputElement>(null);
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

    const handleSubmit = useCallback(() => {
        const title = search?.current?.value
        //Search for movie now.
    }, [search])

    if (!visible) {
        return null
    }

    return ( 
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? "scale-100" : "scale-0"} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-44 w-96">
                        <div
                            className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                            onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>

                        <div className="absolute top-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                                Search
                            </p>
                        </div>
                    </div>
                    <div className="relative h-20">
                        <input
                            ref={search}
                            placeholder="Search on Dotzflix"
                            type="text"
                            className="mx-auto flex justify-center items-center p-1 pl-2 rounded-md border-[2px] border-[#e50914] w-36 md:w-72 transition focus:border-[#b81c24]"
                        />
                    </div>
                    <div className="text-white relative mx-auto flex justify-center items-center p-10 ">
                        <button
                            onClick={handleSubmit}
                            className=" uppercase font-semibold text-red-500 rounded-md p-2 border-[1px] border-rose-500 hover:border-rose-600">Search</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Search;