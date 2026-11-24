import { expertise } from '../config'
import { logoFor } from '../logos'
import { useLanguage } from '../LanguageContext'
import FeatureIcon from './FeatureIcon'
import TechIcon, { Tag } from './TechIcon'

export default function Expertise() {
  const { t } = useLanguage()
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section id="skills" className="section">
      <div className="section-head reveal">
        <span className="eyebrow">{t.skills.eyebrow}</span>
        <h2 className="section-title grad-text">{t.skills.title}</h2>
        <p className="section-sub">{t.skills.sub}</p>
      </div>

      <div className="bento">
        {expertise.map((e, i) => (
          <article key={e.title} className={`bento-card ${e.size} reveal d${i + 1}`} onMouseMove={onMove}>
            <div className="bento-top">
              <div className="bento-icon"><FeatureIcon type={e.icon} /></div>
              <div className="logo-stack" aria-hidden>
                {e.tags.filter((t) => logoFor(t)).slice(0, 4).map((t) => (
                  <span key={t} title={t}><TechIcon name={t} size={20} /></span>
                ))}
              </div>
            </div>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            {e.size === 'wide' && (
              <div className="mini-window" aria-hidden>
                <div className="mw-bar"><i /><i /><i /></div>
                <div className="mw-body"><span /><span /><span className="short" /><span /></div>
              </div>
            )}
            {e.size === 'tall' && (
              <div className="mini-graph" aria-hidden>
                {Array.from({ length: 5 }).map((_, k) => <span key={k} style={{ animationDelay: `${k * 0.3}s` }} />)}
              </div>
            )}
            <div className="tags">
              {e.tags.map((t) => <Tag key={t} name={t} />)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
