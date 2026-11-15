import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import type { TimelineEvent } from '../types/mission';

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  showMissionLinks?: boolean;
}

export default function InteractiveTimeline({
  events = [],
  showMissionLinks = false,
}: InteractiveTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!events.length) {
    return (
      <div className="panel detail-card">
        <p style={{ color: 'var(--text-muted)' }}>No documented timeline milestones available.</p>
      </div>
    );
  }

  const safeIndex = selectedIndex < events.length ? selectedIndex : 0;
  const activeEvent = events[safeIndex];

  return (
    <div className="timeline">
      <div className="timeline-track" role="tablist" aria-label="Mission milestones">
        {events.map((event, index) => {
          const isActive = index === safeIndex;
          return (
            <button
              key={`${event.date}-${event.title}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`timeline-node ${isActive ? 'timeline-node--active' : ''}`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="timeline-node-date">{event.date}</span>
              <span className="timeline-node-title">{event.title}</span>
            </button>
          );
        })}
      </div>

      <article className="panel timeline-detail" role="tabpanel" aria-live="polite">
        <div className="meta-line" style={{ marginBottom: '0.6rem', color: 'var(--accent-cyan)' }}>
          <Calendar size={14} aria-hidden="true" />
          <span className="mono">{activeEvent.date}</span>
        </div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{activeEvent.title}</h3>
        <p className="prose-block" style={{ marginBottom: showMissionLinks ? '1.25rem' : 0 }}>
          {activeEvent.description}
        </p>

        {showMissionLinks && activeEvent.missionId && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <span className="mono" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {activeEvent.missionName}
            </span>
            <Link to={`/missions/${activeEvent.missionId}`} className="btn btn-secondary">
              <span>Inspect Mission Record</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}
