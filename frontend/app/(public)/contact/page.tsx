import React, { Suspense } from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Jade Teja — Start Your Website or Android Project',
  description:
    'Send an inquiry or connect via WhatsApp for high-speed website and Android application development starting at ₹5,000.',
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Information matching 13-contact-desktop */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] text-xs font-bold tracking-wide w-fit mb-4">
              GET IN TOUCH
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight leading-[1.15] mb-5">
              Let&apos;s Build Something Amazing Together
            </h1>

            <p className="text-base text-[#6B7280] leading-relaxed mb-8">
              Have a website or Android app idea? Send me a message or connect directly via WhatsApp. I typically reply within a few hours.
            </p>

            {/* Email Card */}
            <a
              href="mailto:jade.teja@gmail.com"
              className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#FF6B00]/40 transition-all flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#FF6B00]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#6B7280] font-semibold block">Email Me Directly</span>
                <span className="text-sm sm:text-base font-bold text-[#1F2937]">jade.teja@gmail.com</span>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:+916304579593"
              className="p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#FF6B00]/40 transition-all flex items-center gap-4 mb-6"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#FF6B00]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#6B7280] font-semibold block">Phone & Mobile</span>
                <span className="text-sm sm:text-base font-bold text-[#1F2937]">+91 6304579593</span>
              </div>
            </a>

            {/* Chat on WhatsApp CTA Button */}
            <a
              href="https://wa.me/916304579593?text=Hi%20Jade%20Teja%2C%20I%20am%20interested%20in%20your%20website%20or%20Android%20app%20development%20services.%20I%20would%20like%20to%20discuss%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-md hover:brightness-105 active:scale-98 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp (+91 6304579593)
            </a>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-12 text-center text-gray-400">Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
