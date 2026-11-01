'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sparkles, Search, DollarSign, HeartHandshake, User, ArrowRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import TiltCard from '@/components/3d/TiltCard';

const AboutDeskCanvas = dynamic(() => import('@/components/3d/AboutDeskCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center text-xs text-brand-orange">Loading 3D Workspace...</div>,
});

interface AboutClientProps {
  settings: {
    brandName?: string;
    location?: string;
    bio?: string;
  };
}

export default function AboutClient({ settings }: AboutClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for about content
      gsap.from('.about-stagger-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Developer Profile Card (Desktop) with 3D Desk Presentation */}
        <div className="hidden lg:flex lg:col-span-5 justify-center">
          <TiltCard
            maxTilt={6}
            scale={1.01}
            className="w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#FFF5EC] to-[#FFEAD8] dark:from-gray-900 dark:to-gray-950 border border-[#FFD9B8] dark:border-brand-orange/30 p-8 flex flex-col items-center text-center shadow-xl"
          >
            {/* 3D Developer Desk Canvas */}
            <div className="w-full mb-2">
              <AboutDeskCanvas />
            </div>

            {/* Profile Avatar & Details */}
            <div className="w-20 h-20 rounded-full bg-[#FF6B00] flex items-center justify-center text-white mb-4 shadow-md ring-4 ring-white/60">
              <User className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h3 className="text-2xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-1">
              {settings.brandName || 'JADE TEJA'}
            </h3>
            <p className="text-sm font-bold text-[#FF6B00] mb-5">
              Freelance Web &amp; Android Developer
            </p>

            {/* Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-[#FFE0C2] dark:border-brand-orange/30 text-xs font-semibold text-[#4B5563] dark:text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{settings.location || 'India'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-[#FFE0C2] dark:border-brand-orange/30 text-xs font-semibold text-[#1F2937] dark:text-gray-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Available</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Bio, Values, Skills, CTA (Desktop & Mobile) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Pill Badge */}
          <div className="about-stagger-item inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide w-fit mb-4">
            ABOUT JADE TEJA
          </div>

          {/* Headline */}
          <h1 className="about-stagger-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-5">
            Meet Your Developer
          </h1>

          {/* Mobile Profile Card */}
          <div className="lg:hidden w-full rounded-2xl bg-gradient-to-b from-[#FFF5EC] to-[#FFEAD8] dark:from-gray-900 dark:to-gray-950 border border-[#FFD9B8] dark:border-brand-orange/30 p-5 flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#FF6B00] flex-shrink-0 flex items-center justify-center text-white ring-4 ring-white/60">
              <User className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-black text-[#1F2937] dark:text-gray-100">JADE TEJA</h3>
              <p className="text-xs font-bold text-[#FF6B00]">Freelance Web &amp; Android Developer</p>
              <p className="text-[11px] text-[#6B7280] dark:text-gray-400 font-medium mt-0.5">
                Turning Ideas into Digital Products
              </p>
            </div>
          </div>

          {/* Introduction Copy */}
          <p className="about-stagger-item text-base sm:text-lg text-[#4B5563] dark:text-gray-300 leading-relaxed mb-8">
            {settings.bio ||
              'I am a dedicated freelance developer specializing in building modern web applications and native Android apps. I focus on solving real-world business challenges by engineering clean, robust code with exceptional user interfaces.'}
          </p>

          {/* 4 Feature / Value Cards with 3D Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Quality */}
            <TiltCard maxTilt={5} scale={1.02} className="h-full">
              <div className="p-5 h-full rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:border-[#FF6B00]/40 transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#FF6B00] font-bold text-base">
                  <Sparkles className="w-4 h-4" />
                  <h4>Quality</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  Modern standards, clean architectures, and responsive performance.
                </p>
              </div>
            </TiltCard>

            {/* Transparency */}
            <TiltCard maxTilt={5} scale={1.02} className="h-full">
              <div className="p-5 h-full rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:border-[#FF6B00]/40 transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#FF6B00] font-bold text-base">
                  <Search className="w-4 h-4" />
                  <h4>Transparency</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  Clear scope, open milestones, and zero unexpected charges.
                </p>
              </div>
            </TiltCard>

            {/* Affordability */}
            <TiltCard maxTilt={5} scale={1.02} className="h-full">
              <div className="p-5 h-full rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:border-[#FF6B00]/40 transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#FF6B00] font-bold text-base">
                  <DollarSign className="w-4 h-4" />
                  <h4>Affordability</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  Premium agency-grade design without high agency overhead costs.
                </p>
              </div>
            </TiltCard>

            {/* Support */}
            <TiltCard maxTilt={5} scale={1.02} className="h-full">
              <div className="p-5 h-full rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:border-[#FF6B00]/40 transition-all">
                <div className="flex items-center gap-2 mb-2 text-[#FF6B00] font-bold text-base">
                  <HeartHandshake className="w-4 h-4" />
                  <h4>Support</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">
                  Dedicated assistance through deployment, launch, and maintenance.
                </p>
              </div>
            </TiltCard>
          </div>

          {/* Key Skills */}
          <div className="about-stagger-item flex flex-wrap items-center gap-2.5 mb-10">
            <span className="text-xs font-bold text-[#1F2937] dark:text-gray-100 mr-1">Key Skills:</span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold">
              Web Development
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold">
              Android Development
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold">
              APIs &amp; Backend
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold">
              Databases
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold">
              Deployment
            </span>
          </div>

          {/* CTA Button */}
          <div className="about-stagger-item">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
            >
              Let&apos;s Work Together
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
