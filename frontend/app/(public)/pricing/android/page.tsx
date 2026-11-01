import React from 'react';
import { getPricingPlans } from '@/lib/api';
import AndroidPricingClient from '@/components/pricing/AndroidPricingClient';

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

  const defaultFeatures = [
    'Complete Android application UI',
    'Basic functionality & agreed scope API integration',
    'Mobile-friendly performance & testing',
    'Signed APK delivery & setup guide',
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <AndroidPricingClient
        devPrice={devPrice}
        hostingPrice={hostingPrice}
        firstYearTotal={firstYearTotal}
        features={androidPlan?.features || defaultFeatures}
      />
    </div>
  );
}
