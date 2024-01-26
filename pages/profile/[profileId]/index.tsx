
import { NextPageContext } from 'next'
import { getSession} from 'next-auth/react'
import Navbar from '@/components/navbar'
import Billboard from '@/components/billboard';
import MovieList from '@/components/movielist';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/infomodal';
import TvInfoModal from '@/components/tvinfomodal';
import useInfoModal from '@/hooks/useInfoModal';
import Search from '@/components/search';
import useSearchModal from '@/hooks/useSearchModal';
import { useRouter } from 'next/router';
import { RefObject, useRef } from 'react';
import useTVList from '@/hooks/useTVList';
import TVList from '@/components/tvlist';
import useTvInfoModal from '@/hooks/useTvInfoModal';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix | Home',
};
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: tvs = [] } = useTVList();
  const router = useRouter();
  const { profileId } = router.query;
  const singleProfileId = Array.isArray(profileId) ? profileId[0] : profileId;
  const { data: favorites = [] } = useFavorites(singleProfileId ?? '');
  const { isOpen, closeModal } = useInfoModal();
  const { isOpen: isTvOpen, closeModal: closeTvModal } = useTvInfoModal();
  const { isOpen: isSearchOpen, closeModal: closeSearchModal } = useSearchModal();

  const trendingNowRef: RefObject<HTMLDivElement> = useRef(null);
  const seriesRef: RefObject<HTMLDivElement> = useRef(null);
  const myMovieListRef: RefObject<HTMLDivElement> = useRef(null);
  const myTVListRef: RefObject<HTMLDivElement> = useRef(null);
    



  return (
      <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <TvInfoModal visible={isTvOpen} onClose={closeTvModal} />
      <Search visible={isSearchOpen} onClose={closeSearchModal} />
      <Navbar
        onTrendingNowClick={() => trendingNowRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onSeriesClick={() => seriesRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onMyMovieListClick={() => myMovieListRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onMyTVListClick={() => myTVListRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
      <Billboard />
      <div ref={trendingNowRef} className="py-5">
        <MovieList title="Trending Now" data={movies} />
      </div>
      <div ref={seriesRef} className="py-5">
        <TVList title="Series" data={tvs} />
      </div>
      <div ref={myMovieListRef} className="py-5">
        <MovieList title="My Movie List" data={favorites.favoriteMovies} />
      </div>
      <div ref={myTVListRef} className="py-5">
        <TVList title="My TV List" data={favorites.favoriteTvs} />
      </div>
      </>
  )
}
