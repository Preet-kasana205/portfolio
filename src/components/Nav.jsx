import { useState, useEffect } from 'react'
import './Nav.css'

const navLinks = [
  { href: '#hero',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen]     = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [activeSection, setActive]  = useState('hero')

  /* --- Scroll shadow --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- Active section detection --- */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  /* --- Close menu on Escape --- */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`nav-header${scrolled ? ' nav-scrolled' : ''}`} role="banner">
      <nav className="nav-inner container" aria-label="Main navigation">

        {/* Logo / name */}
        <a href="#hero" className="nav-logo" aria-label="Preet Kasana — go to top">
          <span className="nav-logo-bracket">[</span>
          <span>PK</span>
          <span className="nav-logo-bracket">]</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-link${activeSection === href.slice(1) ? ' nav-link-active' : ''}`}
                aria-current={activeSection === href.slice(1) ? 'page' : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          id="nav-menu-btn"
          className={`nav-hamburger${menuOpen ? ' nav-hamburger-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="nav-mobile-menu"
        className={`nav-mobile${menuOpen ? ' nav-mobile-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`nav-mobile-link${activeSection === href.slice(1) ? ' nav-link-active' : ''}`}
                onClick={handleLinkClick}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
