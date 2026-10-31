'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Layers, CheckCircle2, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for headline, description, and buttons
      gsap.from('.hero-anim-item', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Floating badges gentle bobbing
      gsap.to('.hero-float-badge', {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full pt-8 pb-16 lg:py-20 overflow-hidden bg-white">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFF3E8] rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Copy, Actions, Highlights */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center">
            {/* Desktop Pill Badge */}
            <div className="hero-anim-item hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              TURNING YOUR IDEAS INTO POWERFUL DIGITAL EXPERIENCES
            </div>

            {/* Mobile Pill Badge */}
            <div className="hero-anim-item sm:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-[11px] font-bold tracking-wide w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              Your Idea. My Code. Our Success.
            </div>

            {/* Main Headline */}
            <h1 className="hero-anim-item text-4xl sm:text-5xl lg:text-[56px] font-black text-[#1F2937] leading-[1.12] tracking-tight mb-5">
              I Build Websites &{' '}
              <span className="text-[#FF6B00] inline-block">Android Apps</span> That Grow Your Business
            </h1>

            {/* Subtitle Description */}
            <p className="hero-anim-item text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl mb-8">
              Affordable, modern, responsive, and scalable digital solutions crafted with clean code and transparent pricing starting at just{' '}
              <span className="font-bold text-[#1F2937]">₹5,000</span>.
            </p>

            {/* CTA Buttons */}
            <div className="hero-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center justify-center px-8 py-4 rounded-xl sm:rounded-2xl bg-white border-2 border-[#E5E7EB] text-[#1F2937] font-bold text-base hover:border-[#FF6B00] hover:text-[#FF6B00] active:scale-98 transition-all"
              >
                View My Work
              </Link>
            </div>

            {/* Desktop Three Service Highlights */}
            <div className="hero-anim-item hidden md:grid grid-cols-3 gap-6 pt-8 border-t border-[#F3F4F6]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] flex items-center justify-center text-[#FF6B00]">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937]">Website Dev</h4>
                  <p className="text-xs text-[#6B7280]">High-Speed & Responsive</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] flex items-center justify-center text-[#FF6B00]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937]">Android Apps</h4>
                  <p className="text-xs text-[#6B7280]">Native & Robust Code</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] flex items-center justify-center text-[#FF6B00]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F2937]">Deployment & Care</h4>
                  <p className="text-xs text-[#6B7280]">Full Cloud Setup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Illustration + Floating Badges */}
          <div ref={rightColRef} className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
            {/* Outer Decorative Container */}
            <div className="relative w-full max-w-lg p-4 sm:p-7 rounded-3xl bg-gradient-to-b from-[#FFF7ED] to-white border border-[#FFE0C2] shadow-sm">
              {/* Floating Top-Right Pricing Badge (Desktop) */}
              <div className="hero-float-badge hidden sm:flex absolute -top-5 -right-4 z-20 items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#FFE0C2] shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#FFF3E8] text-[#FF6B00] font-black flex items-center justify-center text-sm">
                  ₹
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-[#6B7280]">Affordable Starting</span>
                  <span className="text-xs font-black text-[#1F2937]">₹5,000 Only</span>
                </div>
              </div>

              {/* Code Editor Window */}
              <div className="w-full rounded-2xl bg-[#1E293B] text-white shadow-2xl overflow-hidden border border-slate-700/60 font-mono text-xs sm:text-[13px]">
                {/* Editor Header Bar */}
                <div className="bg-[#0F172A] px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                    <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-slate-400 text-xs font-sans tracking-wide">
                    jade-teja-project.tsx
                  </span>
                  <div className="w-8" />
                </div>

                {/* Editor Code Content */}
                <div className="p-5 sm:p-6 space-y-2 leading-relaxed">
                  <div className="text-slate-300">
                    <span className="text-rose-400 font-semibold">const</span>{' '}
                    <span className="text-sky-300">developer</span> = &#123;
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-emerald-300 font-bold">&apos;JADE TEJA&apos;</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-slate-400">skills:</span> [
                    <span className="text-amber-300">&apos;React&apos;</span>,{' '}
                    <span className="text-amber-300">&apos;Android&apos;</span>,{' '}
                    <span className="text-amber-300">&apos;Node.js&apos;</span>],
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-slate-400">startingPrice:</span>{' '}
                    <span className="text-emerald-400 font-bold">&apos;₹5,000&apos;</span>,
                  </div>
                  <div className="pl-4 text-slate-300">
                    <span className="text-slate-400">passion:</span>{' '}
                    <span className="text-emerald-300">&apos;Your Idea. My Code. Our Success.&apos;</span>
                  </div>
                  <div className="text-slate-300">&#125;;</div>
                  <div className="pt-2 text-slate-400">
                    <span className="text-rose-400 font-semibold">export default</span> developer;
                  </div>
                </div>

                {/* Mobile Bottom Bar Inside Code Card */}
                <div className="sm:hidden px-4 py-3 bg-[#0F172A]/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-amber-400 font-bold">⭐ 100% Direct Delivery</span>
                  <span className="text-[#FF8C42] font-bold">Quick Response</span>
                </div>
              </div>

              {/* Floating Bottom-Left Availability Badge (Desktop) */}
              <div className="hero-float-badge hidden sm:flex absolute -bottom-5 -left-4 z-20 items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-[#E5E7EB] shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-[#1F2937]">Fast Turnaround</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Active for New Projects</span>
                </div>
              </div>
            </div>

            {/* Mobile Service Badges Below Code Card */}
            <div className="md:hidden flex items-center justify-center gap-2 mt-6 w-full">
              <span className="px-3 py-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937]">
                🌐 Web Dev
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937]">
                📱 Android
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-semibold text-[#1F2937]">
                🚀 Cloud
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="hidden lg:flex flex-col items-center justify-center pt-16 text-[#9CA3AF]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
            SCROLL DOWN
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#D1D5DB] flex justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#FF6B00] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
