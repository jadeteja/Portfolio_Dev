'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Phone, MessageCircle, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { InquiryRecord } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

const MOCK_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-1',
    fullName: 'Aditya Sharma',
    email: 'aditya@business.com',
    phone: '+91 98765 43210',
    projectType: 'Website Development',
    projectName: 'Retail Store Showcase',
    budgetRange: '₹5,000 - ₹20,000',
    preferredTimeline: '1-2 Weeks (Standard)',
    description: 'Looking for a modern business website with appointment booking and WhatsApp integration.',
    status: 'NEW',
    consentGiven: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'inq-2',
    fullName: 'Pooja Reddy',
    email: 'pooja.reddy@techhub.in',
    phone: '+91 87654 32109',
    projectType: 'Android App Development',
    projectName: 'Salon Booking App',
    budgetRange: '₹20,000 - ₹50,000',
    preferredTimeline: '2-4 Weeks',
    description: 'Need native Kotlin Android app for salon scheduling with SMS notifications.',
    status: 'IN_REVIEW',
    consentGiven: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(MOCK_INQUIRIES);
  const [loading, setLoading] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/admin/inquiries`, {
        headers: getAdminAuthHeader(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.content) setInquiries(json.data.content);
        else if (Array.isArray(json.data)) setInquiries(json.data);
      }
    } catch {
      // Use fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE_URL}/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
    } catch {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'IN_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CONTACTED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Customer Inquiries</h1>
        <p className="text-xs text-[#6B7280]">
          Incoming requests submitted through the public website contact form
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div
            key={inq.id}
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-[#1F2937]">{inq.fullName}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                    inq.status
                  )}`}
                >
                  {inq.status}
                </span>
                <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#4B5563]">
                <a
                  href={`mailto:${inq.email}`}
                  className="flex items-center gap-1.5 text-blue-600 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {inq.email}
                </a>
                <a
                  href={`tel:${inq.phone}`}
                  className="flex items-center gap-1.5 text-emerald-600 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {inq.phone}
                </a>
                <span className="px-2.5 py-0.5 rounded-md bg-[#FFF3E8] text-[#FF6B00]">
                  {inq.projectType}
                </span>
                {inq.budgetRange && (
                  <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700">
                    Budget: {inq.budgetRange}
                  </span>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {inq.description}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <a
                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hi ${inq.fullName}, this is Jade Teja. I received your inquiry regarding "${inq.projectType}" and would love to discuss the details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:brightness-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-gray-500">Status:</span>
                <select
                  value={inq.status}
                  onChange={(e) => updateStatus(inq.id, e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-semibold bg-white"
                >
                  <option value="NEW">NEW</option>
                  <option value="IN_REVIEW">IN_REVIEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
