import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Mission } from '../types/mission';
import { formatCategoryLabel } from '../utils/missionFormatters';
import MissionImage from './MissionImage';
import StatusBadge from './StatusBadge';

interface MissionCardProps {
  mission: Mission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  const leadImage = mission.images?.[0];

  return (
    <article className="panel mission-card">
      <div className="mission-card-media">
        <MissionImage
          src={leadImage?.url}
          alt={leadImage?.alt || mission.name}
          category={mission.category}
        />
      </div>

      <div className="mission-card-body">
        <div className="meta-line">
          <span className="mono" style={{ color: 'var(--accent-cyan)' }}>
            {formatCategoryLabel(mission.category)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="mono">{mission.launchYear}</span>
          <span aria-hidden="true">·</span>
          <span>{mission.agency}</span>
          <span aria-hidden="true">·</span>
          <span className="mono">{mission.cosparId}</span>
        </div>

        <div>
          <h3 className="mission-card-title">{mission.name}</h3>
          <p className="mission-card-dest" style={{ marginTop: '0.3rem' }}>
            {mission.destination}
          </p>
        </div>

        <p className="mission-card-desc">{mission.shortDescription}</p>

        <div className="mission-card-footer">
          <StatusBadge state={mission.currentStatus?.state} />
          <Link to={`/missions/${mission.id}`} className="btn btn-secondary">
            <span>Open Story</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
