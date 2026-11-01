'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import PricingNavTabs from '@/components/pricing/PricingNavTabs';
import TiltCard from '@/components/3d/TiltCard';
import gsap from 'gsap';

interface PricingPlan {
  id?: string | number;
  serviceType: string;
  developmentPrice: number | string;
  annualHostingPrice: number | string;
  features?: string[];
}

interface PricingClientProps {
  plans: PricingPlan[];
  serviceType: 'WEBSITE' | 'ANDROID';
  badgeTitle: string;
  titleDesktop: string;
  titleMobile: string;
  packageBadge: string;
  packageName: string;
  quoteLink: string;
  quoteButtonText: string;
  disclaimer: string;
  defaultFeatures: string[];
}

export default function PricingCardClient({
  plans,
  serviceType,
  badgeTitle,
  titleDesktop,
  titleMobile,
  packageBadge,
  packageName,
  quoteLink,
  quoteButtonText,
  disclaimer,
  defaultFeatures,
}: PricingClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.pricing-reveal-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const plan = plans.find((p) => p.serviceType === serviceType) || plans[0];
  const devPrice = plan ? Number(plan.developmentPrice).toLocaleString('en-IN') : '5,000';
  const hostingPrice = plan ? Number(plan.annualHostingPrice).toLocaleString('en-IN') : '15,000';
  const firstYearTotal = plan
    ? (Number(plan.developmentPrice) + Number(plan.annualHostingPrice)).toLocaleString('en-IN')
    : '20,000';

  const features = plan?.features && plan.features.length > 0 ? plan.features : defaultFeatures;

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Navigation Tabs */}
      <PricingNavTabs />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="pricing-reveal-item inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
          <span className="hidden sm:inline">SIMPLE &amp; TRANSPARENT</span>
          <span className="sm:hidden">{badgeTitle}</span>
        </div>
        <h1 className="pricing-reveal-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-4">
          <span className="hidden sm:inline">{titleDesktop}</span>
          <span className="sm:hidden">{titleMobile}</span>
        </h1>
        <p className="pricing-reveal-item text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
          No hidden surprises. Clear cost breakdown for your business.
        </p>
      </div>

      {/* Authoritative Card with 3D Tilt and Glowing Border */}
      <div className="pricing-reveal-item max-w-4xl mx-auto">
        <TiltCard maxTilt={4} scale={1.01}>
          <div className="rounded-[32px] border-2 border-[#FF8C42] bg-white dark:bg-gray-900 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
            {/* Subtle corner light highlight */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF6B00]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Cost Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-extrabold text-[#FF6B00] tracking-wider uppercase">
                    <span className="hidden sm:inline">{packageName}</span>
                    <span className="sm:hidden">STARTING RATE</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-xs font-bold text-[#FF6B00]">
                    <span className="hidden sm:inline">Most Popular</span>
                    <span className="sm:hidden">{packageBadge}</span>
                  </span>
                </div>

                {/* Price Hero */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-[#1F2937] dark:text-gray-100">
                    ₹{devPrice}
                  </span>
                  <span className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 font-medium">
                    starting one-time development
                  </span>
                </div>

                {/* Gray Breakdown Box */}
                <div className="rounded-2xl bg-[#F9FAFB] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 p-5 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm text-[#4B5563] dark:text-gray-300">
                    <span>Development Charge (One-Time):</span>
                    <span className="font-bold text-[#1F2937] dark:text-gray-100">₹{devPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#4B5563] dark:text-gray-300">
                    <span>Server / Hosting Charge (1st Year):</span>
                    <span className="font-bold text-[#1F2937] dark:text-gray-100">₹{hostingPrice}</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB] dark:border-gray-700 flex items-center justify-between">
                    <span className="text-sm font-black text-[#FF6B00]">First-Year Total:</span>
                    <span className="text-lg font-black text-[#FF6B00]">₹{firstYearTotal}</span>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] dark:text-gray-400 pt-1">
                    Subsequent Annual Hosting: ₹{hostingPrice} / year
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-[#9CA3AF] dark:text-gray-400 leading-relaxed">
                  {disclaimer}
                </p>
              </div>

              {/* Right Column: Features & CTA */}
              <div className="flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-6 lg:border-l border-[#F3F4F6] dark:border-gray-800">
                <div>
                  <h4 className="text-base font-bold text-[#1F2937] dark:text-gray-100 mb-5">
                    <span className="hidden sm:inline">What&apos;s Included:</span>
                    <span className="sm:hidden">Features Included:</span>
                  </h4>

                  <ul className="space-y-4">
                    {features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#4B5563] dark:text-gray-300">
                        <Check className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    href={quoteLink}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all group"
                  >
                    <span>{quoteButtonText}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
