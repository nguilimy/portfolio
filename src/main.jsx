import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { theme } from './config'
import 'lenis/dist/lenis.css'
import './index.css'

// Apply the theme colours from localStorage (or fallback to config.js)
const root = document.documentElement
try {
  const saved = localStorage.getItem('portfolio-color-theme')
  if (saved) {
    const parsed = JSON.parse(saved)
    if (parsed?.accent && parsed?.accent2) {
      root.style.setProperty('--accent', parsed.accent)
      root.style.setProperty('--accent-2', parsed.accent2)
    } else {
      root.style.setProperty('--accent', theme.accent)
      root.style.setProperty('--accent-2', theme.accent2)
    }
  } else {
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--accent-2', theme.accent2)
  }
} catch {
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-2', theme.accent2)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
