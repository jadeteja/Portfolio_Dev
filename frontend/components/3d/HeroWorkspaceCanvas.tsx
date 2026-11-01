'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion, useDeviceTier } from './useDeviceTier';

export default function HeroWorkspaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, isLowPower, dpr } = useDeviceTier();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Safety check for WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isLowPower,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);

    // Root Pivot for smooth mouse parallax
    const rootPivot = new THREE.Group();
    scene.add(rootPivot);

    // -------------------------------------------------------------
    // LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Primary Brand Orange Key Light
    const orangeLight = new THREE.DirectionalLight(0xff6b00, 3.2);
    orangeLight.position.set(4, 5, 4);
    scene.add(orangeLight);

    // Cyan / Electric Blue Fill Light
    const cyanLight = new THREE.PointLight(0x38bdf8, 2.8, 12);
    cyanLight.position.set(-4, -1, 3);
    scene.add(cyanLight);

    // Subtle Amber Rim Light behind workspace
    const amberRimLight = new THREE.PointLight(0xff8c42, 2.5, 8);
    amberRimLight.position.set(0, 3, -3);
    scene.add(amberRimLight);

    // -------------------------------------------------------------
    // CANVAS TEXTURES (Code Editor Screen & Phone Screen)
    // -------------------------------------------------------------
    // Laptop Code Screen Canvas
    const codeCanvas = document.createElement('canvas');
    codeCanvas.width = 1024;
    codeCanvas.height = 640;
    const codeCtx = codeCanvas.getContext('2d');
    if (codeCtx) {
      // Dark slate background matching jade-teja-project.tsx theme
      codeCtx.fillStyle = '#0f172a';
      codeCtx.fillRect(0, 0, 1024, 640);

      // Title bar
      codeCtx.fillStyle = '#1e293b';
      codeCtx.fillRect(0, 0, 1024, 50);

      // Window control dots
      codeCtx.fillStyle = '#ef4444';
      codeCtx.beginPath();
      codeCtx.arc(32, 25, 7, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.fillStyle = '#f59e0b';
      codeCtx.beginPath();
      codeCtx.arc(56, 25, 7, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.fillStyle = '#10b981';
      codeCtx.beginPath();
      codeCtx.arc(80, 25, 7, 0, Math.PI * 2);
      codeCtx.fill();

      // Tab Title
      codeCtx.font = 'bold 18px Inter, sans-serif';
      codeCtx.fillStyle = '#94a3b8';
      codeCtx.fillText('App.tsx — Jade Teja Workspace', 115, 32);

      // Code Lines
      codeCtx.font = 'bold 22px Fira Code, monospace, monospace';
      const lines = [
        { text: "import { Developer, AndroidApp, WebPlatform } from '@jade-teja/core';", color: '#93c5fd' },
        { text: '', color: '#fff' },
        { text: 'export const JadeTejaPortfolio = () => {', color: '#f43f5e' },
        { text: '  const stack = ["Next.js 15", "React Three Fiber", "Kotlin", "GSAP 3"];', color: '#38bdf8' },
        { text: '  const startingRate = "₹5,000 Starting";', color: '#34d399' },
        { text: '  const mission = "Your Idea. My Code. Our Success.";', color: '#fbbf24' },
        { text: '', color: '#fff' },
        { text: '  return <HighPerformanceApp experience="Premium 3D" status="Available" />;', color: '#f97316' },
        { text: '};', color: '#f43f5e' },
      ];

      lines.forEach((line, idx) => {
        if (!line.text) return;
        codeCtx.fillStyle = line.color;
        codeCtx.fillText(line.text, 40, 100 + idx * 48);
      });
    }

    const codeTexture = new THREE.CanvasTexture(codeCanvas);
    codeTexture.generateMipmaps = true;
    codeTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // Phone Screen Canvas (Android Dashboard Mockup)
    const phoneCanvas = document.createElement('canvas');
    phoneCanvas.width = 512;
    phoneCanvas.height = 960;
    const phoneCtx = phoneCanvas.getContext('2d');
    if (phoneCtx) {
      phoneCtx.fillStyle = '#020617';
      phoneCtx.fillRect(0, 0, 512, 960);

      // Status Bar
      phoneCtx.fillStyle = '#ff6b00';
      phoneCtx.fillRect(0, 0, 512, 10);

      // App Header
      phoneCtx.fillStyle = '#1e1b4b';
      phoneCtx.beginPath();
      phoneCtx.roundRect(24, 40, 464, 110, 24);
      phoneCtx.fill();

      phoneCtx.font = 'bold 28px Inter, sans-serif';
      phoneCtx.fillStyle = '#ffedd5';
      phoneCtx.fillText('Android Native App', 50, 85);

      phoneCtx.font = '20px Inter, sans-serif';
      phoneCtx.fillStyle = '#fb923c';
      phoneCtx.fillText('Clean Architecture • Kotlin Jetpack', 50, 120);

      // Metric Card 1
      phoneCtx.fillStyle = '#0f172a';
      phoneCtx.beginPath();
      phoneCtx.roundRect(24, 180, 464, 160, 24);
      phoneCtx.fill();

      phoneCtx.font = 'bold 36px Inter, sans-serif';
      phoneCtx.fillStyle = '#10b981';
      phoneCtx.fillText('₹5,000', 50, 240);

      phoneCtx.font = '20px Inter, sans-serif';
      phoneCtx.fillStyle = '#94a3b8';
      phoneCtx.fillText('Affordable transparent entry budget', 50, 290);

      // Metric Card 2 (Active Projects)
      phoneCtx.fillStyle = '#18181b';
      phoneCtx.beginPath();
      phoneCtx.roundRect(24, 370, 464, 200, 24);
      phoneCtx.fill();

      phoneCtx.font = 'bold 24px Inter, sans-serif';
      phoneCtx.fillStyle = '#ffffff';
      phoneCtx.fillText('100% Direct Delivery', 50, 420);

      phoneCtx.fillStyle = '#ff6b00';
      phoneCtx.fillRect(50, 450, 360, 10);

      phoneCtx.font = '18px Inter, sans-serif';
      phoneCtx.fillStyle = '#38bdf8';
      phoneCtx.fillText('Fast Turnaround & Launch', 50, 510);

      // Interactive Action Button
      phoneCtx.fillStyle = '#ea580c';
      phoneCtx.beginPath();
      phoneCtx.roundRect(24, 820, 464, 90, 28);
      phoneCtx.fill();

      phoneCtx.font = 'bold 26px Inter, sans-serif';
      phoneCtx.fillStyle = '#ffffff';
      phoneCtx.fillText('Connect on WhatsApp →', 90, 876);
    }

    const phoneTexture = new THREE.CanvasTexture(phoneCanvas);
    phoneTexture.generateMipmaps = true;
    phoneTexture.minFilter = THREE.LinearMipmapLinearFilter;

    // -------------------------------------------------------------
    // 3D LAPTOP MODEL (Futuristic Brushed Aluminum + Glass Screen)
    // -------------------------------------------------------------
    const laptopGroup = new THREE.Group();
    rootPivot.add(laptopGroup);

    // Aluminum Base Chassis
    const baseGeo = new THREE.BoxGeometry(2.6, 0.08, 1.8);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x242b35,
      metalness: 0.85,
      roughness: 0.25,
    });
    const laptopBase = new THREE.Mesh(baseGeo, metalMat);
    laptopGroup.add(laptopBase);

    // Keyboard Inset
    const kbGeo = new THREE.PlaneGeometry(2.1, 0.9);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.3,
    });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.rotation.x = -Math.PI / 2;
    keyboard.position.set(0, 0.045, -0.15);
    laptopGroup.add(keyboard);

    // Trackpad
    const padGeo = new THREE.PlaneGeometry(0.75, 0.45);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.6,
    });
    const trackpad = new THREE.Mesh(padGeo, padMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.045, 0.55);
    laptopGroup.add(trackpad);

    // Laptop Display Lid Pivot
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.04, -0.88);
    laptopGroup.add(lidGroup);

    // Lid Back Panel
    const lidBackGeo = new THREE.BoxGeometry(2.6, 1.65, 0.06);
    const lidBack = new THREE.Mesh(lidBackGeo, metalMat);
    lidBack.position.set(0, 0.82, 0);
    lidGroup.add(lidBack);

    // Glowing Orange Logo on back of lid
    const logoGeo = new THREE.CircleGeometry(0.12, 32);
    const logoMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      side: THREE.DoubleSide,
    });
    const backLogo = new THREE.Mesh(logoGeo, logoMat);
    backLogo.position.set(0, 0.82, -0.035);
    lidGroup.add(backLogo);

    // Screen Bezel & Canvas Display
    const screenGeo = new THREE.PlaneGeometry(2.45, 1.5);
    const screenMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.82, 0.032);
    lidGroup.add(screen);

    // Tilt the lid open to 105 degrees
    lidGroup.rotation.x = THREE.MathUtils.degToRad(15);

    // Laptop Initial Transform
    laptopGroup.position.set(-0.55, -0.3, 0);
    laptopGroup.rotation.set(THREE.MathUtils.degToRad(14), THREE.MathUtils.degToRad(22), THREE.MathUtils.degToRad(-4));

    // -------------------------------------------------------------
    // 3D FLOATING SMARTPHONE (Android Device)
    // -------------------------------------------------------------
    const phoneGroup = new THREE.Group();
    rootPivot.add(phoneGroup);

    // Phone Body
    const phoneBodyGeo = new THREE.BoxGeometry(0.85, 1.68, 0.07);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phoneGroup.add(phoneBody);

    // Phone Edge Bumper (Brand Orange metallic rim)
    const phoneBumperGeo = new THREE.BoxGeometry(0.87, 1.7, 0.04);
    const phoneBumperMat = new THREE.MeshStandardMaterial({
      color: 0xff6b00,
      metalness: 0.8,
      roughness: 0.3,
    });
    const phoneBumper = new THREE.Mesh(phoneBumperGeo, phoneBumperMat);
    phoneGroup.add(phoneBumper);

    // Phone Screen Display
    const phoneScreenGeo = new THREE.PlaneGeometry(0.8, 1.58);
    const phoneScreenMat = new THREE.MeshBasicMaterial({
      map: phoneTexture,
    });
    const phoneScreen = new THREE.Mesh(phoneScreenGeo, phoneScreenMat);
    phoneScreen.position.set(0, 0, 0.038);
    phoneGroup.add(phoneScreen);

    // Floating position for phone (hovering to the right and slightly in front)
    phoneGroup.position.set(1.5, 0.1, 0.75);
    phoneGroup.rotation.set(THREE.MathUtils.degToRad(-10), THREE.MathUtils.degToRad(-24), THREE.MathUtils.degToRad(12));

    // -------------------------------------------------------------
    // FLOATING CODE BADGES & ABSTRACT 3D SHAPES
    // -------------------------------------------------------------
    // Orbital Glowing Rings
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.012, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    ring1.position.set(0, -0.2, -0.4);
    rootPivot.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.008, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 6;
    ring2.position.set(0, 0, -0.8);
    rootPivot.add(ring2);

    // Floating Glass Polyhedrons / Crystals (Orange & Cyan)
    const octaGeo = new THREE.OctahedronGeometry(0.24, 0);
    const orangeGlassMat = new THREE.MeshStandardMaterial({
      color: 0xff8c42,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
    });
    const cyanGlassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.2,
      roughness: 0.15,
      transparent: true,
      opacity: 0.8,
    });

    const crystal1 = new THREE.Mesh(octaGeo, orangeGlassMat);
    crystal1.position.set(-2.2, 1.2, 0.3);
    rootPivot.add(crystal1);

    const crystal2 = new THREE.Mesh(octaGeo, cyanGlassMat);
    crystal2.scale.set(0.7, 0.7, 0.7);
    crystal2.position.set(2.1, 1.4, 0.1);
    rootPivot.add(crystal2);

    const icosaGeo = new THREE.IcosahedronGeometry(0.18, 0);
    const crystal3 = new THREE.Mesh(icosaGeo, orangeGlassMat);
    crystal3.position.set(0.8, -1.3, 0.5);
    rootPivot.add(crystal3);

    // Floating Cylinder Node
    const cylGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24);
    const cylMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.6,
      roughness: 0.3,
    });
    const nodeCyl = new THREE.Mesh(cylGeo, cylMat);
    nodeCyl.position.set(-1.8, -1.1, 0.6);
    nodeCyl.rotation.x = Math.PI / 4;
    rootPivot.add(nodeCyl);

    // -------------------------------------------------------------
    // FLOATING PARTICLES (Glowing Atmospheric Dust)
    // -------------------------------------------------------------
    const particleCount = isLowPower || isMobile ? 65 : 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOrange = new THREE.Color(0xff6b00);
    const colorAmber = new THREE.Color(0xffb703);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const pColor = i % 3 === 0 ? colorOrange : i % 3 === 1 ? colorCyan : colorAmber;
      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.05 : 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
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

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous subtle floating for Laptop
        laptopGroup.position.y = -0.3 + Math.sin(elapsedTime * 1.2) * 0.06;
        laptopGroup.rotation.y = THREE.MathUtils.degToRad(22) + mouseX * 0.15;
        laptopGroup.rotation.x = THREE.MathUtils.degToRad(14) - mouseY * 0.12;

        // Continuous floating for Phone (counter-phase for organic feel)
        phoneGroup.position.y = 0.1 + Math.cos(elapsedTime * 1.4) * 0.08;
        phoneGroup.position.x = 1.5 + Math.sin(elapsedTime * 0.8) * 0.03;
        phoneGroup.rotation.y = THREE.MathUtils.degToRad(-24) + mouseX * 0.22;
        phoneGroup.rotation.x = THREE.MathUtils.degToRad(-10) - mouseY * 0.18;

        // Crystals Slow Gentle Rotation
        crystal1.rotation.x = elapsedTime * 0.5;
        crystal1.rotation.y = elapsedTime * 0.7;
        crystal1.position.y = 1.2 + Math.sin(elapsedTime * 1.5) * 0.09;

        crystal2.rotation.x = -elapsedTime * 0.6;
        crystal2.rotation.z = elapsedTime * 0.4;
        crystal2.position.y = 1.4 + Math.cos(elapsedTime * 1.3) * 0.07;

        crystal3.rotation.y = elapsedTime * 0.8;
        nodeCyl.rotation.y = elapsedTime * 0.9;

        // Rings Rotation
        ring1.rotation.z = elapsedTime * 0.15;
        ring2.rotation.z = -elapsedTime * 0.1;

        // Particles gentle drift
        particles.rotation.y = elapsedTime * 0.03;
        particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

        // Scene pivot response
        rootPivot.rotation.y = mouseX * 0.08;
        rootPivot.rotation.x = -mouseY * 0.06;

        // Subtle dynamic light response to cursor
        orangeLight.position.x = 4 + mouseX * 1.5;
        orangeLight.position.y = 5 + mouseY * 1.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries & Materials
      baseGeo.dispose();
      metalMat.dispose();
      kbGeo.dispose();
      kbMat.dispose();
      padGeo.dispose();
      padMat.dispose();
      lidBackGeo.dispose();
      logoGeo.dispose();
      logoMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      codeTexture.dispose();

      phoneBodyGeo.dispose();
      phoneBodyMat.dispose();
      phoneBumperGeo.dispose();
      phoneBumperMat.dispose();
      phoneScreenGeo.dispose();
      phoneScreenMat.dispose();
      phoneTexture.dispose();

      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      octaGeo.dispose();
      orangeGlassMat.dispose();
      cyanGlassMat.dispose();
      icosaGeo.dispose();
      cylGeo.dispose();
      cylMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion, isMobile, isLowPower, dpr]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center pointer-events-none select-none"
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D Developer Workspace"
    />
  );
}
