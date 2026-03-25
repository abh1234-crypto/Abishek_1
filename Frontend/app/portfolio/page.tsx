'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AcademicCards from '@/components/portfolio/AcademicCards';
import AttendanceSection from '@/components/portfolio/AttendanceSection';
import SkillsRadar from '@/components/portfolio/SkillsRadar';
import PortfolioLoader from '@/components/portfolio/PortfolioLoader';

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show off the premium loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PortfolioLoader isLoading={loading} />
      
      <main className="relative min-h-screen overflow-hidden">
        <div className="page-content pt-32 pb-24">
          
          <motion.section 
            className="relative pb-24 px-4 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -40, filter: 'blur(20px)' }}
            animate={!loading ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="flex justify-center mb-8">
               <div className="section-divider-space" />
            </div>
            <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6 text-white drop-shadow-[0_0_40px_rgba(0,229,255,0.4)] tracking-tighter">
              PORTFOLIO
            </h1>
            <p className="font-rajdhani font-bold text-cyan tracking-[0.5em] text-sm md:text-base uppercase">
              Academic &amp; Professional Record
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
          >
            <AcademicCards />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={!loading ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
          >
             <AttendanceSection />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={!loading ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
          >
             <SkillsRadar />
          </motion.div>

          <footer className="text-center py-16 px-4 bg-void/50 border-t border-gray-900/80 mt-32 backdrop-blur-xl">
            <div className="section-divider-space mb-8" />
            <p className="font-rajdhani font-bold text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase hover:text-cyan transition-colors">
              © 2025 ABISHEK RAJ — Precision & Performance
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
