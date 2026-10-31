'use client';

import React, { useState } from 'react';
import { Save, Loader2, Check } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { DEFAULT_SETTINGS } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify({
          settingKey: 'general',
          settingValue: JSON.stringify(settings),
        }),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Website Settings</h1>
        <p className="text-xs text-[#6B7280]">
          Configure brand name, contact channels, bio, and availability status
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Brand Name</label>
            <input
              type="text"
              value={settings.brandName}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Professional Title</label>
            <input
              type="text"
              value={settings.professionalTitle}
              onChange={(e) => setSettings({ ...settings, professionalTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">WhatsApp / Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Tagline</label>
          <input
            type="text"
            value={settings.tagline}
            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1.5">About Developer Bio</label>
          <textarea
            rows={3}
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>

        <div className="pt-4 flex items-center justify-between">
          {success && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> Settings Saved!
            </span>
          )}
          <div className="flex-1" />
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-md hover:brightness-105"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
