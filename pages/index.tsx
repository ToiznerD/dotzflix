
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Dotzflix',
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
  } else {
    return {
      redirect: {
        destination: '/profiles/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {

}
