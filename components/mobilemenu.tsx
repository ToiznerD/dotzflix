import React from 'react';

interface MobileMenuProps {
    visible?: boolean;
    onTrendingNowClick: () => void;
    onSeriesClick: () => void;
    onMyMovieListClick: () => void;
    onMyTVListClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, onTrendingNowClick, onSeriesClick, onMyMovieListClick, onMyTVListClick }) => {
    if (!visible) {
        return null;
    }   
    
    return (
        <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-4">
                <div className="px-3 text-center text-white hover:underline"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Home
                </div>
                <div className="px-3 text-center text-white hover:underline" onClick={onTrendingNowClick}>
                    Trending Now
                </div>
                <div className="px-3 text-center text-white hover:underline" onClick={onSeriesClick}>
                    Series
                </div>
                <div className="px-3 text-center text-white hover:underline" onClick={onMyMovieListClick}>
                    My List
                </div>
                <div className="px-3 text-center text-white hover:underline" onClick={onMyTVListClick}>
                    My TV List
                </div>
            </div>
        </div>
    )
}

export default MobileMenu;