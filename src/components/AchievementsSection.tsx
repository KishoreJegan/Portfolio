import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Award, ExternalLink, ArrowLeft, FileText, X } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for Achievements section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Headline scroll animations
  const titleY = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [-40, 0, 0, -20]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.82, 0.95], [0, 1, 1, 0]);

  // Circle Tab 3D Revolving / Floating Liquid Glass Slab Effects
  // Entry: 0.0 -> 0.25 | Center Pause: 0.25 -> 0.70 | Exit: 0.70 -> 0.95
  const slabX = useTransform(scrollYProgress, [0, 0.25, 0.70, 0.95], ['20vw', '0vw', '0vw', '-20vw']);
  const slabRotateY = useTransform(scrollYProgress, [0, 0.25, 0.70, 0.95], [35, 0, 0, -35]);
  const slabScale = useTransform(scrollYProgress, [0, 0.25, 0.70, 0.95], [0.75, 1.0, 1.0, 0.75]);
  const slabOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.70, 0.90, 0.95], [0, 0.5, 1, 1, 0.5, 0]);
  const slabFilter = useTransform(
    scrollYProgress,
    [0, 0.25, 0.70, 0.95],
    ['blur(16px)', 'blur(0px)', 'blur(0px)', 'blur(20px)']
  );
  const pointerEvents = useTransform(scrollYProgress, [0, 0.20, 0.75, 0.95], ['none', 'auto', 'auto', 'none']);

  return (
    <div ref={containerRef} id="achievements" className="relative h-[320vh] text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-12 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-white/10">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none" />

        {/* Section Header */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-20 pt-4"
        >
          <h2 className="liquid-glass-text text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Achievements
          </h2>
        </motion.div>

        {/* 3D Liquid Glass Circle Tab */}
        <div className="relative w-full max-w-2xl mx-auto my-auto flex items-center justify-center min-h-[340px] z-10 [perspective:1200px]">
          <motion.div
            style={{
              x: slabX,
              rotateY: slabRotateY,
              scale: slabScale,
              opacity: slabOpacity,
              filter: slabFilter,
              pointerEvents: pointerEvents as any,
              transformStyle: 'preserve-3d'
            }}
            className="flex items-center justify-center w-full"
          >
            {/* Pure Glass Circle Tab */}
            <div
              onClick={() => setIsExpanded(true)}
              className="group relative cursor-pointer flex items-center justify-center"
            >
              {/* Subtle Ambient Ring */}
              <div className="absolute -inset-4 rounded-full bg-white/[0.04] blur-2xl group-hover:bg-white/[0.1] transition-all duration-500 pointer-events-none" />

              {/* Circular Glassmorphic Container Card */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-6 backdrop-blur-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.35)] flex flex-col items-center justify-center text-center group-hover:scale-105">
                {/* Top Specular Arc */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                {/* Icon */}
                <div className="p-3.5 rounded-full bg-white/10 border border-white/20 text-white mb-3 group-hover:bg-white/20 transition-colors duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                  <Award className="w-8 h-8 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight mb-1">
                  GSoC 2026 Participant
                </h3>

                <span className="text-[11px] font-mono tracking-wider text-white/50 uppercase mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
                  Click to view proposal
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* EXPANDED MODAL: Content Box with Proposal Info */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Glass Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl text-left p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-white/[0.06] border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.4)] z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Top Specular Highlight */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 text-white/70 hover:text-white transition-all duration-200"
                title="Close proposal info"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Badge Header */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold mb-5 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-white" />
                <span>GSoC 2026 Participant</span>
              </div>

              {/* Proposal Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug mb-6 pr-8">
                API Dash (foss42) — Google Summer of Code 2026 Technical Proposal 2026
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-4 text-xs sm:text-sm text-white/80 font-light leading-relaxed mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-white/40 font-mono text-sm leading-tight mt-0.5">●</span>
                  <span>
                    Authored a GSoC 2026 design proposal for API Dash, a 7-layer API Explorer architecture spanning multi-source ingestion, LLM-based enrichment, and full-text search, based on an end-to-end study of the existing codebase (Riverpod, <code className="text-white/90 bg-white/10 px-1 py-0.5 rounded text-[11px]">lib/providers</code>, <code className="text-white/90 bg-white/10 px-1 py-0.5 rounded text-[11px]">lib/services</code>, <code className="text-white/90 bg-white/10 px-1 py-0.5 rounded text-[11px]">lib/importer</code>).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 font-mono text-sm leading-tight mt-0.5">●</span>
                  <span>
                    Refined the proposed LLM Enrichment Engine (auto-tagging, summarization, security-flag detection) and a Completeness Scoring and Moderation Engine design over several review cycles with two GSoC mentors and a Google Developer Expert.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/40 font-mono text-sm leading-tight mt-0.5">●</span>
                  <span>
                    Documented the proposal with an architecture overview, API reference outline, and a CI/CD and Docker deployment plan for evaluation by the API Dash core team.
                  </span>
                </li>
              </ul>

              {/* Action Row: Link & Back Button */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="https://github.com/KishoreJegan/apidash/blob/main/doc/proposals/2026/gsoc/GSoC2026_KishoreJ_APIExplorer_Proposal.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
                >
                  <FileText className="w-4 h-4 text-black" />
                  <span>View Technical Proposal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black/70" />
                </a>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 text-white/60" />
                  <span>Back</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};



