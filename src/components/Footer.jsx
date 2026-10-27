import './Footer.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-logo">
            <span className="footer-bracket">[</span>PK<span className="footer-bracket">]</span>
          </span>
          <p className="footer-copy">
            &copy; {year} Preet Kasana. Built with React &amp; FastAPI.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/Preet-kasana205" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">GitHub</a>
          <a href="https://www.linkedin.com/in/preet-kasana-3729a0223/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">LinkedIn</a>
        </nav>
      </div>

      <div className="footer-bottom container">
        <p className="footer-disclaimer">
          This portfolio uses Google Gemini via the Google AI Studio API for the "Ask Preet's AI" feature.
          The AI assistant may make mistakes — always verify important information.
        </p>
      </div>
    </footer>
  )
}
