import { useState } from 'react'
import { profile, contactForm } from '../config'
import { Mail } from './Icons'
import Socials from './Socials'

const empty = { name: '', email: '', message: '', botcheck: false }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (form.botcheck) return // hidden field: only bots tick it

    // No key yet → open the visitor's email app instead
    if (!contactForm.web3formsKey) {
      const body = `${form.message}\n\n— ${form.name} (${form.email})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${form.name}`)}&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contactForm.web3formsKey,
          subject: `New portfolio message from ${form.name}`,
          from_name: 'Portfolio contact form',
          name: form.name,
          email: form.email,
          replyto: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      setStatus('sent')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  const label = { idle: 'Send Message →', sending: 'Sending…', sent: 'Message sent ✓', error: 'Try again →' }[status]

  return (
    <section id="contact" className="section contact">
      <span className="eyebrow reveal">— Contact</span>
      <h2 className="contact-title reveal d1">
        Let's build
        <br />
        <span className="grad-text">something great.</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-left reveal d2">
          <p>Have a project in mind or just want to say hi? My inbox is always open. I'll get back to you within 24 hours.</p>
          <a className="contact-mail" href={`mailto:${profile.email}`}><Mail /> {profile.email}</a>
          <p className="contact-loc">📍 {profile.location}</p>
          <Socials />
          {profile.cv && (
            <a className="btn-ghost contact-cv" href={profile.cv} download>⬇ Download my CV</a>
          )}
        </div>

        <form className="contact-form reveal d3" onSubmit={submit}>
          <input required name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} />
          <input required name="email" type="email" autoComplete="email" placeholder="Your email" value={form.email} onChange={set('email')} />
          <textarea required name="message" rows={5} placeholder="Tell me about your project…" value={form.message} onChange={set('message')} />
          {/* spam trap: invisible to people */}
          <input type="checkbox" name="botcheck" className="hp-field" tabIndex={-1} autoComplete="off" checked={form.botcheck} onChange={set('botcheck')} />
          <button className={`btn-gradient ${status}`} type="submit" disabled={status === 'sending'}>{label}</button>
          <p className={`form-note ${status}`} role="status" aria-live="polite">
            {status === 'sent' && "Thanks! Your message is on its way — I'll reply soon."}
            {status === 'error' && <>Something went wrong. Please try again or email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
          </p>
        </form>
      </div>

      <footer className="footer">
        <span className="logo-text">
          <span className="logo-brace">{'{'}</span>
          {profile.initials}
          <span className="logo-brace">{'}'}</span>
        </span>
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Crafted with React.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  )
}
