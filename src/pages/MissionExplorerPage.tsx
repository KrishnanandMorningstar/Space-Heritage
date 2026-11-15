import { useMemo, useState } from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { allMissions } from '../data';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { filterAndSortMissions, type MissionFilterOptions } from '../utils/missionFormatters';
import MissionCard from '../components/MissionCard';

export default function MissionExplorerPage() {
  useDocumentTitle('Mission Explorer');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [missionType, setMissionType] = useState('all');
  const [agency, setAgency] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState<MissionFilterOptions['sortBy']>('date-asc');

  const availableTypes = useMemo(
    () => Array.from(new Set(allMissions.map((m) => m.missionType))),
    []
  );

  const availableAgencies = useMemo(
    () => Array.from(new Set(allMissions.map((m) => m.agency))),
    []
  );

  const filteredMissions = useMemo(
    () =>
      filterAndSortMissions(allMissions, {
        search,
        category,
        missionType,
        agency,
        status,
        sortBy,
      }),
    [search, category, missionType, agency, status, sortBy]
  );

  const hasActiveFilters =
    Boolean(search) ||
    category !== 'all' ||
    missionType !== 'all' ||
    agency !== 'all' ||
    status !== 'all';

  function resetFilters() {
    setSearch('');
    setCategory('all');
    setMissionType('all');
    setAgency('all');
    setStatus('all');
    setSortBy('date-asc');
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="kicker">Stage 2 Complete Catalog</span>
          <h1 className="section-title">Mission Explorer</h1>
          <p className="section-lead">
            Search, filter, and compare all 16 verified spacecraft, landers, rovers, helicopters, and deep-space missions across the Moon, Mars, and deep space.
          </p>
        </div>

        <div className="panel explorer-controls">
          <div className="search-box">
            <Search size={18} className="search-box-icon" aria-hidden="true" />
            <label htmlFor="mission-search" className="sr-only">
              Search by mission name, destination, agency, or COSPAR ID
            </label>
            <input
              id="mission-search"
              type="search"
              className="search-input"
              placeholder="Search by spacecraft, destination, or COSPAR ID (e.g. Dawn, Kepler, 1975-075C)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filter-grid">
            <div className="filter-field">
              <label htmlFor="filter-category" className="filter-label">
                Destination
              </label>
              <select
                id="filter-category"
                className="filter-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All Destinations</option>
                <option value="moon">Moon (4)</option>
                <option value="mars">Mars (7)</option>
                <option value="deep-space">Deep Space (5)</option>
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="filter-type" className="filter-label">
                Mission Type
              </label>
              <select
                id="filter-type"
                className="filter-select"
                value={missionType}
                onChange={(e) => setMissionType(e.target.value)}
              >
                <option value="all">All Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="filter-agency" className="filter-label">
                Agency
              </label>
              <select
                id="filter-agency"
                className="filter-select"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
              >
                <option value="all">All Agencies</option>
                {availableAgencies.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="filter-status" className="filter-label">
                Status
              </label>
              <select
                id="filter-status"
                className="filter-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="operational">Operational</option>
                <option value="partial">Partially Active (Passive)</option>
                <option value="concluded">Mission Concluded</option>
                <option value="unknown">Status Unconfirmed</option>
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="sort-missions" className="filter-label">
                Sort By
              </label>
              <select
                id="sort-missions"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as MissionFilterOptions['sortBy'])}
              >
                <option value="date-asc">Oldest Launch First</option>
                <option value="date-desc">Newest Launch First</option>
                <option value="name-asc">Name (A–Z)</option>
                <option value="name-desc">Name (Z–A)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-bar" aria-live="polite">
          <span>
            Showing <strong className="mono">{filteredMissions.length}</strong> of{' '}
            <strong className="mono">{allMissions.length}</strong> verified missions
          </span>
          {hasActiveFilters && (
            <button type="button" className="btn btn-ghost" onClick={resetFilters}>
              <RotateCcw size={15} aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredMissions.length === 0 ? (
          <div className="panel empty-state">
            <h2 style={{ fontSize: '1.3rem' }}>No matching missions found</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '46ch' }}>
              Try clearing one or more filters or searching with another spacecraft name, destination, or COSPAR identifier.
            </p>
            <button type="button" className="btn btn-secondary" onClick={resetFilters}>
              <RotateCcw size={16} aria-hidden="true" />
              <span>Show All {allMissions.length} Missions</span>
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filteredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
