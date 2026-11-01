'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Monitor, Smartphone, Layers, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

// Dynamically import 3D Canvas scenes with SSR disabled for optimal Next.js client-only hydration
const HeroWorkspaceCanvas = dynamic(
  () => import('@/components/3d/HeroWorkspaceCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl border-4 border-[#FF6B00]/30 border-t-[#FF6B00] animate-spin" />
          <span className="text-xs text-[#FF6B00] font-semibold tracking-wide">
            Initializing 3D Workspace...
          </span>
        </div>
      </div>
    ),
  }
);

const AmbientParticlesCanvas = dynamic(
  () => import('@/components/3d/AmbientParticlesCanvas'),
  { ssr: false }
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's system preferences for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Coordinated timeline for cinematic entrance on initial load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge-pill',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          '.hero-headline-word',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtext',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-action-btn',
          { scale: 0.9, y: 15, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
          '-=0.3'
        )
        .fromTo(
          '.hero-highlight-card',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          '.hero-3d-wrapper',
          { scale: 0.88, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'expo.out' },
          '-=0.9'
        )
        .fromTo(
          '.hero-float-badge',
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      // Continuous gentle floating animation for badges
      gsap.to('.hero-float-badge', {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full pt-8 pb-16 lg:py-20 overflow-hidden bg-transparent transition-colors duration-200"
    >
      {/* 3D Atmospheric Background Particles */}
      <AmbientParticlesCanvas />

      {/* Decorative background glow rings */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFF3E8] dark:bg-brand-orange/15 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-100/40 dark:bg-sky-500/10 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Actions, Highlights */}
          <div ref={leftColRef} className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center">
            {/* Desktop Pill Badge */}
            <div className="hero-badge-pill hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              TURNING YOUR IDEAS INTO POWERFUL DIGITAL EXPERIENCES
            </div>

            {/* Mobile Pill Badge */}
            <div className="hero-badge-pill sm:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-[11px] font-bold tracking-wide w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              Your Idea. My Code. Our Success.
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-[#1F2937] dark:text-gray-100 leading-[1.14] tracking-tight mb-5">
              <span className="hero-headline-word inline-block mr-2">I</span>
              <span className="hero-headline-word inline-block mr-2">Build</span>
              <span className="hero-headline-word inline-block mr-2">Websites</span>
              <span className="hero-headline-word inline-block mr-2">&amp;</span>
              <span className="hero-headline-word text-[#FF6B00] inline-block mr-2">
                Android Apps
              </span>
              <span className="hero-headline-word inline-block mr-2">That</span>
              <span className="hero-headline-word inline-block mr-2">Grow</span>
              <span className="hero-headline-word inline-block mr-2">Your</span>
              <span className="hero-headline-word inline-block">Business</span>
            </h1>

            {/* Subtitle Description */}
            <p className="hero-subtext text-base sm:text-lg text-[#6B7280] dark:text-gray-300 leading-relaxed max-w-xl mb-7 sm:mb-8">
              Affordable, modern, responsive, and scalable digital solutions crafted with clean code and transparent pricing starting at just{' '}
              <span className="font-bold text-[#1F2937] dark:text-gray-100">₹5,000</span>.
            </p>

            {/* CTA Buttons with Magnetic Hover feel */}
            <div className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-12">
              <Link
                href="/contact"
                className="hero-action-btn group relative flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all overflow-hidden cursor-pointer pointer-events-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/portfolio"
                className="hero-action-btn flex items-center justify-center px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border-2 border-[#E5E7EB] dark:border-gray-800 text-[#1F2937] dark:text-gray-200 font-bold text-base hover:border-[#FF6B00] hover:text-[#FF6B00] hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer pointer-events-auto shadow-sm"
              >
                View My Work
              </Link>
            </div>

            {/* Desktop Three Service Highlights */}
            <div className="hidden md:grid grid-cols-3 gap-6 pt-8 border-t border-[#F3F4F6] dark:border-gray-800">
              <div className="hero-highlight-card flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] dark:bg-brand-orange/15 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] dark:text-gray-100">Website Dev</h4>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">High-Speed &amp; Responsive</p>
                </div>
              </div>

              <div className="hero-highlight-card flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] dark:bg-brand-orange/15 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] dark:text-gray-100">Android Apps</h4>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">Native &amp; Robust Code</p>
                </div>
              </div>

              <div className="hero-highlight-card flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] dark:bg-brand-orange/15 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937] dark:text-gray-100">Deployment &amp; Care</h4>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">Full Cloud Setup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Cinematic 3D Developer Workspace */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 xl:col-span-5 relative flex flex-col items-center justify-center mt-4 lg:mt-0 w-full"
          >
            {/* Outer Container with Floating Badges */}
            <div className="hero-3d-wrapper relative w-full aspect-square max-w-[420px] sm:max-w-[480px] lg:max-w-none rounded-3xl bg-gradient-to-b from-[#FFF7ED]/70 via-white/80 to-[#FFF7ED]/40 dark:from-gray-900/80 dark:via-gray-950/90 dark:to-gray-900/70 backdrop-blur-xl border border-[#FFE0C2]/80 dark:border-brand-orange/30 shadow-2xl p-2 sm:p-4 flex items-center justify-center">
              {/* Floating Top-Right Pricing Badge (Desktop) */}
              <div className="hero-float-badge hidden sm:flex absolute -top-5 -right-3 z-30 items-center gap-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#FFE0C2] dark:border-brand-orange/30 shadow-xl pointer-events-auto hover:scale-105 transition-transform">
                <div className="w-8 h-8 rounded-xl bg-[#FFF3E8] dark:bg-brand-orange/15 text-[#FF6B00] font-black flex items-center justify-center text-sm shadow-sm">
                  ₹
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#6B7280] dark:text-gray-400">
                    Affordable Starting
                  </span>
                  <span className="text-xs font-black text-[#1F2937] dark:text-gray-100">
                    ₹5,000 Only
                  </span>
                </div>
              </div>

              {/* 3D WebGL Canvas Scene (Laptop + Smartphone + Particles) */}
              <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] flex items-center justify-center overflow-hidden rounded-2xl pointer-events-none">
                <HeroWorkspaceCanvas />
              </div>

              {/* Floating Bottom-Left Availability Badge (Desktop) */}
              <div className="hero-float-badge hidden sm:flex absolute -bottom-5 -left-3 z-30 items-center gap-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E5E7EB] dark:border-gray-800 shadow-xl pointer-events-auto hover:scale-105 transition-transform">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#1F2937] dark:text-gray-100">
                    Fast Turnaround
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Active for New Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Service Badges Below 3D Scene */}
            <div className="md:hidden flex items-center justify-center gap-2 sm:gap-3 mt-6 w-full">
              <span className="flex-1 max-w-[110px] py-2 px-2.5 rounded-xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-xs font-medium text-[#1F2937] dark:text-gray-100 shadow-sm text-center flex items-center justify-center gap-1.5 whitespace-nowrap">
                🌐 Web Dev
              </span>
              <span className="flex-1 max-w-[110px] py-2 px-2.5 rounded-xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-xs font-medium text-[#1F2937] dark:text-gray-100 shadow-sm text-center flex items-center justify-center gap-1.5 whitespace-nowrap">
                📱 Android
              </span>
              <span className="flex-1 max-w-[110px] py-2 px-2.5 rounded-xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-xs font-medium text-[#1F2937] dark:text-gray-100 shadow-sm text-center flex items-center justify-center gap-1.5 whitespace-nowrap">
                🚀 Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-16 text-[#9CA3AF] dark:text-gray-400">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] dark:text-gray-400 mb-2">
            SCROLL DOWN
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#D1D5DB] dark:border-gray-700 flex justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#FF6B00] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
