import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1F2937] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white font-extrabold text-xl">
                T
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">JADE TEJA</span>
                <p className="text-xs font-semibold text-[#FF8C42] tracking-wider uppercase">
                  Freelance Web & Android App Developer
                </p>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              Your Idea. My Code. Our Success. Building high-speed, modern websites and native Android apps with transparent pricing and direct freelancer accountability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 text-sm text-gray-300">
              <a
                href="mailto:jade.teja@gmail.com"
                className="flex items-center gap-2 hover:text-[#FF8C42] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF8C42]" />
                jade.teja@gmail.com
              </a>
              <a
                href="tel:+916304579593"
                className="flex items-center gap-2 hover:text-[#FF8C42] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF8C42]" />
                +91 6304579593
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF8C42]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Developer</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">Transparent Pricing</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio Showcase</Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">7-Step Process</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Pricing & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FF8C42]">Packages & Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/pricing/website" className="hover:text-white transition-colors">Website Package (₹5,000+)</Link>
              </li>
              <li>
                <Link href="/pricing/android" className="hover:text-white transition-colors">Android App Starter (₹5,000+)</Link>
              </li>
              <li>
                <Link href="/pricing/additional-charges" className="hover:text-white transition-colors">Additional Features</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Start a Project</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li className="pt-2">
                <Link href="/admin/login" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors">
                  Admin Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} JADE TEJA. All rights reserved. Handcrafted with clean code & modern tech.</p>
          <p className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#FF8C42]" /> India • Available for Remote Projects Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
