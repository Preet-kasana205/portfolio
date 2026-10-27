import { useState, useRef, useEffect, useCallback } from 'react'
import './AIChatPanel.css'

/* Backend URL — set via env or configure for deployment */
const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')

const SUGGESTED_QUESTIONS = [
  'Explain the UEBA security project',
  'How does the network scanner work?',
  'What technologies does Preet use?',
  'What is Preet learning right now?',
  'Why was the UEBA project built?',
]

const MAX_MESSAGE_LENGTH = 1000

function ChatMessage({ role, content, error }) {
  return (
    <div className={`chat-msg chat-msg-${role}${error ? ' chat-msg-error' : ''}`} role="listitem">
      {role === 'assistant' && (
        <div className="chat-avatar" aria-hidden="true">AI</div>
      )}
      <div className="chat-bubble">
        {error ? (
          <span className="chat-error-text">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {content}
          </span>
        ) : (
          <span>{content}</span>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="chat-msg chat-msg-assistant" role="listitem" aria-label="AI is typing">
      <div className="chat-avatar" aria-hidden="true">AI</div>
      <div className="chat-bubble chat-typing">
        <span className="dot" /><span className="dot" /><span className="dot" />
      </div>
    </div>
  )
}

export default function AIChatPanel({ open, onClose }) {
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [backendOk, setBackendOk] = useState(null) // null=unknown, true, false
  const inputRef    = useRef(null)
  const messagesRef = useRef(null)
  const panelRef    = useRef(null)

  /* --- Check backend health on first open --- */
  useEffect(() => {
    if (!open || backendOk !== null) return
    fetch(`${BACKEND_URL}/api/health`, { signal: AbortSignal.timeout(5000) })
      .then((r) => setBackendOk(r.ok))
      .catch(() => setBackendOk(false))
  }, [open, backendOk])

  /* --- Auto-scroll to bottom --- */
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, loading])

  /* --- Focus input when opened --- */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  /* --- Trap focus in panel --- */
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return
    const focusable = panel.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    const trap  = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    panel.addEventListener('keydown', trap)
    return () => panel.removeEventListener('keydown', trap)
  }, [open])

  /* --- Escape closes panel --- */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      setMessages((m) => [...m, { role: 'assistant', content: `Message too long — please keep it under ${MAX_MESSAGE_LENGTH} characters.`, error: true }])
      return
    }

    setMessages((m) => [...m, { role: 'user', content: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
        signal: AbortSignal.timeout(30000),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Unexpected error.' }))
        const msg = err.detail || 'The assistant encountered an error. Please try again.'
        setMessages((m) => [...m, { role: 'assistant', content: msg, error: true }])
        return
      }

      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (err) {
      const msg = err.name === 'TimeoutError'
        ? 'The request timed out. The backend may be starting up — please try again in a moment.'
        : 'Could not reach the AI assistant. Please ensure the backend is running.'
      setMessages((m) => [...m, { role: 'assistant', content: msg, error: true }])
    } finally {
      setLoading(false)
    }
  }, [loading])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleSuggestion = (q) => {
    if (!loading) sendMessage(q)
  }

  const handleClear = () => {
    setMessages([])
    inputRef.current?.focus()
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="chat-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        id="ai-chat-panel"
        ref={panelRef}
        className={`chat-panel${open ? ' chat-panel-open' : ''}`}
        role="dialog"
        aria-label="Ask Preet's AI — portfolio assistant"
        aria-modal="true"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-dot" aria-hidden="true">
              <span className={`dot-status${backendOk === false ? ' dot-offline' : backendOk === true ? ' dot-online' : ''}`} />
            </div>
            <div>
              <h2 className="chat-title" id="chat-panel-title">Ask Preet's AI</h2>
              <p className="chat-subtitle">
                {backendOk === false
                  ? 'Backend offline — start the FastAPI server'
                  : backendOk === true
                    ? 'Powered by Gemini · Ask about my projects'
                    : 'Connecting…'}
              </p>
            </div>
          </div>
          <div className="chat-header-actions">
            {messages.length > 0 && (
              <button
                className="chat-clear-btn"
                onClick={handleClear}
                aria-label="Clear conversation history"
                title="Clear chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            )}
            <button
              className="chat-close-btn"
              onClick={onClose}
              aria-label="Close AI assistant"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Backend offline notice */}
        {backendOk === false && (
          <div className="chat-offline-notice" role="alert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <strong>Backend not reachable.</strong> Start the FastAPI server locally with{' '}
              <code>uvicorn main:app --reload</code> inside the <code>backend/</code> folder,
              or deploy it and set <code>VITE_BACKEND_URL</code> to its public URL.
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="chat-messages"
          ref={messagesRef}
          role="list"
          aria-label="Conversation history"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 && !loading && (
            <div className="chat-empty">
              <div className="chat-empty-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <p>Ask me anything about Preet's projects, skills, or interests.</p>

              {/* Suggested questions */}
              <div className="chat-suggestions" role="list" aria-label="Suggested questions">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="chat-suggestion-btn"
                    onClick={() => handleSuggestion(q)}
                    disabled={loading || backendOk === false}
                    role="listitem"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <ChatMessage key={i} {...m} />
          ))}

          {loading && <TypingIndicator />}
        </div>

        {/* Input */}
        <form className="chat-input-area" onSubmit={handleSubmit} aria-label="Send a message">
          <textarea
            ref={inputRef}
            id="chat-input"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={backendOk === false ? 'Backend offline…' : 'Ask about my projects…'}
            disabled={loading || backendOk === false}
            maxLength={MAX_MESSAGE_LENGTH}
            rows={1}
            aria-label="Message input"
            aria-describedby="chat-input-hint"
          />
          <button
            type="submit"
            id="chat-send-btn"
            className="chat-send-btn"
            disabled={loading || !input.trim() || backendOk === false}
            aria-label="Send message"
          >
            {loading ? (
              <span className="spinner" aria-hidden="true" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </form>
        <p id="chat-input-hint" className="chat-input-hint">
          Enter to send · Shift+Enter for new line · Max {MAX_MESSAGE_LENGTH} chars
        </p>

        {/* Disclaimer */}
        <p className="chat-disclaimer">
          This assistant uses Google Gemini and may make mistakes. It only knows what's in this portfolio.
          It does not access your repositories, perform network scans, or reveal private information.
        </p>
      </div>
    </>
  )
}
