export type MissionCategory = 'moon' | 'mars' | 'deep-space';

export type MissionStatusState = 'operational' | 'partial' | 'concluded' | 'unknown';

export interface MissionInstrument {
  name: string;
  code: string;
  purpose: string;
  status: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  missionId?: string;
  missionName?: string;
}

export interface MissionImageAsset {
  url: string;
  alt: string;
  caption: string;
}

export interface MissionSource {
  title: string;
  url: string;
  organization: string;
}

export interface MissionCoordinates {
  lat: number | null;
  lon: number | null;
  precision: string;
  frame: string;
}

export interface Mission {
  id: string;
  name: string;
  cosparId: string;
  category: MissionCategory;
  missionType: string;
  agency: string;
  launchYear: number;
  launchDate: string;
  destination: string;
  shortDescription: string;
  quickOverview: string;
  scientificSummary: string;
  missionObjectives: string[];
  launchDetails: Record<string, string | undefined>;
  spacecraftSpecifications: Record<string, string | undefined>;
  instruments: MissionInstrument[];
  missionJourney: string;
  timeline: TimelineEvent[];
  discoveries: string[];
  missionEnd: {
    date: string;
    summary: string;
  };
  currentStatus: {
    state: MissionStatusState;
    label: string;
    explanation: string;
  };
  location: {
    body: string;
    region: string;
    coordinates: MissionCoordinates;
    trajectoryNote: string;
  };
  historicalSignificance: string;
  story: string;
  images: MissionImageAsset[];
  model3D: {
    available: boolean;
    type: string;
    note: string;
  };
  sources: MissionSource[];
}

export interface CategoryMeta {
  id: MissionCategory;
  title: string;
  subtitle: string;
  description: string;
  route: string;
}
