import { forwardRef, useRef, useState } from 'react'
import { projects } from '../config'
import { useLanguage } from '../LanguageContext'
import { useMediaQuery, useScrollProgress } from '../hooks'
import { Tag } from './TechIcon'

const n = projects.length
const pad = (v) => String(v).padStart(2, '0')
const slug = (t) => t.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '')

/** Desktop: pinned horizontal gallery driven by vertical scroll. Mobile: native swipe carousel. */
export default function Projects() {
  const mobile = useMediaQuery('(max-width: 768px)')
  return mobile ? <ProjectsMobile /> : <ProjectsDesktop />
}

function ProjectsDesktop() {
  const wrap = useRef(null)
  const track = useRef(null)
  const bar = useRef(null)
  const counter = useRef(null)
  const giants = useRef([])
  const cards = useRef([])
  const { t } = useLanguage()
  const isRtl = t.dir === 'rtl'

  useScrollProgress(wrap, (p) => {
    const pos = p * (n - 1)
    const dirSign = document.documentElement.dir === 'rtl' ? 1 : -1
    track.current.style.transform = `translate3d(${dirSign * pos * 100}vw, 0, 0)`
    bar.current.style.transform = `scaleX(${p})`
    counter.current.textContent = `${pad(Math.min(n, Math.round(pos) + 1))} / ${pad(n)}`
    for (let i = 0; i < n; i++) {
      const d = (i - pos) * (document.documentElement.dir === 'rtl' ? -1 : 1)
      if (Math.abs(d) > 1.5) continue // off-screen: skip work
      giants.current[i].style.transform = `translate3d(${d * 12}vw, 0, 0)`
      const s = 1 - Math.min(1, Math.abs(d)) * 0.14
      cards.current[i].style.transform = `perspective(1200px) rotateY(${d * -22}deg) scale(${s})`
    }
  })

  return (
    <section id="projects" ref={wrap} className="projects-wrap" style={{ height: `${n * 100}vh` }}>
      <div className="projects-sticky">
        <div className="projects-label">
          <span ref={counter}>01 / {pad(n)}</span>
          <strong>{t.projects.title}</strong>
        </div>
        <div className="projects-scroll">{isRtl ? '← SCROLL' : 'SCROLL →'}</div>

        <div className="projects-track" ref={track}>
          {projects.map((pr, i) => (
            <div className="project-panel" key={pr.name}>
              <div className="project-giant-pos">
                <div className="project-giant" ref={(el) => (giants.current[i] = el)}>{pr.name}</div>
              </div>
              <ProjectCard pr={pr} i={i} ref={(el) => (cards.current[i] = el)} />
            </div>
          ))}
        </div>

        <div className="projects-progress"><span ref={bar} /></div>
      </div>
    </section>
  )
}

function ProjectsMobile() {
  const [idx, setIdx] = useState(0)
  const track = useRef(null)
  const { t } = useLanguage()

  const onScroll = () => {
    const el = track.current
    const i = Math.round(Math.abs(el.scrollLeft) / (el.scrollWidth / n))
    if (i !== idx) setIdx(Math.min(n - 1, Math.max(0, i)))
  }
  const go = (i) => {
    const el = track.current
    const sign = document.documentElement.dir === 'rtl' ? -1 : 1
    el.scrollTo({ left: sign * (el.scrollWidth / n) * i, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="section projects-mobile">
      <div className="section-head reveal">
        <span className="eyebrow">— {t.projects.title}</span>
        <h2 className="section-title grad-text">My Work</h2>
        <p className="section-sub pm-sub">
          <span>Swipe to explore →</span>
          <span className="pm-count">{pad(idx + 1)} / {pad(n)}</span>
        </p>
      </div>
      <div className="pm-track" ref={track} onScroll={onScroll}>
        {projects.map((pr, i) => (
          <div className="pm-slide" key={pr.name}>
            <div className="pm-giant" aria-hidden>{pr.name}</div>
            <ProjectCard pr={pr} i={i} />
          </div>
        ))}
      </div>
      <div className="pm-dots">
        {projects.map((pr, i) => (
          <button key={pr.name} className={i === idx ? 'on' : ''} onClick={() => go(i)} aria-label={`Go to ${pr.title}`} />
        ))}
      </div>
    </section>
  )
}

const ProjectCard = forwardRef(function ProjectCard({ pr, i }, ref) {
  return (
    <a
      ref={ref}
      href={pr.link}
      target="_blank"
      rel="noreferrer"
      className={`project-card ${i % 2 ? 'alt' : ''}`}
    >
      <div className="pc-browser" aria-hidden>
        <div className="pc-bar"><i /><i /><i /><span>{slug(pr.title)}.app</span></div>
        <div className="pc-screen">
          <div className="pc-side" />
          <div className="pc-main">
            <div className="pc-stats">
              {pr.stats.map(([label, value]) => (
                <div key={label}><small>{label}</small><b>{value}</b></div>
              ))}
            </div>
            <div className="pc-chart">
              {Array.from({ length: 12 }).map((_, k) => (
                <span key={k} style={{ height: `${25 + ((k * 37 + i * 19) % 70)}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pc-info">
        <h3>{pr.title} <span className="pc-arrow">↗</span></h3>
        <p>{pr.description}</p>
        <div className="tags">{pr.stack.map((s) => <Tag key={s} name={s} />)}</div>
      </div>
    </a>
  )
})
