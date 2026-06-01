'use client'

import { useEffect, useState } from 'react'
import { Mail, ArrowDownToLine } from 'lucide-react'

const NAV_LINKS = [
  { href: '#projects',   label: 'Projects' },
  { href: '#homelab',    label: 'Home Lab' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact' },
]

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.451 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

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
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: scrolled
          ? 'blur(18px) saturate(160%)'
          : 'blur(10px) saturate(120%)',
        WebkitBackdropFilter: scrolled
          ? 'blur(18px) saturate(160%)'
          : 'blur(10px) saturate(120%)',
        background: scrolled
          ? 'rgba(12,12,12,0.82)'
          : 'rgba(12,12,12,0.30)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        transition: 'background .35s ease, border-color .35s ease, backdrop-filter .35s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          gap: 16,
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          style={{
            fontFamily: 'var(--font-kanit), sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 17,
            color: 'var(--ink)',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent-glow)',
            }}
          />
          Tommy Mao
        </a>

        {/* Center nav */}
        <nav
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-kanit), sans-serif',
            fontWeight: 500,
            fontSize: 13.5,
            letterSpacing: '-0.005em',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="nav-link-2"
              style={{
                padding: '8px 14px',
                color: 'var(--ink-2)',
                borderRadius: 999,
                transition: 'color .18s ease, background .18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ink)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--ink-2)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <a
            href="/Tommy_Mao_Resume.pdf"
            download
            aria-label="Download Resume"
            title="Download Resume"
            className="nav-icon-btn"
          >
            <ArrowDownToLine size={16} strokeWidth={1.8} />
          </a>
          <a
            href="https://www.linkedin.com/in/tommymaoau"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="nav-icon-btn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:tommy.mao@outlook.com"
            aria-label="Email"
            title="tommy.mao@outlook.com"
            className="nav-icon-btn"
          >
            <Mail size={16} strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </header>
  )
}
