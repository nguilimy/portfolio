import { useEffect, useRef, useState } from 'react'
import { profile, testimonials } from '../config'
import { cssVar, hexToRgb } from '../hooks'

const bubblePos = [
  { x: 4, y: 18 }, { x: 88, y: 10 }, { x: 2, y: 70 },
  { x: 36, y: 72 }, { x: 54, y: 62 }, { x: 24, y: 86 },
]

/**
 * Pixel-particle monogram that scatters away from the cursor/finger,
 * with floating client avatars. Only animates while on screen.
 */
export default function Testimonials() {
  const canvasRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    let w = 0, h = 0, pts = [], raf = 0, visible = false, first = true
    const mouse = { x: -9999, y: -9999 }

    const build = () => {
      const cw = c.clientWidth, ch = c.clientHeight
      if (!cw || !ch) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = cw; h = ch
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // draw the monogram off-screen, then sample it into a dot grid
      const off = document.createElement('canvas')
      off.width = w; off.height = h
      const o = off.getContext('2d', { willReadFrequently: true })
      // The {HA} text logo, as large as fits
      const label = `{${profile.initials}}`
      let fs = h * 0.75
      o.font = `800 ${fs}px Syne, Inter, sans-serif`
      const tw = o.measureText(label).width
      if (tw > w * 0.92) {
        fs *= (w * 0.92) / tw
        o.font = `800 ${fs}px Syne, Inter, sans-serif`
      }
      o.textAlign = 'center'
      o.textBaseline = 'middle'
      o.fillText(label, w / 2, h / 2)
      const data = o.getImageData(0, 0, w, h).data
      const gap = Math.max(w < 600 ? 6 : 5, Math.round(w / 170))

      const a = hexToRgb(cssVar('--accent'))
      const b = hexToRgb(cssVar('--accent-2'))
      pts = []
      for (let y = 0; y < h; y += gap)
        for (let x = 0; x < w; x += gap)
          if (data[(y * w + x) * 4 + 3] > 128) {
            const k = x / w, j = 0.85 + Math.random() * 0.3
            const col = a.map((v, n) => Math.min(255, Math.round((v + (b[n] - v) * k) * j)))
            pts.push({
              ox: x, oy: y,
              x: first ? x + (Math.random() - 0.5) * w : x,
              y: first ? y + (Math.random() - 0.5) * h : y,
              vx: 0, vy: 0, s: gap * 0.78, col: `rgb(${col})`,
            })
          }
      first = false
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 8100) {
          const dist = Math.sqrt(d2) || 1
          const f = ((90 - dist) / 90) * 4
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }
        p.vx = (p.vx + (p.ox - p.x) * 0.05) * 0.82
        p.vy = (p.vy + (p.oy - p.y) * 0.05) * 0.82
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = p.col
        ctx.fillRect(p.x, p.y, p.s, p.s)
      }
      raf = visible ? requestAnimationFrame(draw) : 0
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(draw)
    })
    io.observe(c)

    let lastW = 0
    const ro = new ResizeObserver(() => {
      if (c.clientWidth === lastW) return // ignore height-only changes (mobile URL bar)
      lastW = c.clientWidth
      build()
    })
    ro.observe(c)

    const onMove = (e) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }
    const onTheme = () => build()

    document.fonts?.ready.then(build) // rebuild once the display font has loaded
    c.addEventListener('pointermove', onMove)
    c.addEventListener('pointerdown', onMove)
    c.addEventListener('pointerleave', onLeave)
    c.addEventListener('pointerup', (e) => e.pointerType !== 'mouse' && onLeave())
    window.addEventListener('themechange', onTheme)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      c.removeEventListener('pointermove', onMove)
      c.removeEventListener('pointerdown', onMove)
      c.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('themechange', onTheme)
    }
  }, [])

  const t = testimonials[active]

  return (
    <section id="testimonials" className="section testimonials">
      <div className="section-head reveal">
        <span className="eyebrow">— Testimonials</span>
        <h2 className="section-title grad-text">What Clients Say</h2>
        <p className="section-sub">Feedback from people I've had the pleasure of working with.</p>
      </div>

      <div className="t-stage">
        <canvas ref={canvasRef} className="t-canvas" />
        {testimonials.map((tm, i) => {
          const pos = bubblePos[i % bubblePos.length]
          return (
            <button
              key={i}
              className={`t-bubble ${i === active ? 'on' : ''}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, background: tm.color, animationDelay: `${i * -1.4}s` }}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`Show testimonial from ${tm.name}`}
            >
              {tm.initials}
            </button>
          )
        })}
      </div>

      <figure className="t-quote" key={active}>
        <blockquote>“{t.quote}”</blockquote>
        <figcaption>
          <span className="t-avatar" style={{ background: t.color }}>{t.initials}</span>
          <span><strong>{t.name}</strong><small>{t.role}</small></span>
        </figcaption>
      </figure>
    </section>
  )
}
