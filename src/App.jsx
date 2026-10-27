import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatPanel from './components/AIChatPanel'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [chatOpen, setChatOpen] = useState(false)

  /* ---- Intersection Observer for scroll reveals ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Fixed background grid */}
      <div className="bg-grid" aria-hidden="true" />
      <ScrollProgress />
      <Nav />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />

      {/* AI Chat */}
      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating AI button */}
      <button
        id="ai-chat-toggle"
        className="ai-fab"
        aria-label={chatOpen ? 'Close AI assistant' : 'Open AI assistant — Ask Preet\'s AI'}
        aria-expanded={chatOpen}
        aria-controls="ai-chat-panel"
        onClick={() => setChatOpen((o) => !o)}
      >
        {chatOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="8.5" cy="10" r="1" fill="currentColor" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
            <circle cx="15.5" cy="10" r="1" fill="currentColor" />
          </svg>
        )}
        <span className="ai-fab-label">Ask Preet's AI</span>
      </button>

      <style>{`
        .ai-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: var(--z-chat);
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          background: linear-gradient(135deg, var(--cyan) 0%, var(--teal) 100%);
          color: #060b18;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: var(--font-sans);
          box-shadow: 0 4px 20px rgba(0, 221, 200, 0.4);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          cursor: pointer;
        }
        .ai-fab:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 32px rgba(0, 221, 200, 0.55);
        }
        .ai-fab:focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 4px;
        }
        .ai-fab-label {
          display: none;
        }
        @media (min-width: 480px) {
          .ai-fab-label { display: block; }
        }
        @media (max-width: 480px) {
          .ai-fab {
            bottom: 20px;
            right: 20px;
            padding: 14px;
            border-radius: 50%;
          }
        }
      `}</style>
    </>
  )
}

export default App
