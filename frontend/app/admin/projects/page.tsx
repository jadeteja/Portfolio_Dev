'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { Project } from '@/types';
import { DEFAULT_PROJECTS } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/admin/projects`, {
        headers: getAdminAuthHeader(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) setProjects(json.data);
      }
    } catch {
      // Use initial state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
        method: 'DELETE',
        headers: getAdminAuthHeader(),
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1F2937] tracking-tight">Manage Projects</h1>
          <p className="text-xs text-[#6B7280]">
            Create and edit portfolio items, concept projects, and screenshots.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-sm hover:brightness-105"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#4B5563]">
                <th className="p-4 font-bold">Title</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Visibility</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-orange-50/20 transition-colors">
                  <td className="p-4 font-bold text-[#1F2937]">
                    <div className="flex items-center gap-2">
                      <span>{p.title}</span>
                      <Link
                        href={`/portfolio/${p.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-[#FF6B00]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <span className="text-[11px] text-[#9CA3AF] font-normal">{p.slug}</span>
                  </td>
                  <td className="p-4 text-[#4B5563]">{p.category}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FFF3E8] text-[#FF6B00]">
                      {p.projectStatus || 'CONCEPT'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700">
                      Published
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link
                      href={`/admin/projects/${p.id}/edit`}
                      className="inline-flex p-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex p-2 rounded-lg bg-gray-50 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
