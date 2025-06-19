// components/AnimatedButtonCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function PolygonalWave({
  animate = true,
  color = "#1976d2",
}: {
  animate?: boolean;
  color?: string;
  is3D?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  const baseZ = useRef<Float32Array | null>(null);

  // Randomize base Z positions on first mount
  useRef(() => {
    const geo = meshRef.current?.geometry as THREE.BufferGeometry;
    if (geo && !baseZ.current) {
      const pos = geo.attributes.position as THREE.BufferAttribute;
      baseZ.current = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        baseZ.current[i] = (Math.random() - 0.5) * 0.2; // random z offset, limited to ±0.1
      }
    }
  });

  useFrame(() => {
    if (!animate) return;
    t.current += 0.008; // slower wave

    const geo = meshRef.current?.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;

    if (!baseZ.current) {
      baseZ.current = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) {
        baseZ.current[i] = (Math.random() - 0.5) * 0.2;
      }
    }

    const width = 16; // plane width, matches planeGeometry args
    const halfWidth = width / 2;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Fade factor: 1 at center, 0 at edges (symmetric for wave)
      const fade = 1 - Math.pow(Math.abs(x / halfWidth), 2); // quadratic fade
      // Left-only fade for baseZ (rigidness): 1 at left, 0 at right
      const leftRigidity = 1 - Math.max(0, x / halfWidth);

      const z =
        leftRigidity * baseZ.current[i] +
        fade * (Math.sin(x * 3 - t.current) * 0.12 + Math.cos(y * 3) * 0.12);

      pos.setZ(i, z);
    }

    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[16, 4, 40, 10]} />
      <meshStandardMaterial color={color} flatShading/>
    </mesh>
  );
}

export default function AnimatedButtonCanvas({
  animate = true,
  is3D = false,
  color = "#1976d2",
}: {
  animate?: boolean;
  is3D?: boolean;
  color?: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1.5], fov: 75 }}
      style={{
        // minWidth: is3D ? "4000px" : "100%",
        // minHeight: is3D ? "500px" : "100%",
        width: is3D ? "300%" : "100%",
        height: is3D ? "300%" : "100%",
      }}
    >
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 2, 5]} intensity={2.5} />
      <directionalLight position={[-4, 2, 2]} intensity={0.4} color="white" />
      <PolygonalWave animate={animate} color={color} />
    </Canvas>
  );
}
