'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  Inbox,
  Wrench,
  DollarSign,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { DashboardStats } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 6,
    publishedProjects: 6,
    totalInquiries: 3,
    newInquiries: 2,
    activeServices: 4,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: getAdminAuthHeader(),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setStats(json.data);
        }
      } catch {
        // Fallback already prefilled
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1F2937] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Welcome back, Jade Teja. Here is a summary of your portfolio and recent client inquiries.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs sm:text-sm font-bold shadow-sm hover:brightness-105 transition-all w-fit"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Projects */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase">Projects</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3E8] flex items-center justify-center text-[#FF6B00]">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#1F2937] block">
            {stats.totalProjects}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {stats.publishedProjects} Published Live
          </span>
        </div>

        {/* Total Inquiries */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase">Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-blue-600">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#1F2937] block">
            {stats.totalInquiries}
          </span>
          <span className="text-[11px] text-[#FF6B00] font-semibold mt-1 block">
            {stats.newInquiries} Awaiting Review
          </span>
        </div>

        {/* Active Services */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase">Active Services</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#1F2937] block">
            {stats.activeServices}
          </span>
          <span className="text-[11px] text-[#6B7280] font-medium mt-1 block">
            Web & Android Solutions
          </span>
        </div>

        {/* Base Pricing */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#6B7280] uppercase">Base Pricing</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3E8] flex items-center justify-center text-[#FF6B00]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#1F2937] block">
            ₹5,000
          </span>
          <span className="text-[11px] text-[#6B7280] font-medium mt-1 block">
            Starting rate configured
          </span>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/inquiries"
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-4">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Customer Inquiries</h3>
            <p className="text-xs text-[#6B7280]">
              View lead contact info, budgets, requested scopes, and update inquiry statuses.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] mt-4">
            Manage Inquiries <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/pricing"
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Pricing & Packages</h3>
            <p className="text-xs text-[#6B7280]">
              Update development prices, annual hosting rates, and package features in PostgreSQL.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] mt-4">
            Update Pricing <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/admin/projects"
          className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:border-[#FF6B00]/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] flex items-center justify-center mb-4">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1F2937] mb-1">Project Case Studies</h3>
            <p className="text-xs text-[#6B7280]">
              Add new projects, upload screenshots to Supabase Storage, and manage categories.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] mt-4">
            Manage Projects <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
