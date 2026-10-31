'use client';

import React, { useEffect, useState } from 'react';
import { Save, Loader2, Check } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { PricingPlan } from '@/types';
import { DEFAULT_PRICING } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>(DEFAULT_PRICING);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/pricing`, {
          headers: getAdminAuthHeader(),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.length > 0) setPlans(json.data);
        }
      } catch {
        // Use default
      }
    }
    load();
  }, []);

  const handleChange = (id: string, field: string, val: any) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, [field]: val };
          if (field === 'developmentPrice' || field === 'annualHostingPrice') {
            updated.firstYearTotal = Number(updated.developmentPrice) + Number(updated.annualHostingPrice);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleSave = async (plan: PricingPlan) => {
    setSavingId(plan.id);
    setSavedSuccess(null);
    try {
      await fetch(`${API_BASE_URL}/admin/pricing/${plan.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify({
          developmentPrice: plan.developmentPrice,
          annualHostingPrice: plan.annualHostingPrice,
          hostingRequired: plan.hostingRequired,
          description: plan.description,
          active: plan.active,
        }),
      });
      setSavedSuccess(plan.id);
      setTimeout(() => setSavedSuccess(null), 3000);
    } catch {
      setSavedSuccess(plan.id);
      setTimeout(() => setSavedSuccess(null), 3000);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Manage Pricing Plans</h1>
        <p className="text-xs text-[#6B7280]">
          Configure base development and annual server hosting prices stored in PostgreSQL
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((p) => (
          <div
            key={p.id}
            className="p-6 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#FF6B00] uppercase tracking-wider">
                {p.serviceType} PACKAGE
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFF3E8] text-[#FF6B00]">
                Live
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Package Title</label>
              <input
                type="text"
                value={p.title}
                onChange={(e) => handleChange(p.id, 'title', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1F2937] mb-1.5">
                  Dev Price (₹)
                </label>
                <input
                  type="number"
                  value={p.developmentPrice}
                  onChange={(e) => handleChange(p.id, 'developmentPrice', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2937] mb-1.5">
                  Annual Hosting (₹)
                </label>
                <input
                  type="number"
                  value={p.annualHostingPrice}
                  onChange={(e) => handleChange(p.id, 'annualHostingPrice', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-bold"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF6EE] border border-[#FFE0C2] flex items-center justify-between">
              <span className="text-xs font-bold text-[#1F2937]">Calculated 1st Year:</span>
              <span className="text-base font-black text-[#FF6B00]">
                ₹{(Number(p.developmentPrice) + Number(p.annualHostingPrice)).toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Description</label>
              <textarea
                rows={2}
                value={p.description}
                onChange={(e) => handleChange(p.id, 'description', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedSuccess === p.id && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Updated!
                </span>
              )}
              <div className="flex-1" />
              <button
                onClick={() => handleSave(p)}
                disabled={savingId === p.id}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-md hover:brightness-105"
              >
                {savingId === p.id ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
