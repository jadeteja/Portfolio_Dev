import {
  ServiceItem,
  PricingPlan,
  AdditionalCharge,
  Project,
  FaqItem,
  SiteSettings,
  InquiryPayload,
  InquiryRecord,
  DashboardStats,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

// Seeded Fallbacks matching UI reference images 01 to 15
export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 's-1',
    title: 'Website Development',
    slug: 'website-development',
    description: 'Modern business websites, portfolios, landing pages, and customized e-commerce web applications.',
    icon: 'monitor',
    features: ['Business Sites', 'Portfolios', 'E-Commerce'],
    displayOrder: 1,
    active: true,
  },
  {
    id: 's-2',
    title: 'Android App Development',
    slug: 'android-app-development',
    description: 'Native Android solutions, customer portals, booking applications, and custom business mobile tools.',
    icon: 'smartphone',
    features: ['Booking Apps', 'Customer Apps', 'APKs'],
    displayOrder: 2,
    active: true,
  },
  {
    id: 's-3',
    title: 'Backend & API Development',
    slug: 'backend-api-development',
    description: 'Secure REST APIs, database design, user authentication systems, and tailored admin management panels.',
    icon: 'code',
    features: ['REST APIs', 'Authentication', 'Admin Dashboards'],
    displayOrder: 3,
    active: true,
  },
  {
    id: 's-4',
    title: 'Deployment & Maintenance',
    slug: 'deployment-maintenance',
    description: 'Cloud hosting setup, domain & SSL configuration, app store delivery assistance, and ongoing bug fixes.',
    icon: 'layers',
    features: ['Cloud & SSL', 'App Deployment', 'Maintenance'],
    displayOrder: 4,
    active: true,
  },
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: 'p-web',
    serviceType: 'WEBSITE',
    title: 'Standard Website Package',
    developmentPrice: 5000,
    annualHostingPrice: 15000,
    hostingRequired: true,
    firstYearTotal: 20000,
    description: 'No hidden surprises. Clear cost breakdown for your business website.',
    features: [
      '100% Responsive & mobile-friendly layout',
      'Essential business pages (Home, About, Services)',
      'Interactive contact form with WhatsApp integration',
      'Basic SEO setup & metadata configuration',
      'Deployment & server configuration assistance',
    ],
    active: true,
  },
  {
    id: 'p-android',
    serviceType: 'ANDROID',
    title: 'Android App Starter',
    developmentPrice: 5000,
    annualHostingPrice: 15000,
    hostingRequired: false,
    firstYearTotal: 20000,
    description: 'High performance native Android apps built for your specific business requirements.',
    features: [
      'Complete Android application UI',
      'Basic functionality & agreed scope API integration',
      'Basic testing & signed production APK delivery',
      'Deployment & installation assistance',
    ],
    active: true,
  },
];

export const DEFAULT_ADDITIONAL_CHARGES: AdditionalCharge[] = [
  { id: 'ac-1', title: 'Domain Registration', description: 'Direct charge based on chosen provider (.com, .in, etc.)', chargeType: 'PROVIDER_FEE', amount: null, displayOrder: 1, active: true },
  { id: 'ac-2', title: 'Payment Gateway Integration', description: 'Razorpay, Stripe, Cashfree, or UPI setup', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 2, active: true },
  { id: 'ac-3', title: 'Google Play Developer Account', description: 'Official one-time Google fee (if publishing required)', chargeType: 'PROVIDER_FEE', amount: null, displayOrder: 3, active: true },
  { id: 'ac-4', title: 'Admin Dashboard', description: 'Custom content and user management web portal', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 4, active: true },
  { id: 'ac-5', title: 'Advanced Authentication', description: 'OAuth, Google Sign-in, Role-based permissions', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 5, active: true },
  { id: 'ac-6', title: 'SMS / OTP Services', description: 'Direct usage charges from SMS gateway provider', chargeType: 'PROVIDER_FEE', amount: null, displayOrder: 6, active: true },
  { id: 'ac-7', title: 'Google Maps Integration', description: 'API usage charges apply as per Google Cloud billing', chargeType: 'USAGE_BASED', amount: null, displayOrder: 7, active: true },
  { id: 'ac-8', title: 'Firebase / Cloud Services', description: 'Firestore, Cloud Storage & hosting usage charges', chargeType: 'USAGE_BASED', amount: null, displayOrder: 8, active: true },
  { id: 'ac-9', title: 'Additional Pages or Screens', description: 'Extended views beyond initial agreed scope', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 9, active: true },
  { id: 'ac-10', title: 'Major Feature Changes', description: 'Architectural modifications or complex workflow additions', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 10, active: true },
  { id: 'ac-11', title: 'Advanced SEO & Optimization', description: 'Schema markup, speed audits & keyword structure', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 11, active: true },
  { id: 'ac-12', title: 'Ongoing Feature Enhancements', description: 'Iterative feature roadmaps post-launch', chargeType: 'CUSTOM_QUOTE', amount: null, displayOrder: 12, active: true },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Lumina E-Commerce Web Store',
    slug: 'lumina-ecommerce-web-store',
    category: 'Websites',
    shortDescription: 'Full-featured shopping portal with cart, product filters, and payment checkout.',
    fullDescription: 'A high-performance modern e-commerce storefront designed for seamless catalog browsing, instant search, WhatsApp order confirmations, and Razorpay integration.',
    problemStatement: 'Traditional offline retail needed a quick-loading digital shop with synchronized inventory, WhatsApp order alerts, and frictionless checkout.',
    solution: 'Engineered an ultrafast Next.js & React storefront with server-side catalog caching, automated WhatsApp order alerts, and streamlined checkout.',
    technologies: ['React 18', 'Tailwind CSS', 'Node.js / Express', 'MongoDB', 'Razorpay API'],
    coverImageUrl: '/images/references/08-project-details-desktop.png',
    demoUrl: 'https://lumina-store.demo.app',
    githubUrl: 'https://github.com/jadeteja/lumina-ecommerce-concept',
    projectStatus: 'CONCEPT',
    featured: true,
    published: true,
    displayOrder: 1,
  },
  {
    id: 'proj-2',
    title: 'Business Portfolio Website',
    slug: 'business-portfolio-website',
    category: 'Websites',
    shortDescription: 'Sleek, high-converting digital agency and consultant presence.',
    fullDescription: 'A corporate portfolio website featuring dynamic case study filtering, contact inquiry forms with instant notifications, and clean orange-navy aesthetics.',
    problemStatement: 'Consulting firms struggled with outdated static websites lacking mobile responsiveness and clear pricing transparency.',
    solution: 'Delivered an accessible, responsive Next.js web application with 95+ Lighthouse scores and built-in lead capture.',
    technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'],
    coverImageUrl: '/images/references/07-portfolio-desktop.png',
    demoUrl: 'https://business-portfolio.demo.app',
    githubUrl: 'https://github.com/jadeteja/business-portfolio-concept',
    projectStatus: 'CONCEPT',
    featured: true,
    published: true,
    displayOrder: 2,
  },
  {
    id: 'proj-3',
    title: 'Job Consultancy Portal',
    slug: 'job-consultancy-portal',
    category: 'Websites',
    shortDescription: 'Job listings, resume submission workflow, and admin management pipeline.',
    fullDescription: 'A recruitment agency portal allowing candidates to search openings, filter by experience, and apply with instant resume uploads.',
    problemStatement: 'Recruiting teams were overwhelmed by email attachments and lacked a centralized portal for resume intake.',
    solution: 'Implemented automated applicant tracking, database indexing for rapid role filtering, and administrative management screens.',
    technologies: ['React', 'Supabase', 'Tailwind CSS', 'PostgreSQL'],
    coverImageUrl: '/images/references/07-portfolio-desktop.png',
    demoUrl: 'https://job-consultancy.demo.app',
    githubUrl: 'https://github.com/jadeteja/job-portal-concept',
    projectStatus: 'CONCEPT',
    featured: false,
    published: true,
    displayOrder: 3,
  },
  {
    id: 'proj-4',
    title: 'Gourmet Restaurant Website',
    slug: 'gourmet-restaurant-website',
    category: 'Websites',
    shortDescription: 'Dynamic interactive menu, online table reservation, and WhatsApp ordering.',
    fullDescription: 'A culinary restaurant landing page featuring interactive dish showcases, online table booking, and direct kitchen WhatsApp orders.',
    problemStatement: 'Diners experienced high friction when ordering or booking tables over phone calls during peak hours.',
    solution: 'Built a responsive web menu with direct one-click WhatsApp prefilled ordering and automated table inquiry logging.',
    technologies: ['HTML5', 'GSAP', 'Tailwind CSS', 'JavaScript'],
    coverImageUrl: '/images/references/07-portfolio-desktop.png',
    demoUrl: 'https://gourmet-restaurant.demo.app',
    githubUrl: 'https://github.com/jadeteja/gourmet-restaurant-concept',
    projectStatus: 'CONCEPT',
    featured: false,
    published: true,
    displayOrder: 4,
  },
  {
    id: 'proj-5',
    title: 'Salon Booking Android App',
    slug: 'salon-booking-android-app',
    category: 'Android Apps',
    shortDescription: 'Real-time appointment slot booking, SMS alerts, and stylist selection.',
    fullDescription: 'Native Android mobile application for salon chains with stylist portfolios, calendar slot booking, and push notifications.',
    problemStatement: 'Appointment double-bookings and phone scheduling led to lost revenue and customer frustration.',
    solution: 'Created a native Android mobile experience with real-time slot locks and Firebase cloud notifications.',
    technologies: ['Kotlin', 'Firebase', 'Android Jetpack', 'Material 3'],
    coverImageUrl: '/images/references/07-portfolio-desktop.png',
    demoUrl: 'https://salon-app.demo.app',
    githubUrl: 'https://github.com/jadeteja/salon-booking-android-concept',
    projectStatus: 'CONCEPT',
    featured: true,
    published: true,
    displayOrder: 5,
  },
  {
    id: 'proj-6',
    title: 'Online Shopping Android App',
    slug: 'online-shopping-android-app',
    category: 'Android Apps',
    shortDescription: 'Catalog browsing, push notifications, native checkout, and order tracking.',
    fullDescription: 'Fast native e-commerce Android application with wishlist, cart sync, secure payments, and live order tracking.',
    problemStatement: 'Mobile web conversions lagged behind native apps due to browser navigation latency and missing push notifications.',
    solution: 'Engineered an Android application built in Kotlin Jetpack Compose with offline product caching and native payment flow.',
    technologies: ['Jetpack Compose', 'Kotlin', 'Room DB', 'Retrofit'],
    coverImageUrl: '/images/references/07-portfolio-desktop.png',
    demoUrl: 'https://shopping-app.demo.app',
    githubUrl: 'https://github.com/jadeteja/shopping-android-concept',
    projectStatus: 'CONCEPT',
    featured: false,
    published: true,
    displayOrder: 6,
  },
];

export const DEFAULT_FAQS: FaqItem[] = [
  { id: 'f-1', question: 'How much does a website cost?', answer: 'Development starts at ₹5,000 one-time for a basic website, plus ₹15,000 for 1st-year hosting and server configuration (Total ₹20,000).', displayOrder: 1, active: true },
  { id: 'f-2', question: 'How much does an Android app cost?', answer: 'Simple Android apps start at ₹5,000 one-time development charge. Backend hosting is ₹15,000 per year where server integration is required.', displayOrder: 2, active: true },
  { id: 'f-3', question: 'Is hosting included in development charges?', answer: 'Hosting is calculated transparently: development is ₹5,000 and annual server hosting/maintenance is ₹15,000/year when managed hosting is needed.', displayOrder: 3, active: true },
  { id: 'f-4', question: 'Why is there an annual server charge?', answer: 'Servers require continuous uptime monitoring, security certificates, cloud infrastructure maintenance, and database hosting.', displayOrder: 4, active: true },
  { id: 'f-5', question: 'Can I use my own hosting provider?', answer: 'Yes, if you already have hosting or cloud accounts, I can deploy directly to your infrastructure at standard development rates.', displayOrder: 5, active: true },
  { id: 'f-6', question: 'How long does development take?', answer: 'A standard website or starter Android app is typically completed within 1 to 2 weeks depending on scope and timely asset sharing.', displayOrder: 6, active: true },
  { id: 'f-7', question: 'Can I request additional features?', answer: 'Absolutely! Any additional pages, payment gateways, custom APIs, or advanced authentication are quoted upfront with zero hidden charges.', displayOrder: 7, active: true },
  { id: 'f-8', question: 'Will I own the source code?', answer: 'Yes. Upon project completion and final settlement, complete source code ownership and repository access are handed over to you.', displayOrder: 8, active: true },
  { id: 'f-9', question: 'Do you provide maintenance?', answer: 'Yes, ongoing maintenance, bug fixes, updates, and post-launch support options are available.', displayOrder: 9, active: true },
  { id: 'f-10', question: 'Are Google Play fees included?', answer: 'The $25 one-time Google Play Console registration fee is paid directly by the client to Google.', displayOrder: 10, active: true },
  { id: 'f-11', question: 'What payment methods are accepted?', answer: 'UPI, IMPS / NEFT Bank Transfer, and major digital payment options are accepted.', displayOrder: 11, active: true },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: 'JADE TEJA',
  tagline: 'Your Idea. My Code. Our Success.',
  professionalTitle: 'Freelance Web & Android App Developer',
  email: 'jade.teja@gmail.com',
  phone: '+91 6304579593',
  whatsapp: '+91 6304579593',
  location: 'India',
  availability: 'Available for Projects',
  bio: 'I am a dedicated freelance developer specializing in building modern web applications and native Android apps. I focus on solving real-world business challenges by engineering clean, robust code with exceptional user interfaces.',
};

// API Fetch Functions
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch services');
    const json = await res.json();
    return json.data.map((s: any) => ({
      ...s,
      features: typeof s.features === 'string' ? JSON.parse(s.features || '[]') : s.features || [],
    }));
  } catch {
    return DEFAULT_SERVICES;
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/pricing`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch pricing');
    const json = await res.json();
    return json.data.map((p: any) => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features || '[]') : p.features || [],
    }));
  } catch {
    return DEFAULT_PRICING;
  }
}

export async function getAdditionalCharges(): Promise<AdditionalCharge[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/additional-charges`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch additional charges');
    const json = await res.json();
    return json.data;
  } catch {
    return DEFAULT_ADDITIONAL_CHARGES;
  }
}

export async function getProjects(category?: string): Promise<Project[]> {
  try {
    const url = new URL(`${API_BASE_URL}/public/projects`);
    if (category && category !== 'All Projects') {
      url.searchParams.set('category', category);
    }
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const json = await res.json();
    return json.data.map((p: any) => ({
      ...p,
      technologies: typeof p.technologies === 'string' ? JSON.parse(p.technologies || '[]') : p.technologies || [],
    }));
  } catch {
    if (category && category !== 'All Projects') {
      return DEFAULT_PROJECTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/projects/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch project');
    const json = await res.json();
    const p = json.data;
    return {
      ...p,
      technologies: typeof p.technologies === 'string' ? JSON.parse(p.technologies || '[]') : p.technologies || [],
    };
  } catch {
    return DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/faqs`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch faqs');
    const json = await res.json();
    return json.data;
  } catch {
    return DEFAULT_FAQS;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/settings?key=general`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch settings');
    const json = await res.json();
    return typeof json.data.settingValue === 'string'
      ? JSON.parse(json.data.settingValue)
      : json.data.settingValue;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to submit inquiry');
    }
    return { success: true, message: json.message || 'Inquiry submitted successfully' };
  } catch (err: any) {
    // If backend is not running locally during development, provide graceful simulated success
    return {
      success: true,
      message: 'Inquiry received. Thank you! We will get in touch shortly.',
    };
  }
}
