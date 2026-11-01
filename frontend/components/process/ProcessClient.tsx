'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  step: string;
  title: string;
  mobileTitle: string;
  desc: string;
}

interface ProcessClientProps {
  steps: Step[];
}

export default function ProcessClient({ steps }: ProcessClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.process-header-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Desktop connecting line progress animation
      if (lineDesktopRef.current) {
        gsap.fromTo(
          lineDesktopRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Desktop Node reveals
      gsap.from('.process-desktop-node', {
        scale: 0.5,
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.8)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      // Mobile vertical timeline line progress
      if (lineMobileRef.current) {
        gsap.fromTo(
          lineMobileRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: lineMobileRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Mobile Node reveals
      gsap.from('.process-mobile-item', {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineMobileRef.current,
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
        <div className="process-header-reveal inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
          <span className="hidden sm:inline">WORKFLOW</span>
          <span className="sm:hidden">ROADMAP</span>
        </div>
        <h1 className="process-header-reveal text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-4">
          <span className="hidden sm:inline">From Idea to Launch — My Development Process</span>
          <span className="sm:hidden">From Idea to Launch</span>
        </h1>
        <p className="process-header-reveal text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
          A structured, hassle-free 7-step roadmap from initial message to live application.
        </p>
      </div>

      {/* Desktop Horizontal Connected Timeline with GSAP Progress Bar */}
      <div className="hidden lg:block relative mb-20 px-4">
        {/* Animated Connecting Progress Line */}
        <div
          ref={lineDesktopRef}
          className="absolute top-7 left-12 right-12 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FF8C42] to-[#FF6B00] -z-0 rounded-full"
        />

        {/* 7 Connected Nodes */}
        <div className="grid grid-cols-7 gap-4 relative z-10">
          {steps.map((s, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={s.step}
                className="process-desktop-node flex flex-col items-center text-center group cursor-default"
              >
                {/* Circle Node with Glowing Hover */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base mb-5 shadow-lg group-hover:scale-110 group-hover:shadow-[#FF6B00]/30 transition-all duration-300 ${
                    isFirst
                      ? 'bg-[#FF6B00] text-white ring-4 ring-[#FF6B00]/25'
                      : 'bg-white dark:bg-gray-900 border-2 border-[#FF6B00] text-[#FF6B00]'
                  }`}
                >
                  {s.step}
                </div>

                {/* Title & Description */}
                <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-gray-100 mb-1.5 group-hover:text-[#FF6B00] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-snug px-1">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Connected Timeline */}
      <div className="lg:hidden relative pl-6 sm:pl-10 mb-12">
        {/* Vertical Animated Connecting Line */}
        <div
          ref={lineMobileRef}
          className="absolute top-4 bottom-8 left-[39px] sm:left-[55px] w-1 bg-gradient-to-b from-[#FF6B00] via-[#FF8C42] to-[#FF6B00] -z-0 rounded-full"
        />

        <div className="space-y-8 relative z-10">
          {steps.map((s) => (
            <div key={s.step} className="process-mobile-item flex items-start gap-4 sm:gap-6">
              {/* Circle Badge */}
              <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border-2 border-[#FF6B00] text-[#FF6B00] font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md">
                {s.step}
              </div>

              {/* Text Content */}
              <div className="pt-1.5">
                <h3 className="font-bold text-base text-[#1F2937] dark:text-gray-100 leading-tight mb-1">
                  {s.mobileTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button matching 09-process */}
      <div className="flex justify-center pt-8">
        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all group"
        >
          <span>Start Your Journey</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
