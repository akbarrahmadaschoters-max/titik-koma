'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

import { getCohortLabel } from '@/lib/utils/cohort';

export default function Navbar() {
  const { user, profile } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            ;
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:opacity-90 transition-opacity">
            TITIK<span className="gradient-text">KOMA</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-3">
              {profile && (
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {getCohortLabel(profile.cohort)}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    🌐 Komunitas Utama
                  </span>
                </div>
              )}
              <span className="text-sm text-slate-300 hidden md:inline">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              >
                Keluar
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold text-white px-4 py-2 rounded-lg gradient-btn"
              >
                Daftar Sekarang
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
