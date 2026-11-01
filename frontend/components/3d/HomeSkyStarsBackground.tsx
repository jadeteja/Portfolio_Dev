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
    // 1. STAR FIELD (Bright, clearly visible cosmic starfield)
    // -------------------------------------------------------------
    const starCount = isMobile ? 500 : isLowPower ? 900 : 1600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cWhite = new THREE.Color(0xffffff);
    const cOrange = new THREE.Color(0xff6b00);
    const cSky = new THREE.Color(0x38bdf8);
    const cGold = new THREE.Color(0xfbbf24);

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 90 + 5;

      const sinPhi = Math.sin(phi);
      starPositions[i * 3] = r * sinPhi * Math.cos(theta);
      starPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const colorPick = Math.random();
      let chosenColor = cWhite;
      if (colorPick < 0.28) chosenColor = cOrange;
      else if (colorPick < 0.52) chosenColor = cSky;
      else if (colorPick < 0.72) chosenColor = cGold;

      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Circular glowing disc star texture
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const starCtx = starCanvas.getContext('2d');
    if (starCtx) {
      const gradient = starCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.25, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.6, 'rgba(255,160,80,0.5)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      starCtx.fillStyle = gradient;
      starCtx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 2.0,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // -------------------------------------------------------------
    // 2. SHOOTING METEORS / COMETS
    // -------------------------------------------------------------
    const meteorCount = isMobile ? 4 : 8;
    const meteorGroup = new THREE.Group();
    scene.add(meteorGroup);

    interface Meteor {
      line: THREE.Line;
      speed: number;
      reset: () => void;
    }

    const meteors: Meteor[] = [];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < meteorCount; i++) {
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(6);
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const line = new THREE.Line(lineGeo, lineMat);
      meteorGroup.add(line);

      let speed = 0.8 + Math.random() * 0.9;

      const reset = () => {
        speed = 0.8 + Math.random() * 0.9;
      };

      const meteor: Meteor = { line, speed, reset };
      meteors.push(meteor);

      // Initial randomized positions
      const p = line.geometry.attributes.position.array as Float32Array;
      p[0] = (Math.random() - 0.5) * 80 + 20;
      p[1] = Math.random() * 40 + 10;
      p[2] = -(Math.random() * 40 + 10);
      p[3] = p[0];
      p[4] = p[1];
      p[5] = p[2];
      line.geometry.attributes.position.needsUpdate = true;
    }

    // -------------------------------------------------------------
    // 3. NEBULA COSMIC SKY GLOW
    // -------------------------------------------------------------
    const nebCanvas = document.createElement('canvas');
    nebCanvas.width = 256;
    nebCanvas.height = 256;
    const nebCtx = nebCanvas.getContext('2d');
    if (nebCtx) {
      const radGrad = nebCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      radGrad.addColorStop(0, 'rgba(255, 107, 0, 0.45)');
      radGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.25)');
      radGrad.addColorStop(0.7, 'rgba(30, 41, 59, 0.1)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      nebCtx.fillStyle = radGrad;
      nebCtx.fillRect(0, 0, 256, 256);
    }
    const nebulaTexture = new THREE.CanvasTexture(nebCanvas);

    const nebulaGeo = new THREE.PlaneGeometry(80, 80);
    const nebulaMat = new THREE.MeshBasicMaterial({
      map: nebulaTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 0, -50);
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

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        starField.rotation.y = elapsedTime * 0.015 + mouseX * 0.08;
        starField.rotation.x = Math.sin(elapsedTime * 0.01) * 0.03 - mouseY * 0.06;

        nebula.rotation.z = elapsedTime * 0.01;
        starMat.opacity = 0.85 + Math.sin(elapsedTime * 2.2) * 0.15;

        meteors.forEach((m) => {
          const posAttr = m.line.geometry.attributes.position as THREE.BufferAttribute;
          const pos = posAttr.array as Float32Array;

          pos[0] -= m.speed * 1.2;
          pos[1] -= m.speed * 0.9;
          pos[3] = pos[0] + m.speed * 5.5;
          pos[4] = pos[1] + m.speed * 4.2;

          posAttr.needsUpdate = true;

          if (pos[0] < -50 || pos[1] < -40) {
            m.reset();
            pos[0] = (Math.random() - 0.5) * 80 + 30;
            pos[1] = Math.random() * 40 + 20;
            pos[2] = -(Math.random() * 40 + 10);
            pos[3] = pos[0];
            pos[4] = pos[1];
            pos[5] = pos[2];
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
