import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const AboutMeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Entry: 0.0 -> 0.15 (comes smoothly from nothing as section 1 fades)
  // Pause/Hold: 0.15 -> 0.70 (stays 100% visible)
  // Exit: 0.70 -> 0.95 (smoothly vanishes)
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.70, 0.95], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.15, 0.70, 0.95], [0.88, 1, 1, 0.88]);
  const translateY = useTransform(smoothProgress, [0, 0.15, 0.70, 0.95], [40, 0, 0, -40]);
  const filter = useTransform(
    smoothProgress,
    [0, 0.15, 0.70, 0.95],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
  );
  const lineScaleY = useTransform(smoothProgress, [0.02, 0.15], [0, 1]);

  return (
    <div ref={containerRef} id="about-me" className="relative h-[220vh] bg-black text-white">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-start py-12 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-white/10">
        <motion.div
          style={{
            opacity,
            scale,
            y: translateY,
            filter
          }}
          className="relative z-10 w-full max-w-xl sm:max-w-2xl mr-auto ml-0 sm:ml-4 md:ml-12 lg:ml-20 flex flex-col items-start text-left"
        >
          {/* Combined Header in a Single Line */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
            <h2 className="liquid-glass-text text-2xl sm:text-3xl md:text-4xl font-light tracking-tight">
              About me
            </h2>
            <span className="text-white/40 text-xl sm:text-2xl font-extralight">—</span>
            <span className="liquid-glass-text text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white/85">
              AI / Software Developer
            </span>
          </div>

          {/* Description Emerging from Left Accent Line on Scroll */}
          <div className="relative pl-4 sm:pl-5">
            {/* Animated Left Line */}
            <motion.div
              style={{ scaleY: lineScaleY }}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white/80 via-white/40 to-white/10 origin-top rounded-full"
            />

            {/* Text Description */}
            <p className="text-white/85 text-sm sm:text-base md:text-lg font-light leading-snug sm:leading-normal tracking-wide">
              A recent Computer Science graduate who builds software with AI at its core. I've shipped real projects from an AI-powered SaaS platform to CLI Based LLM agent because I learn best by building. Curious, consistent, and always looking for the next opportunity to grow.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


