import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // redirect to /landing
    router.replace('/landing');
  }, [router]); // run once on mount

  return <div>Loading...</div>; // loading state
};

export default Home;
