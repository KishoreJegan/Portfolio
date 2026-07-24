import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const DiveSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Snaps in split-second on section enter, holds, then dissolves
  const opacity = useTransform(scrollYProgress, [0, 0.01, 0.72, 0.92], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.01, 0.72, 0.92], [0.95, 1, 1, 1.05]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.01, 0.72, 0.92],
    ['blur(6px)', 'blur(0px)', 'blur(0px)', 'blur(18px)']
  );

  return (
    <div ref={containerRef} id="dive" className="relative h-[220vh] text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
        {/* Oceanic Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Floating Water Bubbles Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-200/20 backdrop-blur-sm border border-cyan-300/30"
              style={{
                width: `${10 + (i % 3) * 8}px`,
                height: `${10 + (i % 3) * 8}px`,
                left: `${18 + i * 14}%`,
                bottom: `-20px`
              }}
              animate={{
                y: ['0vh', '-90vh'],
                x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 7 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5
              }}
            />
          ))}
        </div>

        {/* Centered Big Bold Liquid Glass Headline that holds and then dissolves */}
        <motion.div
          style={{ opacity, scale, filter }}
          className="relative z-10 flex items-center justify-center text-center px-6"
        >
          <h2 className="liquid-glass-text text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-white select-none drop-shadow-[0_10px_35px_rgba(0,200,255,0.25)]">
            Dive with Me
          </h2>
        </motion.div>
      </div>
    </div>
  );
};
