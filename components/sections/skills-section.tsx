'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Gamepad2, Palette, Zap } from 'lucide-react';

interface SkillCategory {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  name: string;
  color: string;
  skills: {
    name: string;
    level: number;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    name: 'Languages',
    color: '#ff6b9d',
    skills: [
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 92 },
      { name: 'C#', level: 65 },
      { name: 'Python', level: 60 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    icon: Zap,
    name: 'Frameworks',
    color: '#9d4edd',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Three.js', level: 70 },
      { name: 'Framer Motion', level: 90 },
    ],
  },
  {
    icon: Gamepad2,
    name: 'Game Engines',
    color: '#00d9ff',
    skills: [
      { name: 'Unity', level: 85 },
      { name: 'Unreal Engine', level: 55 },
      { name: 'Godot', level: 50 },
    ],
  },
  {
    icon: Palette,
    name: 'Design Tools',
    color: '#ff6b9d',
    skills: [
      { name: 'Figma', level: 90 },
      { name: 'Blender', level: 65 },
      { name: 'Aseprite', level: 60 },
      { name: 'Photoshop', level: 80 },
    ],
  },
];

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="skills"
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
            Skills & Expertise
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-3xl p-6 glow-purple-hover transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-3 rounded-xl glass-light"
                  style={{ borderColor: category.color }}
                >
                  <category.icon
                    className="w-6 h-6"
                    style={{ color: category.color }}
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-white/80">
                        {skill.name}
                      </span>
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: category.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative h-2 glass-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${skill.level}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: 'easeOut',
                        }}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)`,
                          boxShadow: `0 0 10px ${category.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Radar Chart Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 glass rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-heading font-semibold text-white mb-6">
            Proficiency Overview
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div
                  className="w-24 h-24 rounded-full glass flex items-center justify-center flex-col gap-2 glow-pink-hover cursor-pointer"
                  style={{
                    borderColor: category.color,
                    boxShadow: `0 0 20px ${category.color}40`,
                  }}
                >
                  <category.icon
                    className="w-8 h-8"
                    style={{ color: category.color }}
                  />
                  <span
                    className="text-xs font-heading font-bold"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


