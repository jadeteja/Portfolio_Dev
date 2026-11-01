import React, { Suspense } from 'react';
import ContactClient from '@/components/contact/ContactClient';

export const metadata = {
  title: 'Contact Jade Teja — Start Your Website or Android Project',
  description:
    'Send an inquiry or connect via WhatsApp for high-speed website and Android application development starting at ₹5,000.',
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20 overflow-hidden">
      <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading form...</div>}>
        <ContactClient />
      </Suspense>
    </div>
  );
}
