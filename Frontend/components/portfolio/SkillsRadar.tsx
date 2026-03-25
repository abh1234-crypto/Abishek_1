'use client';

import { motion } from 'framer-motion';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

const skillsData = [
  { subject: 'Frontend (React/Next)',  A: 95, B: 80, fullMark: 100 },
  { subject: 'Backend (Node/Exp)',     A: 85, B: 75, fullMark: 100 },
  { subject: 'Database (MongoDB)',     A: 80, B: 70, fullMark: 100 },
  { subject: 'UI/UX Design',           A: 90, B: 60, fullMark: 100 },
  { subject: '3D & Animations',        A: 85, B: 50, fullMark: 100 },
  { subject: 'Problem Solving',        A: 90, B: 85, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-void-light border border-gray-800 p-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] text-center">
        <p className="font-rajdhani font-bold tracking-widest text-gray-400 text-xs mb-3 uppercase">{payload[0].payload.subject}</p>
        <p className="font-orbitron font-black text-cyan drop-shadow-md">Tech: {payload[0].value}%</p>
        <p className="font-orbitron font-black text-nebula text-sm mt-1 drop-shadow-md">Soft: {payload[1].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SkillsRadar() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="font-orbitron font-black text-3xl mb-12 text-center text-white text-shadow-glow uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SKILL MATRIX
        </motion.h2>
        
        <motion.div 
          className="glass-space rounded-3xl p-4 md:p-8 border border-gray-800 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Corner Tabs */}
          <div className="absolute top-0 left-0 w-16 h-1 bg-cyan shadow-cyan-glow" />
          <div className="absolute bottom-0 right-0 w-16 h-1 bg-nebula shadow-nebula-glow" />
          
          <div className="h-[400px] md:h-[500px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#FFFFFF', fontSize: 12, fontFamily: 'Rajdhani', fontWeight: 'bold', letterSpacing: '1px' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Technical Skills"
                  dataKey="A"
                  stroke="#00E5FF"
                  strokeWidth={2}
                  fill="#00E5FF"
                  fillOpacity={0.15}
                  isAnimationActive={true}
                  animationBegin={200}
                  animationDuration={1500}
                />
                <Radar
                  name="Soft Skills"
                  dataKey="B"
                  stroke="#FF00A0"
                  strokeWidth={2}
                  fill="#FF00A0"
                  fillOpacity={0.15}
                  isAnimationActive={true}
                  animationBegin={600}
                  animationDuration={1500}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
              <span className="w-3 h-3 rounded-full bg-cyan shadow-cyan-glow animate-pulse" />
              <span className="font-rajdhani font-bold text-sm tracking-[0.2em] uppercase text-white">Technical</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
              <span className="w-3 h-3 rounded-full bg-nebula shadow-nebula-glow animate-pulse" />
              <span className="font-rajdhani font-bold text-sm tracking-[0.2em] uppercase text-white">Soft</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
