import React, { useEffect, useState, useRef } from 'react';

const TOTAL_FRAMES = 1868;
const LERP_FACTOR = 0.10;   // Smoothing factor (lower = smoother, higher = snappier)
const BATCH_SIZE = 40;      // Images loaded in parallel per batch

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const framesRef = useRef<HTMLImageElement[]>(new Array(TOTAL_FRAMES));
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Helper to format frame path
  const framePath = (i: number) => {
    return `/animation/frame-${String(i + 1).padStart(4, '0')}.webp`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handles viewport sizing and aspect-ratio covering
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(currentFrameRef.current));
    };

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || !img.naturalWidth) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Equivalent to object-fit: cover
      const scale = Math.max(cw / iw, ch / ih);
      const dx = (cw - iw * scale) / 2;
      const dy = (ch - ih * scale) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
    };

    // Smooth render loop with linear interpolation (lerp)
    const renderLoop = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * LERP_FACTOR;
      const idx = Math.min(Math.max(Math.round(currentFrameRef.current), 0), TOTAL_FRAMES - 1);
      drawFrame(idx);
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    // Update target frame based on document scroll progress
    const onScroll = () => {
      const scrollTop = window.scrollY;
      // Scroll range: start animating from the very first scroll pixel,
      // complete all frames by 80% of total scroll so animation stays
      // active throughout hero + content sections
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      // Map to 0→1 across the full page (animation drives through all sections)
      const progress = Math.min(Math.max(scrollTop / (docHeight * 0.88), 0), 1);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    // Batched image loader to prevent network congestion
    let count = 0;
    const loadBatch = (startIdx: number) => {
      if (startIdx >= TOTAL_FRAMES) return;
      const end = Math.min(startIdx + BATCH_SIZE, TOTAL_FRAMES);

      for (let i = startIdx; i < end; i++) {
        const img = new Image();
        img.src = framePath(i);
        
        img.onload = img.onerror = () => {
          count++;
          setLoadedCount(count);

          if (count === 1) {
            currentFrameRef.current = 0;
            drawFrame(0);
          }

          if (count === TOTAL_FRAMES) {
            setIsLoaded(true);
            rafRef.current = requestAnimationFrame(renderLoop);
          }

          // Trigger next batch once this batch is finished loading
          if (i === end - 1) {
            loadBatch(end);
          }
        };

        framesRef.current[i] = img;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', onScroll, { passive: true });

    loadBatch(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const percentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Preloading Overlay screen */}
      <div 
        className="fixed inset-0 z-[100] bg-[#050507] flex items-center justify-center transition-opacity duration-700 ease-out"
        style={{ 
          opacity: isLoaded ? 0 : 1, 
          pointerEvents: isLoaded ? 'none' : 'auto',
          visibility: isLoaded ? 'hidden' : 'visible'
        }}
      >
        <div className="flex flex-col items-center gap-[14px] w-[240px]">
          <p className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-white/50">Loading</p>
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-150"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[0.7rem] font-semibold text-white/35 tracking-[0.1em]">{percentage}%</p>
        </div>
      </div>

      {/* Fixed Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
      />
    </>
  );
};
