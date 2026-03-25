'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-void">
      
      {/* 3D Motion Reveal Container - Optimized for speed */}
      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto w-full pt-10 will-change-transform"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pre-title badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="glass-cyan px-6 py-2.5 rounded-full flex items-center gap-4 bg-void/60 backdrop-blur-sm border border-cyan/30">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan shadow-cyan-glow animate-pulse-slow" />
            <span className="font-rajdhani font-bold text-xs tracking-[0.4em] text-cyan uppercase">
              System Online // Optimized
            </span>
          </div>
        </motion.div>

        {/* Main title - Snappy reveal */}
        <motion.div 
          className="relative inline-block"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className="hero-title font-orbitron font-black leading-none tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)' }}>
            ABISHEK
            <span className="block mt-2 gradient-text-cyan" style={{ letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 11vw, 8rem)' }}>
              RAJ<span className="text-nebula drop-shadow-nebula-glow">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-inter text-lg md:text-xl text-gray-400 mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          Navigating the intersection of <span className="font-bold text-white shadow-cyan-glow">Deep Software Engineering</span> and <span className="text-nebula font-bold">Elite Esports</span> performance.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mt-14 items-center"
        >
          <Link
            href="/portfolio"
            className="btn-space font-orbitron font-bold text-sm tracking-widest px-10 py-5
                       transform -skew-x-12 inline-flex items-center gap-3 bg-cyan/10 backdrop-blur-sm"
          >
            <span className="skew-x-12">VIEW PORTFOLIO</span>
            <span className="skew-x-12">→</span>
          </Link>
          <a
            href="#about"
            className="font-orbitron font-bold text-sm tracking-widest px-10 py-5 transform -skew-x-12
                       border border-gray-700 text-gray-300 hover:text-white hover:border-nebula hover:shadow-nebula-glow
                       transition-all duration-300 inline-flex items-center gap-2 bg-void/50 backdrop-blur-sm"
          >
            <span className="skew-x-12">INITIATE SCAN</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - static to save CPU */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3 opacity-60">
        <span className="font-rajdhani font-bold text-[10px] tracking-[0.5em] text-cyan uppercase">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan to-transparent animate-bounce" />
      </div>
    </section>
  );
}
