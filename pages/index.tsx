
import { NextPageContext } from 'next'
import { getSession} from 'next-auth/react'
import Navbar from '@/components/navbar'
import Billboard from '@/components/billboard';
import MovieList from '@/components/movielist';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/infomodal';
import useInfoModal from '@/hooks/useInfoModal';
import Search from '@/components/search';
import useSearchModal from '@/hooks/useSearchModal';
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

  const { isOpen, closeModal } = useInfoModal();
  const { isOpen: isSearchOpen, closeModal: closeSearchModal } = useSearchModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Search visible={isSearchOpen} onClose={closeSearchModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />

      </div>
    </>
  )
}
