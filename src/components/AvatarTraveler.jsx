import { useEffect, useRef } from 'react'
import { profile } from '../config'
import { clamp01, range } from '../hooks'
import { LogoMark } from './Logo'

const lerp = (a, b, t) => a + (b - a) * t
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/**
 * Your photo, floating above the page. It sits in the hero slot, and as you scroll
 * it glides down into the skills-scene slot, changing from the standing photo
 * to the seated one with a laptop sliding onto your lap, like the avatar in the video.
 * The two slots (#avatar-slot-hero, #avatar-slot-skills) are empty placeholders
 * that only give the position and size.
 */
export default function AvatarTraveler() {
  const el = useRef(null)
  const stand = useRef(null)
  const sit = useRef(null)
  const laptop = useRef(null)
  const glow = useRef(null)
  const caption = useRef(null)
  const ring = useRef(null)
  const cardBg = useRef(null)
  const shine = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const A = document.getElementById('avatar-slot-hero')
      const B = document.getElementById('avatar-slot-skills')
      const about = document.getElementById('about')
      if (!A || !B || !about || !el.current) return
      const a = A.getBoundingClientRect()
      const b = B.getBoundingClientRect()
      const raw = clamp01(window.scrollY / Math.max(1, about.offsetTop))
      const t = ease(raw)
      const s = range(raw, 0.35, 0.85) // standing → seated

      const x = lerp(a.left, b.left, t)
      const y = lerp(a.top, b.top, t)
      const w = lerp(a.width, b.width, t)
      const h = lerp(a.height, b.height, t)
      const rBottom = Math.min(28, w * 0.08)
      const rTop = lerp(w / 2, rBottom, s)

      const st = el.current.style
      const isVisible = y + h > -40 && y < window.innerHeight + 40
      st.visibility = isVisible ? 'visible' : 'hidden'
      if (!isVisible) return

      st.transform = `translate3d(${x}px, ${y}px, 0)`
      st.width = `${w}px`
      st.height = `${h}px`
      st.borderRadius = `${rTop}px ${rTop}px ${rBottom}px ${rBottom}px`
      st.setProperty('--float', (1 - raw).toFixed(3))

      stand.current.style.opacity = 1 - s
      sit.current.style.opacity = s
      laptop.current.style.opacity = range(s, 0.3, 1)
      laptop.current.style.transform = `translate3d(-50%, ${(1 - s) * 70}%, 0) scale(${0.85 + 0.15 * s})`
      glow.current.style.opacity = range(s, 0.5, 1) * 0.5
      caption.current.style.opacity = range(raw, 0.92, 1)

      // The frame, card background, and ring are 0% in Hero (completely frameless)
      // and only fade in when morphing into the seated card in skills scene
      if (ring.current) ring.current.style.opacity = s
      if (cardBg.current) cardBg.current.style.opacity = s
      if (shine.current) shine.current.style.opacity = s
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    const settle = setInterval(update, 120)
    const stopSettle = setTimeout(() => clearInterval(settle), 2500)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    // Reposition immediately on any layout shift (e.g. language switch changes text width/direction)
    const ro = new ResizeObserver(schedule)
    const slotA = document.getElementById('avatar-slot-hero')
    const slotB = document.getElementById('avatar-slot-skills')
    if (slotA) ro.observe(slotA)
    if (slotB) ro.observe(slotB)
    // Also watch the hero section itself for size/position changes
    const heroEl = document.getElementById('home')
    if (heroEl) ro.observe(heroEl)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(settle)
      clearTimeout(stopSettle)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="traveler" ref={el} aria-hidden>
      <div className="traveler-inner">
        <div ref={ring} className="portrait-ring" />
        <div className="traveler-clip">
          <div ref={cardBg} className="traveler-card-bg" />
          <img ref={stand} className="tv-stand" src={profile.photoStanding} alt="" fetchpriority="high" />
          <img ref={sit} className="tv-sit" src={profile.photo} alt="" />
          <div ref={glow} className="tv-glow" />
          <div ref={shine} className="portrait-shine" />
        </div>

        {/* Laptop */}
        <div ref={laptop} className="tv-laptop">
          <div className="tv-lid">
            <LogoMark size={28} />
          </div>
          <div className="tv-base" />
        </div>

        <div ref={caption} className="tv-caption">
          <span className="dot" /> {profile.title}
        </div>
      </div>
    </div>
  )
}
