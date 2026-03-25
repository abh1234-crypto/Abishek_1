'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const playstyleData = [
  { subject: 'Aggression', A: 82 },
  { subject: 'Teamwork',   A: 75 },
  { subject: 'Strategy',   A: 90 },
  { subject: 'Aim',        A: 88 },
  { subject: 'Map Control',A: 78 },
  { subject: 'Clutch',     A: 85 },
];

const winRateData = [
  { month: 'Oct', rate: 58 },
  { month: 'Nov', rate: 63 },
  { month: 'Dec', rate: 71 },
  { month: 'Jan', rate: 69 },
  { month: 'Feb', rate: 76 },
  { month: 'Mar', rate: 73 },
];

const statCards = [
  { label: 'K/D Ratio',   value: '2.4', icon: '⚡', color: '#00E5FF' },
  { label: 'Win Rate',    value: '73%', icon: '🏆', color: '#FF00A0' },
  { label: 'Total Kills', value: '18,420', icon: '💀', color: '#00E5FF' },
  { label: 'Headshots',   value: '61%', icon: '🎯', color: '#FF00A0' },
  { label: 'Matches',     value: '1,240', icon: '🎮', color: '#00E5FF' },
  { label: 'MVPs',        value: '342', icon: '⭐', color: '#FF00A0' },
];

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={4} fill="#00E5FF" stroke="#FFFFFF" strokeWidth={1} style={{ filter: 'drop-shadow(0 0 4px #00E5FF)' }} />
  );
};

export default function GamingStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, scale: 0.95 },
    visible:  { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="gaming" ref={sectionRef} className="relative py-24 px-4 border-y border-gray-900 overflow-hidden">
      {/* Background glow for section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cosmic opacity-5 blur-[150px] pointer-events-none z-[-1]" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex justify-center mb-4">
             <div className="section-divider-space" />
          </div>
          <h2 className="font-orbitron font-black text-4xl text-white uppercase tracking-widest text-shadow-glow">Performance Data</h2>
          <p className="font-rajdhani font-bold tracking-[0.3em] text-cyan uppercase mt-3">In-Game Analytics</p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-space rounded-xl p-5 text-center group cursor-default"
              whileHover={{ y: -8, scale: 1.05, boxShadow: `0 0 20px ${s.color}33`, borderColor: s.color }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-3xl mb-3 opacity-70 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">{s.icon}</div>
              <p className="font-orbitron font-black text-2xl drop-shadow-md" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="font-rajdhani font-bold text-xs text-gray-400 tracking-wider uppercase mt-1 group-hover:text-white transition-colors">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar chart */}
          <motion.div variants={itemVariants} className="glass-space rounded-2xl p-6 glass-cyan">
            <h3 className="font-orbitron font-black text-white text-sm tracking-widest mb-6 text-center uppercase flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-cyan" /> Playstyle Profile <span className="w-8 h-[1px] bg-cyan" />
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={playstyleData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#FFFFFF', fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 'bold', letterSpacing: '1px' }} />
                <PolarRadiusAxis tick={false} axisLine={false} tickCount={5} domain={[0, 100]} />
                <Radar
                  name="Playstyle"
                  dataKey="A"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  fill="#00E5FF"
                  fillOpacity={0.15}
                  dot={<CustomDot />}
                  isAnimationActive={isInView}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area/Line chart — win rate */}
          <motion.div variants={itemVariants} className="glass-space rounded-2xl p-6 glass-nebula">
            <h3 className="font-orbitron font-black text-white text-sm tracking-widest mb-6 text-center uppercase flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-nebula" /> Win Rate Trend <span className="w-8 h-[1px] bg-nebula" />
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={winRateData} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="pinkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#FF00A0" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF00A0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                <XAxis dataKey="month" tick={{ fill: '#A0AEC0', fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 90]} tick={{ fill: '#A0AEC0', fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#121223', border: '1px solid rgba(255,0,160,0.3)', borderRadius: 8, boxShadow: '0 0 20px rgba(255,0,160,0.2)' }}
                  labelStyle={{ color: '#FFFFFF', fontFamily: 'Orbitron', fontSize: 11, fontWeight: 'bold' }}
                  itemStyle={{ color: '#FF00A0', fontWeight: 'bold', textShadow: '0 0 8px #FF00A0' }}
                  formatter={(v: number) => [`${v}%`, 'Win Rate']}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#FF00A0"
                  strokeWidth={3}
                  fill="url(#pinkGrad)"
                  dot={{ r: 4, fill: '#FF00A0', stroke: '#FFFFFF', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#FFFFFF', stroke: '#FF00A0', strokeWidth: 2 }}
                  isAnimationActive={isInView}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
