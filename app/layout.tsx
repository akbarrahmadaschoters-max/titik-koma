import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'TITIK KOMA (ARAH) — Platform Navigasi & Pengembang Diri',
  description:
    'Temukan kompas nilai pribadi, archetype pengembangan diri, dan lingkaran pendukung yang se-frekuensi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
