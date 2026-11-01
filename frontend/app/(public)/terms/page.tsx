import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | JADE TEJA',
  description: 'Terms of service and freelance engagement conditions for Jade Teja.',
};

export default function TermsPage() {
  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] dark:text-gray-400 hover:text-[#FF6B00] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-6">
          Terms of Service
        </h1>
        <p className="text-xs text-[#9CA3AF] dark:text-gray-400 mb-8">Effective Date: October 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-[#4B5563] dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100 mb-2">1. Scope of Work & Quotations</h2>
            <p>
              Starting prices (₹5,000 for standard websites and Android apps) represent foundational starter packages. Final project prices and delivery schedules are formally determined and mutually agreed upon based on specific feature requirements, APIs, and timeline specifications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100 mb-2">2. Hosting & Third-Party Charges</h2>
            <p>
              Annual hosting (₹15,000/year for websites and server-backed applications) covers deployment, cloud server upkeep, and basic SSL maintenance. Third-party expenses such as custom domain registration fees, Google Play Developer console fees ($25 one-time), SMS OTP gateway costs, and paid APIs are billed directly to or paid by the client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100 mb-2">3. Source Code Ownership</h2>
            <p>
              Upon 100% completion of project milestones and full settlement of agreed fees, full ownership and repository rights to the project source code are completely transferred to the client.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] dark:text-gray-100 mb-2">4. Support & Maintenance</h2>
            <p>
              Standard post-launch warranty covers immediate bug fixes related to the agreed scope. Extended maintenance and ongoing feature additions are quoted transparently per milestone or support agreement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
