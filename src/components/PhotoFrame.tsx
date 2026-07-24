import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PhotoFrameProps {
  photoUrl: string;
  onUpdatePhoto: (newUrl: string) => void;
}

const PHOTOS = ['/profile1.png', '/profile2.png'];

export const PhotoFrame: React.FC<PhotoFrameProps> = ({ onUpdatePhoto }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle every 3.5s, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % PHOTOS.length;
        onUpdatePhoto(PHOTOS[next]);
        return next;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, onUpdatePhoto]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setRotateX((-(e.clientY - cy) / rect.height) * 16);
    setRotateY(((e.clientX - cx) / rect.width) * 16);
  };

  const handleClick = () => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % PHOTOS.length;
      onUpdatePhoto(PHOTOS[next]);
      return next;
    });
  };

  return (
    <div className="relative z-30 flex flex-col items-center flex-shrink-0 select-none -mt-4 sm:-mt-8">
      <motion.div
        animate={{ y: [0, -10, 0], rotateZ: [0, 0.6, -0.6, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        whileHover={{ scale: 1.03 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setRotateX(0); setRotateY(0); setIsHovered(false); }}
        onClick={handleClick}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out',
        }}
        className="relative w-[160px] h-[200px] sm:w-[190px] sm:h-[230px] rounded-2xl p-[10px] apple-3d-glass-frame shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden group cursor-pointer"
      >
        {/* Specular highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-2xl z-10" />

        {/* Photo — same structure as the original that worked */}
        <div className="relative w-full h-full rounded-xl overflow-hidden">
          <img
            key={activeIndex}
            src={PHOTOS[activeIndex]}
            alt={`Kishore Jegan — Photo ${activeIndex + 1}`}
            className="w-full h-full object-cover object-top pointer-events-none"
            style={{ animation: 'photoFadeIn 0.6s ease-in-out' }}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-40 group-hover:opacity-20 transition-opacity" />

          {/* Dot indicators */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); onUpdatePhoto(PHOTOS[i]); }}
                aria-label={`Photo ${i + 1}`}
                className="rounded-full focus:outline-none transition-all duration-300"
                style={{
                  width: i === activeIndex ? '16px' : '6px',
                  height: '6px',
                  background: i === activeIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                  boxShadow: i === activeIndex ? '0 0 6px rgba(255,255,255,0.7)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-center border border-white/10"
      >
        <p className="text-[11px] sm:text-xs font-normal text-white/80 tracking-wide">
          B.Sc CS with Data Analytics Graduate
        </p>
      </motion.div>
    </div>
  );
};
