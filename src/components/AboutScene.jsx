import { useRef, useState } from 'react'
import { profile, skills, projects } from '../config'
import { useScrollProgress, range } from '../hooks'
import { useLanguage } from '../LanguageContext'
import TechIcon from './TechIcon'

const deskItems = {
  monitor: { title: 'About me', text: `I'm ${profile.firstName}, a ${profile.role.toLowerCase()} based in ${profile.location}. I build websites, mobile apps, APIs and data tools.` },
  laptop: { title: 'My projects', text: `${projects.length} featured projects, from mobile logistics to machine learning. Scroll down to explore them.` },
  trophy: { title: 'Education', text: profile.education },
  mug: { title: 'Fuel', text: 'Powered by coffee, curiosity and clean code ☕' },
  plant: { title: 'Growth', text: 'Always learning: web, mobile, cloud, data science and ML.' },
}

/**
 * Pinned scene:
 *  phase 1 → portrait + skill chips stagger in over a giant "My Skills" word
 *  phase 2 → the stage lifts away and a 3D "command center" desk rises in
 * All scroll animation writes directly to the DOM for 60fps smoothness.
 */
export default function AboutScene() {
  const wrap = useRef(null)
  const stage = useRef(null)
  const ghost = useRef(null)
  const portrait = useRef(null)
  const chips = useRef([])
  const deskStage = useRef(null)
  const desk = useRef(null)
  const rot = useRef({ orbit: 0, drag: 0, startX: null, startDrag: 0 })
  const [selected, setSelected] = useState('monitor')
  const { t } = useLanguage()

  const applyDesk = () => {
    const { orbit, drag } = rot.current
    const rz = -25 + orbit * 30 + drag
    desk.current.style.transform = `rotateX(60deg) rotateZ(${rz}deg)`
    desk.current.style.setProperty('--rz', `${rz}deg`)
  }

  useScrollProgress(wrap, (p) => {
    const chipsIn = range(p, 0.02, 0.38)
    const lift = range(p, 0.44, 0.6)
    const deskIn = range(p, 0.48, 0.68)

    stage.current.style.transform = `translate3d(0, ${-lift * 100}%, 0)`
    stage.current.style.opacity = 1 - lift * 0.7
    ghost.current.style.transform = `translate(-50%, -50%) scale(${1 + chipsIn * 0.15})`

    const n = chips.current.length
    chips.current.forEach((c, i) => {
      if (!c) return
      const start = (i / n) * 0.7
      const t = range(chipsIn, start, start + 0.3)
      c.el.style.opacity = t
      c.el.style.transform = `translate3d(${(1 - t) * 50}px, 0, 0) scale(${0.92 + t * 0.08})`
      c.el.style.setProperty('--t', t.toFixed(3))
      c.num.textContent = `${Math.round(c.level * t)}%`
    })

    deskStage.current.style.transform = `translate3d(0, ${(1 - deskIn) * 100}%, 0)`
    deskStage.current.style.opacity = deskIn
    deskStage.current.style.pointerEvents = deskIn > 0.5 ? 'auto' : 'none'
    rot.current.orbit = range(p, 0.6, 1)
    applyDesk()
  })

  // Drag (mouse or finger) to rotate the desk
  const onDown = (e) => {
    rot.current.startX = e.clientX
    rot.current.startDrag = rot.current.drag
  }
  const onMove = (e) => {
    if (rot.current.startX === null) return
    rot.current.drag = Math.max(-60, Math.min(60, rot.current.startDrag + (e.clientX - rot.current.startX) * 0.3))
    applyDesk()
  }
  const onUp = () => { rot.current.startX = null }

  const info = t.about.items[selected] || deskItems[selected]

  return (
    <section id="about" ref={wrap} className="about-wrap">
      <div className="about-sticky">
        {/* ── Phase 1 ─────────────────────────── */}
        <div className="skills-stage" ref={stage}>
          <div className="ghost-word" ref={ghost} aria-hidden>
            My<br />Skills
          </div>

          {/* Empty slot: the floating photo (AvatarTraveler) lands here, seated with a laptop */}
          <div className="skills-portrait" ref={portrait}>
            <div className="skills-slot" id="avatar-slot-skills" />
          </div>

          <div className="skill-chips">
            {skills.map((s, i) => (
              <div
                key={s.name}
                className="chip"
                style={{ '--lvl': s.level, '--c': s.color }}
                ref={(el) => {
                  chips.current[i] = el ? { el, num: el.querySelector('.chip-level'), level: s.level } : null
                }}
              >
                <span className="chip-icon"><TechIcon name={s.name} size={18} /></span>
                <span className="chip-name">{s.name}</span>
                <span className="chip-level">0%</span>
                <span className="chip-bar"><span /></span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Phase 2: Command center ─────────── */}
        <div
          className="desk-stage"
          ref={deskStage}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        >
          <div className="desk-copy">
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2>{t.about.title}</h2>
            <p>{t.about.desc}</p>
            <div className="desk-info" key={selected} aria-live="polite">
              <strong>{info.title}</strong>
              <span>{info.text}</span>
            </div>
          </div>

          <div className="desk-scene">
            <div className="desk" ref={desk}>
              <div className="desk-top" />
              <div className="desk-edge" />

              <Obj id="monitor" x={42} y={22} sel={selected} set={setSelected}>
                <div className="monitor">
                  <div className="monitor-screen">
                    <img src={profile.photo} alt="" loading="lazy" />
                    <span className="rec">● LIVE</span>
                  </div>
                  <div className="monitor-neck" />
                  <div className="monitor-foot" />
                </div>
              </Obj>

              <Obj id="laptop" x={14} y={52} sel={selected} set={setSelected}>
                <div className="laptop">
                  <div className="laptop-screen">
                    <code>{'<App />'}</code>
                    <i /><i /><i />
                  </div>
                  <div className="laptop-base" />
                </div>
              </Obj>

              <Obj id="trophy" x={80} y={30} sel={selected} set={setSelected}>
                <div className="emoji-obj">🎓</div>
              </Obj>
              <Obj id="mug" x={68} y={70} sel={selected} set={setSelected}>
                <div className="emoji-obj small">☕</div>
              </Obj>
              <Obj id="plant" x={90} y={72} sel={selected} set={setSelected}>
                <div className="emoji-obj">🪴</div>
              </Obj>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Obj({ id, x, y, sel, set, children }) {
  return (
    <button
      className={`desk-obj ${sel === id ? 'sel' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => set(id)}
      aria-label={deskItems[id].title}
      aria-pressed={sel === id}
    >
      <div className="desk-obj-stand">{children}</div>
      <div className="desk-obj-shadow" />
    </button>
  )
}
