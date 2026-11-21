import { useId } from 'react'
import { profile } from '../config'

/**
 * Monogram path: the H's right leg is also the A's upright, and the
 * H crossbar runs on to become the A's crossbar — one ligature.
 * Drawn on a 48×48 grid. Exported so the particle canvas can reuse it.
 */
export const MONOGRAM_PATH = 'M12 14V34 M22 14V34 M12 24H29 M22 14L36 34'

/** Gradient squircle mark with the HA ligature. */
export function LogoMark({ size = 36, animated = false, className = '' }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg
      className={`logo-mark ${animated ? 'draw' : ''} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={`${profile.firstName} ${profile.lastName} logo`}
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#g${id})`} />
      <rect x="2" y="2" width="44" height="44" rx="14" fill={`url(#s${id})`} />
      <rect x="2.5" y="2.5" width="43" height="43" rx="13.5" fill="none" stroke="#fff" strokeOpacity="0.25" />
      <path
        className="logo-mark-path"
        d={MONOGRAM_PATH}
        fill="none"
        stroke="#fff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="100"
      />
    </svg>
  )
}

/** Text logo {HA} (used in navbar & footer). */
export default function Logo({ size = 22 }) {
  return (
    <span className="logo-text" style={{ fontSize: size }} aria-label={`${profile.firstName} ${profile.lastName}`}>
      <span className="logo-brace">{'{'}</span>
      {profile.initials}
      <span className="logo-brace">{'}'}</span>
    </span>
  )
}
