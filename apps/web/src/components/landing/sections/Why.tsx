import { landingCopy, landingTheme } from '@/conf/landingConfig';
import { motion } from 'framer-motion';

export const Why = () => {
  const { why } = landingCopy;
  const { fontSizes } = landingTheme;

  const headerStyle = {
    fontSize: fontSizes.whyHeader,
    lineHeight: '1.2',
    letterSpacing: '-2.2px',
  };

  return (
    <section className="py-16 flex flex-col items-center">
      <motion.h2
        className="font-twk font-normal tracking-tight text-white mb-8"
        style={headerStyle}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {why.header}
      </motion.h2>
      <motion.div
        className="bg-white/[0.005] backdrop-blur-[0.5px] border border-white/[0.01] rounded-2xl p-8 max-w-3xl w-full mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p
          className="font-twk font-normal text-white/80 text-center"
          style={{
            fontSize: '24px',
            lineHeight: '32px',
          }}
        >
          {why.description}
        </p>
      </motion.div>
    </section>
  );
};
