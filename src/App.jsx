import { useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutScene from './components/AboutScene'
import Expertise from './components/Expertise'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import AvatarTraveler from './components/AvatarTraveler'
import { useReveal } from './hooks'
import { initSmoothScroll } from './smooth'

function Site() {
  useReveal()
  useEffect(() => initSmoothScroll(), [])
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutScene />
        <Expertise />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <AvatarTraveler />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])
  return (
    <>
      <Background />
      {loading ? <Loader onDone={done} /> : <Site />}
    </>
  )
}
