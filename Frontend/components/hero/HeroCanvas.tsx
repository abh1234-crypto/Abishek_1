'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const torusRef  = useRef<THREE.Mesh>(null!);
  const icoRef    = useRef<THREE.Mesh>(null!);
  const octoRef   = useRef<THREE.Mesh>(null!);
  const ringRef   = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4;
      torusRef.current.rotation.y = t * 0.25;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.3;
      icoRef.current.rotation.z = t * 0.2;
    }
    if (octoRef.current) {
      octoRef.current.rotation.y = t * 0.5;
      octoRef.current.rotation.z = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.y = t * 0.35;
    }
  });

  const tealMat = new THREE.MeshStandardMaterial({
    color: '#00F5D4',
    wireframe: true,
    opacity: 0.6,
    transparent: true,
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: '#FF006E',
    wireframe: true,
    opacity: 0.5,
    transparent: true,
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00F5D4" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#FF006E" />

      {/* Large torus knot — centre right */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={torusRef} position={[3.5, 0.5, -3]} material={tealMat}>
          <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        </mesh>
      </Float>

      {/* Icosahedron — top left */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={icoRef} position={[-3.5, 2, -4]} material={magentaMat}>
          <icosahedronGeometry args={[0.9, 0]} />
        </mesh>
      </Float>

      {/* Octahedron — bottom right */}
      <Float speed={1.2} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh ref={octoRef} position={[2.5, -2.5, -3.5]} material={tealMat}>
          <octahedronGeometry args={[0.7, 0]} />
        </mesh>
      </Float>

      {/* Torus ring — top right */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.8}>
        <mesh ref={ringRef} position={[-2.5, -1.5, -5]} material={magentaMat}>
          <torusGeometry args={[1, 0.2, 16, 60]} />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <FloatingShapes />
    </Canvas>
  );
}
