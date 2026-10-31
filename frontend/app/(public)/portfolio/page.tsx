import React from 'react';
import { getProjects } from '@/lib/api';
import PortfolioClient from '@/components/portfolio/PortfolioClient';

export const metadata = {
  title: 'Portfolio Showcase & Concepts | JADE TEJA',
  description:
    'Explore featured websites and native Android app projects crafted with React, Next.js, Kotlin, and modern cloud stacks.',
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
              <span className="hidden sm:inline">SELECTED WORKS</span>
              <span className="sm:hidden">SHOWCASE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight">
              <span className="hidden sm:inline">Previous Work & Concepts</span>
              <span className="sm:hidden">Featured Projects</span>
            </h1>
          </div>
        </div>

        {/* Client Grid with Category Filtering */}
        <PortfolioClient initialProjects={projects} />
      </div>
    </div>
  );
}
