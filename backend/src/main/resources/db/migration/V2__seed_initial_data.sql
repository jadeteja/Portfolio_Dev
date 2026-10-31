-- Seed Services
INSERT INTO services (id, title, slug, description, icon, features, display_order, active) VALUES
(
    gen_random_uuid(),
    'Website Development',
    'website-development',
    'Modern business websites, portfolios, landing pages, and customized e-commerce web applications.',
    'monitor',
    '["Business Sites", "Portfolios", "E-Commerce"]'::jsonb,
    1,
    TRUE
),
(
    gen_random_uuid(),
    'Android App Development',
    'android-app-development',
    'Native Android solutions, customer portals, booking applications, and custom business mobile tools.',
    'smartphone',
    '["Booking Apps", "Customer Apps", "APKs"]'::jsonb,
    2,
    TRUE
),
(
    gen_random_uuid(),
    'Backend & API Development',
    'backend-api-development',
    'Secure REST APIs, database design, user authentication systems, and tailored admin management panels.',
    'code',
    '["REST APIs", "Authentication", "Admin Dashboards"]'::jsonb,
    3,
    TRUE
),
(
    gen_random_uuid(),
    'Deployment & Maintenance',
    'deployment-maintenance',
    'Cloud hosting setup, domain & SSL configuration, app store delivery assistance, and ongoing bug fixes.',
    'layers',
    '["Cloud & SSL", "App Deployment", "Maintenance"]'::jsonb,
    4,
    TRUE
);

-- Seed Pricing Plans
INSERT INTO pricing_plans (id, service_type, title, development_price, annual_hosting_price, hosting_required, description, features, active) VALUES
(
    gen_random_uuid(),
    'WEBSITE',
    'Standard Website Package',
    5000.00,
    15000.00,
    TRUE,
    'No hidden surprises. Clear cost breakdown for your business website.',
    '[
        "100% Responsive & mobile-friendly layout",
        "Essential business pages (Home, About, Services)",
        "Interactive contact form with WhatsApp integration",
        "Basic SEO setup & metadata configuration",
        "Deployment & server configuration assistance"
    ]'::jsonb,
    TRUE
),
(
    gen_random_uuid(),
    'ANDROID',
    'Android App Starter',
    5000.00,
    15000.00,
    FALSE,
    'High performance native Android apps built for your specific business requirements.',
    '[
        "Complete Android application UI",
        "Basic functionality & agreed scope API integration",
        "Basic testing & signed production APK delivery",
        "Deployment & installation assistance"
    ]'::jsonb,
    TRUE
);

-- Seed Additional Charges
INSERT INTO additional_charges (id, title, description, charge_type, amount, display_order, active) VALUES
('a0000000-0000-0000-0000-000000000001', 'Domain Registration', 'Direct charge based on chosen provider (.com, .in, etc.)', 'PROVIDER_FEE', NULL, 1, TRUE),
('a0000000-0000-0000-0000-000000000002', 'Payment Gateway Integration', 'Razorpay, Stripe, Cashfree, or UPI setup', 'CUSTOM_QUOTE', NULL, 2, TRUE),
('a0000000-0000-0000-0000-000000000003', 'Google Play Developer Account', 'Official one-time Google fee (if publishing required)', 'PROVIDER_FEE', NULL, 3, TRUE),
('a0000000-0000-0000-0000-000000000004', 'Admin Dashboard', 'Custom content and user management web portal', 'CUSTOM_QUOTE', NULL, 4, TRUE),
('a0000000-0000-0000-0000-000000000005', 'Advanced Authentication', 'OAuth, Google Sign-in, Role-based permissions', 'CUSTOM_QUOTE', NULL, 5, TRUE),
('a0000000-0000-0000-0000-000000000006', 'SMS / OTP Services', 'Direct usage charges from SMS gateway provider', 'PROVIDER_FEE', NULL, 6, TRUE),
('a0000000-0000-0000-0000-000000000007', 'Google Maps Integration', 'API usage charges apply as per Google Cloud billing', 'USAGE_BASED', NULL, 7, TRUE),
('a0000000-0000-0000-0000-000000000008', 'Firebase / Cloud Services', 'Firestore, Cloud Storage & hosting usage charges', 'USAGE_BASED', NULL, 8, TRUE),
('a0000000-0000-0000-0000-000000000009', 'Additional Pages or Screens', 'Extended views beyond initial agreed scope', 'CUSTOM_QUOTE', NULL, 9, TRUE),
('a0000000-0000-0000-0000-000000000010', 'Major Feature Changes', 'Architectural modifications or complex workflow additions', 'CUSTOM_QUOTE', NULL, 10, TRUE),
('a0000000-0000-0000-0000-000000000011', 'Advanced SEO & Optimization', 'Schema markup, speed audits & keyword structure', 'CUSTOM_QUOTE', NULL, 11, TRUE),
('a0000000-0000-0000-0000-000000000012', 'Ongoing Feature Enhancements', 'Iterative feature roadmaps post-launch', 'CUSTOM_QUOTE', NULL, 12, TRUE);

-- Seed FAQs
INSERT INTO faqs (id, question, answer, display_order, active) VALUES
(
    gen_random_uuid(),
    'How much does a website cost?',
    'Development starts at ₹5,000 one-time for a basic website, plus ₹15,000 for 1st-year hosting and server configuration (Total ₹20,000).',
    1,
    TRUE
),
(
    gen_random_uuid(),
    'How much does an Android app cost?',
    'Simple Android apps start at ₹5,000 one-time development charge. Backend hosting is ₹15,000 per year where server integration is required.',
    2,
    TRUE
),
(
    gen_random_uuid(),
    'Is hosting included in development charges?',
    'Hosting is calculated transparently: development is ₹5,000 and annual server hosting/maintenance is ₹15,000/year when managed hosting is needed.',
    3,
    TRUE
),
(
    gen_random_uuid(),
    'Why is there an annual server charge?',
    'Servers require continuous uptime monitoring, security certificates, cloud infrastructure maintenance, and database hosting.',
    4,
    TRUE
),
(
    gen_random_uuid(),
    'Can I use my own hosting provider?',
    'Yes, if you already have hosting or cloud accounts, I can deploy directly to your infrastructure at standard development rates.',
    5,
    TRUE
),
(
    gen_random_uuid(),
    'How long does development take?',
    'A standard website or starter Android app is typically completed within 1 to 2 weeks depending on scope and timely asset sharing.',
    6,
    TRUE
),
(
    gen_random_uuid(),
    'Can I request additional features?',
    'Absolutely! Any additional pages, payment gateways, custom APIs, or advanced authentication are quoted upfront with zero hidden charges.',
    7,
    TRUE
),
(
    gen_random_uuid(),
    'Will I own the source code?',
    'Yes. Upon project completion and final settlement, complete source code ownership and repository access are handed over to you.',
    8,
    TRUE
),
(
    gen_random_uuid(),
    'Do you provide maintenance?',
    'Yes, ongoing maintenance, bug fixes, updates, and post-launch support options are available.',
    9,
    TRUE
),
(
    gen_random_uuid(),
    'Are Google Play fees included?',
    'The $25 one-time Google Play Console registration fee is paid directly by the client to Google.',
    10,
    TRUE
),
(
    gen_random_uuid(),
    'What payment methods are accepted?',
    'UPI, IMPS / NEFT Bank Transfer, and major digital payment options are accepted.',
    11,
    TRUE
);

-- Seed Projects (Concept Projects clearly noted)
INSERT INTO projects (id, title, slug, category, short_description, full_description, problem_statement, solution, technologies, cover_image_url, demo_url, github_url, project_status, featured, published, display_order) VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'Lumina E-Commerce Web Store',
    'lumina-ecommerce-web-store',
    'Websites',
    'Full-featured shopping portal with cart, product filters, and payment checkout.',
    'A high-performance modern e-commerce storefront designed for seamless catalog browsing, instant search, WhatsApp order confirmations, and Razorpay integration.',
    'Traditional offline retail needed a quick-loading digital shop with synchronized inventory, WhatsApp order alerts, and frictionless checkout.',
    'Engineered an ultrafast Next.js & React storefront with server-side catalog caching, automated WhatsApp order alerts, and streamlined checkout.',
    '["React 18", "Tailwind CSS", "Node.js / Express", "MongoDB", "Razorpay API"]'::jsonb,
    '/images/references/08-project-details-desktop.png',
    'https://lumina-store.demo.app',
    'https://github.com/jadeteja/lumina-ecommerce-concept',
    'CONCEPT',
    TRUE,
    TRUE,
    1
),
(
    'b0000000-0000-0000-0000-000000000002',
    'Business Portfolio Website',
    'business-portfolio-website',
    'Websites',
    'Sleek, high-converting digital agency and consultant presence.',
    'A corporate portfolio website featuring dynamic case study filtering, contact inquiry forms with instant notifications, and clean orange-navy aesthetics.',
    'Consulting firms struggled with outdated static websites lacking mobile responsiveness and clear pricing transparency.',
    'Delivered an accessible, responsive Next.js web application with 95+ Lighthouse scores and built-in lead capture.',
    '["Next.js", "Tailwind CSS", "TypeScript", "Motion"]'::jsonb,
    '/images/references/07-portfolio-desktop.png',
    'https://business-portfolio.demo.app',
    'https://github.com/jadeteja/business-portfolio-concept',
    'CONCEPT',
    TRUE,
    TRUE,
    2
),
(
    'b0000000-0000-0000-0000-000000000003',
    'Job Consultancy Portal',
    'job-consultancy-portal',
    'Websites',
    'Job listings, resume submission workflow, and admin management pipeline.',
    'A recruitment agency portal allowing candidates to search openings, filter by experience, and apply with instant resume uploads.',
    'Recruiting teams were overwhelmed by email attachments and lacked a centralized portal for resume intake.',
    'Implemented automated applicant tracking, database indexing for rapid role filtering, and administrative management screens.',
    '["React", "Supabase", "Tailwind CSS", "PostgreSQL"]'::jsonb,
    '/images/references/07-portfolio-desktop.png',
    'https://job-consultancy.demo.app',
    'https://github.com/jadeteja/job-portal-concept',
    'CONCEPT',
    FALSE,
    TRUE,
    3
),
(
    'b0000000-0000-0000-0000-000000000004',
    'Gourmet Restaurant Website',
    'gourmet-restaurant-website',
    'Websites',
    'Dynamic interactive menu, online table reservation, and WhatsApp ordering.',
    'A culinary restaurant landing page featuring interactive dish showcases, online table booking, and direct kitchen WhatsApp orders.',
    'Diners experienced high friction when ordering or booking tables over phone calls during peak hours.',
    'Built a responsive web menu with direct one-click WhatsApp prefilled ordering and automated table inquiry logging.',
    '["HTML5", "GSAP", "Tailwind CSS", "JavaScript"]'::jsonb,
    '/images/references/07-portfolio-desktop.png',
    'https://gourmet-restaurant.demo.app',
    'https://github.com/jadeteja/gourmet-restaurant-concept',
    'CONCEPT',
    FALSE,
    TRUE,
    4
),
(
    'b0000000-0000-0000-0000-000000000005',
    'Salon Booking Android App',
    'salon-booking-android-app',
    'Android Apps',
    'Real-time appointment slot booking, SMS alerts, and stylist selection.',
    'Native Android mobile application for salon chains with stylist portfolios, calendar slot booking, and push notifications.',
    'Appointment double-bookings and phone scheduling led to lost revenue and customer frustration.',
    'Created a native Android mobile experience with real-time slot locks and Firebase cloud notifications.',
    '["Kotlin", "Firebase", "Android Jetpack", "Material 3"]'::jsonb,
    '/images/references/07-portfolio-desktop.png',
    'https://salon-app.demo.app',
    'https://github.com/jadeteja/salon-booking-android-concept',
    'CONCEPT',
    TRUE,
    TRUE,
    5
),
(
    'b0000000-0000-0000-0000-000000000006',
    'Online Shopping Android App',
    'online-shopping-android-app',
    'Android Apps',
    'Catalog browsing, push notifications, native checkout, and order tracking.',
    'Fast native e-commerce Android application with wishlist, cart sync, secure payments, and live order tracking.',
    'Mobile web conversions lagged behind native apps due to browser navigation latency and missing push notifications.',
    'Engineered an Android application built in Kotlin Jetpack Compose with offline product caching and native payment flow.',
    '["Jetpack Compose", "Kotlin", "Room DB", "Retrofit"]'::jsonb,
    '/images/references/07-portfolio-desktop.png',
    'https://shopping-app.demo.app',
    'https://github.com/jadeteja/shopping-android-concept',
    'CONCEPT',
    FALSE,
    TRUE,
    6
);

-- Seed Site Settings
INSERT INTO site_settings (id, setting_key, setting_value, updated_at) VALUES
(
    gen_random_uuid(),
    'general',
    '{
        "brandName": "JADE TEJA",
        "tagline": "Your Idea. My Code. Our Success.",
        "professionalTitle": "Freelance Web & Android App Developer",
        "email": "jade.teja@gmail.com",
        "phone": "+91 6304579593",
        "whatsapp": "+91 6304579593",
        "location": "India",
        "availability": "Available for Projects",
        "bio": "I am a dedicated freelance developer specializing in building modern web applications and native Android apps. I focus on solving real-world business challenges by engineering clean, robust code with exceptional user interfaces."
    }'::jsonb,
    CURRENT_TIMESTAMP
);
