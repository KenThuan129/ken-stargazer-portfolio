'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  animateX: [string, string, string];
  animateY: [string, string, string];
}

export function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const xOffset = (Math.random() - 0.5) * 20;
      const yOffset1 = Math.random() * 30;
      const yOffset2 = Math.random() * 60;
      
      return {
        id: i,
        x,
        y,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        animateX: [`${x}vw`, `${x + xOffset}vw`, `${x}vw`],
        animateY: [`${y}vh`, `${y - yOffset1}vh`, `${y - yOffset2}vh`],
      };
    });
    setParticles(newParticles);
  }, [count]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => {
        const colors = ['#ff6b9d', '#9d4edd', '#00d9ff'];
        const color = colors[particle.id % colors.length];
        
        return (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 0,
              x: particle.animateX[0],
              y: particle.animateY[0],
            }}
            animate={{
              opacity: [0, 0.6, 0],
              x: particle.animateX,
              y: particle.animateY,
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              filter: 'blur(1px)',
            }}
          />
        );
      })}
    </div>
  );
}

