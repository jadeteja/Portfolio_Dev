import React from 'react';
import Link from 'next/link';
import { Check, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Thank You for Reaching Out! | JADE TEJA',
  description: 'Your project inquiry has been received. I will review and respond shortly.',
};

export default function ThankYouPage() {
  return (
    <div className="w-full bg-white py-16 lg:py-28 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6">
        <div className="rounded-[36px] bg-white border border-[#FFE0C2] p-8 sm:p-12 text-center shadow-sm">
          {/* Circular Checkmark Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFF3E8] border border-[#FFE0C2] text-[#FF6B00] mx-auto flex items-center justify-center mb-8 shadow-inner">
            <Check className="w-10 h-10 sm:w-12 sm:h-12 stroke-[3]" />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2937] tracking-tight mb-4">
            Thank You for Reaching Out!
          </h1>

          {/* Message */}
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed mb-8 max-w-md mx-auto">
            Your inquiry has been received. I&apos;ll review your project details and get back to you as soon as possible.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-8 rounded-2xl bg-[#FF6B00] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all"
            >
              Back to Home
            </Link>
            <a
              href="https://wa.me/916304579593?text=Hi%20Jade%20Teja%2C%20I%20just%20submitted%20an%20inquiry%20on%20your%20website%20and%20wanted%20to%20connect%20here%20as%20well."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Direct Email Note */}
          <p className="text-xs text-[#6B7280]">
            Direct Email:{' '}
            <a href="mailto:jade.teja@gmail.com" className="text-[#FF6B00] font-bold hover:underline">
              jade.teja@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
