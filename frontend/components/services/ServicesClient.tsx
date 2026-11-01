'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Monitor, Smartphone, Code, Layers, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import TiltCard from '@/components/3d/TiltCard';

interface Service {
  id: string | number;
  title: string;
  description: string;
  icon?: string;
  features?: string[];
}

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.service-card-wrapper', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-[#FF6B00]" />;
      case 'code':
        return <Code className="w-6 h-6 text-[#FF6B00]" />;
      case 'layers':
        return <Layers className="w-6 h-6 text-[#FF6B00]" />;
      case 'monitor':
      default:
        return <Monitor className="w-6 h-6 text-[#FF6B00]" />;
    }
  };

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
          <span className="hidden sm:inline">SPECIALIZED OFFERINGS</span>
          <span className="sm:hidden">SERVICES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-4">
          <span className="hidden sm:inline">Custom Development Services</span>
          <span className="sm:hidden">What I Can Build For You</span>
        </h1>
        <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
          High-standard engineering tailored to your requirements with direct freelancer communication.
        </p>
      </div>

      {/* 2x2 Grid (Desktop) / 1-Col (Mobile) with 3D Tilt Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {services.map((service) => (
          <div key={service.id} className="service-card-wrapper h-full">
            <TiltCard maxTilt={5} scale={1.015} className="h-full">
              <div className="p-6 sm:p-8 h-full rounded-3xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {getIcon(service.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] dark:text-gray-100 tracking-tight group-hover:text-[#FF6B00] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B7280] dark:text-gray-400 mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features Pills */}
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4 ml-0 sm:ml-16">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-lg bg-[#F9FAFB] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 text-xs font-semibold text-[#4B5563] dark:text-gray-300 hover:border-[#FF6B00]/40 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="mt-6 ml-0 sm:ml-16 pt-4 border-t border-[#F3F4F6] dark:border-gray-800">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#FF8C42] group-hover:translate-x-1.5 transition-all"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </div>
  );
}
