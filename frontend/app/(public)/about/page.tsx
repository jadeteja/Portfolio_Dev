import React from 'react';
import { getSiteSettings } from '@/lib/api';
import AboutClient from '@/components/about/AboutClient';

export const metadata = {
  title: 'About Jade Teja — Freelance Web & Android Developer',
  description:
    'Dedicated freelance developer focused on building practical, revenue-generating websites and high-performing Android apps with clean code and transparent pricing.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <AboutClient settings={settings} />
    </div>
  );
}
