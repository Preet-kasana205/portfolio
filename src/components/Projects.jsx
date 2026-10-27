import './Projects.css'

const PROJECTS = [
  {
    id: 'ueba',
    featured: true,
    title: 'UEBA Security Platform',
    subtitle: 'User & Entity Behaviour Analytics',
    description:
      'A FastAPI-based security platform that ingests user activity, builds per-user behavioural baselines, detects statistical anomalies, and generates explainable risk-scored alerts with step-up verification triggers. Designed with an Identity Trust framework concept for banking environments.',
    problem:
      'Insider threats are difficult to detect with rule-based systems because attackers often use legitimate credentials. Behaviour-based analytics can surface anomalies that static rules miss.',
    approach:
      'Per-user baselines track normal activity patterns. Deviations are scored and flagged with context-aware explanations to reduce alert fatigue.',
    contribution: 'Architecture, FastAPI implementation, baseline modelling, and alert logic.',
    tags: ['Python', 'FastAPI', 'Security', 'Analytics', 'PostgreSQL'],
    repoUrl: 'https://github.com/Preet-kasana205/ueba-project',
    status: 'active',
  },
  {
    id: 'webrecon',
    title: 'WebRecon Framework',
    subtitle: 'Modular Threat Surface Reconnaissance',
    description:
      'A modular Python reconnaissance and threat surface assessment toolkit featuring DNS, SSL/TLS, Geolocation, HTTP header security, and Whois scanners with automated risk analysis and reporting.',
    approach: 'Automating multi-vector reconnaissance and risk calculation to identify security misconfigurations efficiently.',
    contribution: 'Designed core scanning modules, risk scoring algorithms, and report generation pipeline.',
    tags: ['Python', 'Cybersecurity', 'Network Recon', 'Risk Analysis'],
    repoUrl: null,
    statusBadge: 'Core Architecture Built',
  },
  {
    id: 'network-scanner',
    title: 'Network Scanner',
    subtitle: 'Host & Service Discovery',
    description:
      'A collaborative cybersecurity project focused on scanning network hosts and examining services. Built to understand network reconnaissance techniques, host discovery, and port enumeration.',
    approach: 'Systematic host discovery and service enumeration within a defined network range.',
    contribution: 'Collaborative project with priyansh019 — specific contributions documented in repo.',
    tags: ['Python', 'Networking', 'Cybersecurity', 'Sockets'],
    repoUrl: 'https://github.com/priyansh019/network-scanner',
    collab: true,
  },
  {
    id: 'delhi-air-guardian',
    title: 'Delhi Air Guardian',
    subtitle: 'Air Quality Advisory Concept',
    description:
      'An AI-powered air-quality advisory concept providing AQI information, data interpretation, and actionable health guidance. Developed in the context of a sustainability internship.',
    approach: 'Combining AQI data with health guidance to make air quality information accessible and actionable.',
    contribution: 'Concept design, AQI integration, and health advisory logic.',
    tags: ['Python', 'AI', 'Sustainability', 'Data Analysis'],
    repoUrl: null,
    statusBadge: 'Sustainability Internship Concept',
  },
  {
    id: 'nasa-space-apps',
    title: 'NASA Space Apps 2026',
    subtitle: 'Be an Earth System Trend Detective',
    description:
      'An interactive concept exploring Pacific sea-surface temperatures, El Niño rainfall patterns, and potential climate impacts in India — including drought in Rajasthan and flooding in Assam. Includes disaster-preparedness education for Indian students.',
    approach: 'Visualising climate datasets to tell a coherent story about El Niño impacts on the Indian subcontinent.',
    contribution: 'Research, data exploration, and educational content framing.',
    tags: ['Earth Science', 'Climate Data', 'Education', 'NASA'],
    repoUrl: null,
    statusBadge: 'NASA Space Apps Challenge',
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    subtitle: 'React 19 + FastAPI + Gemini AI',
    description:
      'This website — showcasing engineering interests, cybersecurity projects, and technical journey. Features an interactive HTML5 network particle simulation, Gemini-powered AI portfolio assistant, and a production-grade FastAPI backend.',
    approach: 'Emphasise clarity, real performance, glassmorphism aesthetics, and server-side AI integration.',
    tags: ['React 19', 'Vite', 'FastAPI', 'Python', 'Google Gemini'],
    repoUrl: 'https://github.com/Preet-kasana205',
    statusBadge: 'Active Codebase',
  },
]

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function StatusDot({ status }) {
  if (!status) return null
  return (
    <span className={`status-dot status-${status}`} aria-label={`Status: ${status}`}>
      <span className="status-pulse" aria-hidden="true" />
    </span>
  )
}

function FeaturedProject({ p }) {
  return (
    <article className="featured-project glass-card reveal" aria-labelledby={`project-title-${p.id}`}>
      <div className="featured-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        Featured Project
      </div>

      <div className="featured-layout">
        <div className="featured-info">
          <div className="featured-header">
            <h3 id={`project-title-${p.id}`} className="featured-title">{p.title}</h3>
            {p.subtitle && <p className="featured-subtitle">{p.subtitle}</p>}
          </div>

          <p className="featured-desc">{p.description}</p>

          {p.problem && (
            <div className="featured-detail">
              <span className="detail-label">The problem</span>
              <p>{p.problem}</p>
            </div>
          )}
          {p.approach && (
            <div className="featured-detail">
              <span className="detail-label">The approach</span>
              <p>{p.approach}</p>
            </div>
          )}
          {p.contribution && (
            <div className="featured-detail">
              <span className="detail-label">My contribution</span>
              <p>{p.contribution}</p>
            </div>
          )}

          {p.note && (
            <p className="project-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {p.note}
            </p>
          )}

          <div className="featured-tags" aria-label="Technologies">
            {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="featured-actions">
            {p.repoUrl ? (
              <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                View Repository <ExternalIcon />
              </a>
            ) : (
              <span className="repo-placeholder">{p.repoPlaceholder}</span>
            )}
          </div>
        </div>

        {/* Visual accent */}
        <div className="featured-visual" aria-hidden="true">
          <div className="featured-visual-inner">
            <div className="visual-code-block">
              <div className="code-line"><span className="k">from</span> fastapi <span className="k">import</span> FastAPI</div>
              <div className="code-line"><span className="k">from</span> .models <span className="k">import</span> UserEvent</div>
              <div className="code-line"></div>
              <div className="code-line"><span className="fn">@app.post</span>(<span className="s">"/events"</span>)</div>
              <div className="code-line"><span className="k">async def</span> <span className="fn">ingest_event</span>(</div>
              <div className="code-line">  event: UserEvent</div>
              <div className="code-line">):</div>
              <div className="code-line">  baseline = <span className="k">await</span></div>
              <div className="code-line">    get_baseline(event.user_id)</div>
              <div className="code-line">  score = compute_risk(</div>
              <div className="code-line">    event, baseline)</div>
              <div className="code-line"><span className="k">  return</span> RiskAlert(</div>
              <div className="code-line">    score=score,</div>
              <div className="code-line">    explain=<span className="s">True</span></div>
              <div className="code-line">  )</div>
            </div>
          </div>
          <StatusDot status={p.status} />
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ p, delay }) {
  return (
    <article
      className={`project-card glass-card reveal reveal-delay-${delay}`}
      aria-labelledby={`project-title-${p.id}`}
    >
      <div className="project-card-top">
        <div className="project-card-icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        {p.repoUrl ? (
          <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="project-card-ext" aria-label={`Open ${p.title} repository`}>
            <ExternalIcon />
          </a>
        ) : null}
      </div>

      <h3 id={`project-title-${p.id}`} className="project-card-title">{p.title}</h3>
      {p.subtitle && <p className="project-card-subtitle">{p.subtitle}</p>}
      <p className="project-card-desc">{p.description}</p>

      {p.collab && (
        <p className="project-collab-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Collaborative project
        </p>
      )}

      {p.note && (
        <p className="project-note small">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {p.note}
        </p>
      )}

      <div className="project-card-tags" aria-label="Technologies">
        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="project-card-footer">
        {p.repoUrl ? (
          <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="project-repo-link">
            View Repository
          </a>
        ) : (
          <span className="repo-placeholder small">{p.statusBadge || 'Concept & Research'}</span>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured)
  const others   = PROJECTS.filter((p) => !p.featured)

  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Projects</p>
          <h2 id="projects-heading" className="section-title">Things I've built</h2>
          <p className="section-subtitle">
            A selection of projects I've worked on — from security platforms to climate data
            exploration. Links and details are provided where available.
          </p>
        </div>

        {/* Featured */}
        {featured && <FeaturedProject p={featured} />}

        {/* Other projects grid */}
        <div className="projects-grid">
          {others.map((p, i) => (
            <ProjectCard key={p.id} p={p} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
