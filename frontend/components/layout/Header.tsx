'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

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
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C42] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-[#1F2937] dark:text-white tracking-tight leading-none group-hover:text-[#FF6B00] transition-colors">
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
                    active ? 'text-[#FF6B00]' : 'text-[#4B5563] dark:text-gray-300 hover:text-[#FF6B00] dark:hover:text-[#FF6B00]'
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

          {/* Desktop CTA Button & Dark Mode Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button & Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2.5 rounded-xl bg-[#F3F4F6] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 text-[#1F2937] dark:text-gray-200 hover:bg-[#E5E7EB] dark:hover:bg-gray-700 active:scale-95 focus:outline-none transition-all shadow-sm"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Modal rendered outside header for guaranteed top-level z-index */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden flex flex-col bg-white dark:bg-gray-950 overflow-y-auto">
          <div className="w-full max-w-lg mx-auto flex flex-col flex-1 justify-between p-6 bg-white dark:bg-gray-950 min-h-screen">
            <div>
              {/* Header inside Menu (Matching 14-navigation-mobile.png) */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F3F4F6] dark:border-gray-800">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                    T
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-base text-[#1F2937] dark:text-white">JADE TEJA</span>
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wide">WEB & ANDROID</span>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Navigation"
                    className="w-10 h-10 rounded-xl bg-[#FFF3E8] dark:bg-gray-800 text-[#FF6B00] flex items-center justify-center hover:bg-[#FFE0C2] dark:hover:bg-gray-700 active:scale-95 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Menu Header */}
              <div className="mt-6 mb-2 px-2">
                <span className="text-[11px] font-bold text-[#9CA3AF] dark:text-gray-400 tracking-wider uppercase">
                  NAVIGATION MENU
                </span>
              </div>

              {/* Links List */}
              <nav className="flex flex-col space-y-1 mt-2">
                {NAV_LINKS.map((link) => {
                  const active = isLinkActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base font-semibold transition-all ${
                        active
                          ? 'bg-[#FFF3E8] dark:bg-brand-orange/20 text-[#FF6B00]'
                          : 'text-[#1F2937] dark:text-gray-200 hover:bg-[#F9FAFB] dark:hover:bg-gray-900 active:bg-[#F3F4F6]'
                      }`}
                    >
                      <span>{link.name === 'About' ? 'About Me' : link.name}</span>
                      <ArrowRight className={`w-4 h-4 ${active ? 'text-[#FF6B00]' : 'text-[#9CA3AF]'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 pb-2 border-t border-[#F3F4F6] dark:border-gray-800 flex flex-col items-center gap-3.5">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:brightness-105 active:scale-98 transition-all"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 font-medium text-center">
                jade.teja@gmail.com • +91 6304579593
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
