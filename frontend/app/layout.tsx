import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import InteractiveTouchCursor from '@/components/3d/InteractiveTouchCursor';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FF6B00',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'JADE TEJA — Freelance Web & Android App Developer',
    template: '%s | JADE TEJA',
  },
  description:
    'Your Idea. My Code. Our Success. Professional freelance web and Android application development starting at ₹5,000. Transparent pricing, modern frameworks, clean code.',
  keywords: [
    'Jade Teja',
    'Freelance Web Developer',
    'Android App Developer',
    'Next.js Developer India',
    'Spring Boot Developer',
    'Affordable Website Development',
    'Native Android Apps',
  ],
  authors: [{ name: 'Jade Teja', url: 'https://jade-teja.vercel.app' }],
  creator: 'Jade Teja',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://jade-teja.vercel.app',
    title: 'JADE TEJA — Freelance Web & Android App Developer',
    description:
      'High-speed modern websites and native Android apps crafted with clean code starting at ₹5,000.',
    siteName: 'JADE TEJA Portfolio',
    images: [
      {
        url: '/images/references/01-home-desktop.png',
        width: 1200,
        height: 630,
        alt: 'JADE TEJA - Web & Android App Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JADE TEJA — Freelance Web & Android App Developer',
    description:
      'Affordable, modern, responsive, and scalable digital solutions starting at ₹5,000.',
    images: ['/images/references/01-home-desktop.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-gray-950 text-[#1F2937] dark:text-gray-100 flex flex-col min-h-screen transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#FF6B00] text-white font-semibold rounded-lg shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <InteractiveTouchCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
