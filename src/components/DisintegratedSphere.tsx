import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  angle: number;
  radius: number;
  phi: number;
  theta: number;
}

const DisintegratedSphere = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const rotationRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(1);
  const integrationRef = useRef(0); // 0 = disintegrated, 1 = integrated
  const transitionAnimationRef = useRef<number>();
  const [isHovered, setIsHovered] = useState(false);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Update rotation
    rotationRef.current.x += 0.5 * speedRef.current;
    rotationRef.current.y += 0.8 * speedRef.current;

    // Clear previous particles
    container.innerHTML = '';

    // Render particles
    particlesRef.current.forEach((particle) => {
      // Interpolate between disintegrated and integrated positions
      const currentX = particle.x + (particle.originalX - particle.x) * integrationRef.current;
      const currentY = particle.y + (particle.originalY - particle.y) * integrationRef.current;
      const currentZ = particle.z + (particle.originalZ - particle.z) * integrationRef.current;

      // Apply rotation
      const cosX = Math.cos(rotationRef.current.x * Math.PI / 180);
      const sinX = Math.sin(rotationRef.current.x * Math.PI / 180);
      const cosY = Math.cos(rotationRef.current.y * Math.PI / 180);
      const sinY = Math.sin(rotationRef.current.y * Math.PI / 180);

      // Rotate around X axis
      const y1 = currentY * cosX - currentZ * sinX;
      const z1 = currentY * sinX + currentZ * cosX;

      // Rotate around Y axis
      const x2 = currentX * cosY + z1 * sinY;
      const z2 = -currentX * sinY + z1 * cosY;

      // Project to 2D
      const perspective = 400;
      const scale = perspective / (perspective + z2);
      const x2d = x2 * scale;
      const y2d = y1 * scale;

      // Create particle element
      const particleEl = document.createElement('div');
      particleEl.style.position = 'absolute';
      particleEl.style.left = `${150 + x2d}px`;
      particleEl.style.top = `${150 + y2d}px`;
      particleEl.style.width = `${particle.radius * scale}px`;
      particleEl.style.height = `${particle.radius * scale}px`;
      particleEl.style.borderRadius = '50%';
      
      // Color based on integration and depth
      const hue = (particle.id * 137.5) % 360; // Golden angle for color distribution
      const brightness = 50 + (z2 + 100) / 4; // Depth-based brightness
      const opacity = 0.6 + integrationRef.current * 0.4;
      
      particleEl.style.background = `hsl(${hue}, 70%, ${brightness}%)`;
      particleEl.style.opacity = `${opacity}`;
      particleEl.style.boxShadow = isHovered ? `0 0 ${particle.radius * 2}px hsl(${hue}, 70%, ${brightness}%)` : 'none';
      particleEl.style.transition = 'box-shadow 0.3s ease';

      container.appendChild(particleEl);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered]);

  useEffect(() => {
    // Create particles in a sphere formation
    const particles: Particle[] = [];
    const particleCount = 150;
    const sphereRadius = 80;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(phi);

      particles.push({
        id: i,
        x: x + (Math.random() - 0.5) * 100, // Start disintegrated
        y: y + (Math.random() - 0.5) * 100,
        z: z + (Math.random() - 0.5) * 100,
        originalX: x,
        originalY: y,
        originalZ: z,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 3 + 1,
        phi,
        theta
      });
    }

    particlesRef.current = particles;
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    // Smooth transition for integration and speed
    const targetIntegration = isHovered ? 1 : 0;
    const targetSpeed = isHovered ? 3 : 1;
    
    if (transitionAnimationRef.current) {
      cancelAnimationFrame(transitionAnimationRef.current);
    }

    const animateTransition = () => {
      const integrationDiff = targetIntegration - integrationRef.current;
      const speedDiff = targetSpeed - speedRef.current;

      if (Math.abs(integrationDiff) < 0.001 && Math.abs(speedDiff) < 0.001) {
        integrationRef.current = targetIntegration;
        speedRef.current = targetSpeed;
        return;
      }

      integrationRef.current += integrationDiff * 0.05;
      speedRef.current += speedDiff * 0.1;

      transitionAnimationRef.current = requestAnimationFrame(animateTransition);
    };

    animateTransition();

    return () => {
      if (transitionAnimationRef.current) {
        cancelAnimationFrame(transitionAnimationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="relative cursor-pointer"
        style={{
          width: '300px',
          height: '300px',
          perspective: '1000px'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d'
          }}
        />
        
        {/* Glow effect when hovered */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-full opacity-20 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DisintegratedSphere;
