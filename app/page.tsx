'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-8">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <span>✨ Season 1 Closed Beta Registration Open</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Menemukan Arah Hidup Melalui <br className="hidden md:inline" />
          <span className="gradient-text">Kompas Nilai & Lingkaran Teman</span>
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Platform self-development terstruktur selama 90 hari. Dapatkan pemetaan Archetype kepribadian, jalani ritme harian privat, dan terhubung dengan peer-group yang se-frekuensi.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white gradient-btn text-sm shadow-xl"
          >
            Mulai Assessment & Pemetaan Archetype 🔥
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-semibold transition-colors"
          >
            Masuk Akun Saya
          </Link>
        </div>
      </section>

      {/* 4 Archetypes Showcase */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">4 Archetype Pengembangan Diri</h2>
          <p className="text-xs text-slate-400">Dimensi kejelasan arah (Clarity) x keselarasan nilai (Alignment)</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 glass-card-hover space-y-3 border border-orange-500/30">
            <div className="text-4xl">🔥</div>
            <h3 className="text-lg font-bold text-white">Phoenix</h3>
            <p className="text-xs font-semibold text-orange-400">Penyelam Jiwa & Pembaru Arah</p>
            <p className="text-xs text-slate-300">Menata ulang kompas nilai dari dasar dan membangun fondasi baru yang kokoh.</p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3 border border-cyan-500/30">
            <div className="text-4xl">🪽</div>
            <h3 className="text-lg font-bold text-white">Pegasus</h3>
            <p className="text-xs font-semibold text-cyan-400">Penjelajah Visi & Pencipta Peluang</p>
            <p className="text-xs text-slate-300">Membumikan gagasan imajinatif menjadi langkah nyata dengan momentum tinggi.</p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3 border border-emerald-500/30">
            <div className="text-4xl">🦅</div>
            <h3 className="text-lg font-bold text-white">Griffin</h3>
            <p className="text-xs font-semibold text-emerald-400">Strategis Tangguh & Eksekutor</p>
            <p className="text-xs text-slate-300">Menggabungkan kedisiplinan eksekusi konsisten dengan orientasi nilai mendalam.</p>
          </div>

          <div className="glass-card p-6 glass-card-hover space-y-3 border border-purple-500/30">
            <div className="text-4xl">🐉</div>
            <h3 className="text-lg font-bold text-white">Naga</h3>
            <p className="text-xs font-semibold text-purple-400">Pilar Arah & Inspirator</p>
            <p className="text-xs text-slate-300">Keseimbangan sempurna antara visi, nilai, dan dampak positif berkelanjutan.</p>
          </div>
        </div>
      </section>

      {/* 3 Cohort Tracks Showcase */}
      <section className="glass-card p-8 space-y-6 border border-slate-800">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white">Dirancang Khusus Sesuai Usia (3 Cohort)</h2>
          <p className="text-xs text-slate-400">12 Track Kurikulum yang relevan dengan tahap kehidupan nyata</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Cohort A (SMA • 15-18 Th)
            </span>
            <h3 className="text-sm font-bold text-white pt-1">Eksplorasi Minat & Kesiapan Dewasa</h3>
            <p className="text-xs text-slate-400">Pilihan jurusan, kebiasaan belajar seimbang, dan parental consent system.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Cohort B (Kuliah–29 Th)
            </span>
            <h3 className="text-sm font-bold text-white pt-1">Clarity Karir & Kemandirian Finansial</h3>
            <p className="text-xs text-slate-400">Navigasi karir awal, produktivitas kerja, dan lingkaran pendukung yang sehat.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
              Cohort C (30+ Th)
            </span>
            <h3 className="text-sm font-bold text-white pt-1">Mid-Career Pivot & Meaning</h3>
            <p className="text-xs text-slate-400">Penataan energi kerja-keluarga, makna hidup (legacy), dan resiliensi.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
