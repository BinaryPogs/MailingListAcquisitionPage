export const landingCopy = {
  hero: {
    headline1: 'All your content',
    headline2: 'in one place',
    subheader: 'A feed where you decide what matters',
  },
  features: {
    header: 'Features',
    items: [
      {
        title: 'Connect your accounts',
        description: 'Bring together content from the platforms you love',
      },
      {
        title: 'Tailor your feed',
        description: 'Take control what gets recommended to you',
      },
      {
        title: 'Discover mindfully',
        description: 'Stay focused on the things that fuel your growth',
      },
    ],
  },
  why: {
    header: 'Why Kurio?',
    description:
      'Content is everywhere. Kurio cuts through the noise, so you can experience content with intention.',
  },
  footerCta: {
    text: 'Stay curious.',
    button: 'Join the waitlist',
  },
  waitlist: {
    placeholder: 'Enter your email',
    button: 'Join Waitlist',
    loading: 'Adding you...',
    success: "You're on the list! We'll notify you when Kurio launches.",
    error: 'Oops! Please try again.',
  },
};

export const landingTheme = {
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
    headline: '42px',
    subheader: '20px',
    featuresHeader: '32px',
    featureTitle: '24px',
    featureDescription: '16px',
    whyHeader: '28px',
    emailInput: '14px',
  },
};

export const particleConf = {
  maxCount: 420,
  mobileCountScale: 1.5,
  mobileSizeScale: 0.67,
  baseSize: 1.8,
  sizeVariation: 1.2,
  attractionForce: 0.1,
  returnForce: 0.02,
  maxDistance: 420,
  depthFactor: 220,
  touchMultiplier: 1.5,
  speedRange: [0.08, 0.22] as [number, number], // [min, max]
  frictions: [0.95, 0.88] as [number, number], // [desktop, touch]
  arcFactorRange: [0.5, 1.5] as [number, number],
  colors: ['rgba(255, 255, 255, 0.5)', 'rgba(91, 192, 190, 0.4)', 'rgba(173, 216, 230, 0.3)'],
  defaultColor: 'rgba(255, 255, 255, 0.5)',
};

export const backgroundConf = {
  baseColor: '#030f1c',
};
