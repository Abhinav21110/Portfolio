import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WavyBorder = () => {
  const wavePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = wavePathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();

    // Set initial state for the border drawing animation
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate the border drawing
    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const hue = progress * 360; // Full RGB spectrum
          path.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
        },
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-16 z-20 pointer-events-none overflow-hidden">
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 64 1080"
      >
        {/* Wave border outline */}
        <path
          ref={wavePathRef}
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
