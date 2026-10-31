import React, { useEffect, useRef } from 'react';

interface ConfettiEffectProps {
  durationMs?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'star';
}

const PALETTE = [
  '#EC4899', // Pink
  '#F472B6', // Light Pink
  '#A855F7', // Purple
  '#C084FC', // Light Purple
  '#FBBF24', // Gold
  '#F59E0B', // Amber Gold
  '#FDE68A', // Pale Gold
  '#14B8A6', // Teal
  '#2DD4BF', // Light Teal
  '#67E8F9'  // Cyan
];

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  durationMs = 2800,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Burst origin: center-top of viewport
    const originX = width / 2;
    const originY = height * 0.42;

    const particleCount = 85;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 9 + 4;
      const shapes: ('rect' | 'circle' | 'star')[] = ['rect', 'rect', 'circle', 'star'];
      
      particles.push({
        x: originX + (Math.random() - 0.5) * 50,
        y: originY + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 5 - 2, // upward initial pop
        width: Math.random() * 8 + 6,
        height: Math.random() * 6 + 4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.random() * 0.1 + 0.05,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Physics: drag, gravity, wobble
        p.vx *= 0.96;
        p.vy += 0.22; // gravity
        p.vy *= 0.98;
        p.x += p.vx + Math.sin(p.wobble) * 1.2;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        // Fade out towards the end
        if (progress > 0.6) {
          p.opacity = Math.max(0, 1 - (progress - 0.6) / 0.4);
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.shape === 'rect') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'star') {
          // Sparkling 4-point star
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.width);
          ctx.quadraticCurveTo(0, 0, p.width, 0);
          ctx.quadraticCurveTo(0, 0, 0, p.width);
          ctx.quadraticCurveTo(0, 0, -p.width, 0);
          ctx.quadraticCurveTo(0, 0, 0, -p.width);
          ctx.fill();
        }

        ctx.restore();
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [durationMs, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
};
