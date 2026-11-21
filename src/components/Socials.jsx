import { profile } from '../config'
import { Github, Linkedin, Twitter, Instagram, Facebook } from './Icons'

const items = [
  ['github', 'GitHub', Github],
  ['linkedin', 'LinkedIn', Linkedin],
  ['twitter', 'X / Twitter', Twitter],
  ['instagram', 'Instagram', Instagram],
  ['facebook', 'Facebook', Facebook],
]

/** Social icon links — any link left empty in config.js is hidden. */
export default function Socials({ className = '' }) {
  return (
    <div className={`hero-socials ${className}`}>
      {items
        .filter(([key]) => profile.socials[key])
        .map(([key, label, Icon]) => (
          <a key={key} href={profile.socials[key]} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon />
          </a>
        ))}
    </div>
  )
}
