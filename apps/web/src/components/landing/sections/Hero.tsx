import { Waitlist } from './Waitlist';
import { motion } from 'framer-motion';
import { landingCopy, landingTheme } from '@/conf/landingConfig';

export const Hero = () => {
  const { hero, waitlist } = landingCopy;
  const { fontSizes } = landingTheme;

  const headlineStyle = {
    fontSize: '42px',
    lineHeight: '42px',
    height: '42px',
    letterSpacing: '-2.2px',
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen text-center space-y-16">
      <motion.h1
        className="font-twk font-normal tracking-tight-2.88 text-white"
        style={headlineStyle}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {hero.headline1}
        <span className="block" style={headlineStyle}>
          {hero.headline2}
        </span>
      </motion.h1>
      <motion.p
        className="font-twk text-white/80 max-w-2xl mx-auto"
        style={{ fontSize: '24px', lineHeight: '32px' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {hero.subheader}
      </motion.p>
      <Waitlist
        placeholder={waitlist.placeholder}
        buttonText={waitlist.button}
        loadingText={waitlist.loading}
        successMessage={waitlist.success}
        errorMessage={waitlist.error}
        existingEmailMessage="This email is already on the waitlist."
        emailFontSize={fontSizes.emailInput}
      />
    </section>
  );
};
