import React from 'react';
import AdminNav from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Admin Console | JADE TEJA',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminNav>{children}</AdminNav>;
}
