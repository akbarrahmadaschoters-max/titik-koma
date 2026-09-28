import archetypeConfig from '@/content/archetype/archetype-config.json';
import { Archetype } from '@/lib/types/schema';

export interface ArchetypeDetail {
  code: Archetype;
  name: string;
  emoji: string;
  tagline: string;
  strengths: string;
  phase: string;
  mission: string;
  closing: string;
  evolution_wording: string;
}

export function determineArchetype(clarityScore: number, alignmentScore: number): ArchetypeDetail {
  const cutoff = archetypeConfig.cutoff || 60;
  const grayZone = archetypeConfig.gray_zone || { min: 55, max: 65 };

  let isHighClarity = clarityScore >= cutoff;
  let isHighAlignment = alignmentScore >= cutoff;

  // Gray Zone handling (55-65): Default to earlier development phase if in boundary
  if (clarityScore >= grayZone.min && clarityScore <= grayZone.max) {
    if (clarityScore < cutoff) isHighClarity = false;
  }
  if (alignmentScore >= grayZone.min && alignmentScore <= grayZone.max) {
    if (alignmentScore < cutoff) isHighAlignment = false;
  }

  let code: Archetype = 'phoenix';

  if (!isHighClarity && !isHighAlignment) {
    code = 'phoenix'; // Low Clarity, Low Alignment
  } else if (isHighClarity && !isHighAlignment) {
    code = 'griffin'; // High Clarity, Low Alignment
  } else if (!isHighClarity && isHighAlignment) {
    code = 'pegasus'; // Low Clarity, High Alignment
  } else {
    code = 'naga'; // High Clarity, High Alignment
  }

  const detail = (archetypeConfig.archetypes as any)[code];

  return {
    code,
    name: detail.name,
    emoji: detail.emoji,
    tagline: detail.tagline,
    strengths: detail.strengths,
    phase: detail.phase,
    mission: detail.mission,
    closing: detail.closing,
    evolution_wording: detail.evolution_wording,
  };
}
