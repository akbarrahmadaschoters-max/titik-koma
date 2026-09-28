'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { getTracksForCohort } from '@/lib/tracks/seedTracks';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Season } from '@/lib/types/schema';
import { getCohortLabel, getGroupBesarLabel } from '@/lib/utils/cohort';

export default function TrackSelectionPage() {
  const router = useRouter();
  const { user, profile } = useAuth();
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userCohort = profile?.cohort || 'age_19_29';
  const availableTracks = getTracksForCohort(userCohort);

  const handleConfirmTrack = async () => {
    if (!user || !selectedTrackId) return;
    setLoading(true);

    try {
      const selectedTrack = availableTracks.find((t) => t.id === selectedTrackId);
      if (!selectedTrack) return;

      const seasonId = `season_${user.uid}_${Date.now()}`;
      const seasonDoc: Season = {
        id: seasonId,
        userId: user.uid,
        trackId: selectedTrack.id,
        trackCode: selectedTrack.code,
        phase: 'discover',
        startedAt: new Date().toISOString(),
        status: 'active',
      };

      await setDoc(doc(db, 'seasons', seasonId), seasonDoc);
      sessionStorage.setItem('active_season_id', seasonId);

      router.push('/onboarding/goals');
    } catch (err) {
      console.error(err);
      alert('Gagal memilih track. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            {getCohortLabel(userCohort)}
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold border border-purple-500/30 bg-purple-500/10 text-purple-300">
            🌐 {getGroupBesarLabel()}
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Pilih Track <span className="gradient-text">Kurikulum Diri</span>
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Berikut adalah 4 rekomendasi track kurikulum yang dikurasi sesuai kelompok usiamu dan terhubung dengan Komunitas Utama ARAH Lintas Usia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {availableTracks.map((track) => {
          const isSelected = selectedTrackId === track.id;
          return (
            <div
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`glass-card p-6 glass-card-hover cursor-pointer space-y-4 border transition-all ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Track {track.code}
                </span>
                {isSelected && <span className="text-indigo-400 font-bold text-sm">✓ Terpilih</span>}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">{track.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{track.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleConfirmTrack}
          disabled={!selectedTrackId || loading}
          className="px-8 py-3 rounded-xl font-bold text-white gradient-btn disabled:opacity-40 text-sm shadow-xl"
        >
          {loading ? 'Menyimpan Track...' : 'Lanjut ke Goal-Setting & Kontrak Diri ➡️'}
        </button>
      </div>
    </div>
  );
}
