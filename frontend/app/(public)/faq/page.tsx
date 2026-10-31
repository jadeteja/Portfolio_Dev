import React from 'react';
import { getFaqs } from '@/lib/api';
import FaqAccordion from '@/components/faq/FaqAccordion';

export const metadata = {
  title: 'Frequently Asked Questions | JADE TEJA',
  description:
    'Answers about pricing, deliverables, annual hosting, source code ownership, and maintenance.',
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            COMMON INQUIRIES
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Everything you need to know about pricing, deliverables, hosting, and source code ownership.
          </p>
        </div>

        {/* Accordion Component */}
        <FaqAccordion faqs={faqs} />
      </div>
    </div>
  );
}
