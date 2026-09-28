export type Cohort = 'sma' | 'kuliah_29' | '30_plus';
export type VersionType = 'cepat' | 'mendalam';
export type AssessmentType = 'baseline' | 'reassessment';
export type Archetype = 'phoenix' | 'pegasus' | 'griffin' | 'naga';
export type Phase = 'discover' | 'build' | 'integrate';
export type SeasonStatus = 'active' | 'paused' | 'completed' | 'dropped';
export type QuestType = 'solo' | 'coop';
export type ExchangeStep = 'goal' | 'reality' | 'options' | 'will';
export type ModerationStatus = 'open' | 'reviewed' | 'actioned';
export type CpsStatus = 'progressing' | 'stagnant' | 'at_risk' | 'red_flag';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  birthDate: string; // YYYY-MM-DD
  cohort: Cohort;
  createdAt: string; // ISO String
  consentStatus: boolean;
  parentalConsentEmail?: string;
  parentalConsentVerifiedAt?: string | null;
}

export interface Track {
  id: string;
  cohort: Cohort;
  code: string; // e.g. B1
  name: string;
  description: string;
}

export interface AssessmentSubdimensionScores {
  s1_self_knowledge: number;
  s2_option_clarity: number;
  s3_decision_confidence: number;
  s4_action_momentum: number;
}

export interface Assessment {
  id: string;
  userId: string;
  version: VersionType;
  type: AssessmentType;
  rawAnswers: Record<string, any>;
  clarityScore: number;
  alignmentScore: number;
  readinessScore: number;
  agencyScore: number;
  wellbeingScore: number;
  trackSubdimensionScores?: Record<string, AssessmentSubdimensionScores>;
  createdAt: string;
}

export interface ArchetypeResult {
  id: string;
  userId: string;
  assessmentId: string;
  archetype: Archetype;
  computedAt: string;
  isRefined: boolean;
}

export interface Goal {
  id: string;
  userId: string;
  description: string;
  baselineScore: number; // -2 to +2 (GAS Scale)
  finalScore?: number;   // -2 to +2
  createdAt: string;
}

export interface Season {
  id: string;
  userId: string;
  trackId: string;
  trackCode: string;
  phase: Phase;
  startedAt: string;
  status: SeasonStatus;
}

export interface JournalEntry {
  id: string;
  userId: string;
  seasonId: string;
  promptId: string;
  content: string; // PRIVATE! Strictly owned by user.
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  seasonId: string;
  name: string;
  targetFrequency: string; // e.g. "daily"
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  userId: string;
  loggedAt: string; // YYYY-MM-DD
  completed: boolean;
}

export interface Quest {
  id: string;
  seasonId: string;
  userId: string;
  type: QuestType;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  completedAt?: string | null;
}

export interface Match {
  id: string;
  cohort: Cohort;
  memberUserIds: string[];
  seasonIdA: string;
  seasonIdB: string;
  circleId?: string | null;
  archetypePairing: string;
  matchedAt: string;
}

export interface ExchangeSession {
  id: string;
  matchId: string;
  dilemmaText: string;
  format: 'grow';
  createdBy: string;
  createdAt: string;
}

export interface ExchangeMessage {
  id: string;
  sessionId: string;
  matchId: string;
  userId: string;
  step: ExchangeStep;
  content: string;
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  targetType: 'exchange_message' | 'user';
  targetId: string;
  reason: string;
  status: ModerationStatus;
  createdAt: string;
}

export interface CpsScore {
  id: string;
  userId: string;
  seasonId: string;
  cpsValue: number;
  status: CpsStatus;
  computedAt: string;
}
