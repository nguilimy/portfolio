import { useEffect, useState } from 'react'
import { profile } from '../config'
import { LogoMark } from './Logo'

const DURATION = 1700

export default function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), DURATION)
    const t2 = setTimeout(onDone, DURATION + 600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div className={`loader-screen ${leaving ? 'leaving' : ''}`} role="status" aria-label="Loading">
      <div className="loader-brand">
        <LogoMark size={88} animated className="loader-mark" />
        <div className="loader-divider" />
        <div>
          <div className="loader loader-name">
            {profile.firstName} {profile.lastName}
          </div>
          <div className="loader-sub">{profile.title}</div>
        </div>
      </div>
      {/* Pure-CSS progress bar: no per-frame React renders */}
      <div className="loader-bar"><div style={{ animationDuration: `${DURATION}ms` }} /></div>
    </div>
  )
}
