import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Why } from '@/components/landing/Why';
import { FooterCTA } from '@/components/landing/FooterCTA';
import { AnimatedBackground } from '@/components/landing/Background';

const LandingPage = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
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
