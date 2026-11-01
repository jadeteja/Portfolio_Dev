'use client';

import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function InteractiveTouchCursor() {
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect if device supports precise cursor (mouse / trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsDesktopPointer(hasFinePointer);

    // Touch Ripple Trigger
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
        size: Math.floor(Math.random() * 20) + 45,
      };

      setRipples((prev) => [...prev.slice(-6), newRipple]);
    };

    // Desktop Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Desktop Click Ripple & Squeeze
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: 38,
      };
      setRipples((prev) => [...prev.slice(-6), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    if (hasFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mousedown', handleMouseDown, { passive: true });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Remove individual ripples after animation duration
  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* 1. Touch & Click Ripple Animations */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={() => removeRipple(ripple.id)}
          className="absolute rounded-full border border-[#FF6B00] bg-[#FF6B00]/25 dark:bg-[#FF6B00]/30 animate-ping-once"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* 2. Desktop Glowing Dual-Ring Cursor */}
      {isDesktopPointer && (
        <>
          {/* Inner Sharp Dot */}
          <div
            className={`fixed w-2.5 h-2.5 rounded-full bg-[#FF6B00] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out shadow-sm ${
              isClicked ? 'scale-75' : isHovered ? 'scale-150 bg-[#FF8C42]' : 'scale-100'
            }`}
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />

          {/* Outer Smooth Lag Ring */}
          <div
            className={`fixed rounded-full border border-[#FF6B00]/60 dark:border-brand-orange/70 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out backdrop-blur-[0.5px] ${
              isHovered
                ? 'w-10 h-10 bg-[#FF6B00]/10 border-[#FF6B00] scale-110'
                : isClicked
                ? 'w-7 h-7 bg-[#FF6B00]/20 scale-90'
                : 'w-8 h-8'
            }`}
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
            }}
          />
        </>
      )}
    </div>
  );
}
