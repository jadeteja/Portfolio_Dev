'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion, useDeviceTier } from './useDeviceTier';

export default function AmbientParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isLowPower, dpr } = useDeviceTier();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    const updateDimensions = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(dpr, 1.5));
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5;

    updateDimensions();

    const count = isMobile ? 35 : isLowPower ? 60 : 110;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(0xff6b00); // Brand Orange
    const c2 = new THREE.Color(0x38bdf8); // Sky blue
    const c3 = new THREE.Color(0xfbbf24); // Amber

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const c = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        const t = clock.getElapsedTime();
        points.rotation.y = t * 0.02;
        points.rotation.x = Math.sin(t * 0.015) * 0.03;
      }
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', updateDimensions);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion, isMobile, isLowPower, dpr]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
