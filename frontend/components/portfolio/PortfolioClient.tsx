'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/types';

interface PortfolioClientProps {
  initialProjects: Project[];
}

const CATEGORIES = ['All Projects', 'Websites', 'Android Apps', 'E-Commerce'];

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState('All Projects');

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

  // Background styling matching the pastel card headers in 07-portfolio-desktop
  const getCardHeaderBg = (idx: number) => {
    const bgs = [
      'from-[#FFEFE2] to-[#FFDEC4]', // peach orange
      'from-[#FFF3E8] to-[#FFE2CC]', // soft amber
      'from-[#EFF6FF] to-[#DBEAFE]', // soft blue
      'from-[#ECFDF5] to-[#D1FAE5]', // soft emerald
      'from-[#F5F3FF] to-[#EDE9FE]', // soft purple
      'from-[#FDF2F8] to-[#FCE7F3]', // soft pink
    ];
    return bgs[idx % bgs.length];
  };

  const getCardAccentLine = (idx: number) => {
    const lines = ['bg-[#FF6B00]', 'bg-[#FF8C42]', 'bg-[#3B82F6]', 'bg-[#10B981]', 'bg-[#8B5CF6]', 'bg-[#EC4899]'];
    return lines[idx % lines.length];
  };

  return (
    <div className="w-full">
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
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'bg-[#F9FAFB] dark:bg-gray-900 text-[#4B5563] dark:text-gray-300 border border-[#E5E7EB] dark:border-gray-800 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3-Col Desktop Grid / 1-Col Mobile Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group rounded-3xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:shadow-cardHover hover:border-[#FFE0C2] dark:border-brand-orange/30 transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Top Preview Canvas */}
            <div
              className={`relative h-56 bg-gradient-to-b ${getCardHeaderBg(
                idx
              )} p-6 flex flex-col items-center justify-center`}
            >
              {/* Concept Project Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#FFE0C2] dark:border-brand-orange/30 text-[11px] font-bold text-[#FF6B00]">
                Concept Project
              </div>

              {/* Wireframe Mockup Canvas */}
              <div className="w-44 h-28 bg-white rounded-xl shadow-md border border-black/5 p-3 flex flex-col justify-between">
                <div>
                  <div className={`h-2.5 w-full rounded ${getCardAccentLine(idx)} mb-2`} />
                  <div className="h-1.5 w-3/4 bg-slate-200 rounded mb-1" />
                  <div className="h-1.5 w-1/2 bg-slate-200 rounded" />
                </div>
                <div className="h-1 w-full bg-slate-100 rounded" />
              </div>
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
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B00] hover:text-[#FF8C42] active:translate-x-1 transition-all"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
