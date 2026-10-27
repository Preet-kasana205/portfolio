import { useEffect, useRef, useState } from 'react'
import './Hero.css'

/* ---- Terminal cycling text ---- */
const PHRASES = [
  'Building with FastAPI & Python',
  'Exploring cybersecurity & UEBA',
  'Practising DSA in C++',
  'AI integration with Google Gemini',
]

function TerminalText() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed]  = useState('')
  const [deleting, setDeleting]    = useState(false)
  const [cursorOn, setCursorOn]    = useState(true)

  useEffect(() => {
    const cursor = setInterval(() => setCursorOn((c) => !c), 530)
    return () => clearInterval(cursor)
  }, [])

  useEffect(() => {
    const target = PHRASES[phraseIdx]
    let timeout

    if (!deleting) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        timeout = setTimeout(() => {
          setDeleting(false)
          setPhraseIdx((i) => (i + 1) % PHRASES.length)
        }, 350)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, phraseIdx])

  return (
    <span className="terminal-text" aria-live="polite" aria-atomic="true">
      <span className="terminal-prompt" aria-hidden="true">$ </span>
      <span>{displayed}</span>
      <span className={`terminal-cursor${cursorOn ? '' : ' cursor-off'}`} aria-hidden="true">▋</span>
    </span>
  )
}

/* ---- Canvas network animation ---- */
function NetworkCanvas() {
  const canvasRef = useRef(null)
  const mousePos  = useRef({ x: -999, y: -999 })
  const animRef   = useRef(null)
  const nodesRef  = useRef([])
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isReducedMotion) return

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let width, height

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width  = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initNodes()
    }

    const NODE_COUNT_BASE = 55

    const initNodes = () => {
      const count = Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 18000))
      nodesRef.current = Array.from({ length: count }, () => ({
        x:   Math.random() * width,
        y:   Math.random() * height,
        vx:  (Math.random() - 0.5) * 0.35,
        vy:  (Math.random() - 0.5) * 0.35,
        r:   Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.5,
      }))
    }

    const CONN_DIST    = 140
    const MOUSE_DIST   = 160
    const MOUSE_REPEL  = 0.35

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const nodes = nodesRef.current
      const mx = mousePos.current.x
      const my = mousePos.current.y

      /* update positions */
      nodes.forEach((n) => {
        /* gentle mouse repulsion */
        const dx = n.x - mx, dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * MOUSE_REPEL
          n.vx += (dx / dist) * force
          n.vy += (dy / dist) * force
        }

        /* velocity damping */
        n.vx *= 0.98
        n.vy *= 0.98

        /* clamp speed */
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (speed > 0.6) { n.vx = (n.vx / speed) * 0.6; n.vy = (n.vy / speed) * 0.6 }

        n.x += n.vx
        n.y += n.vy

        /* wrap */
        if (n.x < -10) n.x = width + 10
        if (n.x > width + 10) n.x = -10
        if (n.y < -10) n.y = height + 10
        if (n.y > height + 10) n.y = -10
      })

      /* draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONN_DIST) {
            const alpha = (1 - d / CONN_DIST) * 0.25
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0, 221, 200, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      /* mouse-attracted connections */
      nodes.forEach((n) => {
        const dx = n.x - mx, dy = n.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < MOUSE_DIST) {
          const alpha = (1 - d / MOUSE_DIST) * 0.45
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mx, my)
          ctx.strokeStyle = `rgba(0, 180, 216, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      })

      /* draw nodes */
      nodes.forEach((n) => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 221, 200, ${n.alpha * 0.7})`
        ctx.fill()
      })

      /* draw mouse dot */
      if (mx > -100) {
        ctx.beginPath()
        ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 221, 200, 0.6)'
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    /* pause when tab hidden */
    const onVisibility = () => {
      if (document.hidden) {
        if (animRef.current) cancelAnimationFrame(animRef.current)
      } else {
        animRef.current = requestAnimationFrame(draw)
      }
    }

    /* mouse tracking */
    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mousePos.current = { x: -999, y: -999 } }

    resize()
    draw()

    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    canvas.addEventListener('mousemove', onMouse, { passive: true })
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [isReducedMotion])

  if (isReducedMotion) {
    /* static fallback: subtle gradient bg */
    return (
      <div className="hero-canvas-fallback" aria-hidden="true" />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
      aria-label=""
    />
  )
}

/* ---- Hero ---- */
export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-name">
      <NetworkCanvas />

      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-layout">
        <div className="hero-content">
        {/* location badge */}
        <div className="hero-location reveal" aria-label="Location: Ghaziabad, India">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Ghaziabad, India
        </div>

        {/* name */}
        <h1 id="hero-name" className="hero-name reveal reveal-delay-1">
          Preet<br />
          <span className="hero-name-accent">Kasana</span>
        </h1>

        {/* role */}
        <p className="hero-role reveal reveal-delay-2">
          Engineering Student <span className="hero-sep" aria-hidden="true">—</span> Aspiring Developer
        </p>

        {/* bio */}
        <p className="hero-bio reveal reveal-delay-3">
          I'm a third-year engineering student interested in cybersecurity, backend
          development, and problem-solving. I enjoy understanding how systems work,
          investigating suspicious behaviour, and turning technical concepts into
          practical projects.
        </p>

        {/* terminal */}
        <div className="hero-terminal reveal reveal-delay-4" aria-label="Currently working on:">
          <TerminalText />
        </div>

        {/* CTAs */}
        <div className="hero-ctas reveal reveal-delay-4">
          <a href="#projects" className="btn btn-primary">
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me
          </a>
        </div>

        {/* Social quick links */}
        <div className="hero-socials reveal reveal-delay-4" role="navigation" aria-label="Social links">
          <a href="https://github.com/Preet-kasana205" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/preet-kasana-3729a0223/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="mailto:kasanap553@gmail.com" className="hero-social-link" aria-label="Email Preet Kasana">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-middle" />
          <div className="hero-orbit hero-orbit-inner" />
          <div className="hero-core">
            <div className="hero-core-grid" />
            <span>PK</span>
          </div>
          <span className="hero-node hero-node-one" />
          <span className="hero-node hero-node-two" />
          <span className="hero-node hero-node-three" />
          <div className="hero-visual-caption">
            <span className="hero-status-dot" />
            <span>BUILDING · LEARNING · SECURING</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
