'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AttendanceRing = ({ percentage, label, color, delay }: any) => {
  const [currentPct, setCurrentPct] = useState(0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Counter animation
  useEffect(() => {
    let startTime: number;
    const duration = 1500 + delay * 1000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      // ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentPct(Math.round(easeProgress * percentage));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [percentage, delay]);

  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90 transform drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {/* Background Ring */}
          <circle
            cx="80" cy="80" r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Foreground Ring */}
          <motion.circle
            cx="80" cy="80" r={radius}
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            fill="transparent"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
            style={{ strokeDasharray: circumference, filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-orbitron font-black text-3xl drop-shadow-md" style={{ color: color }}>
            {currentPct}%
          </span>
        </div>
      </div>
      <p className="mt-6 font-rajdhani font-bold text-sm tracking-[0.2em] text-gray-400 uppercase group-hover:text-white transition-colors">
        {label}
      </p>
    </div>
  );
};

export default function AttendanceSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="font-orbitron font-black text-3xl mb-16 text-white text-shadow-glow uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ATTENDANCE RECORD
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-16 md:gap-32">
          <AttendanceRing percentage={80} label="MCA Attendance" color="#00E5FF" delay={0.2} />
          <AttendanceRing percentage={75} label="BCA Attendance" color="#FF00A0" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
