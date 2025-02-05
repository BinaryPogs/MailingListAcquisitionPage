import { Triangle } from 'lucide-react';
import { backgroundConf } from '@/conf/landingConfig';

const LoadingScreen = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${backgroundConf.baseColor}, ${backgroundConf.baseColor})`,
      }}
    >
      <div className="animate-spin mb-4">
        <Triangle size={48} className="text-[#5bc0be]" />
      </div>
      <div className="text-white text-xl font-light tracking-wider animate-pulse font-sans">
        Welcome
      </div>
    </div>
  );
};

export default LoadingScreen;
