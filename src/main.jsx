import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { theme } from './config'
import 'lenis/dist/lenis.css'
import './index.css'

// Apply the theme colours from config.js to the whole site
const root = document.documentElement
root.style.setProperty('--accent', theme.accent)
root.style.setProperty('--accent-2', theme.accent2)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
