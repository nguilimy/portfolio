import { useId } from 'react'

// Hand-drawn line icons, stroked with the theme gradient.
const paths = {
  mobile: (
    <>
      <rect x="15" y="6" width="18" height="36" rx="4.5" />
      <path d="M21 10.5h6" />
      <circle cx="24" cy="36.5" r="1.4" />
      <path d="M20 19l-3 3.5 3 3.5M28 19l3 3.5-3 3.5" />
    </>
  ),
  server: (
    <>
      <rect x="8" y="8" width="32" height="11" rx="3.5" />
      <rect x="8" y="23" width="32" height="11" rx="3.5" />
      <path d="M14 13.5h.01M14 28.5h.01M20 13.5h6M20 28.5h6M24 34v6M16 40h16" />
    </>
  ),
  data: (
    <>
      <path d="M8 40h32" />
      <path d="M12 34l8-9 6 5 10-13" />
      <circle cx="36" cy="17" r="2.6" />
      <path d="M12 8v26M17 12h.01" />
    </>
  ),
  cloud: (
    <>
      <path d="M14 34a8 8 0 0 1-.6-16A11 11 0 0 1 34.6 16.6 8.7 8.7 0 0 1 34 34Z" />
      <path d="M24 39V25m0 0-5 5m5-5 5 5" />
    </>
  ),
}

export default function FeatureIcon({ type, size = 26 }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={`url(#fi${id})`} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <defs>
        <linearGradient id={`fi${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
      </defs>
      {paths[type] || paths.server}
    </svg>
  )
}
