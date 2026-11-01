'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import TiltCard from '@/components/3d/TiltCard';
import gsap from 'gsap';

const AmbientParticlesCanvas = dynamic(
  () => import('@/components/3d/AmbientParticlesCanvas'),
  { ssr: false }
);

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal-item', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Subtle 3D background particles */}
      <AmbientParticlesCanvas />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Information */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="contact-reveal-item inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide w-fit mb-4">
            GET IN TOUCH
          </div>

          <h1 className="contact-reveal-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight leading-[1.15] mb-5">
            Let&apos;s Build Something Amazing Together
          </h1>

          <p className="contact-reveal-item text-base text-[#6B7280] dark:text-gray-400 leading-relaxed mb-8">
            Have a website or Android app idea? Send me a message or connect directly via WhatsApp. I typically reply within a few hours.
          </p>

          {/* Email Card with 3D Tilt */}
          <div className="contact-reveal-item mb-4">
            <TiltCard maxTilt={5} scale={1.02}>
              <a
                href="mailto:jade.teja@gmail.com"
                className="p-5 rounded-2xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#FF6B00]/40 transition-all flex items-center gap-4 block group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 font-semibold block">Email Me Directly</span>
                  <span className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-gray-100 group-hover:text-[#FF6B00] transition-colors">
                    jade.teja@gmail.com
                  </span>
                </div>
              </a>
            </TiltCard>
          </div>

          {/* Phone Card with 3D Tilt */}
          <div className="contact-reveal-item mb-6">
            <TiltCard maxTilt={5} scale={1.02}>
              <a
                href="tel:+916304579593"
                className="p-5 rounded-2xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 hover:border-[#FF6B00]/40 transition-all flex items-center gap-4 block group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B7280] dark:text-gray-400 font-semibold block">Phone &amp; Mobile</span>
                  <span className="text-sm sm:text-base font-bold text-[#1F2937] dark:text-gray-100 group-hover:text-[#FF6B00] transition-colors">
                    +91 6304579593
                  </span>
                </div>
              </a>
            </TiltCard>
          </div>

          {/* Chat on WhatsApp CTA Button */}
          <div className="contact-reveal-item">
            <a
              href="https://wa.me/916304579593?text=Hi%20Jade%20Teja%2C%20I%20am%20interested%20in%20your%20website%20or%20Android%20app%20development%20services.%20I%20would%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition-all group"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Chat on WhatsApp (+91 6304579593)
            </a>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 contact-reveal-item">
          <TiltCard maxTilt={3} scale={1.005}>
            <div className="rounded-3xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 p-6 sm:p-8 shadow-xl">
              <ContactForm />
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
