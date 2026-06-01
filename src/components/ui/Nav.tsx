'use client'

import { useEffect, useRef, useState } from 'react'
import { PROJECTS, CATEGORIES, type Project, type ProjectCategory } from '@/data/projects'

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(150%)' : 'blur(12px) saturate(140%)',
        background: scrolled ? 'rgba(9,10,12,0.78)' : 'rgba(9,10,12,0.30)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background .35s ease, border-color .35s ease, backdrop-filter .35s ease',
      }}
    >
      <div className="shell" style={{
        display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
        height: 60, gap: 16,
      }}>
        {/* Brand */}
        <a
          href="#home"
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 18, letterSpacing: '-0.018em',
            color: 'var(--ink)',
            transition: 'opacity .2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Tommy Mao
        </a>

        {/* Center nav (hidden on mobile via .desktop-nav) */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex', alignItems: 'center', gap: 2,
            fontFamily: 'var(--font-geist-mono)', fontSize: 12,
          }}
        >
          <ProjectsDropdown />
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
        </nav>

        {/* Right actions — icon only, identical 32px tap targets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <a
            href="mailto:tommy.mao@outlook.com"
            aria-label="Email Tommy Mao"
            title="tommy.mao@outlook.com"
            className="nav-icon-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              width={16} height={16} fill="none" stroke="currentColor"
              strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/tommymaoau"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="nav-icon-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
              width={16} height={16} fill="currentColor" aria-hidden="true"
            >
              <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.602 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 010 4.125zM7.119 20.452H3.554V9H7.12v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.543C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.272V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function ProjectsDropdown() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  const goTo = (e: React.MouseEvent, project: Project) => {
    e.preventDefault()
    setOpen(false)
    if (typeof window === 'undefined') return
    window.history.replaceState(null, '', `#${project.id}`)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    const el = document.getElementById(`cat-${project.category}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const projectsByCat = (key: ProjectCategory) => PROJECTS.filter(p => p.category === key)

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => { cancelClose(); setOpen(true) }}
      onMouseLeave={scheduleClose}
    >
      <a
        href="#projects"
        className="nav-link"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
      >
        Projects
        <span
          aria-hidden
          style={{
            display: 'inline-block', fontSize: 9,
            color: 'var(--dim-2)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform .25s ease',
          }}
        >
          ▾
        </span>
      </a>

      {open && (
        <div
          className="proj-dd"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 224px)',
            gap: 0,
            padding: '10px 6px 12px',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            background: 'rgba(11,12,15,0.96)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 18px 48px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset',
            animation: 'proj-dd-in .18s cubic-bezier(.25,.8,.25,1)',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.key}
              style={{
                padding: '2px 10px',
                borderRight: idx < CATEGORIES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 9.5,
                color: 'var(--dim-2)', letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '6px 10px 12px',
              }}>
                {cat.label}
              </div>
              {projectsByCat(cat.key).map(p => (
                <a
                  key={p.id}
                  href={`#${p.id}`}
                  role="menuitem"
                  onClick={e => goTo(e, p)}
                  className="proj-dd-item"
                  style={{
                    fontFamily: 'inherit',
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: '-0.003em',
                    color: 'var(--ink-2)',
                    padding: '8px 11px',
                    margin: '1px 0',
                    borderRadius: 7,
                    cursor: 'pointer',
                    transition: 'color .18s ease, background .18s ease',
                    display: 'block',
                    lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--ink)'
                    e.currentTarget.style.background = 'rgba(120, 220, 170, 0.07)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--ink-2)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {p.title}
                </a>
              ))}
            </div>
          ))}

          <style jsx>{`
            @keyframes proj-dd-in {
              from { opacity: 0; transform: translate(-50%, -4px); }
              to   { opacity: 1; transform: translate(-50%, 0); }
            }
            @media (max-width: 1080px) {
              .proj-dd {
                grid-template-columns: repeat(3, minmax(180px, 1fr)) !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
