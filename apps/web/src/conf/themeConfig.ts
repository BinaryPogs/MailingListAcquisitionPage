export const themeConfig = {
  colors: {
    primary: {
      base: '#5bc0be',
      hover: '#4ca8a6',
      light: 'rgba(91, 192, 190, 0.1)',
      border: 'rgba(91, 192, 190, 0.2)',
      text: '#5bc0be',
    },
    background: {
      dark: '#0b132b',
      medium: '#1c2541',
      light: '#3a506b',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)',
      muted: 'rgba(255, 255, 255, 0.6)',
    },
  },
  fontSizes: {
    headline: '32px',
    subheader: '24px',
    featureTitle: '18px',
    featureDescription: '16px',
    emailInput: '18px',
  },
};

export const backgroundConfig = {
  particles: {
    baseSize: 1.8,
    sizeVariation: 1.2,
    count: 300,
    colors: [
      'rgba(255, 255, 255, 0.5)',
      'rgba(91, 192, 190, 0.4)',
      'rgba(173, 216, 230, 0.3)',
    ],
    maxSpeed: 0.22,
    minSpeed: 0.08,
    attractionForce: 0.1,
    returnForce: 0.02,
    maxDistance: 300,
    depthFactor: 200,
  },
  gradient: {
    colors: ['from-[#0b132b]', 'via-[#1c2541]', 'to-[#3a506b]'],
  },
};
