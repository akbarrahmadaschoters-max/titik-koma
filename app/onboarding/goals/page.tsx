'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Goal } from '@/lib/types/schema';

export default function GoalSettingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [goals, setGoals] = useState<{ description: string; score: number }[]>([
    { description: '', score: 0 },
  ]);
  const [contractText, setContractText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddGoal = () => {
    if (goals.length < 3) {
      setGoals([...goals, { description: '', score: 0 }]);
    }
  };

  const handleGoalChange = (index: number, field: 'description' | 'score', val: string | number) => {
    const updated = [...goals];
    if (field === 'description') {
      updated[index].description = String(val);
    } else if (field === 'score') {
      updated[index].score = Number(val);
    }
    setGoals(updated);
  };

  const handleCompleteOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      const now = new Date().toISOString();

      // Save each goal
      for (const [idx, g] of goals.entries()) {
        if (g.description.trim()) {
          const goalId = `goal_${user.uid}_${idx}_${Date.now()}`;
          const goalDoc: Goal = {
            id: goalId,
            userId: user.uid,
            description: g.description,
            baselineScore: Number(g.score),
            createdAt: now,
          };
          await setDoc(doc(db, 'goals', goalId), goalDoc);
        }
      }

      // Save contract to user profile
      if (contractText.trim()) {
        await setDoc(
          doc(db, 'users', user.uid),
          { selfContract: contractText, onboardingCompletedAt: now },
          { merge: true }
        );
      }

      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Gagal menyelesaikan onboarding. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white">
          GAS Goal-Setting & <span className="gradient-text">Kontrak Diri</span>
        </h1>
        <p className="text-sm text-slate-400">
          Tentukan 1-3 target personal (skala Goal Attainment Scaling -2 s.d. +2) dan tulis janji komitmenmu untuk Season ini.
        </p>
      </div>

      <form onSubmit={handleCompleteOnboarding} className="space-y-6">
        {/* Goals Section */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>🎯</span>
            <span>Target Personal (Maksimal 3 Goal)</span>
          </h2>

          {goals.map((g, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Tujuan #{idx + 1}
              </label>
              <input
                type="text"
                required
                value={g.description}
                onChange={(e) => handleGoalChange(idx, 'description', e.target.value)}
                placeholder="Contoh: Menyisihkan 30 menit setiap malam untuk membaca modul & jurnal."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-500"
              />

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Skala Baseline Saat Ini (-2 s.d. +2):
                </label>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {[
                    { val: -2, label: '-2 (Sangat di bawah)' },
                    { val: -1, label: '-1 (Di bawah)' },
                    { val: 0, label: '0 (Baseline awal)' },
                    { val: 1, label: '+1 (Di atas)' },
                    { val: 2, label: '+2 (Impian ideal)' },
                  ].map((s) => (
                    <button
                      type="button"
                      key={s.val}
                      onClick={() => handleGoalChange(idx, 'score', s.val)}
                      className={`p-2 rounded-lg border text-[11px] transition-colors ${
                        g.score === s.val
                          ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {s.val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {goals.length < 3 && (
            <button
              type="button"
              onClick={handleAddGoal}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
            >
              <span>+ Tambah Goal Lainnya</span>
            </button>
          )}
        </div>

        {/* Self Contract Section */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>📜</span>
            <span>Kontrak Diri (Self-Commitment Ritual)</span>
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tuliskan janji komitmen pada dirimu sendiri untuk menjalani season 90 hari ini. Tulisan ini akan disimpan privat dan ditampilkan kembali di akhir season (Offboarding).
          </p>
          <textarea
            rows={4}
            required
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Saya berjanji pada diri sendiri untuk jujur pada proses, konsisten melakukan habit harian..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-white gradient-btn text-sm shadow-xl"
        >
          {loading ? 'Menyimpan Komitmen...' : 'Selesaikan Onboarding & Masuk Dashboard 🚀'}
        </button>
      </form>
    </div>
  );
}
