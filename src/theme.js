import { useEffect, useState } from 'react'

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
