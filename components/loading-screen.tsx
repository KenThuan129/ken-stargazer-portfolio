'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<LoadingParticle[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate particles with random positions
    const newParticles: LoadingParticle[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      color: i % 3 === 0 ? '#ff6b9d' : i % 3 === 1 ? '#9d4edd' : '#00d9ff',
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading || !isMounted || particles.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a1a]"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <div className="h-24 w-24 rounded-full border-4 border-transparent bg-gradient-to-r from-[#ff6b9d] via-[#9d4edd] to-[#00d9ff] p-1">
            <div className="h-full w-full rounded-full bg-[#0a0a1a] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="h-12 w-12 border-4 border-[#ff6b9d] border-t-transparent rounded-full"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <p className="text-lg font-heading gradient-text">Loading Portfolio...</p>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, particle.x, 0],
            y: [0, particle.y, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.id * 0.3,
            ease: 'easeInOut',
          }}
          className="absolute h-2 w-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            backgroundColor: particle.color,
          }}
        />
      ))}
    </motion.div>
  );
}

