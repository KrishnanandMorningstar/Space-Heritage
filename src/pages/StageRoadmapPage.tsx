import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

interface StageRoadmapPageProps {
  moduleKey: 'maps' | '3d-viewer' | 'learn';
}

const STAGE_CONTENT = {
  maps: {
    title: 'Interactive Mission Maps',
    stage: 'Planned for Stage 4',
    summary:
      'Interactive planetary surface maps displaying verified landing coordinates for lunar and Martian missions—and documented trajectory visualizations where verified.',
    requirements: [
      'Coordinate markers for Apollo landing/ALSEP/Surveyor 3 sites and Mars lander/rover sites (Viking 1 through Perseverance).',
      'Explicit visual separation between confirmed surface coordinates, approximate zones (433 Eros), and untracked deep-space trajectories (Pioneer 10 & 11, Kepler).',
      'Clickable markers linking directly to /missions/:id detail pages.',
    ],
  },
  '3d-viewer': {
    title: '3D Spacecraft Experience',
    stage: 'Planned for Stage 4',
    summary:
      'An interactive Three.js / React Three Fiber spacecraft inspection bay supporting orbit rotation, zoom, touch gestures, and verified NASA 3D assets.',
    requirements: [
      'Lazy-loaded 3D canvas so core museum pages stay lightweight.',
      'Authentic NASA Visualization Technology / NASA 3D Resources models where available, with clear labeling for any illustrative schematic geometry.',
      'Graceful fallback images and specification summaries whenever WebGL or external .glb assets are unavailable.',
    ],
  },
  learn: {
    title: 'Educational Zone & Quizzes',
    stage: 'Planned for Stage 5',
    summary:
      'Interactive multiple-choice challenges built strictly from verified mission records—featuring instant feedback, scientific explanations, and score tracking.',
    requirements: [
      'Four-option quizzes covering lunar retroreflectors, Martian rovers, asteroid landings, and deep-space probes.',
      'Immediate answer verification with short plain-English explanations citing mission milestones.',
      'End-of-quiz summary screen with review links back to each mission detail page.',
    ],
  },
};

export default function StageRoadmapPage({ moduleKey }: StageRoadmapPageProps) {
  const data = STAGE_CONTENT[moduleKey] || STAGE_CONTENT.maps;

  useDocumentTitle(data.title);

  return (
    <section className="section">
      <div className="container">
        <div
          className="panel"
          style={{
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            maxWidth: '820px',
            margin: '0 auto',
          }}
        >
          <span className="kicker">{data.stage}</span>
          <h1 className="section-title">{data.title}</h1>
          <p className="section-lead" style={{ marginBottom: '1.5rem' }}>
            {data.summary}
          </p>

          <div className="spec-row" style={{ marginBottom: '1.75rem' }}>
            <div className="spec-label">Planned Capabilities &amp; Scientific Guardrails</div>
            <ul className="bullet-list" style={{ marginTop: '0.6rem', maxWidth: 'none' }}>
              {data.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <Link to="/explorer" className="btn btn-primary">
              <span>Explore All 16 Missions</span>
            </Link>
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Return to Museum Home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
