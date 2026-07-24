import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Linkedin, Github, Download, CheckCircle2, User } from 'lucide-react';

const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.111.696-1.78.696s-1.314-.246-1.78-.696L4.225 15.17c-.973-.938-.973-2.459 0-3.397L9.845 6.37c.466-.45 1.111-.696 1.78-.696s1.314.246 1.78.696l2.697 2.607c.466.45.466 1.179 0 1.629-.466.45-1.222.45-1.688 0l-2.029-1.96-4.952 4.775 4.952 4.775 2.029-1.96c.466-.45 1.222-.45 1.688 0 .466.45.466 1.179 0 1.629zM20.88 12.012c0 .652-.528 1.18-1.18 1.18H11.23c-.652 0-1.18-.528-1.18-1.18 0-.652.528-1.18 1.18-1.18h8.47c.652 0 1.18.528 1.18 1.18z"/>
  </svg>
);

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const subject = encodeURIComponent(`Message from ${name} via Portfolio`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:kishorejegan.79@gmail.com?subject=${subject}&body=${body}`, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-black text-white pt-24 pb-28 px-6 sm:px-12 md:px-16 overflow-hidden border-t border-white/10 flex flex-col items-center justify-center">
      {/* Monochrome Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="liquid-glass-text text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
            Contact
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light">
            Get in Touch
          </p>
        </motion.div>

        {/* Liquid Glassmorphic Contact Card (Floats in & stays 100% visible) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full p-8 sm:p-10 rounded-3xl backdrop-blur-2xl bg-white/[0.03] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] text-left mb-12"
        >
          {/* Top Specular Arc */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-white/10 border border-white/20 text-white mb-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-sm font-light">
                Thank you, <span className="text-white font-medium">{name || 'there'}</span>. Your email client has been opened to send your message directly to <span className="text-white/90">kishorejegan.79@gmail.com</span>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Your Name <span className="text-white/40">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/[0.08] text-white text-xs sm:text-sm placeholder-white/20 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                    Your Email <span className="text-white/40">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/[0.08] text-white text-xs sm:text-sm placeholder-white/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2">
                  Message <span className="text-white/30">(Optional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details about your idea, project, or inquiry..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/[0.08] text-white text-xs sm:text-sm placeholder-white/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-white/90 transition-all duration-200 shadow-[0_10px_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Send className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
                <span>Send Message to Email</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Social Links & Resume Download Section (Glassmorphism Effect) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full flex flex-col items-center justify-center gap-5"
        >
          {/* Top Row: LinkedIn, GitHub, LeetCode in Glassmorphism */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* LinkedIn Profile */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
            >
              <Linkedin className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              <span>LinkedIn</span>
            </a>

            {/* GitHub Profile */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
            >
              <Github className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              <span>GitHub</span>
            </a>

            {/* LeetCode Profile */}
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
            >
              <LeetCodeIcon className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
              <span>LeetCode</span>
            </a>
          </div>

          {/* Bottom Row (Beneath): Download Resume in Glassmorphism */}
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              const dummyContent = "Kishore Jegan - Software Engineer & GSoC '26 Participant\nEmail: kishorejegan.79@gmail.com";
              const blob = new Blob([dummyContent], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Kishore_Jegan_Resume.txt';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/25 hover:border-white/50 text-white font-bold text-xs sm:text-sm backdrop-blur-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)] group"
          >
            <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

