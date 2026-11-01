import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PricingNavTabs from '@/components/pricing/PricingNavTabs';
import { getAdditionalCharges } from '@/lib/api';
import { AdditionalCharge } from '@/types';

export const metadata = {
  title: 'Additional Charges & Custom Features | JADE TEJA',
  description:
    'Complete transparency for domain registration, payment gateways, Google Play accounts, and custom integrations.',
};

export default async function AdditionalChargesPage() {
  const charges = await getAdditionalCharges();

  const getBadgeStyle = (chargeType: string) => {
    switch (chargeType) {
      case 'PROVIDER_FEE':
        return 'bg-[#F3F4F6] text-[#4B5563] dark:text-gray-300 border-[#E5E7EB] dark:border-gray-800';
      case 'USAGE_BASED':
        return 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]';
      case 'ONE_TIME':
      case 'CUSTOM_QUOTE':
      default:
        return 'bg-[#FFF3E8] dark:bg-brand-orange/15 text-[#FF6B00] border-[#FFE0C2] dark:border-brand-orange/30';
    }
  };

  const getBadgeLabel = (charge: AdditionalCharge) => {
    if (charge.title === 'Domain Registration') return 'Provider Charges';
    if (charge.title === 'Google Play Developer Account') return 'Official Fee';
    if (charge.title === 'SMS / OTP Services') return 'Provider Charges';
    if (charge.chargeType === 'USAGE_BASED') return 'Usage-Based';
    return 'Custom Quote';
  };

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <PricingNavTabs />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            <span className="hidden sm:inline">COMPLETE TRANSPARENCY</span>
            <span className="sm:hidden">TRANSPARENCY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-4">
            <span className="hidden sm:inline">Additional Charges & Custom Features</span>
            <span className="sm:hidden">Additional Features</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
            <span className="hidden sm:inline">
              Distinguishing one-time development, recurring hosting, and optional third-party integrations.
            </span>
            <span className="sm:hidden">
              Clearly differentiating one-time, recurring, and third-party fees.
            </span>
          </p>
        </div>

        {/* Desktop 2-Col Grid & Mobile Stack matching 06-additional-charges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {charges.map((charge) => (
            <div
              key={charge.id}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-sm hover:border-[#FF6B00]/40 transition-all flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#1F2937] dark:text-gray-100 leading-tight">
                  {charge.title}
                </h3>
                <p className="hidden sm:block text-xs sm:text-sm text-[#6B7280] dark:text-gray-400 mt-1.5">
                  {charge.description}
                </p>
              </div>

              {/* Tag / Badge */}
              <span
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap flex-shrink-0 ${getBadgeStyle(
                  charge.chargeType
                )}`}
              >
                {getBadgeLabel(charge)}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner matching 06-additional-charges-desktop & mobile */}
        <div className="rounded-3xl bg-[#FFF6EE] border border-[#FFE0C2] dark:border-brand-orange/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm sm:text-base font-medium text-[#1F2937] dark:text-gray-100 text-center sm:text-left">
            <span className="font-bold">Need an exact quote for specific features?</span> Let&apos;s discuss your project scope in detail.
          </p>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all whitespace-nowrap"
          >
            Request Detailed Estimate
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
