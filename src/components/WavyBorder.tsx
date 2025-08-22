import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WavyBorder = () => {
  const wavePathRef = useRef<SVGPathElement>(null);
  const waveFillRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const path = wavePathRef.current;
    const fill = waveFillRef.current;
    if (!path || !fill) return;

    const pathLength = path.getTotalLength();

    // Set initial state for the border drawing animation
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Set initial state for the fill animation - start completely hidden
    gsap.set(fill, {
      scaleY: 0,
      transformOrigin: 'bottom',
    });

    // Ensure the SVG rect scales within its own box
    (fill as unknown as SVGGraphicsElement).style.setProperty('transform-box', 'fill-box');

    // Animate the border drawing - first half of scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '50% bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const hue = progress * 360; // Full RGB spectrum
          path.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
          fill.setAttribute('fill', `hsl(${hue}, 70%, 50%)`);
        },
      },
    });

    // Animate the water fill - second half of scroll
    gsap.to(fill, {
      scaleY: 1,
      scrollTrigger: {
        trigger: document.body,
        start: '50% bottom',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const hue = 180 + (progress * 180); // Continue RGB spectrum from where border left off
          path.setAttribute('stroke', `hsl(${hue}, 70%, 60%)`);
          fill.setAttribute('fill', `hsl(${hue}, 70%, 50%)`);
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
        <defs>
          {/* Clip area equals the space between left edge and wave path */}
          <clipPath id="wave-clip" clipPathUnits="userSpaceOnUse">
            <path d="M 0,0 L 32,0 C 60,180 4,360 32,540 S 60,900 32,1080 L 0,1080 Z" />
          </clipPath>
        </defs>

        {/* Water fill: full-rect clipped to wave shape, scaled from bottom */}
        <rect
          ref={waveFillRef}
          x="0"
          y="0"
          width="64"
          height="1080"
          fill="#ff0000"
          clipPath="url(#wave-clip)"
          className="opacity-70"
        />

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
