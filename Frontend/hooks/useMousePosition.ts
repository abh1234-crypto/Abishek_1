'use client';

import { useState, useEffect } from 'react';

export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth)  * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    // Throttle with rAF for performance
    let frameId: number;
    const raf = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => handler(e));
    };

    window.addEventListener('mousemove', raf, { passive: true });
    return () => {
      window.removeEventListener('mousemove', raf);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return pos;
}
