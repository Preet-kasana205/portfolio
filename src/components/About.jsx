import './About.css'

const interests = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M9 9l2 2 4-4" />
      </svg>
    ),
    title: 'Cybersecurity',
    desc: 'Behaviour-based threat detection, user and entity analytics, and understanding how systems can fail.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Backend Development',
    desc: 'Building reliable APIs with Python and FastAPI, database design, and service architecture.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    title: 'DSA & Problem-Solving',
    desc: 'Sharpening algorithmic thinking through data structures and algorithms in C++.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Open Source',
    desc: 'Collaborating on public projects, learning from real codebases, and contributing where possible.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a10 10 0 0 0 0 20M2 12h20" />
        <path d="M8 8s1-1 4-1 4 1 4 1" />
      </svg>
    ),
    title: 'Earth Science & Data',
    desc: 'Exploring environmental datasets, climate patterns, and using data to understand real-world systems.',
  },
]

export default function About() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-header reveal">
          <p className="section-label">About Me</p>
          <h2 id="about-heading" className="section-title">
            Engineering curiosity<br />
            <span className="about-title-accent">into practice</span>
          </h2>
        </div>

        <div className="about-grid">
          {/* Bio column */}
          <div className="about-bio reveal reveal-delay-1">
            <p>
              I'm Preet Kasana, a third-year engineering student interested in cybersecurity,
              backend development, and problem-solving. I enjoy understanding how systems work,
              investigating suspicious behaviour, and turning technical concepts into practical
              projects.
            </p>
            <p>
              Currently, I'm building with Python and FastAPI, exploring user behaviour analytics
              and network security, and strengthening my problem-solving skills through DSA in C++.
            </p>
            <p>
              I'm also interested in open-source collaboration and using technology to explore
              real-world challenges — including Earth science and environmental data.
            </p>

            <div className="about-contact-block">
              <a href="mailto:kasanap553@gmail.com" className="about-contact-link" aria-label="Email Preet Kasana">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                kasanap553@gmail.com
              </a>
              <a href="https://github.com/Preet-kasana205" target="_blank" rel="noopener noreferrer" className="about-contact-link" aria-label="GitHub profile">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Preet-kasana205
              </a>
              <a href="https://www.linkedin.com/in/preet-kasana-3729a0223/" target="_blank" rel="noopener noreferrer" className="about-contact-link" aria-label="LinkedIn profile">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Interests grid */}
          <div className="about-interests reveal reveal-delay-2" aria-label="Areas of interest">
            {interests.map(({ icon, title, desc }) => (
              <article key={title} className="interest-card glass-card">
                <div className="interest-icon" aria-hidden="true">{icon}</div>
                <h3 className="interest-title">{title}</h3>
                <p className="interest-desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
