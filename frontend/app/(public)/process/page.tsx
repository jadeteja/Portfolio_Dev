import React from 'react';
import ProcessClient from '@/components/process/ProcessClient';

export const metadata = {
  title: '7-Step Development Process | JADE TEJA',
  description:
    'A structured, hassle-free 7-step roadmap from initial message to live application for web and Android projects.',
};

const STEPS = [
  {
    step: '01',
    title: 'Discuss Idea',
    mobileTitle: 'Discuss Your Idea',
    desc: 'Initial talk on project goals & expectations.',
  },
  {
    step: '02',
    title: 'Requirements',
    mobileTitle: 'Gather Requirements',
    desc: 'Detailed scope, features, and timeline definition.',
  },
  {
    step: '03',
    title: 'Plan & UI',
    mobileTitle: 'Plan & Design UI',
    desc: 'Mockup structuring & design alignment.',
  },
  {
    step: '04',
    title: 'Development',
    mobileTitle: 'Develop Your Project',
    desc: 'Clean coding for Web or Android.',
  },
  {
    step: '05',
    title: 'Test & Review',
    mobileTitle: 'Test & Review',
    desc: 'Device testing, responsiveness & client check.',
  },
  {
    step: '06',
    title: 'Deploy & Launch',
    mobileTitle: 'Deploy & Launch',
    desc: 'Cloud setup, domain linking & APK release.',
  },
  {
    step: '07',
    title: 'Support',
    mobileTitle: 'Support & Maintenance',
    desc: 'Ongoing maintenance & updates.',
  },
];

export default function ProcessPage() {
  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-24">
      <ProcessClient steps={STEPS} />
    </div>
  );
}
