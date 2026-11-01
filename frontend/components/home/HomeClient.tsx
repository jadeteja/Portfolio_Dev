'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';

const HomeSkyStarsBackground = dynamic(
  () => import('@/components/3d/HomeSkyStarsBackground'),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <div className="relative w-full overflow-hidden">
      <HomeSkyStarsBackground />
      <Hero />
    </div>
  );
}
