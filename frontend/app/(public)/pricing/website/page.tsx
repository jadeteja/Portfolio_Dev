import React from 'react';
import { getPricingPlans } from '@/lib/api';
import PricingCardClient from '@/components/pricing/PricingCardClient';

export const metadata = {
  title: 'Website Development Pricing | JADE TEJA',
  description:
    'Standard Website Package starting at ₹5,000 one-time development and ₹15,000 annual hosting. Clear transparent pricing.',
};

export default async function WebsitePricingPage() {
  const plans = await getPricingPlans();

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <PricingCardClient
        plans={plans}
        serviceType="WEBSITE"
        badgeTitle="TRANSPARENT PRICING"
        titleDesktop="Website Development Pricing"
        titleMobile="Website Package"
        packageBadge="Basic Website"
        packageName="STANDARD WEBSITE PACKAGE"
        quoteLink="/contact?service=Website%20Development"
        quoteButtonText="Get Website Quote"
        disclaimer="* Custom features, custom domain purchase, payment gateway integration, and third-party APIs may cost extra."
        defaultFeatures={[
          '100% Responsive & mobile-friendly layout',
          'Essential business pages (Home, About, Services)',
          'Interactive contact form with WhatsApp integration',
          'Basic SEO setup & metadata configuration',
          'Deployment & server configuration assistance',
        ]}
      />
    </div>
  );
}
