'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

export function CursorTrail() {
  const [cursorPos, setCursorPos] = useState<CursorPosition[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const trailLength = 10;
    const positions: CursorPosition[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      positions.push({ x: e.clientX, y: e.clientY });
      if (positions.length > trailLength) {
        positions.shift();
      }
      setCursorPos([...positions]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible || cursorPos.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {cursorPos.map((pos, index) => (
          <motion.div
            key={`${pos.x}-${pos.y}-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.5 - index * 0.05,
              scale: 1 - index * 0.1,
              x: pos.x - 4,
              y: pos.y - 4,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute h-2 w-2 rounded-full bg-[#00d9ff] blur-sm"
            style={{
              background: `radial-gradient(circle, rgba(0, 217, 255, ${0.8 - index * 0.08}) 0%, transparent 70%)`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

