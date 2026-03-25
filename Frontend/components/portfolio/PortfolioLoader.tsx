'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, backdropFilter: 'blur(30px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void/90 object-cover"
        >
          {/* Cosmic Reactor Spinner */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Outer Cyan Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan/50 shadow-cyan-glow"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner Nebula Ring */}
            <motion.div
              className="absolute inset-4 rounded-full border-b-2 border-l-2 border-nebula/50 shadow-nebula-glow"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            {/* Center Core */}
            <motion.div
              className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="mt-8 flex flex-col items-center"
          >
            <span className="font-orbitron font-black tracking-[0.5em] text-cyan text-sm sm:text-base uppercase animate-pulse">
               Extracting Data
            </span>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-nebula to-transparent mt-4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
