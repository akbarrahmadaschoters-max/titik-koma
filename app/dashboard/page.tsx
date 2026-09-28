'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { ArchetypeResult, Goal, Season } from '@/lib/types/schema';
import { getCohortLabel, getGroupBesarLabel } from '@/lib/utils/cohort';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [season, setSeason] = useState<Season | null>(null);
  const [archetype, setArchetype] = useState<ArchetypeResult | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      if (!user) return;
      try {
        // Fetch Season
        const seasonQ = query(collection(db, 'seasons'), where('userId', '==', user.uid));
        const seasonSnap = await getDocs(seasonQ);
        if (!seasonSnap.empty) {
          setSeason(seasonSnap.docs[0].data() as Season);
        }

        // Fetch Archetype
        const archQ = query(collection(db, 'archetypes'), where('userId', '==', user.uid));
        const archSnap = await getDocs(archQ);
        if (!archSnap.empty) {
          setArchetype(archSnap.docs[0].data() as ArchetypeResult);
        }

        // Fetch Goals
        const goalsQ = query(collection(db, 'goals'), where('userId', '==', user.uid));
        const goalsSnap = await getDocs(goalsQ);
        const loadedGoals: Goal[] = [];
        goalsSnap.forEach((doc) => loadedGoals.push(doc.data() as Goal));
        setGoals(loadedGoals);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoadingData(false);
      }
    }

    loadUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <div className="glass-card p-8 space-y-4">
          <p className="text-sm text-slate-300">Silakan masuk untuk mengakses Dashboard ARAH.</p>
          <Link href="/login" className="inline-block px-6 py-2.5 rounded-xl gradient-btn text-xs font-bold text-white">
            Masuk Akun
          </Link>
        </div>
      </div>
    );
  }

  const getArchetypeIcon = (arch?: string) => {
    switch (arch) {
      case 'phoenix':
        return '🔥 Phoenix';
      case 'pegasus':
        return '🪽 Pegasus';
      case 'griffin':
        return '🦅 Griffin';
      case 'naga':
        return '🐉 Naga';
      default:
        return '✨ Explorers';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 my-4">
      {/* Welcome Banner */}
      <div className="glass-card p-8 relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {getCohortLabel(profile?.cohort)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🌐 {getGroupBesarLabel()}
              </span>
              {archetype && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {getArchetypeIcon(archetype.archetype)}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold text-white">
              Halo, <span className="gradient-text">{profile?.fullName || user.displayName || 'Sahabat ARAH'}</span>! 👋
            </h1>
            <p className="text-xs text-slate-300">
              Selamat datang di Season 1 • Fase 1: <strong className="text-purple-300 uppercase">Discover</strong> (Hari ke-1 dari 90 Hari)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[160px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status Season</span>
            <span className="text-sm font-extrabold text-emerald-400">● Active</span>
            <span className="text-[11px] text-slate-400 block mt-1">Track {season?.trackCode || 'B1'}</span>
          </div>
        </div>
      </div>

      {/* Core Loop Action Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white flex items-center space-x-2">
          <span>🔄</span>
          <span>Ritme Harian Season (Core Loop)</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="glass-card p-5 glass-card-hover space-y-3 border border-indigo-500/30 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              📝
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Jurnal Harian</h3>
              <p className="text-[11px] text-slate-400">Prompt refleksi privat minggu ke-1.</p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-indigo-400">Refleksi Hari Ini →</span>
          </div>

          <div className="glass-card p-5 glass-card-hover space-y-3 border border-purple-500/30 relative">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
              ✅
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Habit Tracker</h3>
              <p className="text-[11px] text-slate-400">Forgiving streak (Grace day active).</p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-purple-400">Check-in Habit →</span>
          </div>

          <div className="glass-card p-5 glass-card-hover space-y-3 border border-pink-500/30 relative">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg">
              📖
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Modul Mingguan</h3>
              <p className="text-[11px] text-slate-400">Modul 1: Values vs Goals.</p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-pink-400">Baca Modul →</span>
          </div>

          <div className="glass-card p-5 glass-card-hover space-y-3 border border-cyan-500/30 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              ⚔️
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Solo Quest</h3>
              <p className="text-[11px] text-slate-400">Misi aksi nyata minggu ini.</p>
            </div>
            <span className="inline-block text-[11px] font-semibold text-cyan-400">Lihat Misi →</span>
          </div>
        </div>
      </div>

      {/* Target Goals Summary */}
      {goals.length > 0 && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <span>🎯</span>
            <span>Target GAS (Goal Attainment Scaling) Season 1</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {goals.map((g, idx) => (
              <div key={g.id || idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Goal #{idx + 1}</span>
                <p className="text-xs text-slate-200 font-medium leading-snug">{g.description}</p>
                <div className="text-[11px] text-slate-400 flex justify-between border-t border-slate-800 pt-2">
                  <span>Baseline:</span>
                  <span className="font-bold text-purple-300">{g.baselineScore > 0 ? `+${g.baselineScore}` : g.baselineScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
