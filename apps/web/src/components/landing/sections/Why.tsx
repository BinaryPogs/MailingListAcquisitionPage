import { landingCopy, landingTheme } from '@/conf/landingConfig';
import { motion } from 'framer-motion';

export const Why = () => {
  const { why } = landingCopy;

  return (
    <section className="py-16 flex flex-col items-center">
      <motion.h2
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ fontSize: landingTheme.fontSizes.whyHeader }}
      >
        {why.header}
      </motion.h2>
      <motion.div
        className="bg-white/[0.03] backdrop-blur-[2px] border-white/[0.05] rounded-xl p-8 max-w-3xl w-full mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="text-xl text-gray-300 text-center leading-relaxed">{why.description}</p>
      </motion.div>
    </section>
  );
};
