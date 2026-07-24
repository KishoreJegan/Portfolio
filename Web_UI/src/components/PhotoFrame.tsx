import React, { useState } from 'react';
import { Camera, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface PhotoFrameProps {
  photoUrl: string;
  onUpdatePhoto: (newUrl: string) => void;
}

const DEMO_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop'
];

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  photoUrl,
  onUpdatePhoto
}) => {
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setRotateX((-mouseY / rect.height) * 16);
    setRotateY((mouseX / rect.width) * 16);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const cycleAvatar = () => {
    const currentIndex = DEMO_AVATARS.indexOf(photoUrl);
    const nextIndex = (currentIndex + 1) % DEMO_AVATARS.length;
    onUpdatePhoto(DEMO_AVATARS[nextIndex]);
  };

  return (
    <div className="relative z-30 flex flex-col items-center flex-shrink-0 select-none -mt-4 sm:-mt-8">
      {/* 3D Floating Glass Frame */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotateZ: [0, 0.6, -0.6, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.03 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s ease-out'
        }}
        className="relative w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] rounded-2xl p-2.5 apple-3d-glass-frame shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden group"
      >
        {/* Specular Liquid Glass Top Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none rounded-t-2xl" />

        {/* Inner Photo Container - Borderless */}
        <div className="relative w-full h-full rounded-xl overflow-hidden group/photo">
          <img
            src={photoUrl}
            alt="Kishore J. Profile"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105 pointer-events-none"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 opacity-40 group-hover/photo:opacity-20 transition-opacity" />

          {/* Minimal Hover Action Overlay */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover/photo:opacity-100 transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                cycleAvatar();
              }}
              className="p-1.5 rounded-full bg-black/70 hover:bg-white hover:text-black text-white backdrop-blur-md transition-all shadow-md"
              title="Cycle portrait photo"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPhotoPicker(!showPhotoPicker);
              }}
              className="p-1.5 rounded-full bg-black/70 hover:bg-white hover:text-black text-white backdrop-blur-md transition-all shadow-md"
              title="Custom Image URL"
            >
              <Camera className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Details Under the Frame */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-3 px-3 py-1 rounded-full bg-white/5 backdrop-blur-md text-center border border-white/10"
      >
        <p className="text-[11px] sm:text-xs font-normal text-white/80 tracking-wide">
          B.Sc Cs with Data Analytics Graduate
        </p>
      </motion.div>

      {/* Custom Photo URL Input Popup */}
      {showPhotoPicker && (
        <div className="absolute top-full left-0 mt-3 w-64 p-3 rounded-xl bg-black/95 backdrop-blur-xl border border-white/20 shadow-2xl z-50 text-white animate-in fade-in duration-200">
          <div className="text-xs font-medium text-white/80 mb-2 flex justify-between items-center">
            <span>Custom Photo URL</span>
            <button
              onClick={() => setShowPhotoPicker(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste image URL..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white"
            />
            <button
              onClick={() => {
                if (customInput.trim()) {
                  onUpdatePhoto(customInput.trim());
                  setShowPhotoPicker(false);
                  setCustomInput('');
                }
              }}
              className="px-3 py-1.5 bg-white text-black font-semibold text-xs rounded-lg transition-colors hover:bg-white/90"
            >
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


