'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion, useDeviceTier } from './useDeviceTier';

export default function AboutDeskCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isLowPower, dpr } = useDeviceTier();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.6, 4.4);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(amb);

    const orangeKey = new THREE.DirectionalLight(0xff6b00, 2.5);
    orangeKey.position.set(3, 4, 3);
    scene.add(orangeKey);

    const blueFill = new THREE.PointLight(0x38bdf8, 2, 8);
    blueFill.position.set(-3, -1, 2);
    scene.add(blueFill);

    // Desk Base Surface
    const deskGeo = new THREE.BoxGeometry(2.4, 0.06, 1.2);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.6,
      roughness: 0.3,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, -0.65, 0);
    rootGroup.add(desk);

    // Curved Desktop Monitor
    const standPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
    const standPole = new THREE.Mesh(standPoleGeo, standMat);
    standPole.position.set(0, -0.38, -0.2);
    rootGroup.add(standPole);

    const standBaseGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 24);
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.set(0, -0.62, -0.2);
    rootGroup.add(standBase);

    // Monitor Panel
    const monitorGeo = new THREE.BoxGeometry(1.8, 1.05, 0.04);
    const monitorFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const monitor = new THREE.Mesh(monitorGeo, monitorFrameMat);
    monitor.position.set(0, 0.05, -0.2);
    rootGroup.add(monitor);

    // Glowing Screen on Monitor
    const screenGeo = new THREE.PlaneGeometry(1.72, 0.97);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0.05, -0.178);
    rootGroup.add(screen);

    // Mini Mechanical Keyboard
    const kbGeo = new THREE.BoxGeometry(1.0, 0.03, 0.35);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.position.set(-0.1, -0.61, 0.2);
    rootGroup.add(kb);

    // Mini Mouse
    const mouseGeo = new THREE.BoxGeometry(0.12, 0.04, 0.18);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.3 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(0.65, -0.61, 0.2);
    rootGroup.add(mouse);

    // Floating Code Icon Panels (3D Floating badges)
    const badgeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.04);
    const orangeBadgeMat = new THREE.MeshStandardMaterial({ color: 0xff6b00, roughness: 0.2, metalness: 0.5 });
    const cyanBadgeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.5 });
    const emeraldBadgeMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, metalness: 0.5 });

    const badge1 = new THREE.Mesh(badgeGeo, orangeBadgeMat);
    badge1.position.set(-1.1, 0.7, 0.2);
    badge1.rotation.set(0.2, 0.3, -0.1);
    rootGroup.add(badge1);

    const badge2 = new THREE.Mesh(badgeGeo, cyanBadgeMat);
    badge2.position.set(1.15, 0.65, 0.1);
    badge2.rotation.set(-0.2, -0.3, 0.1);
    rootGroup.add(badge2);

    const badge3 = new THREE.Mesh(badgeGeo, emeraldBadgeMat);
    badge3.position.set(0, 0.95, -0.1);
    badge3.scale.set(0.8, 0.8, 0.8);
    rootGroup.add(badge3);

    // Gentle orbital animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        const t = clock.getElapsedTime();
        rootGroup.rotation.y = Math.sin(t * 0.6) * 0.15;
        badge1.position.y = 0.7 + Math.sin(t * 1.5) * 0.06;
        badge2.position.y = 0.65 + Math.cos(t * 1.3) * 0.06;
        badge3.position.y = 0.95 + Math.sin(t * 1.8) * 0.04;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      deskGeo.dispose();
      deskMat.dispose();
      standPoleGeo.dispose();
      standBaseGeo.dispose();
      standMat.dispose();
      monitorGeo.dispose();
      monitorFrameMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      kbGeo.dispose();
      kbMat.dispose();
      mouseGeo.dispose();
      mouseMat.dispose();
      badgeGeo.dispose();
      orangeBadgeMat.dispose();
      cyanBadgeMat.dispose();
      emeraldBadgeMat.dispose();
      renderer.dispose();
    };
  }, [prefersReducedMotion, isLowPower, dpr]);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 sm:h-80 flex items-center justify-center pointer-events-none select-none"
    />
  );
}
