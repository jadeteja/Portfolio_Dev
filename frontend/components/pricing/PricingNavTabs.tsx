'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PricingNavTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Website Pricing', href: '/pricing/website' },
    { name: 'Android Pricing', href: '/pricing/android' },
    { name: 'Additional Charges', href: '/pricing/additional-charges' },
  ];

  return (
    <div className="flex items-center justify-center mb-10 overflow-x-auto px-2 max-w-full">
      <div className="inline-flex p-1.5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] shadow-inner gap-1 whitespace-nowrap">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href === '/pricing/website' && pathname === '/pricing');
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-3.5 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                active
                  ? 'bg-white text-[#FF6B00] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
