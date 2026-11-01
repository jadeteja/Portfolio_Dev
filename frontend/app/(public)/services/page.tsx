import React from 'react';
import { getServices } from '@/lib/api';
import ServicesClient from '@/components/services/ServicesClient';

export const metadata = {
  title: 'Custom Development Services | JADE TEJA',
  description:
    'Website development, native Android apps, secure backend APIs, and reliable cloud deployment starting at ₹5,000.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <ServicesClient services={services} />
    </div>
  );
}
