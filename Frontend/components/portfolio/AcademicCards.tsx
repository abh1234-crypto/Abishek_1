'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const academicsData = [
  {
    level: 'Post-Graduation',
    institution: 'MCA — Graphic Era Hill',
    score: '78%',
    period: '2023 - 2025',
    color: '#00E5FF', // Cyan
  },
  {
    level: 'Graduation',
    institution: "BCA — Tula's Institute",
    score: '84%',
    period: '2020 - 2023',
    color: '#FF00A0', // Nebula Pink
  },
  {
    level: 'Secondary (XII)',
    institution: 'BSEB Board',
    score: '69%',
    period: '2019 - 2020',
    color: '#7B2CBF', // Cosmic Purple
  },
  {
    level: 'Primary (X)',
    institution: 'BSEB Board',
    score: '62%',
    period: '2017 - 2018',
    color: '#00B3CC', // Cyan Dark
  },
];

export default function AcademicCards() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-10 px-4 md:px-8">
         <h2 className="font-orbitron font-black text-2xl md:text-3xl text-white uppercase tracking-widest text-shadow-glow">Academic History</h2>
         <div className="hidden sm:flex gap-2">
           {academicsData.map((_, i) => (
             <span key={i} className="w-10 h-1 rounded-full bg-gray-800" />
           ))}
         </div>
         <p className="font-rajdhani font-bold text-cyan text-xs tracking-widest uppercase sm:hidden">Swipe →</p>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-8 px-4 md:px-8"
          whileTap={{ cursor: "grabbing" }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        >
          {academicsData.map((item, index) => (
            <motion.div
              key={item.level}
              className="min-w-[320px] md:min-w-[400px] glass-space p-8 rounded-3xl relative overflow-hidden group border border-gray-800 transition-all duration-300 pointer-events-none"
              whileHover={{ scale: 1.02 }}
            >
              {/* Background Color Accent */}
              <div
                className="absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-10 group-hover:opacity-30 transition-opacity duration-500 blur-3xl pointer-events-none"
                style={{ backgroundColor: item.color }}
              />
              {/* Accent Border Line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl shadow-[0_0_15px_currentColor]"
                style={{ backgroundColor: item.color, color: item.color }}
              />

              <div className="relative z-10 pointer-events-none">
                <span className="font-rajdhani font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-gray-500 mb-3 block group-hover:text-gray-300 transition-colors">
                  {item.period}
                </span>
                <h3 className="font-orbitron font-black text-2xl md:text-3xl text-white mb-2">{item.level}</h3>
                <p className="font-inter text-gray-400 mb-8 text-sm md:text-base leading-relaxed">{item.institution}</p>

                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <span className="font-rajdhani text-xs tracking-[0.2em] font-bold uppercase text-gray-500 block mb-1">
                      Score
                    </span>
                    <p className="font-orbitron font-black text-4xl drop-shadow-md" style={{ color: item.color }}>
                      {item.score}
                    </p>
                  </div>
                  {/* Visual Progress Bar Miniature */}
                  <div className="w-1/2 h-2.5 bg-gray-900 border border-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full shadow-[0_0_10px_currentColor]"
                      style={{ backgroundColor: item.color, color: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: item.score }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <div className="mt-8 text-center text-gray-600 font-rajdhani font-bold tracking-[0.4em] text-xs uppercase animate-pulse">
         ← Drag to explore →
      </div>
    </section>
  );
}
