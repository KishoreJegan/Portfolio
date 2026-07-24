import React, { useState, useEffect } from 'react';
import { MapPin, Sliders, Send } from 'lucide-react';

interface HeaderNavigationProps {
  onToggleInspector: () => void;
  isInspectorOpen: boolean;
  statusText: string;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  onToggleInspector,
  isInspectorOpen,
  statusText
}) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
      {/* Brand & Live Badge */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="apple-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-white transition-all hover:bg-white/20 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-semibold tracking-wide text-white">Kishore J.</span>
          <span className="text-white/30">|</span>
          <span className="text-white/80 font-mono hidden sm:inline">{statusText}</span>
        </div>
      </div>

      {/* Center Widget: Location & Time */}
      <div className="hidden md:flex pointer-events-auto items-center gap-3">
        <div className="apple-glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2.5 text-xs text-white">
          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>San Francisco, CA</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="font-mono text-white/90">
            {timeString || '10:42 AM'}
          </div>
        </div>
      </div>

      {/* Right Actions & Glass Inspector Toggle */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={onToggleInspector}
          className={`apple-glass-pill p-2 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium transition-all ${
            isInspectorOpen
              ? 'bg-white/20 text-white border-white/40 shadow-lg'
              : 'text-white/80 hover:bg-white/15 hover:text-white'
          }`}
          title="Inspect Glassmorphism Properties"
        >
          <Sliders className="w-3.5 h-3.5 text-white" />
          <span className="hidden sm:inline">Glass Inspector</span>
        </button>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            alert("Thanks for reaching out! You can email Kishore directly at kishorejegan.79@gmail.com");
          }}
          className="px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-black bg-white hover:bg-white/90 transition-all shadow-md"
        >
          <Send className="w-3.5 h-3.5 text-black" />
          <span>Get in touch</span>
        </a>
      </div>
    </header>
  );
};

