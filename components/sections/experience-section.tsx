'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, Code2, Gamepad2 } from 'lucide-react';

interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'frontend' | 'game';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Frontend Developer Trainee',
    company: 'WHISKY',
    location: 'Thu Duc, Ho Chi Minh City',
    period: 'August 2023 - December 2023',
    description: [
      'Built frontend interfaces using React',
      'Learned software business development processes',
      'Gained practical React development experience',
    ],
    type: 'frontend',
    icon: Code2,
  },
  {
    id: 2,
    role: 'Level Designer',
    company: 'Wolffun',
    location: 'Ho Chi Minh City',
    period: 'April 2025 - July 2025',
    description: [
      "Designed levels based on core game mechanics",
      "Managed level production pipeline",
      "Conducted playtesting and iteration cycles",
      "Analyzed player data to optimize level balance"
    ],
    type: 'game',
    icon: Gamepad2,
  },
  {
    id: 3,
    role: 'Game Designer',
    company: 'TrippleQ',
    location: 'Ho Chi Minh City',
    period: 'August 2025 - September 2025',
    description: [
      "Developed and refined core gameplay loop",
      "Designed game feel and player sensation",
      "Shipped complete product to Google Play Store"
    ],
    type: 'game',
    icon: Gamepad2,
  },
  {
    id: 4,
    role: 'Freelance Developer & Designer',
    company: 'Self-Employed',
    location: 'Ho Chi Minh City',
    period: 'October 2025 - Present',
    description: [
      "Developing personal projects",
      "Combining frontend and game design skills",
      "Exploring new technologies and frameworks"
    ],
    type: 'game',
    icon: Gamepad2,
  },
];

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text mb-4">
            Experience
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-body">
            My professional journey in web development and game design
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line - Centered */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff6b9d] via-[#9d4edd] to-[#00d9ff] transform md:-translate-x-1/2 z-0" />

          {/* Experience Items */}
          <div className="relative space-y-8 md:space-y-16 z-10">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const color = exp.type === 'frontend' ? '#ff6b9d' : '#9d4edd';
              const isEven = index % 2 === 0;
              // Alternate: even index = left side, odd index = right side

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative flex items-start md:items-center gap-4 md:gap-0"
                >
                  {/* Left Side Content (Even Index) */}
                  {isEven && (
                    <>
                      {/* Date Pill - On the right side of timeline */}
                      <div className="hidden md:block absolute left-1/2 top-0 translate-x-4 z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] text-white font-body text-sm font-semibold whitespace-nowrap"
                        >
                          {exp.period}
                        </motion.div>
                      </div>
                      
                      {/* Icon - Left side of timeline */}
                      <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 z-30">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#9d4edd] flex items-center justify-center border-4 border-[#0a0a1a]"
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>

                      {/* Content Card - Left side */}
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative z-20 w-full md:w-[calc(50%-3rem)] md:mr-auto glass rounded-2xl p-6 md:p-8 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3 md:hidden">
                          {/* Mobile Icon */}
                          <div
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#9d4edd] flex items-center justify-center"
                            style={{ borderColor: color }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {/* Mobile Date */}
                          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] text-white font-body text-sm font-semibold">
                            {exp.period}
                          </div>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-white/70 font-body mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 font-body text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>

                        {/* Description Items */}
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.2 + itemIndex * 0.1,
                              }}
                              className="flex items-start gap-3 text-white/80 font-body leading-relaxed"
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Category Badge */}
                        <div className="mt-4 inline-block">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wide glass-light border"
                            style={{ borderColor: color, color }}
                          >
                            {exp.type === 'frontend' ? 'Web Development' : 'Game Design'}
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* Right Side Content (Odd Index) */}
                  {!isEven && (
                    <>
                      {/* Date Pill - On the left side of timeline */}
                      <div className="hidden md:block absolute left-1/2 top-0 -translate-x-[calc(100%+1rem)] z-20">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] text-white font-body text-sm font-semibold whitespace-nowrap"
                        >
                          {exp.period}
                        </motion.div>
                      </div>
                      
                      {/* Icon - Right side of timeline */}
                      <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 z-30">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : { scale: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#9d4edd] flex items-center justify-center border-4 border-[#0a0a1a]"
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>

                      {/* Content Card - Right side */}
                      <motion.div
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="relative z-20 w-full md:w-[calc(50%-3rem)] md:ml-auto glass rounded-2xl p-6 md:p-8 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3 md:hidden">
                          {/* Mobile Icon */}
                          <div
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#9d4edd] flex items-center justify-center"
                            style={{ borderColor: color }}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {/* Mobile Date */}
                          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff6b9d] to-[#9d4edd] text-white font-body text-sm font-semibold">
                            {exp.period}
                          </div>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-white/70 font-body mb-2">
                          <Briefcase className="w-4 h-4" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 font-body text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>

                        {/* Description Items */}
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: 20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.2 + itemIndex * 0.1,
                              }}
                              className="flex items-start gap-3 text-white/80 font-body leading-relaxed"
                            >
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Category Badge */}
                        <div className="mt-4 inline-block">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wide glass-light border"
                            style={{ borderColor: color, color }}
                          >
                            {exp.type === 'frontend' ? 'Web Development' : 'Game Design'}
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

