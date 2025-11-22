'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Gamepad2 } from 'lucide-react';

const skills = [
  { name: 'TypeScript', level: 90, category: 'language' },
  { name: 'React', level: 95, category: 'framework' },
  { name: 'Next.js', level: 92, category: 'framework' },
  { name: 'Tailwind CSS', level: 88, category: 'framework' },
  { name: 'Unity', level: 85, category: 'game' },
  { name: 'C#', level: 80, category: 'language' },
  { name: 'Unreal Engine', level: 75, category: 'game' },
  { name: 'Blender', level: 82, category: 'design' },
  { name: 'Figma', level: 90, category: 'design' },
  { name: 'Three.js', level: 85, category: 'framework' },
];

const categories = [
  { icon: Code2, name: 'Languages', color: '#ff6b9d' },
  { icon: Zap, name: 'Frameworks', color: '#9d4edd' },
  { icon: Gamepad2, name: 'Game Engines', color: '#00d9ff' },
  { icon: Palette, name: 'Design Tools', color: '#ff6b9d' },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            A passionate developer bridging the gap between web experiences and interactive games
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative glass rounded-3xl p-8 glow-pink-hover">
              <div className="aspect-square rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#ff6b9d] via-[#9d4edd] to-[#00d9ff] p-1">
                <div className="w-full h-full rounded-2xl bg-[#1a1a2e] flex items-center justify-center">
                  <div className="text-6xl font-heading font-bold gradient-text">
                    KT
                  </div>
                </div>
              </div>
              
              {/* Floating badges */}
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          x: Math.cos((i * Math.PI * 2) / categories.length) * 60,
                          y: Math.sin((i * Math.PI * 2) / categories.length) * 60,
                        }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-full p-3"
                  style={{ borderColor: cat.color }}
                >
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass rounded-3xl p-6 lg:p-8">
              <p className="text-white/90 font-body text-lg leading-relaxed mb-4">
                I'm a <span className="gradient-text-pink font-semibold">Frontend Developer</span> and{' '}
                <span className="text-[#9d4edd] font-semibold">Game Designer</span> with a passion for creating
                immersive digital experiences.
              </p>
              <p className="text-white/80 font-body leading-relaxed mb-4">
                My journey spans from crafting pixel-perfect web interfaces to designing engaging game mechanics
                that keep players coming back. I believe in the power of{' '}
                <span className="text-[#00d9ff] font-semibold">interactive storytelling</span> and strive to blend
                technical excellence with creative vision.
              </p>
              <p className="text-white/80 font-body leading-relaxed">
                When I'm not coding, you'll find me experimenting with new game engines, contributing to open-source
                projects, or exploring the latest trends in web technologies.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skill Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-white mb-6 text-center">
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="glass rounded-full px-4 py-2 font-body text-sm font-medium text-white border border-white/10 hover:border-[#9d4edd]/50 glow-purple-hover transition-all duration-300 relative group cursor-pointer"
              >
                {skill.name}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: `${skill.level}%` }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


