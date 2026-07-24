import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Aura Cloud Design System',
    category: 'UI/UX & Web Infrastructure',
    description: 'An Apple-inspired frosted glass component suite built for next-generation AI interfaces with real-time spatial physics.',
    tags: ['React 19', 'Tailwind CSS', 'Glassmorphism', 'TypeScript'],
    metrics: '99.8% Perf Score',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Nimbus AI Agent Studio',
    category: 'Full-Stack & Generative AI',
    description: 'Autonomous multi-modal orchestration suite connecting Gemini 2.5 with cloud microservices and real-time streaming.',
    tags: ['Gemini API', 'Express', 'WebSockets', 'Tailwind'],
    metrics: '<120ms Latency',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Kinetic Audio Soundscape',
    category: 'Web Audio & Interactive Canvas',
    description: 'Generative ambient sound synthesizer crafting dynamic atmospheric soundscapes aligned with audio synth algorithms.',
    tags: ['Web Audio API', 'Canvas', 'TypeScript', 'Motion'],
    metrics: '4K Ambient Canvas',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop'
  }
];

export const PortfolioShowcase: React.FC = () => {
  return (
    <section id="featured-work" className="relative z-20 py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-white/70 font-medium text-xs tracking-widest uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Curated Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Craft
          </h2>
        </div>
        <p className="mt-3 md:mt-0 text-white/70 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
          Combining spatial glass interfaces, robust backend systems, and minimalist aesthetics.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group apple-glass-card rounded-2xl overflow-hidden border border-white/15 p-4 flex flex-col justify-between hover:border-white/40 transition-all duration-300"
          >
            <div>
              {/* Project Image Container */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/15 mb-3.5">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/20">
                  {project.metrics}
                </span>
              </div>

              {/* Category & Title */}
              <div className="text-white/60 text-xs font-medium tracking-wide mb-1">
                {project.category}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors mb-1.5">
                {project.title}
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-3">
                {project.description}
              </p>
            </div>

            {/* Tags & Action */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black text-white transition-all">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

