import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getMissionById } from '../data';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatCategoryLabel, formatSpecKey } from '../utils/missionFormatters';
import InteractiveTimeline from '../components/InteractiveTimeline';
import MissionImage from '../components/MissionImage';
import StatusBadge from '../components/StatusBadge';

const TOC_SECTIONS = [
  { id: 'overview', label: 'Mission Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'launch', label: 'Launch Details' },
  { id: 'specs', label: 'Spacecraft Specs' },
  { id: 'instruments', label: 'Instruments' },
  { id: 'journey', label: 'Mission Journey' },
  { id: 'timeline', label: 'Interactive Timeline' },
  { id: 'discoveries', label: 'Major Discoveries' },
  { id: 'conclusion', label: 'Mission Conclusion' },
  { id: 'status', label: 'Current Status' },
  { id: 'location', label: 'Location & Trajectory' },
  { id: 'significance', label: 'Significance & Story' },
  { id: 'gallery', label: 'NASA Media Gallery' },
  { id: 'sources', label: 'Sources & References' },
];

export default function MissionDetailPage() {
  const { id } = useParams();
  const mission = getMissionById(id);

  useDocumentTitle(mission ? mission.name : 'Mission Not Found');

  const [viewMode, setViewMode] = useState<'quick' | 'scientific'>('quick');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!mission) {
    return (
      <section className="section">
        <div className="container">
          <div className="panel empty-state">
            <h1 style={{ fontSize: '1.8rem' }}>Mission Record Not Found</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '50ch' }}>
              No mission record matches <span className="mono">{id}</span>. Return to the Mission Explorer to browse all 16 verified records.
            </p>
            <Link to="/explorer" className="btn btn-primary">
              <ArrowLeft size={17} aria-hidden="true" />
              <span>Back to Mission Explorer</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const activePhoto = mission.images?.[activeImageIndex] || mission.images?.[0];

  return (
    <>
      {/* 1. Mission Title & Hero Image */}
      <section className="detail-hero">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <Link to="/explorer" className="btn btn-ghost">
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Back to Mission Explorer</span>
            </Link>

            <div className="mode-switch" role="group" aria-label="Information detail level">
              <button
                type="button"
                className={`mode-btn ${viewMode === 'quick' ? 'mode-btn--active' : ''}`}
                onClick={() => setViewMode('quick')}
              >
                Quick Overview
              </button>
              <button
                type="button"
                className={`mode-btn ${viewMode === 'scientific' ? 'mode-btn--active' : ''}`}
                onClick={() => setViewMode('scientific')}
              >
                Scientific / Technical View
              </button>
            </div>
          </div>

          <div className="detail-hero-grid">
            <div>
              <div className="meta-line" style={{ marginBottom: '0.85rem' }}>
                <span className="mono" style={{ color: 'var(--accent-cyan)' }}>
                  {formatCategoryLabel(mission.category)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{mission.missionType}</span>
                <span aria-hidden="true">·</span>
                <StatusBadge
                  state={mission.currentStatus?.state}
                  customLabel={mission.currentStatus?.label}
                />
              </div>

              <h1 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.85rem)', marginBottom: '0.65rem' }}>
                {mission.name}
              </h1>
              <p className="mono" style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                NSSDCA / COSPAR ID: {mission.cosparId} · Agency: {mission.agency}
              </p>
              <p className="prose-block" style={{ fontSize: '1.04rem', marginBottom: '1.25rem' }}>
                {mission.shortDescription}
              </p>

              <dl className="spec-dl">
                <div className="spec-row">
                  <dt className="spec-label">Launch Date (UTC)</dt>
                  <dd className="spec-value mono" style={{ fontSize: '0.9rem' }}>
                    {mission.launchDetails?.dateUtc || mission.launchDate}
                  </dd>
                </div>
                <div className="spec-row">
                  <dt className="spec-label">Destination</dt>
                  <dd className="spec-value">{mission.destination}</dd>
                </div>
              </dl>
            </div>

            <div className="panel" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16 / 10', flex: 1 }}>
                <MissionImage
                  src={mission.images?.[0]?.url}
                  alt={mission.images?.[0]?.alt || mission.name}
                  category={mission.category}
                  eager
                />
              </div>
              {mission.images?.[0]?.caption && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.7rem', marginBottom: 0 }}>
                  {mission.images[0].caption}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container detail-layout">
        <aside className="panel detail-toc" aria-label="Mission dossier navigation">
          <span className="kicker" style={{ marginBottom: 0 }}>
            Mission Dossier
          </span>
          <ul className="detail-toc-list">
            {TOC_SECTIONS.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className="detail-toc-link">
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="detail-sections">
          {/* 2. Mission Overview */}
          <section id="overview" className="panel detail-card">
            <h2>
              Mission Overview ({viewMode === 'quick' ? 'General Visitor' : 'Scientific Summary'})
            </h2>
            <p className="prose-block" style={{ fontSize: '1.03rem' }}>
              {viewMode === 'quick' ? mission.quickOverview : mission.scientificSummary}
            </p>
          </section>

          {/* 3. Mission Objectives */}
          <section id="objectives" className="panel detail-card">
            <h2>Mission Objectives</h2>
            <ul className="bullet-list">
              {mission.missionObjectives.map((obj) => (
                <li key={obj}>{obj}</li>
              ))}
            </ul>
          </section>

          {/* 4. Launch Details */}
          <section id="launch" className="panel detail-card">
            <h2>Launch &amp; Arrival Details</h2>
            <dl className="spec-dl">
              {Object.entries(mission.launchDetails)
                .filter(([, value]) => Boolean(value))
                .map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <dt className="spec-label">{formatSpecKey(key)}</dt>
                    <dd className="spec-value">{value}</dd>
                  </div>
                ))}
            </dl>
          </section>

          {/* 5. Spacecraft Engineering & Specifications */}
          <section id="specs" className="panel detail-card">
            <h2>Spacecraft Engineering &amp; Specifications</h2>
            <dl className="spec-dl">
              {Object.entries(mission.spacecraftSpecifications)
                .filter(([, value]) => Boolean(value))
                .map(([key, value]) => (
                  <div key={key} className="spec-row">
                    <dt className="spec-label">{formatSpecKey(key)}</dt>
                    <dd className="spec-value">{value}</dd>
                  </div>
                ))}
            </dl>
            {viewMode === 'quick' && (
              <p style={{ marginTop: '1.1rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Switch to <strong>Scientific / Technical View</strong> above to inspect instrument operational status and reference frames.
              </p>
            )}
          </section>

          {/* 6. Scientific Instruments */}
          <section id="instruments" className="panel detail-card">
            <h2>Scientific Instruments</h2>
            <div className="instrument-list">
              {mission.instruments.map((inst) => (
                <div key={inst.name} className="instrument-item">
                  <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--accent-cyan)', marginBottom: '0.25rem' }}>
                    {inst.code}
                  </div>
                  <h3 style={{ fontSize: '1.03rem', marginBottom: '0.4rem' }}>{inst.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                    {inst.purpose}
                  </p>
                  {viewMode === 'scientific' && (
                    <p className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                      Status: {inst.status}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 7. Mission Journey */}
          <section id="journey" className="panel detail-card">
            <h2>Mission Journey</h2>
            <p className="prose-block">{mission.missionJourney}</p>
          </section>

          {/* 8. Interactive Timeline */}
          <section id="timeline" className="panel detail-card">
            <h2>Interactive Mission Timeline</h2>
            <InteractiveTimeline events={mission.timeline} />
          </section>

          {/* 9. Major Discoveries */}
          <section id="discoveries" className="panel detail-card">
            <h2>Major Scientific Discoveries</h2>
            <ul className="bullet-list">
              {mission.discoveries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {/* 10 & 11. Mission Conclusion & Current Status */}
          <div className="grid-2">
            <section id="conclusion" className="panel detail-card">
              <h2>Mission Conclusion</h2>
              <p className="mono" style={{ fontSize: '0.84rem', color: 'var(--accent-cyan)', marginBottom: '0.65rem' }}>
                {mission.missionEnd.date}
              </p>
              <p className="prose-block">{mission.missionEnd.summary}</p>
            </section>

            <section id="status" className="panel detail-card">
              <h2>Current / Last Confirmed Status</h2>
              <div style={{ marginBottom: '0.85rem' }}>
                <StatusBadge
                  state={mission.currentStatus.state}
                  customLabel={mission.currentStatus.label}
                />
              </div>
              <p className="prose-block">{mission.currentStatus.explanation}</p>
            </section>
          </div>

          {/* 12. Location & Trajectory */}
          <section id="location" className="panel detail-card">
            <h2>Location &amp; Trajectory Verification</h2>
            <dl className="spec-dl" style={{ marginBottom: '1rem' }}>
              <div className="spec-row">
                <dt className="spec-label">Celestial Body / Zone</dt>
                <dd className="spec-value">{mission.location.body}</dd>
              </div>
              <div className="spec-row">
                <dt className="spec-label">Region</dt>
                <dd className="spec-value">{mission.location.region}</dd>
              </div>
              <div className="spec-row">
                <dt className="spec-label">Coordinates</dt>
                <dd className="spec-value mono" style={{ fontSize: '0.88rem' }}>
                  {mission.location.coordinates.lat !== null &&
                  mission.location.coordinates.lon !== null
                    ? `${mission.location.coordinates.lat}°, ${mission.location.coordinates.lon}°`
                    : 'Not tracked / No planetary surface coordinates'}
                </dd>
              </div>
              <div className="spec-row">
                <dt className="spec-label">Precision &amp; Reference</dt>
                <dd className="spec-value" style={{ fontSize: '0.92rem' }}>
                  {mission.location.coordinates.precision}
                  {viewMode === 'scientific' ? ` (${mission.location.coordinates.frame})` : ''}
                </dd>
              </div>
            </dl>
            <p className="prose-block" style={{ fontSize: '0.94rem' }}>
              {mission.location.trajectoryNote}
            </p>
          </section>

          {/* 13. Historical Significance & Storytelling */}
          <section id="significance" className="panel detail-card">
            <h2>Historical Significance &amp; Story</h2>
            <p className="prose-block" style={{ color: 'var(--text-primary)', fontSize: '1.03rem', marginBottom: '1.1rem' }}>
              {mission.story}
            </p>
            <div className="spec-row">
              <div className="spec-label">Enduring Legacy</div>
              <p className="prose-block" style={{ margin: 0 }}>
                {mission.historicalSignificance}
              </p>
            </div>
          </section>

          {/* 14. NASA Images & Media Gallery */}
          <section id="gallery" className="panel detail-card">
            <h2>NASA Images &amp; Media Gallery</h2>
            {activePhoto && (
              <div className="gallery-main">
                <div className="gallery-main-frame">
                  <MissionImage
                    src={activePhoto.url}
                    alt={activePhoto.alt}
                    category={mission.category}
                  />
                </div>
                <p className="gallery-caption">{activePhoto.caption}</p>
              </div>
            )}

            <div className="gallery-thumbs" role="group" aria-label="Gallery image thumbnails">
              {mission.images.map((img, idx) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`gallery-thumb ${idx === activeImageIndex ? 'gallery-thumb--active' : ''}`}
                  aria-label={`View image ${idx + 1}: ${img.alt}`}
                >
                  <MissionImage src={img.url} alt="" category={mission.category} decorative />
                </button>
              ))}
            </div>
          </section>

          {/* 15. Sources & References */}
          <section id="sources" className="panel detail-card">
            <h2>Verified Sources &amp; NSSDCA References</h2>
            <ul className="source-list">
              {mission.sources.map((src) => (
                <li key={src.url} className="source-item">
                  <div>
                    <div style={{ fontWeight: 600 }}>{src.title}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                      {src.organization}
                    </div>
                  </div>
                  <a href={src.url} target="_blank" rel="noreferrer" className="source-link">
                    <span>Open Official Record</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
