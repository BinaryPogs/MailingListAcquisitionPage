import React from 'react';
import { backgroundConf } from '@/conf/landingConfig';

export const Gradient = () => {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${backgroundConf.gradientColors.join(' ')}`}
    />
  );
};
