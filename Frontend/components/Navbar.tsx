'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-space py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-void border border-cyan group-hover:bg-cyan group-hover:shadow-cyan-glow transition-all duration-300 flex items-center justify-center transform -skew-x-12">
              <span className="font-orbitron font-black text-cyan group-hover:text-void text-sm transform skew-x-12">AR</span>
            </div>
            <span className="font-orbitron font-black text-white text-lg tracking-wider
                             group-hover:text-cyan transition-colors duration-300">
              ABISHEK
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '/', label: 'HOME' },
              { href: '/#about', label: 'PROFILE' },
              { href: '/#gaming', label: 'STATS' },
              { href: '/#setup', label: 'ARMORY' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-rajdhani font-bold text-sm tracking-[0.15em] relative group ${
                  pathname === href ? 'text-cyan' : 'text-gray-400 hover:text-cyan'
                } transition-colors duration-300 uppercase`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-cyan shadow-cyan-glow transition-all duration-300 ${
                  pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* PORTFOLIO button */}
          <Link
            href="/portfolio"
            className="btn-space font-orbitron font-bold text-sm tracking-widest px-6 py-2.5 transform -skew-x-12 cursor-pointer flex items-center gap-2"
          >
            <span className="transform skew-x-12">PORTFOLIO</span>
            <span className="transform skew-x-12 font-black text-nebula">{'//'}</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
