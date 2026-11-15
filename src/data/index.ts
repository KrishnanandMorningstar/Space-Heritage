import moonMissionsData from './moon.json';
import marsMissionsData from './mars.json';
import deepSpaceMissionsData from './deepspace.json';
import type { CategoryMeta, Mission, MissionCategory, TimelineEvent } from '../types/mission';

const moonMissions = moonMissionsData as unknown as Mission[];
const marsMissions = marsMissionsData as unknown as Mission[];
const deepSpaceMissions = deepSpaceMissionsData as unknown as Mission[];

export const allMissions: Mission[] = [
  ...moonMissions,
  ...marsMissions,
  ...deepSpaceMissions,
];

export const categoryCatalog: Record<MissionCategory, CategoryMeta> = {
  moon: {
    id: 'moon',
    title: 'Moon Exploration',
    subtitle: 'Lunar Modules, Rovers, Surveyors & ALSEP Stations',
    description:
      'From robotic Surveyors and Apollo Lunar Modules to nuclear ALSEP stations and electric Moon rovers, examine the hardware resting on the lunar surface.',
    route: '/moon',
  },
  mars: {
    id: 'mars',
    title: 'Mars Exploration',
    subtitle: 'Stationary Landers, Rovers & Aerial Pioneers',
    description:
      'Distinguish stationary geophysical landers, solar- and nuclear-powered rovers, and the first planetary rotorcraft across Martian plains and craters.',
    route: '/mars',
  },
  'deep-space': {
    id: 'deep-space',
    title: 'Deep Space Exploration',
    subtitle: 'Escaping Probes, Asteroid Explorers & Heliocentric Observatories',
    description:
      'Trace outer-planet pioneers bound for interstellar space, orbiters around Vesta and Ceres, an unexpected landing on Eros, and an exoplanet hunter in solar orbit.',
    route: '/deep-space',
  },
};

export function getMissionById(id: string | undefined): Mission | null {
  if (!id) return null;
  return allMissions.find((mission) => mission.id === id) || null;
}

export function getMissionsByCategory(category: MissionCategory): Mission[] {
  return allMissions.filter((mission) => mission.category === category);
}

export const heritagePreviewTimeline: TimelineEvent[] = [
  {
    date: '1967-04-20 00:04 UTC',
    title: 'Surveyor 3 Tests Lunar Soil—Later Visited by Apollo 12',
    missionId: 'surveyor-3',
    missionName: 'Surveyor 3',
    description:
      'Surveyor 3 bounces into a crater in Oceanus Procellarum, digs four soil trenches, and transmits 6,315 images before being inspected in person by Apollo 12 astronauts in 1969.',
  },
  {
    date: '1969-07-20 20:17 UTC',
    title: 'Apollo 11 Eagle Lands at Tranquility Base',
    missionId: 'apollo-11-lm',
    missionName: 'Apollo 11 LM & EASEP',
    description:
      'Eagle touches down in Mare Tranquillitatis. When the ascent stage lifts off, the descent stage and passive Laser Ranging Retroreflector remain—still returning Earth laser pulses today.',
  },
  {
    date: '1976-07-20 11:53 UTC',
    title: 'Viking 1 Begins Six-Year Surface Vigil on Mars',
    missionId: 'viking-1',
    missionName: 'Viking 1',
    description:
      'Exactly seven years after Apollo 11, Viking 1 lands in Chryse Planitia and operates for 2,245 Martian sols until a 1982 command error severs contact.',
  },
  {
    date: '1979-09-01',
    title: 'Pioneer 11 Makes Humanity’s First Saturn Encounter',
    missionId: 'pioneer-11',
    missionName: 'Pioneer 11',
    description:
      'After a polar slingshot past Jupiter, Pioneer 11 threads Saturn’s outer ring plane, discovers the narrow F ring, and clears the way for Voyager.',
  },
  {
    date: '2001-02-12 20:01 UTC',
    title: 'NEAR Shoemaker Lands on Asteroid 433 Eros',
    missionId: 'near-shoemaker',
    missionName: 'NEAR Shoemaker',
    description:
      'Built strictly as an asteroid orbiter with no landing legs, NEAR Shoemaker executes a gentle ~1.9 m/s touchdown near Himeros crater and operates on Eros for another 16 days.',
  },
  {
    date: '2015-03-06',
    title: 'Dawn Enters Orbit Around Dwarf Planet Ceres',
    missionId: 'dawn',
    missionName: 'Dawn',
    description:
      'After orbiting Vesta for 14 months, Dawn uses xenon ion propulsion to enter orbit around Ceres, remaining in stable orbit after fuel exhaustion in 2018.',
  },
  {
    date: '2026-10-11',
    title: 'Perseverance Sets Off-World Driving Record (45.22 km)',
    missionId: 'perseverance-ingenuity',
    missionName: 'Perseverance & Ingenuity',
    description:
      'Paired with the retired Ingenuity helicopter (72 flights), nuclear-powered Perseverance surpasses Opportunity’s 45.16 km distance record inside Jezero Crater.',
  },
];
