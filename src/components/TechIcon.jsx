import { logoFor } from '../logos'

/** Real brand logo for a technology name; falls back to a lettered badge when no logo exists. */
export default function TechIcon({ name, size = 20, className = '' }) {
  const logo = logoFor(name)
  if (!logo) {
    const letters = name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2)
    return (
      <span className={`tech-fallback ${className}`} style={{ width: size, height: size, fontSize: size * 0.42 }} aria-hidden>
        {letters}
      </span>
    )
  }
  return (
    <img
      src={logo.src}
      alt=""
      aria-hidden
      width={size}
      height={size}
      loading="lazy"
      draggable="false"
      className={`tech-logo ${logo.mono ? 'mono' : ''} ${className}`}
    />
  )
}

/** Pill tag with a tiny logo. */
export function Tag({ name }) {
  return (
    <span className="tag">
      <TechIcon name={name} size={14} />
      {name}
    </span>
  )
}
