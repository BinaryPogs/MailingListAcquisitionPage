import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/landing/sections/Loading'; // Adjust path as needed
import LandingPage from '@/components/landing/layout'; // Your main layout page

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading period, you can adjust this as necessary (e.g., based on data fetching or other logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 2 seconds, show the LandingPage
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  // Show loading page until the landing page is ready to be displayed
  return isLoading ? <LoadingScreen /> : <LandingPage />;
};

export default Home;
