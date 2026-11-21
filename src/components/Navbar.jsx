import { useEffect, useState } from 'react'
import { profile, showTestimonials } from '../config'
import { useTheme } from '../theme'
import { Sun, Moon } from './Icons'
import Logo from './Logo'
import Socials from './Socials'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['testimonials', 'Testimonials'],
  ['contact', 'Contact'],
].filter(([id]) => showTestimonials || id !== 'testimonials')

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mode, toggleMode] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20) // React skips re-render if unchanged
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Highlight the section crossing the middle of the screen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -54% 0px' }
    )
    ;['home', ...links.map(([id]) => id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => {
    window.__lenis?.start()
    setOpen(false)
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={close}>
          <Logo size={24} />
        </a>
        <nav className="nav-links" aria-label="Main">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button
            className="icon-btn theme-btn"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className={`theme-icon ${mode}`}>
              <Sun />
              <Moon />
            </span>
          </button>
          <a href="#contact" className="btn-gradient btn-sm nav-cta">Let's Talk</a>
          <button
            className={`nav-burger ${open ? 'open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav>
          {links.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={close}
              className={active === id ? 'active' : ''}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}
              tabIndex={open ? 0 : -1}
            >
              <small>0{i + 1}</small>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <Socials />
        </div>
      </div>
    </>
  )
}
