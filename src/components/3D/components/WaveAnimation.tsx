// components/ThreeWaves.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeWaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Init scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Responsive
    const handleResize = () => {
      camera.aspect = containerRef.current!.clientWidth / containerRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Create geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      wireframe: false,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    // const ambientLight = new THREE.AmbientLight(0x404040);
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(1, 1, 1);
    // scene.add(ambientLight);
    // scene.add(directionalLight);

    // Clone initial positions
    const posAttr = geometry.attributes.position;
    const vertexCount = posAttr.count;
    const basePositions = new Float32Array(posAttr.array);

    // Animate
    const animate = () => {
      const time = Date.now() * 0.001;

      for (let i = 0; i < vertexCount; i++) {
        const x = basePositions[i * 3];
        const y = basePositions[i * 3 + 1];
        posAttr.array[i * 3 + 2] = Math.sin(x * 2 + time) * 0.2 + Math.cos(y * 3 + time * 0.7) * 0.2;
      }

      posAttr.needsUpdate = true;
      mesh.rotation.z = Math.sin(time * 0.1) * 0.02; // gentle sway

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-screen z-0" />
  );
}