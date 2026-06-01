'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent, type CSSProperties } from 'react'

interface MagneticCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  tiltStrength?: number
}

export function MagneticCard({
  children,
  className,
  style,
  tiltStrength = 6,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  const rx = useTransform(sy, (v) => -v * tiltStrength)
  const ry = useTransform(sx, (v) => v * tiltStrength)
  const tx = useTransform(sx, (v) => v * 6)
  const ty = useTransform(sy, (v) => v * 6)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    x.set(dx)
    y.set(dy)
  }
  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        translateX: tx,
        translateY: ty,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  )
}
