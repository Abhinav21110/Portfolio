import React, { useEffect, useRef } from 'react';

const Cube3D = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotXRef = useRef<number>(0);
  const rotYRef = useRef<number>(0);
  const velXRef = useRef<number>(0.2); // deg/frame
  const velYRef = useRef<number>(0.3); // deg/frame
  const animIdRef = useRef<number | null>(null);
  const hoverRef = useRef<boolean>(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Determine direction based on cursor position relative to cube center
      const dx = e.clientX - cx; // right positive
      const dy = e.clientY - cy; // down positive

      // Normalize to [-1, 1] and set base speeds
      const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

      // Faster when hovering over cube container
      const base = hoverRef.current ? 0.9 : 0.35; // base speed in deg/frame
      const boost = hoverRef.current ? 1.1 : 0.4; // additional speed scaled by distance
      velYRef.current = (base + Math.abs(nx) * boost) * (nx >= 0 ? 1 : -1);
      velXRef.current = -(base + Math.abs(ny) * boost) * (ny >= 0 ? 1 : -1);
    };

    const tick = () => {
      const cube = cubeRef.current;
      if (cube) {
        rotXRef.current += velXRef.current;
        rotYRef.current += velYRef.current;
        cube.style.transform = `rotateX(${rotXRef.current}deg) rotateY(${rotYRef.current}deg)`;
      }
      animIdRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    animIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div 
        ref={containerRef}
        className="cube-container"
        onPointerEnter={() => { hoverRef.current = true; }}
        onPointerLeave={() => { hoverRef.current = false; }}
        style={{
          perspective: '1000px',
          width: '200px',
          height: '200px',
        }}
      >
        <div 
          ref={cubeRef}
          className={`cube`}
          style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            transformStyle: 'preserve-3d',
            margin: '50px auto',
          }}
        >
          {/* Front face */}
          <div 
            className="cube-face cube-front"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--electric)))',
              border: '2px solid hsl(var(--primary))',
              transform: 'rotateY(0deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            HEY THERE!
          </div>
          
          {/* Back face */}
          <div 
            className="cube-face cube-back"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--electric)), hsl(var(--purple)))',
              border: '2px solid hsl(var(--electric))',
              transform: 'rotateY(180deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            WELCOME!
          </div>
          
          {/* Right face */}
          <div 
            className="cube-face cube-right"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--purple)), hsl(var(--orange)))',
              border: '2px solid hsl(var(--purple))',
              transform: 'rotateY(90deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            MY PORTFOLIO!
          </div>
          
          {/* Left face */}
          <div 
            className="cube-face cube-left"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--orange)), hsl(var(--primary)))',
              border: '2px solid hsl(var(--orange))',
              transform: 'rotateY(-90deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            HOPE YOU LIKE IT!
          </div>
          
          {/* Top face */}
          <div 
            className="cube-face cube-top"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--purple)))',
              border: '2px solid hsl(var(--primary))',
              transform: 'rotateX(90deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            WHAT'S UP?!
          </div>
          
          {/* Bottom face */}
          <div 
            className="cube-face cube-bottom"
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(45deg, hsl(var(--electric)), hsl(var(--orange)))',
              border: '2px solid hsl(var(--electric))',
              transform: 'rotateX(-90deg) translateZ(50px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            SCROLL DOWN!
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* RGB strip-like color cycling */
          @keyframes rgbCycle { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }
          /* Keep 3D intact: do NOT put filter on .cube (can flatten the 3D) */
          .cube { will-change: transform; }
          .cube-face { transition: all 0.3s ease; backface-visibility: hidden; animation: rgbCycle 6s linear infinite; }
          .cube-container:hover .cube-face { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
        `
      }} />
    </div>
  );
};

export default Cube3D;
