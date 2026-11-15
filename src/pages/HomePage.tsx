import { Link } from 'react-router-dom';
import { ArrowRight, Rocket } from 'lucide-react';
import { allMissions, categoryCatalog, heritagePreviewTimeline } from '../data';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import InteractiveTimeline from '../components/InteractiveTimeline';
import MissionCard from '../components/MissionCard';
import StatusBadge from '../components/StatusBadge';
import heroMuseumImg from '../assets/images/space_heritage_hero_1794669863112.jpg';
import moonWingImg from '../assets/images/moon_wing_banner_1794669864003.jpg';
import marsWingImg from '../assets/images/mars_wing_banner_1794669864233.jpg';
import deepSpaceWingImg from '../assets/images/deepspace_wing_banner_1794669864403.jpg';
import type { MissionCategory } from '../types/mission';

const CATEGORY_BANNERS: Record<MissionCategory, { src: string; alt: string }> = {
  moon: {
    src: moonWingImg,
    alt: 'Lunar Roving Vehicle and ALSEP scientific station on lunar regolith',
  },
  mars: {
    src: marsWingImg,
    alt: 'Six-wheeled Mars exploration rover beside layered crater rim strata',
  },
  'deep-space': {
    src: deepSpaceWingImg,
    alt: 'Deep-space parabolic antenna probe and solar-ion asteroid explorer near a cratered body',
  },
};

export default function HomePage() {
  useDocumentTitle('Home');

  const spotlightMission = allMissions.find((m) => m.id === 'apollo-11-lm') || allMissions[0];
  const featuredIds = ['apollo-11-lm', 'perseverance-ingenuity', 'near-shoemaker'];
  const featuredMissions = featuredIds
    .map((id) => allMissions.find((m) => m.id === id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="kicker">Digital Space Museum · NASA Space Apps Challenge 2026</span>
              <h1 className="hero-title">SPACE HERITAGE</h1>
              <p className="hero-tagline">Every Mission Leaves a Story.</p>
              <p className="hero-description">
                Across the Moon, Mars, and deep space rest historic landers, rovers, scientific instruments, and distant probes. Discover why they launched, what they uncovered, and where these silent explorers stand today.
              </p>
              <div className="hero-actions">
                <Link to="/explorer" className="btn btn-primary">
                  <Rocket size={17} aria-hidden="true" />
                  <span>Explore Missions</span>
                </Link>
                <Link to={`/missions/${spotlightMission.id}`} className="btn btn-secondary">
                  <span>Inspect Tranquility Base</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className="panel hero-spotlight" aria-label="Curated exhibition artifact">
              <div className="meta-line" style={{ justifyContent: 'space-between' }}>
                <span className="mono" style={{ color: 'var(--accent-cyan)' }}>
                  Curated Exhibit · {spotlightMission.cosparId}
                </span>
                <StatusBadge state={spotlightMission.currentStatus?.state} />
              </div>

              <div className="hero-spotlight-media">
                <img
                  src={heroMuseumImg}
                  alt="Apollo 11 Lunar Module Eagle descent stage and passive retroreflector prism on Mare Tranquillitatis"
                />
              </div>

              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  {spotlightMission.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0 }}>
                  {spotlightMission.shortDescription}
                </p>
              </div>
            </aside>
          </div>

          <div className="hero-kpi-strip" aria-label="Museum catalog summary">
            <div className="kpi-item">
              <span className="kpi-value">{allMissions.length}</span>
              <span className="kpi-label">Verified Spacecraft &amp; Instrument Records</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">3</span>
              <span className="kpi-label">Exploration Wings (Moon, Mars, Deep Space)</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">1967–2026</span>
              <span className="kpi-label">Documented Exploration Span</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">NSSDCA</span>
              <span className="kpi-label">Direct Archive Citations on Every Page</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Major Exploration Categories */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Museum Wings</span>
            <h2 className="section-title">Three Realms of Space Heritage</h2>
            <p className="section-lead">
              Each exhibition wing carefully distinguishes surface hardware, orbiting probes, heliocentric observatories, and spacecraft cruising beyond the planets.
            </p>
          </div>

          <div className="grid-3">
            {Object.values(categoryCatalog).map((cat) => {
              const banner = CATEGORY_BANNERS[cat.id];
              const count = allMissions.filter((m) => m.category === cat.id).length;

              return (
                <article key={cat.id} className="panel category-card">
                  <div className="category-card-media">
                    <img src={banner.src} alt={banner.alt} loading="lazy" />
                  </div>
                  <div className="category-card-body">
                    <div>
                      <div className="meta-line" style={{ marginBottom: '0.5rem' }}>
                        <span className="mono" style={{ color: 'var(--accent-cyan)' }}>
                          {count} Verified {count === 1 ? 'Record' : 'Records'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>{cat.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                        {cat.subtitle}
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem' }}>
                        {cat.description}
                      </p>
                    </div>

                    <Link to={cat.route} className="btn btn-secondary" style={{ width: '100%' }}>
                      <span>Enter {cat.title}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Featured Missions */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <div>
              <span className="kicker">Curated Exhibits</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Featured Missions
              </h2>
            </div>
            <Link to="/explorer" className="btn btn-ghost">
              <span>Browse All {allMissions.length} Missions</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid-3">
            {featuredMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Mission Timeline Preview */}
      <section className="section" aria-labelledby="timeline-preview-heading">
        <div className="container">
          <div className="section-header">
            <span className="kicker">Chronicles Across Decades</span>
            <h2 id="timeline-preview-heading" className="section-title">
              Interactive Heritage Timeline
            </h2>
            <p className="section-lead">
              Select a milestone to inspect documented moments when robotic and crewed spacecraft transformed planetary science.
            </p>
          </div>

          <InteractiveTimeline events={heritagePreviewTimeline} showMissionLinks />
        </div>
      </section>

      {/* 5. Why Abandoned & Retired Spacecraft Matter */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="panel" style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            <div className="section-header" style={{ marginBottom: '1.75rem' }}>
              <span className="kicker">Scientific &amp; Cultural Preservation</span>
              <h2 className="section-title">Why Retired Spacecraft Matter</h2>
              <p className="section-lead">
                Once communications end, spacecraft remain priceless scientific archives, environmental benchmarks, and milestones of human ingenuity.
              </p>
            </div>

            <div className="grid-3">
              <div className="instrument-item">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem' }}>
                  Active Science Without Power
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                  Unpowered optical retroreflectors left by Apollos 11, 14, and 15 continue bouncing Earth laser pulses back for millimeter-scale lunar measurements.
                </p>
              </div>
              <div className="instrument-item">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem' }}>
                  Long-Term Exposure Laboratories
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                  When Apollo 12 astronauts retrieved Surveyor 3&rsquo;s camera after 31 months on the Moon, engineers gained irreplaceable data on regolith dust and space weathering.
                </p>
              </div>
              <div className="instrument-item">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.45rem' }}>
                  Preserving Off-World Heritage
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                  Sites from Tranquility Base to Meridiani Planum and 433 Eros record humanity&rsquo;s first footsteps and wheel tracks across the solar system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Educational Discovery Section */}
      <section className="section" style={{ paddingTop: '0.5rem' }}>
        <div className="container">
          <div
            className="panel"
            style={{
              padding: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span className="kicker">Students &amp; Curious Minds</span>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Two Learning Levels Inside Every Mission
              </h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                Switch seamlessly between a plain-English Quick Overview and a Detailed Scientific View featuring COSPAR IDs, instrument payloads, verified coordinates, and NSSDCA references.
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              <Link to="/explorer" className="btn btn-primary">
                <span>Browse All 16 Missions</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/learn" className="btn btn-secondary">
                <span>View Quiz Roadmap</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
