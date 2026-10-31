'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Save, Upload } from 'lucide-react';
import { getAdminAuthHeader } from '@/lib/auth';
import { DEFAULT_PROJECTS } from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'Websites',
    shortDescription: '',
    fullDescription: '',
    problemStatement: '',
    solution: '',
    technologies: '["React", "Next.js", "Tailwind CSS"]',
    demoUrl: '',
    githubUrl: '',
    projectStatus: 'CONCEPT',
    featured: false,
    published: true,
  });

  useEffect(() => {
    // Find matching project from default or API
    const found = DEFAULT_PROJECTS.find((p) => p.id === projectId || p.slug === projectId);
    if (found) {
      setForm({
        title: found.title,
        slug: found.slug,
        category: found.category,
        shortDescription: found.shortDescription,
        fullDescription: found.fullDescription || '',
        problemStatement: found.problemStatement || '',
        solution: found.solution || '',
        technologies: JSON.stringify(found.technologies),
        demoUrl: found.demoUrl || '',
        githubUrl: found.githubUrl || '',
        projectStatus: found.projectStatus,
        featured: found.featured,
        published: found.published,
      });
    }
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/admin/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAdminAuthHeader(),
        },
        body: JSON.stringify(form),
      });
      router.push('/admin/projects');
    } catch {
      router.push('/admin/projects');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="p-2 rounded-xl bg-white border border-[#E5E7EB] text-gray-600 hover:text-[#FF6B00]"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-[#1F2937]">Edit Project</h1>
          <p className="text-xs text-[#6B7280]">Update project details, technologies, and links</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Project Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">URL Slug *</label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm bg-white"
            >
              <option value="Websites">Websites</option>
              <option value="Android Apps">Android Apps</option>
              <option value="Full-Stack">Full-Stack</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Status *</label>
            <select
              value={form.projectStatus}
              onChange={(e) => setForm({ ...form, projectStatus: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm bg-white"
            >
              <option value="CONCEPT">CONCEPT</option>
              <option value="PRODUCTION">PRODUCTION</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Short Description *</label>
          <input
            type="text"
            required
            value={form.shortDescription}
            onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Problem Addressed</label>
          <textarea
            rows={2}
            value={form.problemStatement}
            onChange={(e) => setForm({ ...form, problemStatement: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1F2937] mb-1.5">Technologies (JSON array)</label>
          <input
            type="text"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-mono"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-bold shadow-md hover:brightness-105"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}
