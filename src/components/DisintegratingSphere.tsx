import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const SphereParticles = () => {
  const meshRef = useRef<THREE.Points>(null!);
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Precompute target positions
  const particles = useMemo(() => {
    const count = 3000;
    const sphere = new Float32Array(count * 3);     // integrated target
    const scattered = new Float32Array(count * 3);  // disintegrated target
    const current = new Float32Array(count * 3);    // rendered buffer (mutates)
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.sqrt(4 * Math.PI) * t;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      const r = 1.5;
      sphere[i * 3] = x * r;
      sphere[i * 3 + 1] = y * r;
      sphere[i * 3 + 2] = z * r;

      scattered[i * 3] = (Math.random() * 2 - 1) * 6;
      scattered[i * 3 + 1] = (Math.random() * 2 - 1) * 6;
      scattered[i * 3 + 2] = (Math.random() * 2 - 1) * 6;

      // start as integrated
      current[i * 3] = sphere[i * 3];
      current[i * 3 + 1] = sphere[i * 3 + 1];
      current[i * 3 + 2] = sphere[i * 3 + 2];

      color.setHSL(t * 0.3 + 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { sphere, scattered, current, colors, count };
  }, []);

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;

    // Disintegration factor based on state
    let mix = 0;
    if (isDisintegrating) {
      mix = Math.min(1, (timeRef.current - (timeRef.current % 2)) / 2);
    } else {
      mix = Math.max(0, 1 - (timeRef.current - (timeRef.current % 2)) / 2);
    }

    const { sphere, scattered, current, count } = particles;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      current[i3]     = THREE.MathUtils.lerp(sphere[i3],     scattered[i3],     mix);
      current[i3 + 1] = THREE.MathUtils.lerp(sphere[i3 + 1], scattered[i3 + 1], mix);
      current[i3 + 2] = THREE.MathUtils.lerp(sphere[i3 + 2], scattered[i3 + 2], mix);
    }

    const geom = meshRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    posAttr.array = particles.current;
    posAttr.needsUpdate = true;

    // Rotation based on mouse drag
    if (isDragging) {
      meshRef.current.rotation.y += mousePos.x * 0.01;
      meshRef.current.rotation.x += mousePos.y * 0.01;
    } else {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsDisintegrating(!isDisintegrating);
    e.stopPropagation();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      setMousePos({
        x: (e.nativeEvent as PointerEvent).movementX || 0,
        y: (e.nativeEvent as PointerEvent).movementY || 0
      });
    }
  };

  return (
    <points 
      ref={meshRef} 
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.current.length / 3}
          array={particles.current}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

const DisintegratingSphere = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <SphereParticles />
      </Canvas>
    </div>
  );
};

export default DisintegratingSphere;
