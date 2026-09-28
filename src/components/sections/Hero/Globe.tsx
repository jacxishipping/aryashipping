"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";

// Coordinates roughly mapped to a 3D sphere
const PORT_COORDS = {
  // North America
  NY: { lat: 40.71, lng: -74.0 },
  SAVANNAH: { lat: 32.08, lng: -81.09 },
  HOUSTON: { lat: 29.76, lng: -95.36 },
  MONTREAL: { lat: 45.5, lng: -73.56 },
  VANCOUVER: { lat: 49.28, lng: -123.12 },

  // Hubs
  MERSIN: { lat: 36.8, lng: 34.61 },
  DUBAI: { lat: 25.2, lng: 55.27 },

  // Destination (approximated center for visual)
  AFGHANISTAN: { lat: 33.93, lng: 67.7 },
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function RouteLine({ start, end, color = "#C5A059" }: { start: THREE.Vector3; end: THREE.Vector3; color?: string }) {
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    // Push the midpoint out to create a curve
    midPoint.normalize().multiplyScalar(2 + distance * 0.3); // 2 is globe radius

    const curve = new THREE.QuadraticBezierCurve3(start, midPoint, end);
    return curve.getPoints(50);
  }, [start, end]);

  const lineRef = useRef<Line2>(null);

  useFrame(({ clock }) => {
    if (lineRef.current?.material) {
       // Simple pulsing effect
       (lineRef.current.material as THREE.Material).opacity = 0.5 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={1.5}
      transparent
      opacity={0.6}
    />
  );
}

export default function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const GLOBE_RADIUS = 2;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001; // Slow rotation
    }
  });

  // Calculate positions
  const positions = useMemo(() => {
    const pos: Record<string, THREE.Vector3> = {};
    Object.entries(PORT_COORDS).forEach(([key, { lat, lng }]) => {
      pos[key] = latLngToVector3(lat, lng, GLOBE_RADIUS);
    });
    return pos;
  }, []);

  return (
    <group ref={groupRef} rotation={[0.2, -Math.PI / 2, 0]}>
      {/* Base Globe */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial
          color="#0A192F"
          emissive="#070D18"
          roughness={0.8}
          metalness={0.2}
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Inner solid sphere to block seeing through */}
      <Sphere args={[GLOBE_RADIUS * 0.98, 32, 32]}>
         <meshBasicMaterial color="#070D18" />
      </Sphere>

      {/* Nodes (Ports) */}
      {Object.entries(positions).map(([key, pos]) => (
        <mesh key={`node-${key}`} position={pos}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={["MERSIN", "DUBAI"].includes(key) ? "#D4AF37" : "#F8FAFC"} />
        </mesh>
      ))}

      {/* Routes (NA -> Hubs) */}
      {["NY", "SAVANNAH", "HOUSTON", "MONTREAL", "VANCOUVER"].map((naPort) => (
        <group key={`routes-${naPort}`}>
          <RouteLine start={positions[naPort]} end={positions.MERSIN} color="#4A90E2" />
          <RouteLine start={positions[naPort]} end={positions.DUBAI} color="#4A90E2" />
        </group>
      ))}

      {/* Routes (Hubs -> Destination) */}
      <RouteLine start={positions.MERSIN} end={positions.AFGHANISTAN} color="#D4AF37" />
      <RouteLine start={positions.DUBAI} end={positions.AFGHANISTAN} color="#D4AF37" />
    </group>
  );
}
