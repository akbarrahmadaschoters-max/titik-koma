'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArchetypeDetail } from '@/lib/scoring/archetype';
import Link from 'next/link';

export default function ArchetypeResultPage() {
  const router = useRouter();
  const [archetype, setArchetype] = useState<ArchetypeDetail | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('latest_archetype');
    if (cached) {
      try {
        setArchetype(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!archetype) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <div className="glass-card p-8 space-y-4">
          <p className="text-sm text-slate-300">Sedang memuat hasil archetypemu...</p>
          <Link href="/assessment" className="inline-block text-xs font-semibold text-indigo-400 underline">
            Mulai Assessment Ulang
          </Link>
        </div>
      </div>
    );
  }

  const getThemeColor = (code: string) => {
    switch (code) {
      case 'phoenix':
        return {
          bgGlow: 'bg-orange-500/20',
          border: 'border-orange-500/40',
          gradientText: 'from-amber-400 via-orange-500 to-red-500',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        };
      case 'pegasus':
        return {
          bgGlow: 'bg-cyan-500/20',
          border: 'border-cyan-500/40',
          gradientText: 'from-cyan-400 via-sky-500 to-blue-500',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        };
      case 'griffin':
        return {
          bgGlow: 'bg-emerald-500/20',
          border: 'border-emerald-500/40',
          gradientText: 'from-emerald-400 via-teal-500 to-green-500',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'naga':
      default:
        return {
          bgGlow: 'bg-purple-500/20',
          border: 'border-purple-500/40',
          gradientText: 'from-purple-400 via-fuchsia-500 to-pink-500',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        };
    }
  };

  const theme = getThemeColor(archetype.code);

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-8">
      <div className="text-center space-y-2">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${theme.badgeBg}`}>
          Hasil Pemetaan Archetype Diri
        </span>
        <h1 className="text-3xl font-extrabold text-white">
          Kompas Diri milikmu telah <span className="gradient-text">Terbuka</span>
        </h1>
      </div>

      {/* Main Archetype Card */}
      <div className={`glass-card p-8 border ${theme.border} space-y-6 relative overflow-hidden shadow-2xl`}>
        <div className={`absolute -top-16 -right-16 w-48 h-48 ${theme.bgGlow} rounded-full blur-3xl pointer-events-none`} />

        {/* Emoji & Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="text-6xl animate-bounce duration-1000">
            {archetype.emoji}
          </div>
          <h2 className={`text-4xl font-extrabold bg-gradient-to-r ${theme.gradientText} bg-clip-text text-transparent`}>
            {archetype.name}
          </h2>
          <p className="text-sm font-semibold text-slate-300 italic">
            "{archetype.tagline}"
          </p>
        </div>

        {/* Breakdown Details */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">✨ Kekuatan Utama</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{archetype.strengths}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">🌱 Fase Saat Ini</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{archetype.phase}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">🎯 Misi Utama Season 1</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{archetype.mission}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/20 text-center">
            <p className="text-xs text-indigo-300 font-medium italic">
              "{archetype.closing}"
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/onboarding/track"
            className="w-full py-3.5 rounded-xl font-bold text-white gradient-btn flex items-center justify-center space-x-2 text-sm shadow-xl"
          >
            <span>Pilih Track Pengembangan Diri</span>
            <span>➡️</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
