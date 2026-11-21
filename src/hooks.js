import { useEffect, useRef, useState } from 'react'

export const clamp01 = (v) => Math.min(1, Math.max(0, v))
/** Remap p from [a,b] to [0,1] */
export const range = (p, a, b) => clamp01((p - a) / (b - a))

/**
 * Calls onUpdate(progress 0→1) while a tall section scrolls past its sticky child.
 * Updates happen in requestAnimationFrame and never trigger a React re-render,
 * so the callback should write styles directly to DOM refs.
 */
export function useScrollProgress(ref, onUpdate) {
  const cb = useRef(onUpdate)
  cb.current = onUpdate

  useEffect(() => {
    let raf = 0
    let last = -1
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? clamp01(-r.top / total) : 0
      if (p !== last) {
        last = p
        cb.current(p)
      }
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    const force = () => { last = -1; schedule() }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', force)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', force)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

/** Live media-query match, e.g. useMediaQuery('(max-width: 768px)') */
export function useMediaQuery(query) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return match
}

/** Adds `.in` to elements with `.reveal` when they enter the viewport (once). */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Read a CSS custom property from <html> */
export const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

/** '#8b5cf6' → [139, 92, 246] (falls back to violet) */
export function hexToRgb(hex) {
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex.trim())
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [139, 92, 246]
}
