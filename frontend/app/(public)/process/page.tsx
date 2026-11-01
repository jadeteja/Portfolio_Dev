import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: '7-Step Development Process | JADE TEJA',
  description:
    'A structured, hassle-free 7-step roadmap from initial message to live application for web and Android projects.',
};

const STEPS = [
  {
    step: '01',
    title: 'Discuss Idea',
    mobileTitle: 'Discuss Your Idea',
    desc: 'Initial talk on project goals & expectations.',
  },
  {
    step: '02',
    title: 'Requirements',
    mobileTitle: 'Gather Requirements',
    desc: 'Detailed scope, features, and timeline definition.',
  },
  {
    step: '03',
    title: 'Plan & UI',
    mobileTitle: 'Plan & Design UI',
    desc: 'Mockup structuring & design alignment.',
  },
  {
    step: '04',
    title: 'Development',
    mobileTitle: 'Develop Your Project',
    desc: 'Clean coding for Web or Android.',
  },
  {
    step: '05',
    title: 'Test & Review',
    mobileTitle: 'Test & Review',
    desc: 'Device testing, responsiveness & client check.',
  },
  {
    step: '06',
    title: 'Deploy & Launch',
    mobileTitle: 'Deploy & Launch',
    desc: 'Cloud setup, domain linking & APK release.',
  },
  {
    step: '07',
    title: 'Support',
    mobileTitle: 'Support & Maintenance',
    desc: 'Ongoing maintenance & updates.',
  },
];

export default function ProcessPage() {
  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            <span className="hidden sm:inline">WORKFLOW</span>
            <span className="sm:hidden">ROADMAP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-4">
            <span className="hidden sm:inline">From Idea to Launch — My Development Process</span>
            <span className="sm:hidden">From Idea to Launch</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
            A structured, hassle-free 7-step roadmap from initial message to live application.
          </p>
        </div>

        {/* Desktop Horizontal Connected Timeline (09-process-desktop.png) */}
        <div className="hidden lg:block relative mb-20 px-4">
          {/* Connecting Line */}
          <div className="absolute top-7 left-12 right-12 h-1 bg-[#FF6B00] -z-0" />

          {/* 7 Connected Nodes */}
          <div className="grid grid-cols-7 gap-4 relative z-10">
            {STEPS.map((s, idx) => {
              const isFirst = idx === 0;
              return (
                <div key={s.step} className="flex flex-col items-center text-center">
                  {/* Circle Node */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-extrabold text-base mb-5 shadow-sm transition-transform hover:scale-110 ${
                      isFirst
                        ? 'bg-[#FF6B00] text-white ring-4 ring-[#FF6B00]/20'
                        : 'bg-white border-2 border-[#FF6B00] text-[#FF6B00]'
                    }`}
                  >
                    {s.step}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-sm text-[#1F2937] dark:text-gray-100 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400 leading-snug px-1">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Connected Timeline (09-process-mobile.png) */}
        <div className="lg:hidden relative pl-6 sm:pl-10 mb-12">
          {/* Vertical Connecting Line */}
          <div className="absolute top-4 bottom-8 left-[39px] sm:left-[55px] w-1 bg-[#FF6B00] -z-0" />

          <div className="space-y-8 relative z-10">
            {STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-4 sm:gap-6">
                {/* Circle Badge */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#FF6B00] text-[#FF6B00] font-black text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  {s.step}
                </div>

                {/* Text Content */}
                <div className="pt-1.5">
                  <h3 className="font-bold text-base text-[#1F2937] dark:text-gray-100 leading-tight mb-1">
                    {s.mobileTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button matching 09-process */}
        <div className="flex justify-center pt-8">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
