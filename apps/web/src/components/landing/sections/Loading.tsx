import { Triangle } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#3a506b]">
      <div className="animate-spin mb-4">
        <Triangle size={48} className="text-cyan-400" />
      </div>
      <div className="text-white text-xl font-light tracking-wider animate-pulse">Welcome</div>
    </div>
  );
};

export default LoadingScreen;
