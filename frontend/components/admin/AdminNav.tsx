'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  DollarSign,
  PlusCircle,
  HelpCircle,
  Inbox,
  Settings,
  KeyRound,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { clearAdminSession, getAdminSession } from '@/lib/auth';

const NAV_ITEMS = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Services', href: '/admin/services', icon: Wrench },
  { name: 'Pricing Plans', href: '/admin/pricing', icon: DollarSign },
  { name: 'Additional Charges', href: '/admin/additional-charges', icon: PlusCircle },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  { name: 'Change Password', href: '/admin/change-password', icon: KeyRound },
];

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, don't show admin sidebar/topbar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    clearAdminSession();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-900 flex flex-col lg:flex-row">
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-white border-b border-[#E5E7EB] dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF6B00] flex items-center justify-center text-white font-extrabold text-sm">
            T
          </div>
          <span className="font-extrabold text-sm text-[#1F2937] dark:text-gray-100">Admin Console</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#F3F4F6] text-[#1F2937] dark:text-gray-100"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] dark:border-gray-800 p-5 flex flex-col justify-between transform transition-transform duration-200 lg:translate-x-0 lg:static ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo in Admin */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#F3F4F6] dark:border-gray-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF6B00] to-[#FF8C42] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              T
            </div>
            <div>
              <span className="font-black text-base text-[#1F2937] dark:text-gray-100 leading-none block">JADE TEJA</span>
              <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#FFF3E8] dark:bg-brand-orange/15 text-[#FF6B00] font-bold shadow-xs'
                      : 'text-[#4B5563] dark:text-gray-300 hover:bg-[#F9FAFB] dark:bg-gray-900 hover:text-[#1F2937] dark:text-gray-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#FF6B00]' : 'text-[#9CA3AF] dark:text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions in Sidebar */}
        <div className="pt-6 border-t border-[#F3F4F6] dark:border-gray-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-[#4B5563] dark:text-gray-300 hover:bg-[#F9FAFB] dark:bg-gray-900 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  );
}
