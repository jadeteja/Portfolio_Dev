'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Process', href: '/process' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C42] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl text-[#1F2937] tracking-tight leading-none group-hover:text-[#FF6B00] transition-colors">
              JADE TEJA
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#FF6B00] tracking-wider uppercase mt-1">
              WEB & ANDROID DEVELOPER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors ${
                  active ? 'text-[#FF6B00]' : 'text-[#4B5563] hover:text-[#FF6B00]'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B00] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="p-2.5 rounded-xl bg-[#F3F4F6] text-[#1F2937] hover:bg-[#E5E7EB] focus:outline-none transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer (matching 14-navigation-mobile.png) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between p-6 z-50 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F3F4F6]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white font-extrabold text-lg">
                    T
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-base text-[#1F2937]">JADE TEJA</span>
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase">WEB & ANDROID</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Navigation"
                  className="w-9 h-9 rounded-xl bg-[#FFF3E8] text-[#FF6B00] flex items-center justify-center hover:bg-[#FFE0C2] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Menu Header */}
              <div className="mt-6 mb-2">
                <span className="text-[11px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                  NAVIGATION MENU
                </span>
              </div>

              {/* Links List */}
              <div className="flex flex-col space-y-1.5 mt-2">
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        active
                          ? 'bg-[#FFF3E8] text-[#FF6B00] font-bold'
                          : 'text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#FF6B00]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`w-4 h-4 ${active ? 'text-[#FF6B00]' : 'text-[#9CA3AF]'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#F3F4F6] flex flex-col items-center gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-semibold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11px] text-[#6B7280] font-medium text-center">
                jade.teja@gmail.com • +91 6304579593
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
