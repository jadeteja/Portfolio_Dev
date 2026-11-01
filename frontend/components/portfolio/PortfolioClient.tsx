'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { Project } from '@/types';
import gsap from 'gsap';
import TiltCard from '@/components/3d/TiltCard';

interface PortfolioClientProps {
  initialProjects: Project[];
}

const CATEGORIES = ['All Projects', 'Websites', 'Android Apps', 'E-Commerce'];

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.portfolio-card-item', {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredProjects = initialProjects.filter((project) => {
    if (activeCategory === 'All Projects') return true;
    if (activeCategory === 'Websites') return project.category.toLowerCase().includes('website');
    if (activeCategory === 'Android Apps') return project.category.toLowerCase().includes('android');
    if (activeCategory === 'E-Commerce') {
      return (
        project.title.toLowerCase().includes('e-commerce') ||
        project.title.toLowerCase().includes('shopping') ||
        project.shortDescription.toLowerCase().includes('shopping')
      );
    }
    return true;
  });

  const getCardHeaderBg = (idx: number) => {
    const bgs = [
      'from-[#FFEFE2] to-[#FFDEC4]',
      'from-[#FFF3E8] to-[#FFE2CC]',
      'from-[#EFF6FF] to-[#DBEAFE]',
      'from-[#ECFDF5] to-[#D1FAE5]',
      'from-[#F5F3FF] to-[#EDE9FE]',
      'from-[#FDF2F8] to-[#FCE7F3]',
    ];
    return bgs[idx % bgs.length];
  };

  const getCardAccentLine = (idx: number) => {
    const lines = ['bg-[#FF6B00]', 'bg-[#FF8C42]', 'bg-[#3B82F6]', 'bg-[#10B981]', 'bg-[#8B5CF6]', 'bg-[#EC4899]'];
    return lines[idx % lines.length];
  };

  return (
    <div ref={containerRef} className="w-full">
      {/* Filters (Desktop & Mobile) */}
      <div className="flex flex-wrap items-center justify-start lg:justify-end gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#FF6B00] text-white shadow-md scale-105'
                  : 'bg-[#F9FAFB] dark:bg-gray-900 text-[#4B5563] dark:text-gray-300 border border-[#E5E7EB] dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Col Desktop Grid / 1-Col Mobile Stack with 3D Tilt & Device Mockup Frames */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => {
          const isAndroid = project.category.toLowerCase().includes('android');

          return (
            <div key={project.id} className="portfolio-card-item h-full">
              <TiltCard maxTilt={6} scale={1.02} className="h-full">
                <div className="group rounded-3xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-[#FF6B00]/40 transition-all overflow-hidden flex flex-col justify-between h-full">
                  {/* Top Preview 3D Device Showcase Canvas */}
                  <div
                    className={`relative h-60 bg-gradient-to-b ${getCardHeaderBg(
                      idx
                    )} dark:from-gray-900 dark:to-gray-950 p-6 flex flex-col items-center justify-center overflow-hidden`}
                  >
                    {/* Concept Project Badge */}
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm border border-[#FFE0C2] dark:border-brand-orange/30 text-[11px] font-bold text-[#FF6B00] shadow-sm">
                      Concept Project
                    </div>

                    {/* Device Icon badge top left */}
                    <div className="absolute top-4 left-4 z-10 w-7 h-7 rounded-lg bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-[#FF6B00] shadow-sm">
                      {isAndroid ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                    </div>

                    {/* Realistic 3D Mockup Device Frame */}
                    {isAndroid ? (
                      /* Smartphone 3D Mockup Frame */
                      <div className="relative w-28 h-44 bg-slate-900 rounded-[20px] p-2 shadow-2xl border-2 border-slate-700/60 group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-300">
                        {/* Notch */}
                        <div className="w-8 h-1.5 bg-black rounded-full mx-auto mb-1.5" />
                        {/* Inner Display Screen */}
                        <div className="w-full h-34 bg-slate-950 rounded-[12px] p-2 flex flex-col justify-between border border-slate-800">
                          <div>
                            <div className={`h-2 w-3/4 rounded ${getCardAccentLine(idx)} mb-1.5`} />
                            <div className="h-1.5 w-full bg-slate-800 rounded mb-1" />
                            <div className="h-1.5 w-1/2 bg-slate-800 rounded" />
                          </div>
                          <div className="h-4 w-full bg-emerald-500/20 rounded flex items-center justify-center">
                            <span className="text-[7px] text-emerald-400 font-bold">Native UI</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Laptop / Browser 3D Mockup Frame */
                      <div className="relative w-52 h-34 bg-slate-900 rounded-xl p-2 shadow-2xl border-2 border-slate-700/60 group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300">
                        {/* Window Dots */}
                        <div className="flex items-center gap-1 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <div className="ml-2 h-1.5 w-24 bg-slate-800 rounded" />
                        </div>
                        {/* Browser Body Screen */}
                        <div className="w-full h-24 bg-slate-950 rounded-lg p-2.5 flex flex-col justify-between border border-slate-800">
                          <div>
                            <div className={`h-2.5 w-full rounded ${getCardAccentLine(idx)} mb-2`} />
                            <div className="h-1.5 w-3/4 bg-slate-800 rounded mb-1" />
                            <div className="h-1.5 w-1/2 bg-slate-800 rounded" />
                          </div>
                          <div className="flex gap-1">
                            <div className="h-1.5 w-1/3 bg-slate-800 rounded" />
                            <div className="h-1.5 w-1/3 bg-slate-800 rounded" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-extrabold uppercase text-[#FF6B00] tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-[#6B7280] dark:text-gray-400 font-medium truncate max-w-[140px]">
                          {Array.isArray(project.technologies)
                            ? project.technologies.slice(0, 2).join(' • ')
                            : 'React • Node.js'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-[#1F2937] dark:text-gray-100 tracking-tight mb-2 group-hover:text-[#FF6B00] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* View Details Link */}
                    <div className="pt-5 mt-4 border-t border-[#F3F4F6] dark:border-gray-800">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#FF8C42] group-hover:translate-x-1.5 transition-all"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
