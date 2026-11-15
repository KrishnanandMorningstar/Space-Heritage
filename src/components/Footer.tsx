import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const ARCHIVE_REFERENCES = [
  {
    label: 'NSSDCA: Apollo 11 LM / EASEP (1969-059C)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
  },
  {
    label: 'NSSDCA: Surveyor 3 (1967-035A)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A',
  },
  {
    label: 'NSSDCA: Viking 1 Lander (1975-075C)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1975-075C',
  },
  {
    label: 'NSSDCA: Opportunity / MER-B (2003-032A)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-032A',
  },
  {
    label: 'NSSDCA: Dawn (2007-043A)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2007-043A',
  },
  {
    label: 'NSSDCA: Kepler Space Telescope (2009-011A)',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2009-011A',
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: '0.75rem' }}>
              SPACE HERITAGE
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '34ch' }}>
              Every Mission Leaves a Story. An educational digital space museum preserving verified stories of spacecraft across the Moon, Mars, and deep space.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Exhibitions</h2>
            <ul className="footer-links">
              <li><Link to="/explorer">Mission Explorer (16 Records)</Link></li>
              <li><Link to="/moon">Moon Exploration (4)</Link></li>
              <li><Link to="/mars">Mars Exploration (7)</Link></li>
              <li><Link to="/deep-space">Deep Space Exploration (5)</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Interactive Modules</h2>
            <ul className="footer-links">
              <li><Link to="/maps">Mission Maps (Stage 4)</Link></li>
              <li><Link to="/3d-viewer">3D Spacecraft Viewer (Stage 4)</Link></li>
              <li><Link to="/learn">Educational Quiz Zone (Stage 5)</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Direct NSSDCA Mission Citations</h2>
            <ul className="footer-links">
              {ARCHIVE_REFERENCES.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>{ref.label}</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>SPACE HERITAGE — NASA Space Apps Challenge 2026</span>
          <span>Records verified against NASA NSSDCA, NASA Science, JPL, PDS &amp; Johns Hopkins APL.</span>
        </div>
      </div>
    </footer>
  );
}
