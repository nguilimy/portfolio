import { useEffect, useState } from 'react'
import { profile, showTestimonials } from '../config'
import { useTheme, useColorTheme } from '../theme'
import { Sun, Moon, Palette } from './Icons'
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
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const [mode, toggleMode] = useTheme()
  const { currentColor, setColorTheme, colorThemes } = useColorTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

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

  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest('.color-picker-wrap')) {
        setColorMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

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
          {/* Color theme palette button with dropdown */}
          <div className="color-picker-wrap">
            <button
              type="button"
              className="icon-btn color-btn"
              onClick={() => setColorMenuOpen((v) => !v)}
              aria-label={`Current color theme: ${currentColor.name}. Click to change.`}
              title={`Theme color: ${currentColor.name}`}
            >
              <span
                className="color-dot-indicator"
                style={{ background: `linear-gradient(135deg, ${currentColor.accent}, ${currentColor.accent2})` }}
              />
              <Palette />
            </button>
            {colorMenuOpen && (
              <div className="color-dropdown" role="menu">
                <div className="color-dropdown-title">Theme Colors</div>
                <div className="color-dropdown-grid">
                  {colorThemes.map((ct) => (
                    <button
                      key={ct.id}
                      type="button"
                      className={`color-dropdown-item ${currentColor.id === ct.id ? 'active' : ''}`}
                      onClick={() => {
                        setColorTheme(ct)
                        setColorMenuOpen(false)
                      }}
                      title={ct.name}
                    >
                      <span
                        className="color-swatch-circle"
                        style={{ background: `linear-gradient(135deg, ${ct.accent}, ${ct.accent2})` }}
                      />
                      <span>{ct.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
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
            type="button"
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
          <div className="mobile-theme-section">
            <span className="mobile-theme-label">Theme Colors</span>
            <div className="mobile-color-chips">
              {colorThemes.map((ct) => (
                <button
                  key={ct.id}
                  type="button"
                  className={`color-chip ${currentColor.id === ct.id ? 'active' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${ct.accent}, ${ct.accent2})` }}
                  onClick={() => setColorTheme(ct)}
                  title={ct.name}
                  aria-label={ct.name}
                >
                  {currentColor.id === ct.id && <span className="chip-check">✓</span>}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="mobile-mode-toggle btn-ghost btn-sm"
              onClick={toggleMode}
            >
              {mode === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
          </div>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <Socials />
        </div>
      </div>
    </>
  )
}
