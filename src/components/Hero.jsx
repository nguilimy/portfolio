import { useRef } from 'react'
import { profile } from '../config'
import { useLanguage } from '../LanguageContext'
import Socials from './Socials'
import TechIcon from './TechIcon'
import { logoFor } from '../logos'

// Floating tech logos around the portrait
// Positions orbit the vertical center of the stage (~50% y)
const floaters = [
  { n: 'React',      x: -8,  y: 22, d: 0,   z: 14 },
  { n: 'Python',     x: 92,  y: 18, d: 1.2, z: 22 },
  { n: 'TypeScript', x: 100, y: 48, d: 0.6, z: 18 },
  { n: 'Node.js',    x: -14, y: 52, d: 1.8, z: 26 },
  { n: 'Firebase',   x: 90,  y: 76, d: 2.4, z: 12 },
  { n: 'MongoDB',    x: -6,  y: 78, d: 0.9, z: 20 },
  { n: 'Docker',     x: 42,  y: -6, d: 1.5, z: 16 },
]

export default function Hero() {
  const stage = useRef(null)
  const raf = useRef(0)
  const { t } = useLanguage()

  // Mouse parallax — written straight to the DOM (no React re-render)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const { clientX, clientY } = e
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = stage.current.getBoundingClientRect()
      const x = ((clientX - r.left) / r.width - 0.5) * 2
      const y = ((clientY - r.top) / r.height - 0.5) * 2
      stage.current.style.setProperty('--mx', x.toFixed(3))
      stage.current.style.setProperty('--my', y.toFixed(3))
      document.documentElement.style.setProperty('--tilt-x', x.toFixed(3))
      document.documentElement.style.setProperty('--tilt-y', y.toFixed(3))
    })
  }
  const onLeave = () => {
    cancelAnimationFrame(raf.current)
    stage.current.style.setProperty('--mx', 0)
    stage.current.style.setProperty('--my', 0)
    document.documentElement.style.setProperty('--tilt-x', 0)
    document.documentElement.style.setProperty('--tilt-y', 0)
  }

  return (
    <section id="home" className="hero" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="hero-text">
        <div className="pill reveal">
          <span className="dot" /> {t.hero.status}
        </div>
        <h1 className="hero-name reveal d1">
          {profile.firstName}
          <br />
          <span className="grad-text">{profile.lastName}</span>
        </h1>
        <div className="hero-role reveal d2">
          <span className="line" /> {t.hero.role}
        </div>
        <p className="hero-tagline reveal d3">{t.hero.tagline}</p>
        <div className="hero-cta reveal d4">
          <a href="#projects" className="btn-gradient">{t.hero.viewProjects}</a>
          {profile.cv ? (
            <a href={profile.cv} className="btn-ghost" download>{t.hero.cv}</a>
          ) : (
            <a href="#contact" className="btn-ghost">{t.hero.contactMe}</a>
          )}
        </div>
        <Socials className="reveal d5" />
      </div>

      <div className="hero-stage" ref={stage}>
        {/* Empty slot: the floating photo (AvatarTraveler) is positioned here */}
        <div className="hero-portrait-wrap">
          <div className="hero-portrait" id="avatar-slot-hero" role="img" aria-label={`${profile.firstName} ${profile.lastName}`} />
        </div>
        {floaters.map((f) => (
          <span
            key={f.n}
            className={`floater ${f.n === 'React' ? 'spin' : ''}`}
            style={{ left: `${f.x}%`, top: `${f.y}%`, animationDelay: `${f.d}s`, '--z': f.z, '--glow': logoFor(f.n)?.glow }}
            title={f.n}
          >
            <TechIcon name={f.n} size={28} />
          </span>
        ))}
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}
