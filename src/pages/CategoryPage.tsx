import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryCatalog, getMissionsByCategory } from '../data';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { MissionCategory } from '../types/mission';
import MissionCard from '../components/MissionCard';

interface CategoryPageProps {
  category: MissionCategory;
}

const CATEGORY_NOTES: Record<MissionCategory, string[]> = {
  moon: [
    'Apollo Lunar Modules left descent stages on the surface while ascent stages departed.',
    'Apollo ALSEP nuclear stations ran until September 30, 1977; passive Apollo 11, 14, and 15 retroreflectors remain active targets.',
    'Surveyor 3 (1967) is the only robotic lander physically visited on another world by astronauts (Apollo 12, 1969).',
  ],
  mars: [
    'Stationary Landers (Viking 1, Phoenix, InSight) have no drive wheels and investigated single sites.',
    'Robotic Rovers (Sojourner, Spirit, Opportunity, Perseverance) drove distances ranging from ~100 m to 45.22 km.',
    'Ingenuity operated as an aerial rotorcraft companion to Perseverance, completing 72 flights before retiring in January 2024.',
  ],
  'deep-space': [
    'Pioneer 10 and Pioneer 11 are separate missions on opposite solar-system escape trajectories toward Taurus and Aquila.',
    'Dawn orbited Vesta and Ceres using xenon ion propulsion and remains in stable orbit around Ceres—it did NOT land on Ceres.',
    'NEAR Shoemaker orbited 433 Eros for a year and then executed an unplanned soft touchdown on Eros in February 2001.',
    'Kepler operated in an Earth-trailing heliocentric orbit around the Sun—not a planetary orbit.',
  ],
};

export default function CategoryPage({ category }: CategoryPageProps) {
  const info = categoryCatalog[category];
  const missions = getMissionsByCategory(category);
  const notes = CATEGORY_NOTES[category] || [];

  useDocumentTitle(info ? info.title : 'Exploration Category');

  if (!info) {
    return null;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="kicker">Museum Wing · {missions.length} Verified Exhibits</span>
          <h1 className="section-title">{info.title}</h1>
          <p style={{ color: 'var(--accent-cyan)', fontSize: '1.06rem', marginBottom: '0.6rem' }}>
            {info.subtitle}
          </p>
          <p className="section-lead">{info.description}</p>
        </div>

        <div className="panel" style={{ padding: '1.35rem 1.5rem', marginBottom: '2.25rem' }}>
          <div className="spec-label" style={{ marginBottom: '0.55rem' }}>
            Key Scientific Distinctions in This Wing
          </div>
          <ul className="bullet-list" style={{ maxWidth: 'none' }}>
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>

        <div
          className="panel"
          style={{
            padding: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Compare missions across all three realms using live search, status filters, and launch-date sorting.
          </p>
          <Link to="/explorer" className="btn btn-secondary">
            <span>Open Full Explorer</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
