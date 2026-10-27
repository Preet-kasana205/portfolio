import './Skills.css'

/* Skills are divided into two clear groups */
const USED_IN_PROJECTS = [
  { name: 'Python',        desc: 'Primary language — FastAPI backend, scripting, data processing.' },
  { name: 'FastAPI',       desc: 'REST API framework used in the UEBA platform.' },
  { name: 'HTML & CSS',    desc: 'Web structure and styling, including this portfolio.' },
  { name: 'JavaScript',    desc: 'Frontend interactivity; used in this portfolio.' },
  { name: 'Git & GitHub',  desc: 'Version control across all projects; open-source collaboration.' },
  { name: 'Google AI Studio', desc: 'Used to explore and integrate Gemini models for this portfolio assistant.' },
]

const LEARNING = [
  { name: 'C++',               desc: 'Actively practising DSA — data structures and algorithm problems.' },
  { name: 'PostgreSQL',        desc: 'Relational database used in the UEBA project.' },
  { name: 'SQLAlchemy',        desc: 'ORM layer for database interaction in Python projects.' },
  { name: 'Network Security',  desc: 'Exploring scanning, enumeration, and protocol analysis.' },
  { name: 'React',             desc: 'Used to build this portfolio; continuing to develop familiarity.' },
  { name: 'Research & Presentation', desc: 'Science communication and technical writing skills.' },
]

function SkillItem({ name, desc }) {
  return (
    <li className="skill-item" aria-label={`${name}: ${desc}`}>
      <div className="skill-item-inner">
        <div className="skill-dot" aria-hidden="true" />
        <div>
          <span className="skill-name">{name}</span>
          <p className="skill-desc">{desc}</p>
        </div>
      </div>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Skills</p>
          <h2 id="skills-heading" className="section-title">Technical toolkit</h2>
          <p className="section-subtitle">
            Technologies I've used in real projects, and areas I'm actively developing.
            No arbitrary percentages — that doesn't tell you much.
          </p>
        </div>

        <div className="skills-grid">
          {/* Used in projects */}
          <div className="skills-group glass-card reveal reveal-delay-1">
            <div className="skills-group-header">
              <div className="skills-group-badge used" aria-hidden="true">✓</div>
              <div>
                <h3 className="skills-group-title">Used in projects</h3>
                <p className="skills-group-sub">Applied in real-world code</p>
              </div>
            </div>
            <ul className="skills-list" aria-label="Skills used in projects">
              {USED_IN_PROJECTS.map((s) => (
                <SkillItem key={s.name} {...s} />
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div className="skills-group glass-card reveal reveal-delay-2">
            <div className="skills-group-header">
              <div className="skills-group-badge learning" aria-hidden="true">→</div>
              <div>
                <h3 className="skills-group-title">Actively learning</h3>
                <p className="skills-group-sub">In progress or recently applied</p>
              </div>
            </div>
            <ul className="skills-list" aria-label="Skills being learned">
              {LEARNING.map((s) => (
                <SkillItem key={s.name} {...s} />
              ))}
            </ul>
          </div>
        </div>

        {/* Honest disclaimer */}
        <p className="skills-disclaimer reveal reveal-delay-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Skills listed are based on actual project use. Proficiency varies — "used in projects" means I've
          written working code with it; "learning" means I'm actively building or studying it now.
        </p>
      </div>
    </section>
  )
}
