import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import PricingNavTabs from '@/components/pricing/PricingNavTabs';
import { getPricingPlans } from '@/lib/api';

export const metadata = {
  title: 'Website Development Pricing | JADE TEJA',
  description:
    'Standard Website Package starting at ₹5,000 one-time development and ₹15,000 annual hosting. Clear transparent pricing.',
};

export default async function WebsitePricingPage() {
  const plans = await getPricingPlans();
  const webPlan = plans.find((p) => p.serviceType === 'WEBSITE') || plans[0];

  const devPrice = webPlan ? Number(webPlan.developmentPrice).toLocaleString('en-IN') : '5,000';
  const hostingPrice = webPlan ? Number(webPlan.annualHostingPrice).toLocaleString('en-IN') : '15,000';
  const firstYearTotal = webPlan
    ? (Number(webPlan.developmentPrice) + Number(webPlan.annualHostingPrice)).toLocaleString('en-IN')
    : '20,000';

  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <PricingNavTabs />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            <span className="hidden sm:inline">SIMPLE & TRANSPARENT</span>
            <span className="sm:hidden">TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight mb-4">
            <span className="hidden sm:inline">Website Development Pricing</span>
            <span className="sm:hidden">Website Package</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            No hidden surprises. Clear cost breakdown for your business website.
          </p>
        </div>

        {/* Authoritative Design Matching 04-website-pricing-desktop & mobile */}
        <div className="max-w-4xl mx-auto rounded-[32px] border-2 border-[#FF8C42] bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column: Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs sm:text-sm font-extrabold text-[#FF6B00] tracking-wider uppercase">
                  <span className="hidden sm:inline">STANDARD WEBSITE PACKAGE</span>
                  <span className="sm:hidden">STARTING RATE</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-xs font-bold text-[#FF6B00]">
                  <span className="hidden sm:inline">Most Popular</span>
                  <span className="sm:hidden">Basic Website</span>
                </span>
              </div>

              {/* Price Hero */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-[#1F2937]">₹{devPrice}</span>
                <span className="text-xs sm:text-sm text-[#6B7280] font-medium">
                  starting one-time development
                </span>
              </div>

              {/* Gray Breakdown Box */}
              <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-5 space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-[#4B5563]">
                  <span>Development Charge (One-Time):</span>
                  <span className="font-bold text-[#1F2937]">₹{devPrice}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#4B5563]">
                  <span>Server / Hosting Charge (1st Year):</span>
                  <span className="font-bold text-[#1F2937]">₹{hostingPrice}</span>
                </div>
                <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span className="text-sm font-black text-[#FF6B00]">First-Year Total:</span>
                  <span className="text-lg font-black text-[#FF6B00]">₹{firstYearTotal}</span>
                </div>
                <div className="text-[11px] text-[#9CA3AF] pt-1">
                  Subsequent Annual Hosting: ₹{hostingPrice} / year
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                * Custom features, custom domain purchase, payment gateway integration, and third-party APIs may cost extra.
              </p>
            </div>

            {/* Right Column: Features & CTA */}
            <div className="flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-6 lg:border-l border-[#F3F4F6]">
              <div>
                <h4 className="text-base font-bold text-[#1F2937] mb-5">
                  <span className="hidden sm:inline">What&apos;s Included:</span>
                  <span className="sm:hidden">Features Included:</span>
                </h4>

                <ul className="space-y-4">
                  {(webPlan?.features || [
                    '100% Responsive & mobile-friendly layout',
                    'Essential business pages (Home, About, Services)',
                    'Interactive contact form with WhatsApp integration',
                    'Basic SEO setup & metadata configuration',
                    'Deployment & server configuration assistance',
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4B5563]">
                      <Check className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link
                  href="/contact?service=Website%20Development"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
                >
                  Get Website Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
