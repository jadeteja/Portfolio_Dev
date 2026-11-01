'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { submitInquiry } from '@/lib/api';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (min 2 characters)'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid contact/WhatsApp number'),
  projectType: z.string().min(1, 'Please select a project type'),
  projectName: z.string().optional(),
  budgetRange: z.string().optional(),
  preferredTimeline: z.string().optional(),
  description: z.string().min(5, 'Please provide brief details about your project'),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to be contacted regarding your project inquiry' }),
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || 'Website Development';
  const prefilledProject = searchParams.get('projectName') || '';

  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      projectType: prefilledService,
      projectName: prefilledProject,
      budgetRange: '₹5,000 - ₹20,000',
      preferredTimeline: '1-2 Weeks (Standard)',
      description: '',
      consentGiven: true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await submitInquiry({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType,
        projectName: data.projectName,
        budgetRange: data.budgetRange,
        preferredTimeline: data.preferredTimeline,
        description: data.description,
        consentGiven: data.consentGiven,
      });

      if (res.success) {
        router.push('/thank-you');
      } else {
        setServerError(res.message || 'Submission failed');
      }
    } catch (err: any) {
      setServerError('An unexpected error occurred. Please try again or message via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-[32px] bg-white dark:bg-gray-900 border border-[#FFE0C2] dark:border-brand-orange/30 p-6 sm:p-10 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-black text-[#1F2937] dark:text-gray-100 tracking-tight mb-8">
        Project Inquiry Form
      </h3>

      {serverError && (
        <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Aditya Sharma"
              {...register('fullName')}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all ${
                errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E7EB] dark:border-gray-800'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              placeholder="aditya@business.com"
              {...register('email')}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all ${
                errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E7EB] dark:border-gray-800'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Mobile/WhatsApp & Project Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Mobile / WhatsApp *
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              {...register('phone')}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all ${
                errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E7EB] dark:border-gray-800'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Project Type *
            </label>
            <select
              {...register('projectType')}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white transition-all"
            >
              <option value="Website Development">Website Development</option>
              <option value="Android App Development">Android App Development</option>
              <option value="Full-Stack (Web + Android)">Full-Stack (Web + Android)</option>
              <option value="Backend & REST API">Backend & REST API</option>
              <option value="Custom Consultation">Custom Consultation</option>
            </select>
          </div>
        </div>

        {/* Budget Range & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Estimated Budget
            </label>
            <select
              {...register('budgetRange')}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white transition-all"
            >
              <option value="₹5,000 - ₹20,000">₹5,000 - ₹20,000 (Standard)</option>
              <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000 (Custom Scope)</option>
              <option value="₹50,000+">₹50,000+ (Enterprise / Platform)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
              Preferred Timeline
            </label>
            <select
              {...register('preferredTimeline')}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] dark:border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white transition-all"
            >
              <option value="1-2 Weeks (Standard)">1-2 Weeks (Standard)</option>
              <option value="2-4 Weeks">2-4 Weeks</option>
              <option value="Flexible / Ongoing">Flexible / Ongoing</option>
            </select>
          </div>
        </div>

        {/* Description & Features */}
        <div>
          <label className="block text-xs font-bold text-[#1F2937] dark:text-gray-100 mb-2">
            Project Description & Features
          </label>
          <textarea
            rows={4}
            placeholder="Looking for a modern business website with appointment booking and WhatsApp integration."
            {...register('description')}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all resize-y ${
              errors.description ? 'border-rose-400 bg-rose-50/30' : 'border-[#E5E7EB] dark:border-gray-800'
            }`}
          />
          {errors.description && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.description.message}</p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            {...register('consentGiven')}
            className="mt-1 w-4 h-4 text-[#FF6B00] rounded border-gray-300 focus:ring-[#FF6B00]"
          />
          <label htmlFor="consent" className="text-xs text-[#6B7280] dark:text-gray-400 leading-relaxed">
            I consent to receiving follow-up correspondence regarding this project estimate.
          </label>
        </div>
        {errors.consentGiven && (
          <p className="text-xs text-rose-500 font-medium">{errors.consentGiven.message}</p>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold text-base shadow-lg shadow-[#FF6B00]/25 hover:shadow-xl hover:shadow-[#FF6B00]/35 hover:brightness-105 active:scale-98 transition-all disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                Submit Inquiry
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
