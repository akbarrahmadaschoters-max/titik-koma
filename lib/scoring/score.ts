export interface RawAnswers {
  [itemId: string]: number | string;
}

export interface CalculatedScores {
  clarityScore: number;
  alignmentScore: number;
  readinessScore: number;
  agencyScore: number;
  wellbeingScore: number;
  hasDistressIndicator: boolean;
}

const DISTRESS_KEYWORDS = [
  'bunuh diri',
  'depresi berat',
  'tidak ingin hidup',
  'putus asa',
  'menyakiti diri',
  'hopeless',
  'suicide',
  'self harm',
];

export function calculateAssessmentScores(
  answers: RawAnswers,
  items: Array<{ id: string; dimension: string; reversed?: boolean; type?: string }>
): CalculatedScores {
  const dimensionTotals: Record<string, { sum: number; count: number }> = {
    clarity: { sum: 0, count: 0 },
    alignment: { sum: 0, count: 0 },
    readiness: { sum: 0, count: 0 },
    agency: { sum: 0, count: 0 },
    wellbeing: { sum: 0, count: 0 },
  };

  let hasDistressIndicator = false;

  items.forEach((item) => {
    const val = answers[item.id];

    if (item.type === 'text' && typeof val === 'string') {
      const lowerText = val.toLowerCase();
      if (DISTRESS_KEYWORDS.some((kw) => lowerText.includes(kw))) {
        hasDistressIndicator = true;
      }
      return;
    }

    if (typeof val === 'number' && dimensionTotals[item.dimension]) {
      // 1 to 5 scale
      let score = val;
      if (item.reversed) {
        score = 6 - val;
      }
      dimensionTotals[item.dimension].sum += score;
      dimensionTotals[item.dimension].count += 1;
    }
  });

  const normalize = (dim: string): number => {
    const { sum, count } = dimensionTotals[dim];
    if (count === 0) return 50; // default midpoint
    // sum ranges from 1*count to 5*count
    // normalize to 0 - 100
    const rawAvg = sum / count; // 1 to 5
    const normalized = Math.round(((rawAvg - 1) / 4) * 100);
    return Math.min(100, Math.max(0, normalized));
  };

  const wellbeingScore = normalize('wellbeing');
  if (wellbeingScore < 40) {
    // If wellbeing is low, double check text response distress
    const textAnswer = answers['q18_qualitative'] || answers['qualitative'];
    if (typeof textAnswer === 'string') {
      const lowerText = textAnswer.toLowerCase();
      if (DISTRESS_KEYWORDS.some((kw) => lowerText.includes(kw))) {
        hasDistressIndicator = true;
      }
    }
  }

  return {
    clarityScore: normalize('clarity'),
    alignmentScore: normalize('alignment'),
    readinessScore: normalize('readiness'),
    agencyScore: normalize('agency'),
    wellbeingScore: wellbeingScore,
    hasDistressIndicator,
  };
}
