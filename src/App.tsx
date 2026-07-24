import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { PhotoFrame } from './components/PhotoFrame';
import { GreetingTextBlock } from './components/GreetingTextBlock';
import { AboutMeSection } from './components/AboutMeSection';
import { ProjectsSection } from './components/ProjectsSection';
import { DiveSection } from './components/DiveSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ProfileData } from './types';

const DEFAULT_PROFILE: ProfileData = {
  name: 'Kishore.J',
  opener: 'Hi...',
  welcomeMessage: 'Welcome to my Profile',
  title: 'B.Sc CS with Data Analytics Graduate',
  location: 'San Francisco, CA',
  status: 'Available for work',
  photoUrl: '/profile1.png',
  bio: '',
  skills: []
};

export default function App() {
  const [profileData, setProfileData] = useState<ProfileData>(DEFAULT_PROFILE);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.85], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.85], [1, 0.85]);
  const heroY = useTransform(smoothProgress, [0, 0.85], [0, -60]);
  const heroFilter = useTransform(smoothProgress, [0, 0.85], ['blur(0px)', 'blur(16px)']);

  return (
    <div className="relative w-full text-white select-none font-sans">
      {/* Smooth Scroll Frame-Scrub Background Canvas */}
      <BackgroundCanvas />

      {/* Navigation Header removed */}

      {/* Hero Section with Sticky Track for Smooth & Slow Scrolling */}
      <div ref={heroRef} className="relative h-[160vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 overflow-hidden">
          <motion.div
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
              filter: heroFilter
            }}
            className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center md:justify-start md:-translate-x-8 lg:-translate-x-14 gap-6 sm:gap-10 md:gap-12 my-auto"
          >
            {/* 3D Floating Photo Frame */}
            <div className="flex-shrink-0">
              <PhotoFrame
                photoUrl={profileData.photoUrl}
                onUpdatePhoto={(newUrl) =>
                  setProfileData((prev) => ({ ...prev, photoUrl: newUrl }))
                }
              />
            </div>

            {/* Liquid Glass Text Block */}
            <GreetingTextBlock profileData={profileData} />
          </motion.div>
        </div>
      </div>

      {/* About Me Section */}
      <AboutMeSection />

      {/* My Projects Section */}
      <ProjectsSection />

      {/* Dive with Me Section */}
      <DiveSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Contact Section */}
      <ContactSection />


    </div>
  );
}
