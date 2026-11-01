'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion, useDeviceTier } from './useDeviceTier';

export default function HomeSkyStarsBackground() {
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
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(dpr, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 1;

    // -------------------------------------------------------------
    // 1. MULTI-LAYER STAR FIELD (Deep Galaxy + Twinkling Foreground)
    // -------------------------------------------------------------
    const starCount = isMobile ? 350 : isLowPower ? 600 : 1200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    // Warm interstellar palette (Orange, Golden Amber, Cyan, Crisp White)
    const cWhite = new THREE.Color(0xffffff);
    const cOrange = new THREE.Color(0xff6b00);
    const cCyan = new THREE.Color(0x7dd3fc);
    const cAmber = new THREE.Color(0xfcd34d);

    for (let i = 0; i < starCount; i++) {
      // Spherical distribution around user
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 80 + 10;

      const sinPhi = Math.sin(phi);
      starPositions[i * 3] = r * sinPhi * Math.cos(theta);
      starPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorPick = Math.random();
      let chosenColor = cWhite;
      if (colorPick < 0.25) chosenColor = cOrange;
      else if (colorPick < 0.5) chosenColor = cCyan;
      else if (colorPick < 0.7) chosenColor = cAmber;

      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Custom Canvas Texture for soft glowing circular star discs
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    if (starCtx) {
      const gradient = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.85)');
      gradient.addColorStop(0.5, 'rgba(255,160,80,0.4)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.9 : 1.3,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // -------------------------------------------------------------
    // 2. SHOOTING STARS / METEORS
    // -------------------------------------------------------------
    const meteorCount = isMobile ? 3 : 6;
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);

    interface Meteor {
      line: THREE.Line;
      speed: number;
      reset: () => void;
    }

    const meteors: Meteor[] = [];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffedd5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < meteorCount; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(6); // 2 vertices (start & end)
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const line = new THREE.Line(lineGeo, lineMat);
      meteorGroup.add(line);

      let x = 0;
      let y = 0;
      let z = 0;
      let speed = 0.6 + Math.random() * 0.8;
      const length = 4 + Math.random() * 3;

      const reset = () => {
        x = (Math.random() - 0.5) * 60 + 20;
        y = Math.random() * 30 + 15;
        z = -(Math.random() * 40 + 10);
        speed = 0.5 + Math.random() * 0.7;
      };

      reset();

      meteors.push({
        line,
        speed,
        reset,
      });
    }

    // -------------------------------------------------------------
    // 3. NEBULA CLOUD GLOW (Soft atmospheric cosmic dust)
    // -------------------------------------------------------------
    const nebulaCanvas = document.createElement('canvas');
    nebulaCanvas.width = 128;
    nebulaCanvas.height = 128;
    const nebCtx = nebulaCanvas.getContext('2d');
    if (nebCtx) {
      const radGrad = nebCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      radGrad.addColorStop(0, 'rgba(255, 107, 0, 0.45)');
      radGrad.addColorStop(0.4, 'rgba(56, 189, 248, 0.2)');
      radGrad.addColorStop(0.8, 'rgba(15, 23, 42, 0.05)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      nebCtx.fillStyle = radGrad;
      nebCtx.fillRect(0, 0, 128, 128);
    }
    const nebulaTexture = new THREE.CanvasTexture(nebulaCanvas);

    const nebulaGeo = new THREE.PlaneGeometry(55, 55);
    const nebulaMat = new THREE.MeshBasicMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 0, -45);
    scene.add(nebula);

    // -------------------------------------------------------------
    // 4. ANIMATION LOOP & MOUSE PARALLAX
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

        // Parallax easing
        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        // Slow cosmic rotation
        starField.rotation.y = elapsedTime * 0.012 + mouseX * 0.08;
        starField.rotation.x = Math.sin(elapsedTime * 0.01) * 0.02 - mouseY * 0.06;

        nebula.rotation.z = elapsedTime * 0.008;

        // Twinkle star sizes through opacity breathing
        starMat.opacity = 0.75 + Math.sin(elapsedTime * 1.8) * 0.15;

        // Update shooting stars / meteors
        meteors.forEach((m) => {
          const posAttr = m.line.geometry.attributes.position as THREE.BufferAttribute;
          const posArray = posAttr.array as Float32Array;

          // Head pos
          posArray[0] -= m.speed;
          posArray[1] -= m.speed * 0.75;
          // Tail pos
          posArray[3] = posArray[0] + m.speed * 4;
          posArray[4] = posArray[1] + m.speed * 3;

          posAttr.needsUpdate = true;

          // If off-screen bottom-left, reset
          if (posArray[0] < -40 || posArray[1] < -30) {
            m.reset();
            posArray[0] = (Math.random() - 0.5) * 60 + 20;
            posArray[1] = Math.random() * 30 + 15;
            posArray[2] = -(Math.random() * 40 + 10);
            posArray[3] = posArray[0];
            posArray[4] = posArray[1];
            posArray[5] = posArray[2];
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);

      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      nebulaTexture.dispose();
      lineMat.dispose();
      meteors.forEach((m) => m.line.geometry.dispose());
      renderer.dispose();
    };
  }, [prefersReducedMotion, isMobile, isLowPower, dpr]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-40 overflow-hidden"
      aria-hidden="true"
    />
  );
}
