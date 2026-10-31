import React from 'react';
import Hero from '@/components/home/Hero';

export const metadata = {
  title: 'JADE TEJA — Freelance Web & Android App Developer',
  description:
    'Affordable, modern, responsive, and scalable digital solutions starting at just ₹5,000. Your Idea. My Code. Our Success.',
};

export default function HomePage() {
  return (
    <div>
      <Hero />
    </div>
  );
}
