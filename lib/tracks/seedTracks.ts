import { Cohort, Track } from '@/lib/types/schema';

export const SEED_TRACKS: Track[] = [
  // Grup Usia 15-18 Tahun
  {
    id: 'a1',
    cohort: 'age_15_18',
    code: 'A1',
    name: 'Eksplorasi Minat & Arah Studi',
    description: 'Menemukan minat nyata, potensi unik, dan orientasi masa depan.',
  },
  {
    id: 'a2',
    cohort: 'age_15_18',
    code: 'A2',
    name: 'Fokus & Kebiasaan Positif',
    description: 'Membangun ritme harian yang disiplin, seimbang, dan bebas dari distraksi.',
  },
  {
    id: 'a3',
    cohort: 'age_15_18',
    code: 'A3',
    name: 'Pondasi Karakter & Prinsip Diri',
    description: 'Mengenal prinsip pribadi agar percaya diri dan teguh memegang nilai diri.',
  },
  {
    id: 'a4',
    cohort: 'age_15_18',
    code: 'A4',
    name: 'Kesiapan Keterampilan Mandiri',
    description: 'Menyiapkan mentalitas resilien dan keterampilan pemecahan masalah dasar.',
  },

  // Grup Usia 19-29 Tahun
  {
    id: 'b1',
    cohort: 'age_19_29',
    code: 'B1',
    name: 'Clarity Karir & Arah Profesional',
    description: 'Menentukan jalur karir atau karya yang selaras dengan nilai dan potensi market.',
  },
  {
    id: 'b2',
    cohort: 'age_19_29',
    code: 'B2',
    name: 'Produktivitas & Momentum Berkarya',
    description: 'Mengatasi prokrastinasi, mengelola energi, dan membangun momentum konsisten.',
  },
  {
    id: 'b3',
    cohort: 'age_19_29',
    code: 'B3',
    name: 'Relasi Healthy & Circle Support',
    description: 'Membangun komunikasi bermakna dan jaringan pendukung yang menguatkan.',
  },
  {
    id: 'b4',
    cohort: 'age_19_29',
    code: 'B4',
    name: 'Kemandirian Finansial & Resiliensi',
    description: 'Fondasi pengelolaan finansial awal dan resiliensi emosional di usia 20-an.',
  },

  // Grup Usia 30+ Tahun
  {
    id: 'c1',
    cohort: 'age_30_plus',
    code: 'C1',
    name: 'Pivot & Refleksi Karir Mid-Stage',
    description: 'Evaluasi arah perjalanan karir dan strategi penyesuaian di babak baru.',
  },
  {
    id: 'c2',
    cohort: 'age_30_plus',
    code: 'C2',
    name: 'Work-Life Alignment & Vitalitas',
    description: 'Menyeimbangkan prioritas kerja, kesehatan, dan peran hidup tanpa burnout.',
  },
  {
    id: 'c3',
    cohort: 'age_30_plus',
    code: 'C3',
    name: 'Meaning, Impact & Personal Growth',
    description: 'Menggali makna hidup yang lebih dalam serta dampak positif bagi sekitar.',
  },
  {
    id: 'c4',
    cohort: 'age_30_plus',
    code: 'C4',
    name: 'Ketahanan Finansial & Ketenangan Hidup',
    description: 'Strategi ketahanan finansial jangka panjang dan ketenangan batin.',
  },
];

export function getTracksForCohort(cohort?: Cohort | string): Track[] {
  if (!cohort) return SEED_TRACKS.filter((t) => t.cohort === 'age_19_29');

  if (cohort === 'age_15_18' || cohort === 'sma') {
    return SEED_TRACKS.filter((t) => t.cohort === 'age_15_18' || t.cohort === 'sma');
  }
  if (cohort === 'age_30_plus' || cohort === '30_plus') {
    return SEED_TRACKS.filter((t) => t.cohort === 'age_30_plus' || t.cohort === '30_plus');
  }

  // default / age_19_29 / kuliah_29
  return SEED_TRACKS.filter((t) => t.cohort === 'age_19_29' || t.cohort === 'kuliah_29');
}
