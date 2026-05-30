'use client';
import { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // --- BOKEH ORBS (bottom layer) ---
    const makeOrbs = () => [
      { x: W()*0.10, y: H()*0.25, r: 95,  vx:  0.15, vy:  0.08, c: '201,133,106', a: 0.07  },
      { x: W()*0.75, y: H()*0.70, r: 105, vx: -0.10, vy: -0.07, c: '212,169,106', a: 0.055 },
      { x: W()*0.55, y: H()*0.10, r: 65,  vx:  0.07, vy:  0.12, c: '180,112,90',  a: 0.045 },
      { x: W()*0.88, y: H()*0.20, r: 55,  vx: -0.13, vy:  0.08, c: '201,133,106', a: 0.06  },
      { x: W()*0.25, y: H()*0.85, r: 75,  vx:  0.09, vy: -0.10, c: '212,169,106', a: 0.045 },
    ];

    // --- CONSTELLATION NODES (top layer, 14 nodes only) ---
    const makeNodes = () => Array.from({ length: 14 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.6,
      alpha: Math.random() * 0.35 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let orbs = makeOrbs();
    let nodes = makeNodes();
    const MAX_DIST = 120;

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W(), H());

      // Draw bokeh orbs
      orbs.forEach(o => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W() + o.r;
        if (o.x > W() + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H() + o.r;
        if (o.y > H() + o.r) o.y = -o.r;

        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0,   `rgba(${o.c},${o.a})`);
        g.addColorStop(0.4, `rgba(${o.c},${o.a * 0.4})`);
        g.addColorStop(1,   `rgba(${o.c},0)`);
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Move nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(201,133,106,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with gentle pulse
      nodes.forEach(n => {
        const pulse = Math.sin(t * 0.03 + n.phase) * 0.12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,232,227,${Math.max(0, n.alpha + pulse)})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
