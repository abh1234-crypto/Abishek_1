'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const contentVariants = {
  initial:  { opacity: 0, filter: 'blur(10px)' },
  animate:  { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 } },
  exit:     { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.4 } },
};

const overlayVariants = {
  initial:  { scaleY: 1, transformOrigin: 'top' },
  animate:  { scaleY: 0, transformOrigin: 'top', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
  exit:     { scaleY: 1, transformOrigin: 'bottom', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative z-10 w-full min-h-screen flex flex-col">
        {mounted && (
           <motion.div
           key={pathname + '-overlay'}
           variants={overlayVariants}
           initial="initial"
           animate="animate"
           exit="exit"
           className="fixed inset-0 z-[200] pointer-events-none"
           style={{
             background: 'linear-gradient(135deg, #080811 0%, #00E5FF 50%, #7B2CBF 100%)',
           }}
         />
        )}
       
        <motion.div
          className="flex-grow w-full"
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
