'use client';

import { useState, useEffect, useRef } from 'react';

export default function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime    = useRef(Date.now());
  const decay       = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const onScroll = () => {
      const now  = Date.now();
      const dy   = window.scrollY - lastScrollY.current;
      const dt   = Math.max(now - lastTime.current, 1);
      const vel  = Math.abs(dy / dt) * 50; // scale up for shader

      setVelocity(Math.min(vel, 15)); // clamp

      lastScrollY.current = window.scrollY;
      lastTime.current    = now;

      // Decay velocity back to 0 after scroll stops
      clearTimeout(decay.current);
      decay.current = setTimeout(() => setVelocity(0), 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(decay.current);
    };
  }, []);

  return velocity;
}
