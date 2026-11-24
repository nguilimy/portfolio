import { useEffect, useState } from 'react'

export const colorThemes = [
  { id: 'emerald', name: 'Emerald', accent: '#10b981', accent2: '#38bdf8' },
  { id: 'violet', name: 'Violet', accent: '#8b5cf6', accent2: '#ec4899' },
  { id: 'orange', name: 'Orange', accent: '#f97316', accent2: '#f59e0b' },
  { id: 'blue', name: 'Blue', accent: '#3b82f6', accent2: '#6366f1' },
  { id: 'red', name: 'Red', accent: '#ef4444', accent2: '#f43f5e' },
  { id: 'teal', name: 'Teal', accent: '#14b8a6', accent2: '#84cc16' },
]

/** Dark / light mode, remembered in localStorage. Initial value is set by a script in index.html. */
export function useTheme() {
  const [mode, setMode] = useState(() => document.documentElement.dataset.theme || 'dark')

  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.theme === mode) return
    root.classList.add('theme-switching')
    root.dataset.theme = mode
    try { localStorage.setItem('theme', mode) } catch { /* private mode */ }
    window.dispatchEvent(new Event('themechange'))
    const t = setTimeout(() => root.classList.remove('theme-switching'), 450)
    return () => clearTimeout(t)
  }, [mode])

  return [mode, () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))]
}

/** Theme accent color palettes, remembered in localStorage. */
export function useColorTheme() {
  const [currentColor, setCurrentColor] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-color-theme')
      if (saved) {
        const parsed = JSON.parse(saved)
        const match = colorThemes.find((t) => t.id === parsed.id)
        if (match) return match
      }
    } catch {}
    return colorThemes[0]
  })

  const setColorTheme = (themeObj) => {
    setCurrentColor(themeObj)
    const root = document.documentElement
    root.style.setProperty('--accent', themeObj.accent)
    root.style.setProperty('--accent-2', themeObj.accent2)
    try {
      localStorage.setItem('portfolio-color-theme', JSON.stringify(themeObj))
    } catch {}
    window.dispatchEvent(new Event('themechange'))
  }

  const cycleColorTheme = () => {
    const idx = colorThemes.findIndex((c) => c.id === currentColor.id)
    const next = colorThemes[(idx + 1) % colorThemes.length]
    setColorTheme(next)
  }

  return { currentColor, setColorTheme, cycleColorTheme, colorThemes }
}
