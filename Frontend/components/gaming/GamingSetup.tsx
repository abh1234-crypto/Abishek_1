'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const setupStats = [
  { item: 'GPU', detail: 'RTX 4080 Super', icon: '⚡' },
  { item: 'CPU', detail: 'Ryzen 9 7900X3D', icon: '🧠' },
  { item: 'RAM', detail: '64GB DDR5 6000MHz', icon: '🚀' },
  { item: 'Monitor', detail: '240Hz 1440p OLED', icon: '🖥️' },
  { item: 'Mouse', detail: 'Logitech G Pro X Superlight', icon: '🖱️' },
  { item: 'Keyboard', detail: 'Wooting 60HE (Rapid/Analog)', icon: '⌨️' },
];

export default function GamingSetup() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="setup" ref={containerRef} className="py-32 px-4 relative overflow-hidden bg-void">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-center mb-6">
             <div className="section-divider-nebula rounded-full" />
          </div>
          <h2 className="font-orbitron font-black text-5xl text-white uppercase tracking-widest text-shadow-glow">The Armory</h2>
          <p className="font-rajdhani font-bold tracking-[0.4em] text-nebula uppercase mt-4 text-sm">Hardware & Peripherals</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {setupStats.map((gear, i) => (
            <motion.div
              key={gear.item}
              className="glass-space p-8 rounded-2xl flex flex-col items-center justify-center text-center group cursor-default
                         border border-gray-800/80 bg-void/60 backdrop-blur-md hover:border-nebula transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -5, scale: 1.02, backgroundColor: 'rgba(255, 0, 160, 0.05)' }}
            >
              <div className="relative mb-6">
                <span className="relative text-5xl opacity-80 group-hover:opacity-100 transition-all duration-300 block">
                  {gear.icon}
                </span>
              </div>
              <h4 className="font-orbitron font-black text-white text-lg mb-3 tracking-[0.1em] uppercase">{gear.item}</h4>
              <p className="font-inter text-gray-400 font-medium">{gear.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
