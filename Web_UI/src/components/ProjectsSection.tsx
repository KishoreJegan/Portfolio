import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Sparkles, X, ExternalLink, Github, Bot, Rocket, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types';

const PROJECTS: ProjectItem[] = [
  {
    id: 'oiradar-saas',
    title: 'OIRadar — AI-Powered SaaS Platform for NSE Option Chain Analysis',
    subtitle: '2026 – Present',
    category: 'AI SaaS & Financial Tech',
    description:
      'Sole developer of OIRadar, an AI-powered SaaS product in active development for NSE NIFTY option-chain analysis, built as a Chrome Extension frontend on a Python/FastAPI backend with Cohere LLM integration for natural-language market querying.',
    highlights: [
      'Sole developer of OIRadar for NSE NIFTY option-chain analysis with Cohere LLM & FastAPI backend',
      'Automated real-time NSE data collection with Playwright feeding 3-min refresh & 15-min aggregation reports into Sheets/Excel',
      'Shaped feature roadmap towards Razorpay commercial launch based on trader research across Reddit, Kite Connect, & TradingQnA'
    ],
    tags: ['Python', 'FastAPI', 'Chrome Extension', 'Cohere LLM', 'Playwright', 'Google Sheets API', 'Razorpay'],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'python-ai-agent',
    title: 'Python Smart AI Agent — Autonomous LLM Agent with Tool-Use',
    subtitle: 'Python, LangChain, LangGraph, Llama 3, Groq API',
    category: 'Autonomous Systems & AI Agents',
    description:
      'Built an autonomous agent on Llama 3 via the Groq API, combining LangChain and LangGraph for multi-step reasoning with real-time DuckDuckGo search tool-use and persistent conversation memory, so the agent plans, executes, and self-evaluates tasks without human intervention.',
    highlights: [
      'Built autonomous agent on Llama 3 via Groq API with LangChain & LangGraph for multi-step reasoning',
      'Real-time DuckDuckGo search tool-use and persistent conversation memory for autonomous execution'
    ],
    tags: ['Python', 'LangChain', 'LangGraph', 'Llama 3', 'Groq API', 'DuckDuckGo Search'],
    demoUrl: '#',
    githubUrl: '#'
  }
];

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>(PROJECTS[0].id);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Headline scroll animations: Emerges smoothly from top and STOPS near top (fades out in place without sliding down)
  const titleY = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [-40, 0, 0, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06, 0.92, 0.98], [0, 1, 1, 0]);

  // FIRST TAB (Right / Bot Project):
  // Orbits in tidally from the RIGHT (42° rotateY -> 0° front facing at center) -> Holds in center -> Orbits out LEFT (-42° rotateY & dissolves)
  const rightSlabX = useTransform(
    scrollYProgress,
    [0, 0.05, 0.24, 0.40, 0.48],
    ['35vw', '35vw', '0vw', '0vw', '-35vw']
  );
  const rightSlabRotateY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.24, 0.40, 0.48],
    [42, 42, 0, 0, -42]
  );
  const rightSlabOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.14, 0.24, 0.40, 0.48],
    [0, 0, 0.5, 1, 1, 0]
  );
  const rightSlabScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.24, 0.40, 0.48],
    [0.72, 0.72, 1.0, 1.0, 0.72]
  );
  const rightSlabFilter = useTransform(
    scrollYProgress,
    [0, 0.05, 0.24, 0.40, 0.48],
    ['blur(20px)', 'blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(24px)']
  );
  const rightSlabPointerEvents = useTransform(
    scrollYProgress,
    [0, 0.05, 0.42, 0.48],
    ['none', 'auto', 'auto', 'none']
  );

  // PAUSE BETWEEN TABS: From 0.48 to 0.58, screen remains empty before second tab emerges

  // SECOND TAB (Left / Rocket Project):
  // Orbits in tidally from the LEFT (-42° rotateY -> 0° front facing at center) -> Holds in center -> Orbits out RIGHT (42° rotateY & dissolves)
  const leftSlabX = useTransform(
    scrollYProgress,
    [0, 0.58, 0.72, 0.88, 0.96],
    ['-35vw', '-35vw', '0vw', '0vw', '35vw']
  );
  const leftSlabRotateY = useTransform(
    scrollYProgress,
    [0, 0.58, 0.72, 0.88, 0.96],
    [-42, -42, 0, 0, 42]
  );
  const leftSlabOpacity = useTransform(
    scrollYProgress,
    [0, 0.58, 0.64, 0.72, 0.88, 0.96],
    [0, 0, 0.5, 1, 1, 0]
  );
  const leftSlabScale = useTransform(
    scrollYProgress,
    [0, 0.58, 0.72, 0.88, 0.96],
    [0.72, 0.72, 1.0, 1.0, 0.72]
  );
  const leftSlabFilter = useTransform(
    scrollYProgress,
    [0, 0.58, 0.72, 0.88, 0.96],
    ['blur(20px)', 'blur(20px)', 'blur(0px)', 'blur(0px)', 'blur(24px)']
  );
  const leftSlabPointerEvents = useTransform(
    scrollYProgress,
    [0, 0.58, 0.90, 0.96],
    ['none', 'auto', 'auto', 'none']
  );

  const handleOpenModal = (project: ProjectItem) => {
    setActiveTabId(project.id);
    setSelectedProject(project);
  };

  // Reusable Vertical 3D Liquid Glass Wall Slab Component (Floating in air)
  const GlassWallSlab = ({
    project,
    icon: Icon,
    isNearer,
    floatDelay = 0
  }: {
    project: ProjectItem;
    icon: any;
    isNearer: boolean;
    floatDelay?: number;
  }) => (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 6.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: floatDelay
      }}
      whileHover={{ scale: 1.05, y: -14 }}
      onClick={() => handleOpenModal(project)}
      className="group relative cursor-pointer select-none w-[240px] sm:w-[260px] md:w-[275px]"
    >
      {/* Outer Ambient Glow behind tab */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Vertical 3D Liquid Glass Wall Slab Container */}
      <div
        className={`relative flex flex-col justify-between h-[340px] sm:h-[360px] p-5 sm:p-6 rounded-3xl backdrop-blur-2xl border transition-all duration-300 ${
          isNearer
            ? 'bg-white/[0.06] border-white/30 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.45)] group-hover:border-white/60 group-hover:bg-white/[0.12]'
            : 'bg-white/[0.04] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] group-hover:border-white/45 group-hover:bg-white/[0.10]'
        }`}
      >
        {/* Top Liquid Specular Highlight Line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* Header Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-semibold tracking-wider text-white/90 uppercase shadow-inner">
              <Icon className="w-3 h-3 text-white/90" />
              <span>Project</span>
            </div>
            <span className="text-[10px] font-light text-white/50 tracking-wider uppercase group-hover:text-amber-200 transition-colors">
              {project.category.split('&')[0]}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="liquid-glass-text text-lg sm:text-xl font-bold tracking-tight text-white mb-2 leading-snug group-hover:text-amber-100 transition-colors">
            {project.title}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-3 mb-4">
            {project.subtitle}
          </p>
        </div>

        {/* Highlights Preview Chips */}
        <div className="space-y-1.5 my-2">
          {project.highlights.slice(0, 2).map((hl, idx) => (
            <div
              key={idx}
              className="text-[10px] text-white/80 font-light bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 truncate"
            >
              • {hl}
            </div>
          ))}
        </div>

        {/* Bottom CTA Row: "Click to know" */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white/80 group-hover:text-white">
          <span className="tracking-wide">Click to know</span>
          <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/30 group-hover:translate-x-1 transition-all">
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      {/* Floating Floor Shadow */}
      <div className="w-2/3 mx-auto h-3 bg-white/5 rounded-full blur-lg -mt-1 opacity-50 group-hover:opacity-90 group-hover:scale-110 transition-all" />
    </motion.div>
  );

  return (
    <div ref={containerRef} id="projects" className="relative h-[650vh] bg-black text-white">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center py-10 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-white/10">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />

        {/* TOP MIDDLE: "My Projects" Title in 3D Glassmorphism - Docks near top */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center text-center z-20 pt-2"
        >
          {/* Strong, Bold Headline WITHOUT frame */}
          <h2 className="liquid-glass-text text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight">
            My Projects
          </h2>
        </motion.div>

        {/* MAIN CONTENT: Centered Floating 3D Liquid Glass Slabs with 3D Tidal Revolution */}
        <div className="relative w-full max-w-md mx-auto my-auto py-2 px-4 flex items-center justify-center min-h-[360px] sm:min-h-[380px] z-10 [perspective:1200px]">
          {/* First Tab (Bot Project): Revolves tidally from Right -> Center (0° flat) -> Revolves out Left & dissolves */}
          <motion.div
            style={{
              x: rightSlabX,
              rotateY: rightSlabRotateY,
              scale: rightSlabScale,
              opacity: rightSlabOpacity,
              filter: rightSlabFilter,
              pointerEvents: rightSlabPointerEvents as any,
              transformStyle: 'preserve-3d'
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <GlassWallSlab project={PROJECTS[0]} icon={Rocket} isNearer={true} floatDelay={0} />
          </motion.div>

          {/* Second Tab (Python Smart AI Agent): Revolves tidally from Left -> Center (0° flat) -> Revolves out Right & dissolves */}
          <motion.div
            style={{
              x: leftSlabX,
              rotateY: leftSlabRotateY,
              scale: leftSlabScale,
              opacity: leftSlabOpacity,
              filter: leftSlabFilter,
              pointerEvents: leftSlabPointerEvents as any,
              transformStyle: 'preserve-3d'
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <GlassWallSlab project={PROJECTS[1]} icon={Bot} isNearer={false} floatDelay={0.5} />
          </motion.div>
        </div>
      </div>

      {/* GLASSMORPHISM DESCRIPTION TAB MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Glass Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-3xl rounded-3xl bg-white/[0.06] backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 shadow-[0_35px_80px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Selector Tabs inside Modal */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
                {PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveTabId(proj.id);
                      setSelectedProject(proj);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-light transition-all ${
                      activeTabId === proj.id
                        ? 'bg-white text-black font-medium shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>

              {/* Active Project Details */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-light text-white/60 tracking-wider uppercase block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="liquid-glass-text text-2xl sm:text-4xl font-light tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm font-normal text-white/70 mt-1">
                    {selectedProject.subtitle}
                  </p>
                </div>

                <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed border-l-2 border-white/30 pl-4 bg-white/[0.02] py-2 rounded-r-xl">
                  {selectedProject.description}
                </p>

                {/* Highlights list */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-white/70 mb-3">
                    Key Architecture & Innovations
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-white/85 font-light bg-white/5 p-2.5 rounded-xl border border-white/10"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-white/70 mb-2.5">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-light bg-white/10 border border-white/15 text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <a
                    href={selectedProject.demoUrl || '#'}
                    onClick={(e) => e.preventDefault()}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-medium text-xs sm:text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg"
                  >
                    <span>View Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedProject.githubUrl || '#'}
                    onClick={(e) => e.preventDefault()}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-light text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

