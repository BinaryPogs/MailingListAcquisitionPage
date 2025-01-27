import { Hero } from '@/components/landing/sections/Hero';
import { Features } from '@/components/landing/sections/Features';
import { Why } from '@/components/landing/sections/Why';
import { FooterCTA } from '@/components/landing/sections/FooterCTA';
import { Background } from '@/components/landing/background/Background';

const LandingPage = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="min-h-screen relative overflow-hidden select-none">
      <Background />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="space-y-12">
            <Hero />
            <Features />
            <Why />
            <FooterCTA onScrollToTop={scrollToTop} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
