import type { MissionStatusState } from '../types/mission';
import { getStatusMeta } from '../utils/missionFormatters';

interface StatusBadgeProps {
  state: MissionStatusState | undefined;
  customLabel?: string;
}

export default function StatusBadge({ state, customLabel }: StatusBadgeProps) {
  const meta = getStatusMeta(state);

  return (
    <span className={`status-text ${meta.className}`}>
      <span aria-hidden="true">{meta.glyph}</span>
      <span>{customLabel || meta.label}</span>
    </span>
  );
}
