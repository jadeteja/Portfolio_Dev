'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect user reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return matches;
}

/**
 * Hook to classify device capability tier (for particle count, dpr, anti-aliasing)
 */
export function useDeviceTier(): { isMobile: boolean; isLowPower: boolean; dpr: number } {
  const [tier, setTier] = useState({
    isMobile: false,
    isLowPower: false,
    dpr: 1,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowPower = hardwareConcurrency <= 4 || isMobile;
    const dpr = Math.min(window.devicePixelRatio || 1, isLowPower ? 1.5 : 2);

    setTier({
      isMobile,
      isLowPower,
      dpr,
    });
  }, []);

  return tier;
}
