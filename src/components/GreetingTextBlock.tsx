import React from 'react';
import { motion } from 'motion/react';
import { ProfileData } from '../types';

interface GreetingTextBlockProps {
  profileData: ProfileData;
}

export const GreetingTextBlock: React.FC<GreetingTextBlockProps> = ({
  profileData
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 max-w-xl select-none"
    >
      <div className="flex flex-col gap-1.5 sm:gap-2.5 text-left">
        {/* Headline 1: "Hi..." */}
        <h1 className="liquid-glass-text text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug">
          {profileData.opener}
        </h1>

        {/* Headline 2: "Welcome to my Profile" */}
        <h1 className="liquid-glass-text text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug">
          {profileData.welcomeMessage}
        </h1>

        {/* Headline 3: "I'm Kishore J." */}
        <h1 className="liquid-glass-text text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug">
          I'm {profileData.name}
        </h1>
      </div>
    </motion.div>
  );
};


