'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { ServiceItem } from '@/types';
import { DEFAULT_SERVICES } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/services`, {
          headers: getAdminAuthHeader(),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setServices(json.data);
        }
      } catch {
        // Fallback initialized
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Manage Services</h1>
          <p className="text-xs text-[#6B7280]">
            Update your core offerings (Web, Android, Backend, Deployment)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFF3E8] text-[#FF6B00]">
                  Order: {s.displayOrder}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">{s.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{s.description}</p>
            </div>
            <div className="pt-4 border-t border-[#F3F4F6] flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50">
                Edit Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
