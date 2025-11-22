'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MagneticButton } from '../magnetic-button';
import { ArrowDown, Code2, Gamepad2, Sparkles } from 'lucide-react';

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
  clipPath: string;
  duration: number;
  color: string;
}

interface Star {
  id: number;
  left: number;
  top: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
}

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Frontend Developer × Game Designer';
  const [showCursor, setShowCursor] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [geometricShapes, setGeometricShapes] = useState<GeometricShape[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setIsMounted(true);
    
    // Generate geometric shapes
    const shapes: GeometricShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: 50 + Math.random() * 100,
      height: 50 + Math.random() * 100,
      borderRadius: i % 2 === 0 ? '50%' : '20%',
      clipPath: i % 4 === 3 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
      duration: 8 + Math.random() * 4,
      color: i % 3 === 0 ? '#ff6b9d' : i % 3 === 1 ? '#9d4edd' : '#00d9ff',
    }));
    setGeometricShapes(shapes);

    // Generate stars
    const starParticles: Star[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
    setStars(starParticles);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      {/* Floating geometric shapes */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {geometricShapes.map((shape) => (
            <motion.div
              key={shape.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
                x: `${shape.x}%`,
                y: `${shape.y}%`,
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.id * 0.5,
                ease: 'easeInOut',
              }}
              className="absolute opacity-20 blur-xl"
              style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                borderRadius: shape.borderRadius,
                clipPath: shape.clipPath,
                backgroundColor: shape.color,
              }}
            />
          ))}
        </div>
      )}

      {/* Star particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              }}
              className="absolute bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.width}px`,
                height: `${star.height}px`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Main heading with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
        >
          <span className="gradient-text block mb-2">Khang Thuan</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="block text-2xl md:text-3xl lg:text-4xl font-alt font-normal text-white/90"
          >
            {displayText}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 md:h-10 bg-gradient-to-b from-[#ff6b9d] to-[#9d4edd] ml-2"
              />
            )}
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-body"
        >
          Crafting immersive digital experiences through code and creativity
        </motion.p>

        {/* Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="p-4 glass rounded-2xl glow-pink-hover"
          >
            <Code2 className="w-8 h-8 text-[#ff6b9d]" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-4xl text-white/40"
          >
            ×
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: -360 }}
            transition={{ duration: 0.5 }}
            className="p-4 glass rounded-2xl glow-purple-hover"
          >
            <Gamepad2 className="w-8 h-8 text-[#9d4edd]" />
          </motion.div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton strength={0.5}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass rounded-full font-heading font-semibold text-white bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] hover:from-[#c44569] hover:to-[#7b2cbf] glow-pink-hover transition-all duration-300 flex items-center gap-2"
            >
              View My Work
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </MagneticButton>
          
          <MagneticButton strength={0.5}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScroll}
              className="px-8 py-4 glass rounded-full font-heading font-semibold text-white border-2 border-[#9d4edd]/50 hover:border-[#9d4edd] hover:bg-[#9d4edd]/10 glow-purple-hover transition-all duration-300 flex items-center gap-2"
            >
              Get In Touch
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="cursor-pointer"
          onClick={handleScroll}
        >
          <ArrowDown className="w-6 h-6 text-white/60 hover:text-white/90 transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}

