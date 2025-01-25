import { useEffect, useRef } from "react";
import { backgroundConfig } from "@/conf/themeConfig";

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { particles, gradient } = backgroundConfig;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", handleMouseMove);
    setCanvasSize();

    const particlesArray = Array.from(
      { length: Math.floor(window.innerWidth / (1000 / particles.count)) },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * particles.depthFactor,
        size: Math.random() * particles.sizeVariation + particles.baseSize,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        color:
          particles.colors[Math.floor(Math.random() * particles.colors.length)],
        vx: 0,
        vy: 0,
        angle: Math.random() * Math.PI * 2,
        speed:
          Math.random() * (particles.maxSpeed - particles.minSpeed) +
          particles.minSpeed,
      })
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.angle += 0.02;
        const floatX = Math.sin(particle.angle) * particle.speed;
        const floatY = Math.cos(particle.angle) * particle.speed;

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particles.maxDistance) {
          const force =
            (particles.maxDistance - distance) / particles.maxDistance;
          particle.vx += (dx / distance) * force * particles.attractionForce;
          particle.vy += (dy / distance) * force * particles.attractionForce;
        }

        particle.x += floatX + particle.vx;
        particle.y += floatY + particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        particle.x += (particle.baseX - particle.x) * particles.returnForce;
        particle.y += (particle.baseY - particle.y) * particles.returnForce;

        const scale = 1 - particle.z / particles.depthFactor;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = particle.color || "rgba(255,255,255,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particles]);

  return (
    <div className="fixed inset-0 -z-10">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient.colors.join(" ")}`}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
