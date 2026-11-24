import Lenis from 'lenis'

/** Buttery smooth wheel scrolling + smooth anchor links. Returns a cleanup function. */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  // Use native compositor-accelerated touch scrolling on phones/tablets (Android & iPhone)
  const isTouch = window.matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints > 0 && window.innerWidth <= 1024)
  if (isTouch) {
    const onTouchAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      const el = id.length > 1 && document.querySelector(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onTouchAnchor)
    return () => document.removeEventListener('click', onTouchAnchor)
  }

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
  window.__lenis = lenis

  let raf = requestAnimationFrame(function loop(t) {
    lenis.raf(t)
    raf = requestAnimationFrame(loop)
  })

  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    const el = id.length > 1 && document.querySelector(id)
    if (!el) return
    e.preventDefault()
    lenis.scrollTo(el, { duration: 1.4, force: true })
  }
  document.addEventListener('click', onClick)

  return () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('click', onClick)
    lenis.destroy()
    window.__lenis = undefined
  }
}
