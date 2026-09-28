'use client';

import React from 'react';
import Link from 'next/link';

export default function SafetyHelpPage() {
  return (
    <div className="max-w-2xl mx-auto my-12 text-center space-y-6">
      <div className="glass-card p-8 border-rose-500/30 space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl mx-auto border border-rose-500/40">
          🫂
        </div>

        <h1 className="text-2xl font-bold text-white">
          Kesejahteraan & Kesehatan Mentalmu Adalah yang Utama
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed">
          Berdasarkan refleksi yang kamu berikan, kami mendeteksi bahwa kamu mungkin sedang melalui masa-masa yang sangat berat atau kewalahan secara emosional.
        </p>

        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-left space-y-3">
          <h2 className="text-sm font-semibold text-rose-300">Bantuan Profesional Gratis & Rahasia:</h2>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-center space-x-2">
              <span>📞</span>
              <span><strong>Hotline Kementerian Kesehatan (Kemenkes):</strong> 119 ext. 8</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>💬</span>
              <span><strong>Layanan Sehatpedia (Kemenkes):</strong> Aplikasi Android & iOS</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>🤝</span>
              <span><strong>Into The Light Indonesia:</strong> www.intothelightid.org</span>
            </li>
          </ul>
        </div>

        <p className="text-xs text-slate-400">
          Mengambil jeda adalah bentuk keberanian. Kamu tidak sendirian, dan mencari bantuan profesional adalah langkah yang tepat.
        </p>

        <div className="pt-4 flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
