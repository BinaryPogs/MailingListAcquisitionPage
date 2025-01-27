import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { IconType } from 'react-icons';
import { HiOutlineCollection, HiOutlineAdjustments, HiOutlineLightBulb } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { landingCopy, landingTheme } from '@/conf/landingConfig';

const FEATURE_ICONS: IconType[] = [HiOutlineCollection, HiOutlineAdjustments, HiOutlineLightBulb];

export const Features = () => {
  const { features } = landingCopy;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef}>
      <motion.h2
        style={{ fontSize: landingTheme.fontSizes.featuresHeader }}
        className="text-4xl font-bold text-white text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {features.header}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.items.map((feature, index) => {
          const Icon = FEATURE_ICONS[index] as React.ComponentType<{
            className?: string;
          }>;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.21, 1.11, 0.81, 0.99],
              }}
            >
              <Card className="bg-white/[0.03] backdrop-blur-[2px] border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader>
                  <motion.div
                    className="flex items-center justify-center bg-[#5bc0be]/10 w-16 h-16 rounded-2xl mx-auto"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Icon className="w-8 h-8 text-[#5bc0be]" />
                  </motion.div>
                  <h3
                    style={{ fontSize: landingTheme.fontSizes.featureTitle }}
                    className="font-semibold text-center text-white mt-6"
                  >
                    {feature.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p
                    style={{
                      fontSize: landingTheme.fontSizes.featureDescription,
                    }}
                    className="text-gray-300 text-center leading-relaxed"
                  >
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
