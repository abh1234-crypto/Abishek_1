'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useMousePosition from '@/hooks/useMousePosition';
import useScrollVelocity from '@/hooks/useScrollVelocity';

// ── GLSL Shaders ────────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScrollVelocity;
  uniform vec2  uResolution;
  varying vec2  vUv;

  // Simplex-style smooth noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouseInfluence = (uMouse - 0.5) * 0.3;

    // Time flow + scroll warp
    float t = uTime * 0.18;
    float scrollWarp = uScrollVelocity * 0.04;

    // Layered noise for fluid plasma
    float n1 = snoise(uv * 2.8 + t + mouseInfluence);
    float n2 = snoise(uv * 5.2 - t * 0.7 + mouseInfluence * 1.5 + scrollWarp);
    float n3 = snoise(uv * 9.0 + t * 0.4 + vec2(scrollWarp, -scrollWarp));
    float n4 = snoise(uv * 1.6 + t * 0.25 - mouseInfluence * 0.8);

    float plasma = (n1 * 0.45 + n2 * 0.30 + n3 * 0.15 + n4 * 0.10);
    plasma = plasma * 0.5 + 0.5; // remap 0-1

    // Mouse proximity glow
    float dist = length(uv - uMouse);
    float mousePulse = smoothstep(0.4, 0.0, dist) * 0.35;

    // Color palette: deep abyss + neon teal + electric magenta
    vec3 colAbyss   = vec3(0.020, 0.031, 0.063);   // #050810
    vec3 colTeal    = vec3(0.000, 0.961, 0.831);   // #00F5D4
    vec3 colMagenta = vec3(1.000, 0.000, 0.431);   // #FF006E
    vec3 colMid     = vec3(0.031, 0.102, 0.180);   // deep blue-teal

    // Three-way gradient along plasma value
    vec3 col = mix(colAbyss, colMid, smoothstep(0.0, 0.45, plasma));
    col = mix(col, colTeal, smoothstep(0.45, 0.72, plasma) * 0.65);
    col = mix(col, colMagenta, smoothstep(0.72, 1.0,  plasma) * 0.50);

    // Add mouse glow in teal
    col += colTeal * mousePulse;
    col += colMagenta * scrollWarp * 0.5;

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.5, 1.3, length(uv - 0.5) * 1.6);
    col *= vignette;

    // Keep dark — this is a background
    col *= 0.75;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Inner mesh that animates ─────────────────────────────────────
function PlasmaPlane({
  mouse,
  scrollVelocity,
}: {
  mouse: { x: number; y: number };
  scrollVelocity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:           { value: 0 },
      uMouse:          { value: new THREE.Vector2(0.5, 0.5) },
      uScrollVelocity: { value: 0 },
      uResolution:     { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    uniforms.uMouse.value.set(mouse.x * 0.5 + 0.5, -(mouse.y * 0.5 - 0.5));
    uniforms.uScrollVelocity.value = THREE.MathUtils.lerp(
      uniforms.uScrollVelocity.value,
      scrollVelocity,
      0.08
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// ── Exported component ───────────────────────────────────────────
export default function FluidPlasmaBackground() {
  const { x, y } = useMousePosition();
  const scrollVelocity = useScrollVelocity();

  return (
    <div
      id="plasma-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 10 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%' }}
      >
        <PlasmaPlane mouse={{ x, y }} scrollVelocity={scrollVelocity} />
      </Canvas>
    </div>
  );
}
