'use client';

import { LoadingScreen } from '@/components/loading-screen';
import { CursorTrail } from '@/components/cursor-trail';
import { FloatingParticles } from '@/components/floating-particles';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { SkillsSection } from '@/components/sections/skills-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ContactSection } from '@/components/sections/contact-section';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen">
      {isLoading && <LoadingScreen />}
      <CursorTrail />
      <FloatingParticles count={30} />
      <Navigation />
      
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />

      {/* Footer */}
      <footer className="relative py-12 px-4 md:px-8 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 font-body text-sm">
            © {new Date().getFullYear()} Khang Thuan. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </footer>
    </main>
  );
}
