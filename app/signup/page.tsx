'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase/client';
import { UserProfile } from '@/lib/types/schema';
import {
  calculateAge,
  getCohortFromBirthDate,
  getCohortLabel,
  getGroupBesarLabel,
} from '@/lib/utils/cohort';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatedAge = birthDate ? calculateAge(birthDate) : null;
  const currentCohort = birthDate ? getCohortFromBirthDate(birthDate) : null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentChecked) {
      setError('Kamu harus menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }
    if (!birthDate) {
      setError('Tanggal lahir wajib diisi untuk menentukan kelompok usia.');
      return;
    }
    if (calculatedAge !== null && calculatedAge <= 18 && !parentEmail) {
      setError('Pengguna berusia ≤ 18 tahun wajib mencantumkan email orang tua/wali.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: fullName });

      const cohort = getCohortFromBirthDate(birthDate);

      const userProfile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || email,
        fullName,
        birthDate,
        cohort,
        createdAt: new Date().toISOString(),
        consentStatus: true,
        parentalConsentEmail: calculatedAge !== null && calculatedAge <= 18 ? parentEmail : undefined,
        parentalConsentVerifiedAt: calculatedAge !== null && calculatedAge <= 18 ? null : new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', res.user.uid), userProfile);

      router.push('/assessment');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (!birthDate) {
      setError('Silakan isi Tanggal Lahir terlebih dahulu sebelum lanjut dengan Google.');
      return;
    }
    if (!consentChecked) {
      setError('Kamu harus menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await signInWithPopup(auth, googleProvider);
      const cohort = getCohortFromBirthDate(birthDate);

      const userProfile: UserProfile = {
        uid: res.user.uid,
        email: res.user.email || '',
        fullName: res.user.displayName || fullName || 'User ARAH',
        birthDate,
        cohort,
        createdAt: new Date().toISOString(),
        consentStatus: true,
        parentalConsentEmail: calculatedAge !== null && calculatedAge <= 18 ? parentEmail : undefined,
        parentalConsentVerifiedAt: calculatedAge !== null && calculatedAge <= 18 ? null : new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', res.user.uid), userProfile, { merge: true });

      router.push('/assessment');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal login via Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="glass-card p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <h1 className="text-3xl font-extrabold text-white mb-2 text-center">
          Mulai Perjalanan <span className="gradient-text">ARAH</span>
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Buat akun untuk menemukan kompas nilai diri, kelompok usia, dan bergabung di Komunitas Utama ARAH.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Contoh: Budi Pratama"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Tanggal Lahir (Wajib)</label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {currentCohort && calculatedAge !== null && (
            <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300">Usia Terdeteksi:</span>
                <span className="text-xs font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                  {calculatedAge} Tahun
                </span>
              </div>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Grup Usia:</span>
                  <span className="font-semibold text-indigo-300">
                    {getCohortLabel(currentCohort)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Komunitas:</span>
                  <span className="font-semibold text-purple-300">
                    🌐 {getGroupBesarLabel()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {calculatedAge !== null && calculatedAge <= 18 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">🛡️</span>
                <span className="text-xs font-semibold text-amber-300">Konfirmasi Izin Orang Tua/Wali</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Khusus pengguna usia ≤ 18 tahun, fitur interaksi sosial terlindungi membutuhkan email verifikasi orang tua/wali.
              </p>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="Email Orang Tua / Wali"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-amber-500/40 text-white text-xs placeholder-slate-500 focus:outline-none"
              />
            </div>
          )}

          <div className="flex items-start space-x-2 pt-2">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-1 rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-purple-500"
            />
            <label htmlFor="consent" className="text-xs text-slate-400">
              Saya menyetujui <span className="text-purple-400 underline cursor-pointer">Ketentuan Layanan</span> &{' '}
              <span className="text-purple-400 underline cursor-pointer">Kebijakan Privasi</span> ARAH. Data jurnal & assessment disimpan secara privat dan dapat dihapus kapan saja.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-white gradient-btn mt-4 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar & Mulai Assessment'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-3 text-slate-500">Atau</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
        >
          <span>🌐</span>
          <span>Daftar dengan Google</span>
        </button>

        <p className="text-xs text-slate-400 text-center mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-purple-400 font-semibold hover:underline">
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
}
