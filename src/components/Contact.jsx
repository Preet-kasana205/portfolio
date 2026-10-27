import { useState, useRef } from 'react'
import './Contact.css'

const FIELD_MAX = 5000

function FormField({ label, id, type = 'text', required, value, onChange, error, ...rest }) {
  return (
    <div className={`form-field${error ? ' form-field-error' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="form-required" aria-hidden="true">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          className="form-input form-textarea"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="form-input"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...rest}
        />
      )}
      {error && <p id={`${id}-error`} className="form-error" role="alert">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const formRef             = useRef(null)

  const validate = () => {
    const errs = {}
    if (!form.name.trim())                          errs.name    = 'Please enter your name.'
    if (!form.email.trim())                         errs.email   = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.message.trim())                       errs.message = 'Please enter a message.'
    else if (form.message.length > FIELD_MAX)       errs.message = `Message must be under ${FIELD_MAX} characters.`
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((err) => { const next = { ...err }; delete next[name]; return next })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      /* focus first error field */
      const firstKey = Object.keys(errs)[0]
      document.getElementById(firstKey)?.focus()
      return
    }
    setStatus('sending')
    /* mailto: fallback — opens the user's email client */
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:kasanap553@gmail.com?subject=${subject}&body=${body}`
    /* We cannot confirm delivery — be honest */
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 600)
  }

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 id="contact-heading" className="section-title">Get in touch</h2>
          <p className="section-subtitle">
            Have a question, an idea, or just want to say hello? Send a message.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info column */}
          <div className="contact-info reveal reveal-delay-1">
            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <span className="contact-info-label">Email</span>
                <a href="mailto:kasanap553@gmail.com" className="contact-info-value">kasanap553@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <span className="contact-info-label">Location</span>
                <span className="contact-info-value">Ghaziabad, India</span>
              </div>
            </div>

            <div className="contact-social-links" role="navigation" aria-label="Social profiles">
              <a href="https://github.com/Preet-kasana205" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="GitHub profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/preet-kasana-3729a0223/" target="_blank" rel="noopener noreferrer" className="contact-social-btn" aria-label="LinkedIn profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>

            <div className="contact-note glass-card">
              <p>
                <strong>Note on the contact form:</strong> Submitting this form opens your email client
                with a pre-filled message. No email is sent automatically from this page.
                If you prefer, you can email me directly at{' '}
                <a href="mailto:kasanap553@gmail.com">kasanap553@gmail.com</a>.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap reveal reveal-delay-2">
            {status === 'sent' ? (
              <div className="form-success glass-card" role="status">
                <div className="form-success-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3>Your email client should have opened!</h3>
                <p>
                  Complete sending the email from your email client.
                  If it didn't open, please email me directly at{' '}
                  <a href="mailto:kasanap553@gmail.com">kasanap553@gmail.com</a>.
                </p>
                <button className="btn btn-outline" onClick={() => setStatus(null)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                className="contact-form glass-card"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <FormField
                  label="Name"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your name"
                  autoComplete="name"
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                <FormField
                  label="Message"
                  id="message"
                  type="textarea"
                  required
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="What's on your mind?"
                  rows={5}
                  maxLength={FIELD_MAX}
                />
                <div className="form-char-count" aria-live="polite" aria-atomic="true">
                  {form.message.length}/{FIELD_MAX}
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="btn btn-primary"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="spinner" aria-hidden="true" />
                      Opening email client…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
