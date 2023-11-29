
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
import { useState } from 'react';
import useTVList from '@/hooks/useTVList';
import TVList from '@/components/tvlist';
import useTvInfoModal from '@/hooks/useTvInfoModal';
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

    



  return (
      <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <TvInfoModal visible={isTvOpen} onClose={closeTvModal} />
      <Search visible={isSearchOpen} onClose={closeSearchModal} />
      <Navbar />
      <Billboard />
      <div className="">
        <MovieList title="Trending Now" data={movies} />
        <TVList title="Series" data={tvs} />
        <MovieList title="My Movie List" data={favorites.favoriteMovies} />
        <TVList title="My TV List" data={favorites.favoriteTvs} />
      </div>
      </>
  )
}
