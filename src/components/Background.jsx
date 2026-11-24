import { useEffect, useRef } from 'react'
import { cssVar } from '../hooks'

/** Fixed starfield + subtle grid + soft glows. Lightweight: no CSS blur filters, few stars. */
export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches
    let w = 0, h = 0, stars = [], raf = 0, rgb = '220,225,255', lastDraw = 0

    const readColor = () => { rgb = cssVar('--star') || rgb }
    const resize = () => {
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
      if (w === window.innerWidth && Math.abs(h - window.innerHeight) < 120 && stars.length) return // ignore mobile URL-bar jumps
      w = window.innerWidth
      h = window.innerHeight
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const maxStars = isMobile ? 50 : 140
      const count = Math.min(maxStars, Math.round((w * h) / (isMobile ? 18000 : 12000)))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        s: Math.random() * 0.18 + 0.04,
        o: Math.random() * Math.PI * 2,
      }))
      if (reduced) draw(0)
    }
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        if (!reduced) {
          s.y -= s.s
          if (s.y < 0) { s.y = h; s.x = Math.random() * w }
        }
        ctx.globalAlpha = 0.3 + 0.45 * Math.abs(Math.sin(t / 1400 + s.o))
        ctx.fillRect(s.x, s.y, s.r * 1.6, s.r * 1.6)
      }
      ctx.globalAlpha = 1
    }
    const loop = (t) => {
      raf = requestAnimationFrame(loop)
      if (document.hidden) return
      if (isMobile && t - lastDraw < 33) return // ~30fps cap on mobile for smooth scrolling & battery
      lastDraw = t
      ctx.fillStyle = `rgb(${rgb})`
      draw(t)
    }

    readColor()
    resize()
    ctx.fillStyle = `rgb(${rgb})`
    if (!reduced) raf = requestAnimationFrame(loop)
    const onTheme = () => { readColor(); ctx.fillStyle = `rgb(${rgb})`; if (reduced) draw(0) }
    window.addEventListener('resize', resize)
    window.addEventListener('themechange', onTheme)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('themechange', onTheme)
    }
  }, [])

  return (
    <div className="bg" aria-hidden>
      <div className="bg-grid" />
      <div className="bg-glow g1" />
      <div className="bg-glow g2" />
      <canvas ref={ref} />
    </div>
  )
}
