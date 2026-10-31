import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | JADE TEJA',
  description: 'Privacy policy and data protection practices for Jade Teja freelance services.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#FF6B00] mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1F2937] tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#9CA3AF] mb-8">Effective Date: October 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-sm sm:text-base text-[#4B5563] leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-[#1F2937] mb-2">1. Overview</h2>
            <p>
              This Privacy Policy explains how JADE TEJA (&ldquo;I&rdquo;, &ldquo;my&rdquo;, or &ldquo;we&rdquo;) collects, uses, and safeguards information provided by visitors and clients contacting us for freelance web and Android application development services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] mb-2">2. Information Collected</h2>
            <p>
              When submitting an inquiry form or contacting via WhatsApp/Email, we collect personal contact information including your Full Name, Email Address, Phone/WhatsApp number, and project specification details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] mb-2">3. How Information is Used</h2>
            <p>
              Collected information is strictly used to evaluate project requirements, prepare quotations, communicate project updates, and deliver software services. We do not sell or lease client contact information to any third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] mb-2">4. Data Security</h2>
            <p>
              Inquiries and project data are securely stored using industry-standard encrypted PostgreSQL databases with role-based access control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1F2937] mb-2">5. Contact Information</h2>
            <p>
              For any questions regarding this policy, reach out directly at{' '}
              <a href="mailto:jade.teja@gmail.com" className="text-[#FF6B00] font-bold">
                jade.teja@gmail.com
              </a>{' '}
              or +91 6304579593.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
