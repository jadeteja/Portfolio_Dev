'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '@/types';

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  // First item open by default matching 12-faq-desktop reference
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={faq.id || idx}
            className={`rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-2 border-[#FF8C42] bg-white shadow-sm'
                : 'border border-[#E5E7EB] bg-white hover:border-[#FF6B00]/40'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <span
                className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                  isOpen ? 'text-[#FF6B00]' : 'text-[#1F2937]'
                }`}
              >
                {faq.question}
              </span>
              <span className="flex-shrink-0 text-[#FF6B00]">
                {isOpen ? <Minus className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-dashed border-[#FFE0C2]">
                <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
