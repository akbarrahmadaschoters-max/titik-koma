'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { calculateAssessmentScores } from '@/lib/scoring/score';
import { determineArchetype } from '@/lib/scoring/archetype';
import itemsCepat from '@/lib/scoring/items-cepat.json';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Assessment, ArchetypeResult } from '@/lib/types/schema';

export default function AssessmentPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [version, setVersion] = useState<'cepat' | 'mendalam' | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const totalQuestions = itemsCepat.length;

  const handleSelectAnswer = (itemId: string, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);

    try {
      const calculated = calculateAssessmentScores(answers, itemsCepat);

      if (calculated.hasDistressIndicator) {
        router.push('/safety-help');
        return;
      }

      const archetypeObj = determineArchetype(
        calculated.clarityScore,
        calculated.alignmentScore
      );

      const assessmentId = `assess_${user.uid}_${Date.now()}`;
      const archetypeId = `arch_${user.uid}_${Date.now()}`;
      const now = new Date().toISOString();

      const assessmentDoc: Assessment = {
        id: assessmentId,
        userId: user.uid,
        version: version || 'cepat',
        type: 'baseline',
        rawAnswers: answers,
        clarityScore: calculated.clarityScore,
        alignmentScore: calculated.alignmentScore,
        readinessScore: calculated.readinessScore,
        agencyScore: calculated.agencyScore,
        wellbeingScore: calculated.wellbeingScore,
        createdAt: now,
      };

      const archetypeDoc: ArchetypeResult = {
        id: archetypeId,
        userId: user.uid,
        assessmentId: assessmentId,
        archetype: archetypeObj.code,
        computedAt: now,
        isRefined: false,
      };

      await setDoc(doc(db, 'assessments', assessmentId), assessmentDoc);
      await setDoc(doc(db, 'archetypes', archetypeId), archetypeDoc);

      // Save latest archetype to session storage for smooth transition display
      sessionStorage.setItem('latest_archetype', JSON.stringify(archetypeObj));

      router.push('/archetype');
    } catch (err) {
      console.error('Error submitting assessment:', err);
      alert('Gagal menyimpan hasil assessment. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!version) {
    return (
      <div className="max-w-3xl mx-auto my-12 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-white">
            Pilih Versi <span className="gradient-text">Assessment</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Assessment ini mengukur kompas nilai, kejelasan arah, agency, dan readiness untuk memetakan Archetype tokomu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div
            onClick={() => setVersion('cepat')}
            className="glass-card p-6 glass-card-hover cursor-pointer space-y-4 border border-indigo-500/30 relative"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Versi Cepat</h2>
              <p className="text-xs text-slate-400">±7 Menit • 18 Item Utama</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cocok untuk evaluasi awal secara efisien. Menghasilkan pemetaan Archetype utama dengan cepat.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
              Pilih Versi Cepat
            </button>
          </div>

          <div
            onClick={() => setVersion('mendalam')}
            className="glass-card p-6 glass-card-hover cursor-pointer space-y-4 border border-purple-500/30 relative opacity-95"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
              🔮
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Versi Mendalam</h2>
              <p className="text-xs text-slate-400">±25 Menit • 3 Sesi (Bisa Dicicil)</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analisis komprehensif sub-dimensi nilai pribadi, daya tahan, dan pemetaan keselarasan tingkat lanjut.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors">
              Pilih Versi Mendalam
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentItem = itemsCepat[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Pertanyaan {currentStep + 1} dari {totalQuestions}</span>
          <span>{progressPercent}% Selesai</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-card p-8 space-y-6 relative">
        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
          Dimensi: {currentItem.dimension.toUpperCase()}
        </span>

        <h2 className="text-xl font-bold text-white leading-snug">
          {currentItem.text}
        </h2>

        {currentItem.type === 'text' ? (
          <textarea
            rows={4}
            value={answers[currentItem.id] || ''}
            onChange={(e) => handleSelectAnswer(currentItem.id, e.target.value)}
            placeholder="Tuliskan refleksi singkatmu di sini..."
            className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <div className="space-y-3 pt-2">
            {[
              { val: 1, label: '1 - Sangat Tidak Setuju' },
              { val: 2, label: '2 - Tidak Setuju' },
              { val: 3, label: '3 - Netral / Ragu-ragu' },
              { val: 4, label: '4 - Setuju' },
              { val: 5, label: '5 - Sangat Setuju' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => handleSelectAnswer(currentItem.id, opt.val)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                  answers[currentItem.id] === opt.val
                    ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span>{opt.label}</span>
                {answers[currentItem.id] === opt.val && <span>✓</span>}
              </button>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-800">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40"
          >
            Kembali
          </button>

          {currentStep < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              disabled={!answers[currentItem.id]}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-semibold gradient-btn disabled:opacity-40"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!answers[currentItem.id] || submitting}
              className="px-6 py-2.5 rounded-xl text-white text-xs font-bold gradient-btn disabled:opacity-40"
            >
              {submitting ? 'Menghitung Archetype...' : 'Lihat Hasil Archetype 🔥'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
