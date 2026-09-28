"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Globe from "./Globe";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function WebGLCanvas() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0 bg-brand-obsidian overflow-hidden pointer-events-auto">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-navyDark/40 via-brand-obsidian to-brand-obsidian" />

      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#F8FAFC" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0A192F" />

        <Suspense fallback={null}>
          <Globe />
          {!prefersReducedMotion && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
          )}
          {prefersReducedMotion && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
