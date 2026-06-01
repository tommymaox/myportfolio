'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  external?: boolean
  className?: string
  ariaLabel?: string
  download?: boolean
  strength?: number
}

export function MagneticButton({
  children,
  href,
  variant = 'secondary',
  external,
  className,
  ariaLabel,
  download,
  strength = 18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 })

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const klass = ['mag-btn', variant === 'primary' && 'mag-btn-primary', className]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download}
      className={klass}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}
