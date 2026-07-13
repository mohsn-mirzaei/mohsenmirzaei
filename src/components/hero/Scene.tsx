"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero visual: a live "market data field" — a terrain of points displaced by
 * layered waves with a moving highlighted ridge (the price line) and a ripple
 * that follows the pointer. Ties the hero to what the work actually is:
 * real-time data, rendered calmly.
 */

const COLS = 180;
const ROWS = 100;
const SPAN_X = 16;
const SPAN_Z = 9;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPx;
  attribute float aRand;
  varying float vElev;
  varying float vRidge;
  varying float vRand;

  float wave(vec2 p, float t) {
    float h = 0.0;
    h += 0.34 * sin(p.x * 0.55 + t * 0.55) * sin(p.y * 0.85 - t * 0.4);
    h += 0.16 * sin(p.x * 1.7 - t * 0.9 + p.y * 1.3);
    h += 0.07 * sin(p.x * 3.9 + t * 1.6) * sin(p.y * 3.1 + t * 1.1);
    return h;
  }

  void main() {
    vec3 pos = position;
    float t = uTime;

    float h = wave(pos.xz, t);

    // Pointer ripple: local rings around the cursor's world position.
    float d = distance(pos.xz, uPointer);
    h += 0.45 * exp(-d * d * 0.55) * sin(d * 5.0 - t * 3.2);

    // The "price line": a bright ridge sweeping slowly across depth.
    float ridgeZ = sin(t * 0.22) * 2.6;
    float ridge = exp(-pow(pos.z - ridgeZ, 2.0) * 2.2);
    h += ridge * 0.28 * sin(pos.x * 1.3 + t * 1.4);

    pos.y = h;
    vElev = h;
    vRidge = ridge;
    vRand = aRand;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = 1.6 + ridge * 2.4 + aRand * 0.9;
    gl_PointSize = size * uPx * (3.4 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform vec3 uWarm;
  varying float vElev;
  varying float vRidge;
  varying float vRand;

  void main() {
    // Round sprite
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, r);

    float lift = smoothstep(-0.4, 0.75, vElev);
    vec3 col = mix(uBase, uAccent, lift * 0.85);
    col = mix(col, uWarm, vRidge * smoothstep(0.4, 0.9, vRand) * 0.7);
    col = mix(col, uAccent, vRidge * 0.55);

    float alpha = soft * (0.16 + lift * 0.5 + vRidge * 0.35);
    gl_FragColor = vec4(col, alpha);
  }
`;

function DataField() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointerWorld = useRef(new THREE.Vector3(100, 0, 100));
  const smoothed = useRef(new THREE.Vector2(100, 100));
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const { camera, pointer } = useThree();

  const { positions, rands } = useMemo(() => {
    const positions = new Float32Array(COLS * ROWS * 3);
    const rands = new Float32Array(COLS * ROWS);
    // Deterministic LCG instead of Math.random keeps this render-pure.
    let seed = 1337;
    const next = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 2 ** 32;
    };
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * SPAN_X;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = (r / (ROWS - 1) - 0.5) * SPAN_Z;
        rands[i] = next();
        i++;
      }
    }
    return { positions, rands };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(100, 100) },
      uPx: { value: 1.25 },
      uBase: { value: new THREE.Color("#2e2e35") },
      uAccent: { value: new THREE.Color("#d6ff3f") },
      uWarm: { value: new THREE.Color("#ff5e3a") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    mat.uniforms.uPx.value = Math.min(state.viewport.dpr, 1.5);

    // Project the pointer onto the field's plane so the ripple tracks it.
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, pointerWorld.current)) {
      smoothed.current.lerp(
        new THREE.Vector2(pointerWorld.current.x, pointerWorld.current.z),
        0.06,
      );
      mat.uniforms.uPointer.value.copy(smoothed.current);
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  useFrame(({ camera, pointer }) => {
    // Gentle parallax: the camera leans toward the pointer.
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.1 - pointer.y * 0.3, 0.03);
    camera.lookAt(0, -0.2, 0);
  });
  return null;
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 2.1, 6.4], fov: 42 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <DataField />
      <Rig />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
