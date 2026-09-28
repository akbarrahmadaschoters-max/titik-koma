import { Cohort } from '@/lib/types/schema';

export function calculateAge(dobString: string): number {
  if (!dobString) return 0;
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= 0 ? age : 0;
}

export function getCohortFromBirthDate(dobString: string): Cohort {
  const age = calculateAge(dobString);
  if (age <= 18) return 'age_15_18';
  if (age <= 29) return 'age_19_29';
  return 'age_30_plus';
}

export function getCohortLabel(cohort?: Cohort | string, age?: number): string {
  if (!cohort) return 'Grup Usia';

  if (cohort === 'age_15_18' || cohort === 'sma') {
    return 'Grup Usia 15–18 Tahun';
  }
  if (cohort === 'age_19_29' || cohort === 'kuliah_29') {
    return 'Grup Usia 19–29 Tahun';
  }
  if (cohort === 'age_30_plus' || cohort === '30_plus') {
    return 'Grup Usia 30+ Tahun';
  }

  if (age !== undefined) {
    return `Grup Usia (${age} Tahun)`;
  }

  return 'Grup Usia';
}

export function getGroupBesarLabel(): string {
  return 'Komunitas Utama ARAH (Lintas Usia)';
}
