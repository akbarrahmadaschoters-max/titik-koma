import { Track } from '@/lib/types/schema';

export const SEED_TRACKS: Track[] = [
  // Cohort SMA (15-18)
  {
    id: 'a1',
    cohort: 'sma',
    code: 'A1',
    name: 'Eksplorasi Minat & Jurusan',
    description: 'Menemukan arah studi dan potensi diri yang relevan dengan minat nyata.',
  },
  {
    id: 'a2',
    cohort: 'sma',
    code: 'A2',
    name: 'Manajemen Waktu & Kebiasaan Belajar',
    description: 'Membangun ritme harian yang fokus dan seimbang antara akademis dan kehidupan personal.',
  },
  {
    id: 'a3',
    cohort: 'sma',
    code: 'A3',
    name: 'Identitas & Nilai Diri',
    description: 'Mengenal prinsip pribadi agar tidak mudah terbawa arus teman sebaya.',
  },
  {
    id: 'a4',
    cohort: 'sma',
    code: 'A4',
    name: 'Kesiapan Transisi Dewasa',
    description: 'Menyiapkan mentalitas dan keterampilan dasar memasuki dunia kuliah atau kerja.',
  },

  // Cohort Kuliah–29 (19-29)
  {
    id: 'b1',
    cohort: 'kuliah_29',
    code: 'B1',
    name: 'Clarity Karir & Arah Hidup',
    description: 'Menentukan jalur profesional yang sesuai nilai diri dan potensi pasar.',
  },
  {
    id: 'b2',
    cohort: 'kuliah_29',
    code: 'B2',
    name: 'Produktivitas & Momentum Kerja',
    description: 'Mengatasi prokrastinasi, mengatur fokus, dan membangun momentum konsisten.',
  },
  {
    id: 'b3',
    cohort: 'kuliah_29',
    code: 'B3',
    name: 'Navigasi Relasi & Peer Group',
    description: 'Membangun relasi bermakna dan lingkaran pendukung yang sehat.',
  },
  {
    id: 'b4',
    cohort: 'kuliah_29',
    code: 'B4',
    name: 'Kemandirian Finansial & Mental',
    description: 'Fondasi keuangan awal dan resiliensi emosional di usia 20-an.',
  },

  // Cohort 30+
  {
    id: 'c1',
    cohort: '30_plus',
    code: 'C1',
    name: 'Pivot Karir & Mid-Career Clarity',
    description: 'Evaluasi ulang perjalanan karir dan strategi melangkah ke babak berikutnya.',
  },
  {
    id: 'c2',
    cohort: '30_plus',
    code: 'C2',
    name: 'Work-Life Alignment & Energi',
    description: 'Menyeimbangkan prioritas kerja, kesehatan, dan keluarga tanpa burnout.',
  },
  {
    id: 'c3',
    cohort: '30_plus',
    code: 'C3',
    name: 'Meaning, Legacy & Personal Growth',
    description: 'Menggali makna hidup yang lebih dalam serta dampak positif jangka panjang.',
  },
  {
    id: 'c4',
    cohort: '30_plus',
    code: 'C4',
    name: 'Resiliensi Finansial & Kehidupan',
    description: 'Strategi ketahanan finansial keluarga dan ketenangan dalam menghadapi perubahan.',
  },
];
