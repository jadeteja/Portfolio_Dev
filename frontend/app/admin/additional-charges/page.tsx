'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { AdditionalCharge } from '@/types';
import { DEFAULT_ADDITIONAL_CHARGES } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminAdditionalChargesPage() {
  const [charges, setCharges] = useState<AdditionalCharge[]>(DEFAULT_ADDITIONAL_CHARGES);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newType, setNewType] = useState('CUSTOM_QUOTE');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/additional-charges`, {
          headers: getAdminAuthHeader(),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setCharges(json.data);
        }
      } catch {
        // Fallback
      }
    }
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      await fetch(`${API_BASE_URL}/admin/additional-charges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDesc,
          chargeType: newType,
          displayOrder: charges.length + 1,
          active: true,
        }),
      });

      const newItem: AdditionalCharge = {
        id: 'ac-' + Date.now(),
        title: newTitle,
        description: newDesc,
        chargeType: newType as any,
        amount: null,
        displayOrder: charges.length + 1,
        active: true,
      };
      setCharges([...charges, newItem]);
      setNewTitle('');
      setNewDesc('');
    } catch {
      // Local
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    try {
      await fetch(`${API_BASE_URL}/admin/additional-charges/${id}`, {
        method: 'DELETE',
        headers: getAdminAuthHeader(),
      });
      setCharges(charges.filter((c) => c.id !== id));
    } catch {
      setCharges(charges.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Additional Charges</h1>
        <p className="text-xs text-[#6B7280]">
          Manage optional add-ons, provider fees, and custom feature quotes
        </p>
      </div>

      <form onSubmit={handleAdd} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[#1F2937]">Add New Add-on / Charge</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1">Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Multi-Language Localization"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1">Charge Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-sm bg-white"
            >
              <option value="CUSTOM_QUOTE">Custom Quote</option>
              <option value="PROVIDER_FEE">Provider Fee</option>
              <option value="USAGE_BASED">Usage-Based</option>
              <option value="ONE_TIME">One-Time Fee</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1">Description</label>
          <input
            type="text"
            placeholder="Brief scope explanation..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-sm hover:brightness-105"
        >
          <Plus className="w-4 h-4" /> Add Charge Item
        </button>
      </form>

      <div className="space-y-3">
        {charges.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-bold text-sm text-[#1F2937]">{c.title}</h4>
              <p className="text-xs text-[#6B7280]">{c.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFF3E8] text-[#FF6B00]">
                {c.chargeType}
              </span>
              <button
                onClick={() => handleDelete(c.id)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
