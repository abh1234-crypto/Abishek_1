'use client';

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // optimization for opaque background
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Offscreen canvas for static nebula patterns to save CPU
    const nebulaCanvas = document.createElement('canvas');
    const nCtx = nebulaCanvas.getContext('2d');
    
    const prepareNebula = () => {
      nebulaCanvas.width = w;
      nebulaCanvas.height = h;
      if (nCtx) {
        nCtx.fillStyle = '#080811';
        nCtx.fillRect(0, 0, w, h);
        
        const grad1 = nCtx.createRadialGradient(w * 0.2, h * 0.2, 0, w * 0.2, h * 0.2, w * 0.6);
        grad1.addColorStop(0, 'rgba(123, 44, 191, 0.12)');
        grad1.addColorStop(1, 'transparent');
        nCtx.fillStyle = grad1;
        nCtx.fillRect(0, 0, w, h);

        const grad2 = nCtx.createRadialGradient(w * 0.8, h * 0.8, 0, w * 0.8, h * 0.8, w * 0.6);
        grad2.addColorStop(0, 'rgba(0, 229, 255, 0.08)');
        grad2.addColorStop(1, 'transparent');
        nCtx.fillStyle = grad2;
        nCtx.fillRect(0, 0, w, h);
      }
    };
    prepareNebula();

    const stars: { x: number, y: number, r: number, vy: number, alpha: number, twinkle: number }[] = [];
    const numStars = window.innerWidth < 768 ? 100 : 200; // reduced for power efficiency

    for (let i = 0; i < numStars; i++) {
       stars.push({
         x: Math.random() * w, 
         y: Math.random() * h, 
         r: Math.random() * 1.2 + 0.3,
         vy: Math.random() * 0.3 + 0.05,
         alpha: Math.random(),
         twinkle: Math.random() * 0.02
       });
    }

    const drawSpaceship = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 16);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.beginPath();
      ctx.moveTo(0, -4); ctx.lineTo(15, 0); ctx.lineTo(0, 4); ctx.lineTo(-15, 0);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    let shipActive = false;
    let shipX = -100;
    let shipY = 0;
    let animationFrameId: number;

    const render = () => {
      // 1. Draw pre-rendered nebula (Static, ultra-fast)
      ctx.drawImage(nebulaCanvas, 0, 0);

      // 2. Draw Stars
      ctx.fillStyle = '#FFFFFF';
      stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.vy;
        star.alpha += star.twinkle;
        if (star.alpha > 0.8 || star.alpha < 0.2) star.twinkle *= -1;

        if (star.y > h) {
          star.y = 0;
          star.x = Math.random() * w;
        }
      });
      ctx.globalAlpha = 1;

      // 3. Rare spaceships
      if (!shipActive && Math.random() < 0.001) {
        shipActive = true;
        shipX = -50;
        shipY = Math.random() * h;
      }
      if (shipActive) {
        shipX += 4;
        drawSpaceship(shipX, shipY);
        if (shipX > w + 50) shipActive = false;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      prepareNebula();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[-10] pointer-events-none"
    />
  );
}
