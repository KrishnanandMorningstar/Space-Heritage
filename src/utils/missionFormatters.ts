import type { Mission, MissionCategory, MissionStatusState } from '../types/mission';

export const CATEGORY_LABELS: Record<MissionCategory, string> = {
  moon: 'Moon',
  mars: 'Mars',
  'deep-space': 'Deep Space',
};

export interface StatusMeta {
  glyph: string;
  label: string;
  className: string;
}

export const STATUS_META: Record<MissionStatusState, StatusMeta> = {
  operational: {
    glyph: '●',
    label: 'Operational',
    className: 'status-text--operational',
  },
  partial: {
    glyph: '◐',
    label: 'Partially Active (Passive)',
    className: 'status-text--partial',
  },
  concluded: {
    glyph: '■',
    label: 'Mission Concluded',
    className: 'status-text--concluded',
  },
  unknown: {
    glyph: '▲',
    label: 'Status Unconfirmed',
    className: 'status-text--unknown',
  },
};

export interface MissionFilterOptions {
  search?: string;
  category?: string;
  missionType?: string;
  agency?: string;
  status?: string;
  sortBy?: 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc';
}

export function getStatusMeta(state: MissionStatusState | undefined): StatusMeta {
  if (!state) return STATUS_META.unknown;
  return STATUS_META[state] || STATUS_META.unknown;
}

export function formatCategoryLabel(category: MissionCategory): string {
  return CATEGORY_LABELS[category] || category;
}

export function formatSpecKey(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
}

export function filterAndSortMissions(
  missions: Mission[],
  filters: MissionFilterOptions
): Mission[] {
  const {
    search = '',
    category = 'all',
    missionType = 'all',
    agency = 'all',
    status = 'all',
    sortBy = 'date-asc',
  } = filters;

  const query = search.trim().toLowerCase();

  const filtered = missions.filter((mission) => {
    const matchesQuery =
      !query ||
      mission.name.toLowerCase().includes(query) ||
      mission.destination.toLowerCase().includes(query) ||
      mission.shortDescription.toLowerCase().includes(query) ||
      mission.cosparId.toLowerCase().includes(query) ||
      mission.agency.toLowerCase().includes(query);

    const matchesCategory = category === 'all' || mission.category === category;
    const matchesType = missionType === 'all' || mission.missionType === missionType;
    const matchesAgency = agency === 'all' || mission.agency === agency;
    const matchesStatus = status === 'all' || mission.currentStatus?.state === status;

    return matchesQuery && matchesCategory && matchesType && matchesAgency && matchesStatus;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
    }
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    return new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime();
  });
}

export function validateMissionCatalog(missions: Mission[]): {
  total: number;
  byCategory: Record<MissionCategory, number>;
  duplicateIds: string[];
  missingSources: string[];
} {
  const seen = new Set<string>();
  const duplicateIds: string[] = [];
  const missingSources: string[] = [];
  const byCategory: Record<MissionCategory, number> = {
    moon: 0,
    mars: 0,
    'deep-space': 0,
  };

  for (const mission of missions) {
    if (seen.has(mission.id)) {
      duplicateIds.push(mission.id);
    }
    seen.add(mission.id);
    byCategory[mission.category] += 1;

    if (!mission.sources || mission.sources.length === 0) {
      missingSources.push(mission.id);
    }
  }

  return {
    total: missions.length,
    byCategory,
    duplicateIds,
    missingSources,
  };
}
