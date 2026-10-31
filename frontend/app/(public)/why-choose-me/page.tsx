import React from 'react';
import Link from 'next/link';
import {
  Check,
  Code,
  Smartphone,
  MessageCircle,
  ShieldCheck,
  Monitor,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Why Choose Me — Freelance Advantage | JADE TEJA',
  description:
    'Experience direct accountability, fast responses, and cost transparency without high agency overhead costs.',
};

const ADVANTAGES = [
  {
    icon: <Check className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Affordable Starting Prices',
    desc: 'Development starting from just ₹5,000 without sacrificing code quality or speed.',
  },
  {
    icon: <Code className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Custom Solutions',
    desc: 'Tailored architectures created to address your specific workflow and customer demands.',
  },
  {
    icon: <Smartphone className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Mobile-Responsive Designs',
    desc: 'Fluid layouts engineered to look perfect on smartphones, tablets, and desktops.',
  },
  {
    icon: <MessageCircle className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Transparent Communication',
    desc: 'Direct freelancer interaction with honest timelines, regular updates, and clear scope.',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Secure Development Practices',
    desc: 'Robust data handling, secure API integration, authentication, and SSL setup.',
  },
  {
    icon: <Monitor className="w-5 h-5 text-[#FF6B00]" />,
    title: 'Post-Launch Support Options',
    desc: 'Dependable maintenance, hosting assistance, and bug fixes after your product goes live.',
  },
];

export default function WhyChooseMePage() {
  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-20">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            THE FREELANCE ADVANTAGE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight mb-4">
            Professional Digital Solutions Without Agency–Level Costs
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Experience direct accountability, fast responses, and cost transparency on every project.
          </p>
        </div>

        {/* 3x2 Grid matching 10-why-choose-me-desktop & mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {ADVANTAGES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-cardHover hover:border-[#FFE0C2] transition-all flex flex-col justify-start"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E8] border border-[#FFE0C2] flex items-center justify-center mb-6">
                {item.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-bold text-[#1F2937] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
