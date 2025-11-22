'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Code2, Gamepad2, Smartphone } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'frontend' | 'game';
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  playStore?: string;
  role?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Siege of HQ',
    description: 'A tactical card game where players fight to protect their HQ using cards as logic commands and Ultimates in the form of Sigils. Strategic gameplay meets turn-based combat.',
    category: 'frontend',
    tags: ['HTML5', 'JavaScript', 'Game Design', 'Tactical Game', 'Card Game'],
    image: '/Siege of HQ.webp',
    link: 'https://kenthuan129.github.io/tcg-logic-battle/',
    featured: true,
  },
  {
    id: 2,
    title: 'Word Battle',
    description: 'Battle in English vocabulary as you fight to checkmate your enemy in this crossword-style word building battle. Build words strategically to defeat opponents.',
    category: 'frontend',
    tags: ['HTML5', 'JavaScript', 'Word Game', 'Crossword', 'Battle Game'],
    image: '/Word Battle.webp',
    link: 'https://kenthuan129.github.io/word-battle/',
    featured: true,
  },
  {
    id: 3,
    title: 'Bear Knit',
    description: 'A match-block puzzle game that requires you to knit all the bears before time runs out. Features engaging level design and addictive gameplay mechanics.',
    category: 'game',
    tags: ['Unity', 'Mobile Game', 'Level Design', 'Puzzle Game', 'Match-3'],
    image: '/Bear Knit.webp',
    playStore: 'https://play.google.com/store/apps/details?id=com.puzzle.bearknit&pcampaignid=web_share',
    role: 'Level Design Lead',
  },
  {
    id: 4,
    title: 'Water Out',
    description: 'A connect-the-blocks puzzle game where your main objective is to align blocks with the same color forming a line. Strategic puzzle-solving meets colorful gameplay.',
    category: 'game',
    tags: ['Unity', 'Mobile Game', 'Game Design', 'Puzzle Game', 'Color Matching'],
    image: '/Water Out.webp',
    playStore: 'https://play.google.com/store/apps/details?id=com.puzzle.colorpipe&pcampaignid=web_share',
    role: 'Game Designer',
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<'all' | 'frontend' | 'game'>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            A collection of my recent work in web development and game design
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {(['all', 'frontend', 'game'] as const).map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 glass rounded-full font-heading font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] text-white glow-pink-hover'
                  : 'text-white/70 hover:text-white hover:border-[#9d4edd]/50'
              } border ${
                filter === cat ? 'border-transparent' : 'border-white/10'
              }`}
            >
              {cat === 'all' ? 'All Projects' : cat === 'frontend' ? 'Web Dev' : 'Game Design'}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid - Dynamic pattern: 2, 2, 3, 2, 2, 3... */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {filteredProjects.map((project, index) => {
            // Pattern: 2, 2, 3, 2, 2, 3... (repeats every 7 items)
            // Pattern structure per cycle:
            // - Items 0-1: Row of 2 (item 0 spans 2 cols, item 1 spans 1 col)
            // - Items 2-3: Row of 2 (item 2 spans 2 cols, item 3 spans 1 col)
            // - Items 4-6: Row of 3 (items 4, 5, 6 each span 1 col)
            // - Repeat...
            
            const cyclePosition = index % 7;
            let colSpan = '';
            let mdColSpan = '';
            
            // Determine column span based on pattern position
            if (cyclePosition === 0 || cyclePosition === 2) {
              // First item in a 2-item row - spans 2 columns
              colSpan = 'lg:col-span-2';
              mdColSpan = 'md:col-span-2';
            } else if (cyclePosition === 1 || cyclePosition === 3 || cyclePosition === 4 || cyclePosition === 5 || cyclePosition === 6) {
              // Second item in 2-item row or any item in 3-item row - spans 1 column
              colSpan = '';
              mdColSpan = '';
            }
            
            // Check if item is featured for styling purposes
            const isFeatured = project.featured;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group glass rounded-3xl overflow-hidden cursor-pointer glow-purple-hover transition-all duration-300 ${mdColSpan} ${colSpan}`}
              >
                {/* Project Image */}
                <div className={`relative overflow-hidden ${isFeatured ? 'h-64 md:h-72 lg:h-80' : 'h-48 md:h-56 lg:h-64'}`}>
                  {/* Project Image */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes={isFeatured ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    priority={index < 2}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b9d]/10 via-[#9d4edd]/10 to-[#00d9ff]/10" />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 glass-light rounded-full px-3 py-1.5 text-xs font-heading font-semibold uppercase tracking-wide z-10">
                    {project.category === 'frontend' ? (
                      <span className="text-[#ff6b9d]">Web Dev</span>
                    ) : (
                      <span className="text-[#9d4edd]">Game Design</span>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className={`p-6 space-y-4 ${isFeatured ? 'md:p-8' : ''}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className={`${isFeatured ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'} font-heading font-bold text-white group-hover:gradient-text transition-all duration-300`}>
                      {project.title}
                    </h3>
                  </div>
                  {project.role && (
                    <p className={`text-[#00d9ff] font-body font-semibold ${isFeatured ? 'text-sm md:text-base' : 'text-xs md:text-sm'} mb-2`}>
                      Role: {project.role}
                    </p>
                  )}
                  <p className={`text-white/70 font-body leading-relaxed ${isFeatured ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 glass-light rounded-full text-xs font-body text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2 flex-wrap">
                    {project.link && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-[#00d9ff] hover:text-[#ff6b9d] transition-colors font-body text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Play Game
                      </motion.a>
                    )}
                    {project.playStore && (
                      <motion.a
                        href={project.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-[#ff6b9d] hover:text-[#9d4edd] transition-colors font-body text-sm font-medium"
                      >
                        <Smartphone className="w-4 h-4" />
                        Play Store
                      </motion.a>
                    )}
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-body text-sm font-medium"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

