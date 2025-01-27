import { useEffect, useRef, useState, useCallback } from 'react';
import { particleConf } from '@/conf/landingConfig';
import debounce from 'lodash/debounce';

type Vector2 = [number, number];
type Particle = {
  pos: Vector2;
  basePos: Vector2;
  velocity: Vector2;
  z: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  angleSpeed: number;
  freqX: number;
  freqY: number;
  arcFactor: number;
};

export const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<Vector2 | null>(null);
  const touchActiveRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const {
    sizeVariation,
    baseSize,
    colors,
    depthFactor,
    speedRange,
    defaultColor,
    arcFactorRange,
    mobileCountScale,
    mobileSizeScale,
  } = particleConf;

  const setCanvasSize = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const dpr = window.devicePixelRatio || 1;
    const [width, height] = [window.innerWidth, window.innerHeight];
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
  }, []);

  const memoizeParticleConf = useCallback(
    (screenWidth: number, screenHeight: number) => {
      const screenArea = screenWidth * screenHeight;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      const baseParticleCount = Math.floor((screenArea / (1920 * 1080)) * particleConf.maxCount);

      const resolutionFactor = isMobile ? mobileCountScale : 1;
      const particleCount = Math.min(baseParticleCount * resolutionFactor, particleConf.maxCount);

      return particleCount;
    },
    [mobileCountScale]
  );

  const initParticles = useCallback(
    (particleCount: number): Particle[] => {
      const [minSpeed, maxSpeed] = speedRange;
      const [minArc, maxArc] = arcFactorRange;

      // Scaling factor for mobile screens
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const particleScale = isMobile ? mobileSizeScale : 1; // Reduce size by 30% on mobile

      return Array.from(
        { length: particleCount },
        (): Particle => ({
          pos: [Math.random() * window.innerWidth, Math.random() * window.innerHeight],
          basePos: [Math.random() * window.innerWidth, Math.random() * window.innerHeight],
          velocity: [0, 0],
          z: Math.random() * depthFactor,
          size: (Math.random() * sizeVariation + baseSize) * particleScale,
          color: colors[Math.floor(Math.random() * colors.length)] || defaultColor,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          angleSpeed: Math.random() * 0.02 + 0.01,
          freqX: 0.8 + Math.random() * 0.4,
          freqY: 0.8 + Math.random() * 0.4,
          arcFactor: Math.random() * (maxArc - minArc) + minArc,
        })
      );
    },
    [
      speedRange,
      arcFactorRange,
      depthFactor,
      sizeVariation,
      baseSize,
      colors,
      defaultColor,
      mobileSizeScale,
    ]
  );
  // Effect to set isBrowser state once window is available (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  // Effect for particle animation logic: initializes canvas, handles input, and animates particles
  useEffect(() => {
    if (!isBrowser) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];

    // Canvas setup
    setCanvasSize(canvas, ctx);

    // Particle initialization
    const particleCount = memoizeParticleConf(window.innerWidth, window.innerHeight);
    particlesArray = initParticles(particleCount);

    const handleMouseMove = debounce((e: MouseEvent) => {
      mousePosRef.current = [e.clientX, e.clientY];
    }, 10);

    const handleTouch = debounce((e: TouchEvent) => {
      if (e.touches[0]) {
        const touch = e.touches[0];
        mousePosRef.current = [touch.clientX, touch.clientY];
        if (!touchActiveRef.current) {
          touchActiveRef.current = true;
        }
      }
    }, 10);

    const handleTouchEnd = () => {
      touchActiveRef.current = false;
      mousePosRef.current = null;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { attractionForce, maxDistance, returnForce, depthFactor, touchMultiplier, frictions } =
        particleConf;

      const isTouch = touchActiveRef.current;
      const mousePos = mousePosRef.current;

      particlesArray.forEach((p) => {
        p.angle += p.angleSpeed;

        const sinAngleX = Math.sin(p.angle * p.freqX);
        const cosAngleY = Math.cos(p.angle * p.freqY);
        const sinAngle = Math.sin(p.angle);
        const cosAngle = Math.cos(p.angle);

        const floatX = sinAngleX * p.speed * (1 + p.arcFactor * sinAngle);
        const floatY = cosAngleY * p.speed * (1 + p.arcFactor * cosAngle);

        if (mousePos) {
          const dx = mousePos[0] - p.pos[0];
          const dy = mousePos[1] - p.pos[1];
          const distSq = dx ** 2 + dy ** 2;

          if (distSq < maxDistance ** 2) {
            const distance = Math.sqrt(distSq);
            const force = (maxDistance - distance) / maxDistance;
            const attraction = force * attractionForce * (isTouch ? touchMultiplier : 1);

            if (distance !== 0) {
              p.velocity[0] += (dx / distance) * attraction;
              p.velocity[1] += (dy / distance) * attraction;
            }
          }
        }

        p.pos[0] += floatX + p.velocity[0];
        p.pos[1] += floatY + p.velocity[1];

        const friction = isTouch ? frictions[1] : frictions[0];
        p.velocity[0] *= friction;
        p.velocity[1] *= friction;

        p.pos[0] += (p.basePos[0] - p.pos[0]) * returnForce;
        p.pos[1] += (p.basePos[1] - p.pos[1]) * returnForce;

        const scale = 1 - p.z / depthFactor;
        ctx.beginPath();
        ctx.arc(p.pos[0], p.pos[1], p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener(
      'resize',
      debounce(() => setCanvasSize(canvas, ctx), 200)
    );

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isBrowser, setCanvasSize, memoizeParticleConf, initParticles]);

  return <canvas ref={canvasRef} className="absolute inset-0 touch-none" />;
};
