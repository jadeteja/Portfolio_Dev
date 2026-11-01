import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/api';

interface ProjectDetailsProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found | JADE TEJA' };
  return {
    title: `${project.title} — Case Study & Project Details`,
    description: project.shortDescription,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full bg-white dark:bg-gray-950 transition-colors py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] dark:text-gray-400 hover:text-[#FF6B00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Desktop 2-Col Layout & Mobile Vertical Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start mb-16">
          {/* Left Column: Interactive Mockup Canvas & Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="w-full rounded-3xl bg-[#FFF6EE] border border-[#FFE0C2] dark:border-brand-orange/30 p-6 sm:p-8 shadow-sm">
              {/* Browser Window Mockup */}
              <div className="w-full rounded-2xl bg-[#1E293B] shadow-xl overflow-hidden border border-slate-700">
                {/* Browser Tab Header */}
                <div className="bg-[#0F172A] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    concept-{project.slug}.app
                  </span>
                  <div className="w-6" />
                </div>

                {/* Mockup Screen Content */}
                <div className="p-4 sm:p-6 bg-white min-h-[220px] flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="font-extrabold text-xs sm:text-sm text-[#FF6B00] uppercase tracking-wide">
                      {project.title.toUpperCase()}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Products • Deals • Cart (2)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-4">
                    <div className="p-3 rounded-xl bg-[#FFF5EC] border border-[#FFE2CC] text-center">
                      <span className="block text-xs font-bold text-[#1F2937] dark:text-gray-100">Featured Product</span>
                      <span className="text-[11px] text-[#FF6B00] font-black">₹1,499</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#FFF5EC] border border-[#FFE2CC] text-center">
                      <span className="block text-xs font-bold text-[#1F2937] dark:text-gray-100">Top Rated Item</span>
                      <span className="text-[11px] text-[#FF6B00] font-black">₹2,999</span>
                    </div>
                  </div>

                  <div className="w-full py-2.5 bg-[#FF6B00] text-white text-center rounded-xl text-xs font-bold shadow-md">
                    Proceed to Checkout
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnail Pills */}
            <div className="hidden sm:grid grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-center text-xs font-bold text-[#4B5563] dark:text-gray-300 shadow-sm">
                Cart & Checkout
              </div>
              <div className="p-4 rounded-2xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-center text-xs font-bold text-[#4B5563] dark:text-gray-300 shadow-sm">
                Admin Panel
              </div>
              <div className="p-4 rounded-2xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-center text-xs font-bold text-[#4B5563] dark:text-gray-300 shadow-sm">
                Mobile View
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3E8] dark:bg-brand-orange/15 border border-[#FFE0C2] dark:border-brand-orange/30 text-[#FF6B00] text-xs font-bold tracking-wide mb-4">
                <span>CONCEPT CASE STUDY</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-6">
                {project.title}
              </h1>

              {/* Problem Addressed */}
              <div className="mb-6">
                <h4 className="text-xs font-extrabold text-[#FF6B00] tracking-wider uppercase mb-2">
                  PROBLEM ADDRESSED
                </h4>
                <p className="text-sm sm:text-base text-[#4B5563] dark:text-gray-300 leading-relaxed">
                  {project.problemStatement ||
                    'Traditional business workflows struggled with legacy friction, lack of mobile optimization, and manual processing.'}
                </p>
              </div>

              {/* Features Developed */}
              <div className="mb-6">
                <h4 className="text-xs font-extrabold text-[#FF6B00] tracking-wider uppercase mb-3">
                  FEATURES DEVELOPED
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    <span>Instant search & categorization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    <span>Integrated payment gateway</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    <span>WhatsApp order confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4B5563] dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                    <span>Fast administrative management UI</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-extrabold text-[#FF6B00] tracking-wider uppercase mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(project.technologies) ? project.technologies : ['React', 'Node.js', 'Tailwind']).map(
                    (tech, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-[#F9FAFB] dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 text-xs font-bold text-[#1F2937] dark:text-gray-100"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Links if available */}
              {(project.demoUrl || project.githubUrl) && (
                <div className="flex items-center gap-4 pt-4 border-t border-[#F3F4F6] dark:border-gray-800">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Concept Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4B5563] dark:text-gray-300 hover:underline"
                    >
                      <Github className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA Button matching 08-project-details-desktop */}
        <div className="flex justify-center pt-8 border-t border-[#F3F4F6] dark:border-gray-800">
          <Link
            href={`/contact?service=${encodeURIComponent(project.category)}&projectName=${encodeURIComponent(
              project.title
            )}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-4 px-10 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all"
          >
            Build Something Similar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
