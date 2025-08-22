import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WavyBorder = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!canvas || !svg || !path) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // --- SVG Path Animation ---
    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '50% bottom',
        scrub: 1,
        onUpdate: (self) => {
          const hue = self.progress * 180;
          path.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
        },
      },
    });

    // --- Canvas Particle Animation ---
    const getWaveX = (y: number) => {
      const amplitude = 28;
      const frequency = 0.005;
      const offsetX = 32;
      return offsetX + amplitude * Math.sin(y * frequency);
    };

    class Particle {
      x: number; y: number; radius: number; color: string; vx: number; vy: number;
      constructor(bounds: { width: number; height: number }) {
        this.radius = Math.random() * 2 + 2;
        this.x = Math.random() * (bounds.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (bounds.height - this.radius * 2) + this.radius;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = `hsl(${180 + Math.random() * 180}, 70%, 60%)`;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update(bounds: { width: number; height: number }) {
        this.x += this.vx; this.y += this.vy;
        if (this.y - this.radius < 0 || this.y + this.radius > bounds.height) this.vy *= -1;
        if (this.x - this.radius < 0) this.vx *= -1;
        const waveBoundary = getWaveX(this.y);
        if (this.x + this.radius > waveBoundary) {
          this.vx *= -1;
          this.x = waveBoundary - this.radius;
        }
        this.draw();
      }
    }

    const particles: Particle[] = [];
    const maxParticles = 100;

    ScrollTrigger.create({
      trigger: document.body,
      start: '50% bottom',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const targetParticleCount = Math.floor(self.progress * maxParticles);
        while (particles.length < targetParticleCount) {
          particles.push(new Particle({ width: rect.width, height: rect.height }));
        }
        while (particles.length > targetParticleCount) {
          particles.pop();
        }
      },
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update({ width: rect.width, height: rect.height }));
      requestAnimationFrame(animate);
    };
    animate();

    // --- Transition Animation ---
    gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: '45% bottom',
        end: '55% bottom',
        scrub: true,
      },
    })
    .to(svg, { opacity: 0 }, 0)
    .to(canvas, { opacity: 1 }, 0);

  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-16 z-20 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0 opacity-0" />
      <svg
        ref={svgRef}
        className="h-full w-full absolute top-0 left-0"
        preserveAspectRatio="none"
        viewBox="0 0 64 1080"
      >
        <path
          ref={pathRef}
          d="M 32,0 C 60,180 4,360 32,540 S 60,900 32,1080"
          stroke="#ff0000"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default WavyBorder;
