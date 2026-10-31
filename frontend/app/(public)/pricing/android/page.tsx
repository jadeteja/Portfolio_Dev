import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import PricingNavTabs from '@/components/pricing/PricingNavTabs';
import { getPricingPlans } from '@/lib/api';

export const metadata = {
  title: 'Android App Development Pricing | JADE TEJA',
  description:
    'Native Android app starter package from ₹5,000 one-time development. High performance native Kotlin development.',
};

export default async function AndroidPricingPage() {
  const plans = await getPricingPlans();
  const androidPlan = plans.find((p) => p.serviceType === 'ANDROID') || plans[1] || plans[0];

  const devPrice = androidPlan ? Number(androidPlan.developmentPrice).toLocaleString('en-IN') : '5,000';
  const hostingPrice = androidPlan ? Number(androidPlan.annualHostingPrice).toLocaleString('en-IN') : '15,000';
  const firstYearTotal = androidPlan
    ? (Number(androidPlan.developmentPrice) + Number(androidPlan.annualHostingPrice)).toLocaleString('en-IN')
    : '20,000';

  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <PricingNavTabs />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
            <span className="hidden sm:inline">MOBILE APP DEVELOPMENT</span>
            <span className="sm:hidden">NATIVE ANDROID</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight mb-4">
            <span className="hidden sm:inline">Android App Development Pricing</span>
            <span className="sm:hidden">Android App Package</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            High performance native Android apps built for your specific business requirements.
          </p>
        </div>

        {/* Pricing Container Matching 05-android-pricing-desktop & mobile */}
        <div className="max-w-4xl mx-auto rounded-[32px] border-2 border-[#FF8C42] bg-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Phone Mockup (Desktop Only) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center p-6 rounded-3xl bg-[#FFF6EE] border border-[#FFE0C2]">
              {/* Phone Hardware Mockup */}
              <div className="w-48 h-80 rounded-[32px] bg-[#1E293B] border-4 border-slate-800 p-3 shadow-xl flex flex-col justify-between">
                {/* Speaker Notch */}
                <div className="flex justify-center mb-2">
                  <div className="w-14 h-3 bg-slate-700 rounded-full" />
                </div>

                {/* App Screen Content */}
                <div className="flex-1 bg-white rounded-2xl p-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-4 w-12 bg-[#FF6B00] rounded-md" />
                    <div className="p-2 rounded-lg bg-[#FFF3E8] border border-[#FFE0C2] text-center">
                      <span className="text-[10px] font-bold text-[#FF6B00]">Sample Android UI</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-3/4 bg-slate-100 rounded" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded" />
                  </div>

                  <div className="w-full py-2 bg-[#FF6B00] rounded-xl text-center text-white text-[10px] font-bold">
                    Action Button
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold text-[#FF6B00] mt-4">
                Android Studio & Kotlin Native
              </span>
            </div>

            {/* Right Column: Pricing Breakdown & Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs sm:text-sm font-extrabold text-[#FF6B00] tracking-wider uppercase">
                    <span className="hidden sm:inline">ANDROID APP STARTER</span>
                    <span className="sm:hidden">STARTING RATE</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-xs font-bold text-[#FF6B00]">
                    <span className="hidden sm:inline">Basic App</span>
                    <span className="sm:hidden">Simple App</span>
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-[#1F2937]">₹{devPrice}</span>
                  <span className="text-xs sm:text-sm text-[#6B7280] font-medium">
                    starting one-time development
                  </span>
                </div>

                {/* Gray Breakdown Box */}
                <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-5 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm text-[#4B5563]">
                    <span>Development:</span>
                    <span className="font-bold text-[#1F2937]">₹{devPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#4B5563]">
                    <span>Backend Hosting (if needed):</span>
                    <span className="font-bold text-[#1F2937]">₹{hostingPrice}</span>
                  </div>
                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-sm font-black text-[#FF6B00]">First-Year Total:</span>
                    <span className="text-lg font-black text-[#FF6B00]">₹{firstYearTotal}</span>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] pt-1">
                    Subsequent Hosting: ₹{hostingPrice} / year (where applicable)
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-[#1F2937] mb-3">
                    <span className="hidden sm:inline">What&apos;s Included:</span>
                    <span className="sm:hidden">Android Package Details:</span>
                  </h4>

                  <ul className="space-y-3">
                    {(androidPlan?.features || [
                      'Complete Android application UI',
                      'Basic functionality & agreed scope API integration',
                      'Mobile-friendly performance & testing',
                      'Signed APK delivery & setup guide',
                    ]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                        <Check className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
                  * Google Play registration, advanced features, external APIs, and publishing fees may be additional.
                </p>
              </div>

              {/* CTA Button */}
              <div>
                <Link
                  href="/contact?service=Android%20App%20Development"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
                >
                  Discuss My Android App
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
