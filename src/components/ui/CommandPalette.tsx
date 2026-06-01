'use client'

import { useEffect, useState, useMemo, useRef } from 'react'

interface Command {
  label: string
  hint: string
  href: string
}

const COMMANDS: Command[] = [
  { label: 'Hero',              hint: 'top of page',      href: '#hero' },
  { label: 'Projects',          hint: 'featured work',    href: '#projects' },
  { label: 'Experience',        hint: 'track record',     href: '#experience' },
  { label: 'Capabilities',      hint: 'skills matrix',    href: '#capabilities' },
  { label: 'Email',             hint: 'tommy.mao@outlook.com', href: 'mailto:tommy.mao@outlook.com' },
  { label: 'LinkedIn',          hint: 'profile',          href: 'https://www.linkedin.com/in/tommymao/' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10)
    else {
      setQuery('')
      setActive(0)
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter((c) =>
      `${c.label} ${c.hint}`.toLowerCase().includes(q)
    )
  }, [query])

  function run(cmd: Command) {
    setOpen(false)
    if (cmd.href.startsWith('#')) {
      const el = document.querySelector(cmd.href)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = cmd.href
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '14vh',
        background: 'rgba(5,6,8,0.55)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(560px, 92vw)',
          background: 'var(--surface)',
          border: '1px solid var(--hair-2)',
          borderRadius: 'var(--r-lg)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          overflow: 'hidden',
        }}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0) }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, 0))
            } else if (e.key === 'Enter') {
              const cmd = results[active]
              if (cmd) run(cmd)
            }
          }}
          placeholder="Jump to…"
          style={{
            width: '100%',
            padding: '16px 18px',
            background: 'transparent',
            color: 'var(--ink)',
            fontSize: 15,
            outline: 'none',
            border: 0,
            borderBottom: '1px solid var(--hair)',
            fontFamily: 'var(--font-geist-mono)',
            letterSpacing: '0.01em',
          }}
        />
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {results.length === 0 ? (
            <div
              style={{
                padding: '14px 18px',
                color: 'var(--dim)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: 12,
              }}
            >
              no matches
            </div>
          ) : (
            results.map((c, i) => (
              <button
                key={c.label}
                onClick={() => run(c)}
                onMouseEnter={() => setActive(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '11px 18px',
                  textAlign: 'left',
                  background: i === active ? 'var(--surface-2)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{ color: 'var(--ink)', fontSize: 14 }}>{c.label}</span>
                <span
                  style={{
                    color: 'var(--dim)',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: 11,
                  }}
                >
                  {c.hint}
                </span>
              </button>
            ))
          )}
        </div>
        <div
          style={{
            padding: '8px 18px',
            borderTop: '1px solid var(--hair)',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 10,
            color: 'var(--dim-2)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          ↑↓ navigate · ↵ select · esc close
        </div>
      </div>
    </div>
  )
}
