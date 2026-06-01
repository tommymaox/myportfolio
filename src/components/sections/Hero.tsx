'use client'

import { useEffect, useRef } from 'react'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4'

const OUTCOMES = [
  { val: '3+ Years', label: 'Network Operations & Automation' },
  { val: '10,000+', label: 'Production Nodes Supported' },
  { val: '8',       label: 'Systems Shipped' },
  { val: '−50%',    label: 'Validation Cycle' },
]

const SKILLS = [
  { label: 'Python · FastAPI',    level: 92 },
  { label: 'Linux · Docker',      level: 90 },
  { label: 'Networking · CI/CD',  level: 88 },
  { label: 'Claude · LLM tooling', level: 80 },
]

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true
    const tryPlay = () => v.play().catch(() => { /* autoplay denied — fine */ })
    tryPlay()
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Background video — full-bleed */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Legibility overlays */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background:
            'linear-gradient(180deg, rgba(9,10,12,0.78) 0%, rgba(9,10,12,0.58) 30%, rgba(9,10,12,0.62) 60%, rgba(9,10,12,0.92) 100%), radial-gradient(ellipse at 70% 30%, transparent 0%, rgba(9,10,12,0.55) 80%)',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 1180,
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '120px 32px 80px',
          display: 'grid',
          gap: 56,
        }}
      >
        {/* Status line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 11,
            color: 'var(--ink-2)',
            letterSpacing: '0.04em',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: 999,
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent-glow)',
            }}
          />
          Available · Melbourne, AU · Ericsson · Telstra · NBN
        </div>

        {/* Name + role */}
        <div style={{ display: 'grid', gap: 18, maxWidth: 880 }}>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif)',
              fontWeight: 400,
              fontSize: 'clamp(48px, 7.2vw, 96px)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Tommy Mao<em style={{ fontStyle: 'italic', color: 'var(--ink-2)' }}>.</em>
            <br />
            <span style={{ color: 'var(--ink-2)' }}>Network Automation</span>{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--dim)' }}>&</span>{' '}
            <span style={{ color: 'var(--ink-2)' }}>Infrastructure Engineer</span>
          </h1>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--ink-2)',
              margin: 0,
              maxWidth: 680,
            }}
          >
            I build the automation, CI/CD pipelines, and self-hosted infrastructure that keep distributed networks running — from 10,000+ Telstra production nodes to AI knowledge pipelines and a home lab that runs the same way: no SaaS, no manual steps.
          </p>
        </div>

        {/* Skills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            maxWidth: 980,
          }}
        >
          {SKILLS.map(({ label, level }) => (
            <div key={label} style={{ display: 'grid', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: 11,
                  color: 'var(--ink-2)',
                  letterSpacing: '0.02em',
                }}
              >
                <span>{label}</span>
                <span style={{ color: 'var(--dim)' }}>{level}</span>
              </div>
              <div
                style={{
                  height: 2,
                  background: 'var(--hair)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${level}%`,
                    background:
                      'linear-gradient(90deg, var(--accent-dim), var(--accent))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            paddingTop: 28,
            borderTop: '1px solid var(--hair)',
          }}
        >
          {OUTCOMES.map(({ val, label }) => (
            <div key={label} style={{ display: 'grid', gap: 6 }}>
              <div
                style={{
                  fontFamily: 'var(--font-instrument-serif)',
                  fontSize: 'clamp(28px, 3.4vw, 40px)',
                  lineHeight: 1,
                  letterSpacing: '-0.022em',
                  color: 'var(--ink)',
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  color: 'var(--dim)',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
