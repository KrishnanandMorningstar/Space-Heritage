import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Mission } from '../types/mission';
import {
  filterAndSortMissions,
  formatCategoryLabel,
  getStatusMeta,
  validateMissionCatalog,
} from './missionFormatters';

const moon = JSON.parse(readFileSync(resolve('src/data/moon.json'), 'utf8')) as Mission[];
const mars = JSON.parse(readFileSync(resolve('src/data/mars.json'), 'utf8')) as Mission[];
const deepspace = JSON.parse(readFileSync(resolve('src/data/deepspace.json'), 'utf8')) as Mission[];
const allMissions: Mission[] = [...moon, ...mars, ...deepspace];

test('Stage 2 catalog contains all 16 verified missions with valid sources and unique IDs', () => {
  const report = validateMissionCatalog(allMissions);
  assert.equal(report.total, 16);
  assert.deepEqual(report.byCategory, {
    moon: 4,
    mars: 7,
    'deep-space': 5,
  });
  assert.deepEqual(report.duplicateIds, []);
  assert.deepEqual(report.missingSources, []);
});

test('filterAndSortMissions filters by search query, COSPAR ID, category, and status', () => {
  const nearSearch = filterAndSortMissions(allMissions, { search: '1996-008A' });
  assert.equal(nearSearch.length, 1);
  assert.equal(nearSearch[0].id, 'near-shoemaker');

  const activeMars = filterAndSortMissions(allMissions, {
    category: 'mars',
    status: 'operational',
  });
  assert.equal(activeMars.length, 1);
  assert.equal(activeMars[0].id, 'perseverance-ingenuity');

  const newestFirst = filterAndSortMissions(allMissions, { sortBy: 'date-desc' });
  assert.equal(newestFirst[0].id, 'perseverance-ingenuity');
  assert.equal(newestFirst[newestFirst.length - 1].id, 'surveyor-3');
});

test('scientific distinctions for Dawn, Kepler, Pioneer 10, and Pioneer 11 are preserved', () => {
  const dawn = allMissions.find((m) => m.id === 'dawn');
  const kepler = allMissions.find((m) => m.id === 'kepler');
  const p10 = allMissions.find((m) => m.id === 'pioneer-10');
  const p11 = allMissions.find((m) => m.id === 'pioneer-11');

  assert.ok(dawn);
  assert.equal(dawn.location.coordinates.lat, null);
  assert.match(dawn.currentStatus.explanation, /did NOT land on Ceres/i);

  assert.ok(kepler);
  assert.match(kepler.destination, /Heliocentric/i);
  assert.equal(kepler.location.coordinates.lat, null);

  assert.ok(p10 && p11);
  assert.notEqual(p10.id, p11.id);
  assert.notEqual(p10.cosparId, p11.cosparId);
});

test('formatting helpers return expected labels and non-hue-only status glyphs', () => {
  assert.equal(formatCategoryLabel('deep-space'), 'Deep Space');
  assert.equal(getStatusMeta('partial').glyph, '◐');
  assert.equal(getStatusMeta('operational').glyph, '●');
});
