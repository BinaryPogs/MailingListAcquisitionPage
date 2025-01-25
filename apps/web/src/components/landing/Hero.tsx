import { useCopy } from '@/hooks/useCopy';
import { Waitlist } from './Waitlist';
import { motion } from 'framer-motion';
import { themeConfig } from '@/conf/themeConfig';

export const Hero = () => {
  const { hero, waitlist } = useCopy();
  const { fontSizes } = themeConfig;

  return (
    <section className="text-center space-y-12 py-20 mt-10">
      <motion.h1 
        className="text-4xl sm:text-6xl font-extrabold text-white leading-tight"
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {hero.headline1}
        <span className="block">{hero.headline2}</span>
      </motion.h1>
      <motion.p 
        className="text-xl text-white/80 max-w-2xl mx-auto"
        style={{ fontSize: fontSizes.subheader }}
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