'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion, useDeviceTier } from './useDeviceTier';

export default function BackgroundMotionGraphics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isLowPower, dpr } = useDeviceTier();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(dpr, 1.5));
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(dpr, 1.5));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // FLOATING 3D GEOMETRIC CONSTELLATION
    // -------------------------------------------------------------
    const geomCount = isMobile ? 8 : 16;
    const geometries = [
      new THREE.IcosahedronGeometry(0.35, 0),
      new THREE.OctahedronGeometry(0.4, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.TorusGeometry(0.35, 0.04, 8, 24),
    ];

    const orangeWireMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const amberWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const meshes: { mesh: THREE.Mesh; speedX: number; speedY: number; floatOffset: number; initialY: number }[] = [];

    for (let i = 0; i < geomCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = i % 3 === 0 ? orangeWireMat : i % 3 === 1 ? cyanWireMat : amberWireMat;
      const mesh = new THREE.Mesh(geo, mat);

      // Distributed across screen viewport coordinates
      const posX = (Math.random() - 0.5) * 12;
      const posY = (Math.random() - 0.5) * 8;
      const posZ = (Math.random() - 0.5) * 4 - 1;

      mesh.position.set(posX, posY, posZ);
      rootGroup.add(mesh);

      meshes.push({
        mesh,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        initialY: posY,
      });
    }

    // -------------------------------------------------------------
    // ORBITAL GLOWING RINGS (Cybernetic Accent)
    // -------------------------------------------------------------
    const ringGeo = new THREE.RingGeometry(3.5, 3.52, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.12,
    });
    const bigRing = new THREE.Mesh(ringGeo, ringMat);
    bigRing.rotation.x = Math.PI / 3;
    bigRing.position.set(3, -1, -2);
    rootGroup.add(bigRing);

    const ringGeo2 = new THREE.RingGeometry(4.8, 4.815, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.08,
    });
    const bigRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    bigRing2.rotation.y = Math.PI / 4;
    bigRing2.rotation.x = -Math.PI / 5;
    bigRing2.position.set(-3.5, 1.5, -3);
    rootGroup.add(bigRing2);

    // -------------------------------------------------------------
    // COSMIC AMBIENT PARTICLES
    // -------------------------------------------------------------
    const particleCount = isMobile ? 50 : isLowPower ? 90 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cOrange = new THREE.Color(0xff6b00);
    const cCyan = new THREE.Color(0x38bdf8);
    const cAmber = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = i % 3 === 0 ? cOrange : i % 3 === 1 ? cCyan : cAmber;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // INTERACTION & ANIMATION LOOP
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        const elapsedTime = clock.getElapsedTime();

        // Parallax damping
        mouseX += (targetMouseX - mouseX) * 0.03;
        mouseY += (targetMouseY - mouseY) * 0.03;

        rootGroup.rotation.y = mouseX * 0.08 + Math.sin(elapsedTime * 0.08) * 0.05;
        rootGroup.rotation.x = -mouseY * 0.06 + Math.cos(elapsedTime * 0.06) * 0.04;

        // Animate each geometric shape
        meshes.forEach((item) => {
          item.mesh.rotation.x += item.speedX * 0.02;
          item.mesh.rotation.y += item.speedY * 0.02;
          item.mesh.position.y = item.initialY + Math.sin(elapsedTime * 0.8 + item.floatOffset) * 0.25;
        });

        // Rings slow rotation
        bigRing.rotation.z = elapsedTime * 0.05;
        bigRing2.rotation.z = -elapsedTime * 0.04;

        // Particles gentle drift
        particles.rotation.y = elapsedTime * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);

      geometries.forEach((g) => g.dispose());
      orangeWireMat.dispose();
      cyanWireMat.dispose();
      amberWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion, isMobile, isLowPower, dpr]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
