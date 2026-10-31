export type ChargeType = 'ONE_TIME' | 'RECURRING' | 'USAGE_BASED' | 'PROVIDER_FEE' | 'CUSTOM_QUOTE';

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  features: string[]; // parsed from JSON array
  displayOrder: number;
  active: boolean;
}

export interface PricingPlan {
  id: string;
  serviceType: 'WEBSITE' | 'ANDROID';
  title: string;
  developmentPrice: number;
  annualHostingPrice: number;
  hostingRequired: boolean;
  firstYearTotal: number;
  description: string;
  features: string[];
  active: boolean;
}

export interface AdditionalCharge {
  id: string;
  title: string;
  description: string;
  chargeType: ChargeType;
  amount: number | null;
  displayOrder: number;
  active: boolean;
}

export interface ProjectImage {
  id: string;
  imageUrl: string;
  storagePath?: string;
  altText?: string;
  displayOrder: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'Websites' | 'Android Apps' | 'E-Commerce' | string;
  shortDescription: string;
  fullDescription: string;
  problemStatement?: string;
  solution?: string;
  technologies: string[];
  coverImageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  projectStatus: 'CONCEPT' | 'PRODUCTION' | 'IN_DEVELOPMENT';
  featured: boolean;
  published: boolean;
  displayOrder: number;
  images?: ProjectImage[];
  createdAt?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
  active: boolean;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  professionalTitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  availability: string;
  bio: string;
}

export interface InquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectName?: string;
  budgetRange?: string;
  preferredTimeline?: string;
  description?: string;
  consentGiven: boolean;
}

export interface InquiryRecord extends InquiryPayload {
  id: string;
  status: 'NEW' | 'IN_REVIEW' | 'CONTACTED' | 'COMPLETED' | 'ARCHIVED';
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  totalInquiries: number;
  newInquiries: number;
  activeServices: number;
}
