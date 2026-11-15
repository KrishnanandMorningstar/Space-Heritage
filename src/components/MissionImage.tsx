import { useState } from 'react';
import type { MissionCategory } from '../types/mission';
import moonFallbackImg from '../assets/images/moon_wing_banner_1794669864003.jpg';
import marsFallbackImg from '../assets/images/mars_wing_banner_1794669864233.jpg';
import deepSpaceFallbackImg from '../assets/images/deepspace_wing_banner_1794669864403.jpg';

const CATEGORY_FALLBACKS: Record<MissionCategory, string> = {
  moon: moonFallbackImg,
  mars: marsFallbackImg,
  'deep-space': deepSpaceFallbackImg,
};

interface MissionImageProps {
  src?: string;
  alt: string;
  category?: MissionCategory;
  className?: string;
  eager?: boolean;
  decorative?: boolean;
}

export default function MissionImage({
  src,
  alt,
  category = 'deep-space',
  className = '',
  eager = false,
  decorative = false,
}: MissionImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const fallbackSrc = CATEGORY_FALLBACKS[category] || deepSpaceFallbackImg;
  const usingFallback = !src || failedSrc === src;
  const activeSrc = usingFallback ? fallbackSrc : src;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={activeSrc}
        alt={decorative ? '' : alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => {
          if (src && failedSrc !== src) {
            setFailedSrc(src);
          }
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {usingFallback && !decorative && (
        <span
          className="mono"
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.5rem',
            padding: '0.2rem 0.5rem',
            fontSize: '0.7rem',
            color: '#cbd5e1',
            background: 'rgba(7, 9, 14, 0.82)',
            border: '1px solid #1e293b',
            borderRadius: '4px',
          }}
        >
          Illustrative archive plate (official NASA link in Sources)
        </span>
      )}
    </div>
  );
}
