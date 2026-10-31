'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { FaqItem } from '@/types';
import { DEFAULT_FAQS } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/faqs`, {
          headers: getAdminAuthHeader(),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setFaqs(json.data);
        }
      } catch {
        // Fallback
      }
    }
    load();
  }, []);

  const handleAddFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          displayOrder: faqs.length + 1,
          active: true,
        }),
      });

      const newItem: FaqItem = {
        id: 'faq-' + Date.now(),
        question: newQuestion,
        answer: newAnswer,
        displayOrder: faqs.length + 1,
        active: true,
      };
      setFaqs([...faqs, newItem]);
      setNewQuestion('');
      setNewAnswer('');
    } catch {
      // Local fallback
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    try {
      await fetch(`${API_BASE_URL}/admin/faqs/${id}`, {
        method: 'DELETE',
        headers: getAdminAuthHeader(),
      });
      setFaqs(faqs.filter((f) => f.id !== id));
    } catch {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Manage FAQs</h1>
        <p className="text-xs text-[#6B7280]">
          Add, edit, and reorder public frequently asked questions
        </p>
      </div>

      {/* Add New FAQ Form */}
      <form onSubmit={handleAddFaq} className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-[#1F2937]">Add New Question & Answer</h3>
        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1">Question</label>
          <input
            type="text"
            required
            placeholder="e.g. Can I upgrade my website package later?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1">Answer</label>
          <textarea
            rows={3}
            required
            placeholder="Write clear, comprehensive answer..."
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-sm hover:brightness-105"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </form>

      {/* FAQ Items List */}
      <div className="space-y-3">
        {faqs.map((f, idx) => (
          <div
            key={f.id || idx}
            className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#FF6B00]">#{idx + 1}</span>
              <h4 className="font-bold text-sm sm:text-base text-[#1F2937]">{f.question}</h4>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed pt-1">{f.answer}</p>
            </div>
            <button
              onClick={() => handleDelete(f.id)}
              className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
