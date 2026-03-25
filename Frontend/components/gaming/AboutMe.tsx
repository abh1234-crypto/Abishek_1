'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const games = [
  { name: 'Valorant', rank: 'Immortal', hours: '1,500+', role: 'Duelist' },
  { name: 'CS2', rank: 'Global Elite', hours: '2,200+', role: 'Entry Fragger' },
  { name: 'Apex Legends', rank: 'Master', hours: '800+', role: 'Movement' },
];

export default function AboutMe() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={containerRef} className="py-32 px-4 relative overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left bio - Snappy Snap Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-[2px] bg-nebula shadow-nebula-glow" />
              <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white uppercase tracking-wider">Player Profile</h2>
            </div>
            
            <h3 className="font-rajdhani font-bold text-2xl md:text-3xl text-cyan mb-6 leading-snug">
              &quot;Precision in code.<br/>Dominance across the void.&quot;
            </h3>
            
            <p className="font-inter text-gray-400 text-lg leading-relaxed mb-10">
              I am Abishek, a Full-Stack Developer bridging the gap between immaculate software engineering and competitive esports.
            </p>
            
            <div className="flex gap-6">
              <div className="glass-space glass-cyan p-6 rounded-2xl text-center flex-1 transition-all hover:bg-cyan/5">
                <span className="block font-orbitron font-black text-3xl text-white">4.5k+</span>
                <span className="font-rajdhani font-bold text-xs tracking-[0.2em] uppercase text-cyan mt-2 block">Hours Logged</span>
              </div>
              <div className="glass-space glass-nebula p-6 rounded-2xl text-center flex-1 transition-all hover:bg-nebula/5">
                <span className="block font-orbitron font-black text-3xl text-white">Top 1%</span>
                <span className="font-rajdhani font-bold text-xs tracking-[0.2em] uppercase text-nebula mt-2 block">Aim Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Right Top Played Games Bento - Snappy Snap Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="glass-space p-8 rounded-3xl border border-gray-800 shadow-2xl bg-void/80 backdrop-blur-md">
              <h3 className="font-orbitron font-bold text-white text-sm tracking-[0.3em] mb-8 uppercase flex items-center justify-between">
                <span>Current Roster</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan shadow-cyan-glow animate-pulse" />
              </h3>
              
              <div className="flex flex-col gap-6">
                {games.map((game, i) => (
                  <motion.div 
                    key={game.name} 
                    className="flex flex-col sm:flex-row justify-between sm:items-center p-5 rounded-2xl bg-gray-900/40 border border-gray-800/80 group hover:border-cyan/50 transition-all duration-300"
                  >
                    <div>
                      <h4 className="font-orbitron font-black text-xl text-white group-hover:text-cyan transition-colors">{game.name}</h4>
                      <p className="font-rajdhani font-bold text-xs tracking-[0.2em] text-gray-500 uppercase mt-1">{game.role}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-left sm:text-right">
                      <span className="inline-block px-4 py-1.5 bg-void border border-gray-800 text-cyan font-rajdhani font-bold text-xs tracking-[0.2em] uppercase rounded-md transition-colors">
                        {game.rank}
                      </span>
                      <p className="font-inter text-sm font-medium text-gray-500 mt-2">{game.hours} HRS</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Ambient background glow optimized */}
            <div className="absolute -inset-4 bg-cyan/5 blur-[60px] z-[-1] rounded-full pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
