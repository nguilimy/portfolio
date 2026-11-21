import Lenis from 'lenis'

/** Buttery smooth wheel scrolling + smooth anchor links. Returns a cleanup function. */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

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
