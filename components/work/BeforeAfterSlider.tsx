'use client'

import { useRef, useState } from 'react'

type Props = {
  beforeSrc?: string
  afterSrc?: string
  ratio?: string
  beforeLabel?: string
  afterLabel?: string
}

const pill: React.CSSProperties = {
  position: 'absolute',
  bottom: '14px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#ffffff',
  background: 'rgba(5,16,30,0.6)',
  backdropFilter: 'blur(4px)',
  padding: '5px 12px',
  borderRadius: '9999px',
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  ratio = '16 / 9',
  beforeLabel = 'Before',
  afterLabel = 'After',
}: Props) {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const update = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }

  const beforeBg = beforeSrc
    ? `url(${beforeSrc}) center/cover no-repeat`
    : 'linear-gradient(135deg, #334155 0%, #475569 100%)'
  const afterBg = afterSrc
    ? `url(${afterSrc}) center/cover no-repeat`
    : 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)'

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        setDragging(true)
        try {
          e.currentTarget.setPointerCapture(e.pointerId)
        } catch {
          // setPointerCapture can throw for synthetic/edge-case pointers — ignore
        }
        update(e.clientX)
      }}
      onPointerMove={(e) => dragging && update(e.clientX)}
      onPointerUp={() => setDragging(false)}
      style={{
        position: 'relative',
        aspectRatio: ratio,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* After (base, full) */}
      <div style={{ position: 'absolute', inset: 0, background: afterBg }} />
      {/* Before (clipped to the slider position) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: beforeBg,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />

      <span style={{ ...pill, left: '14px' }}>{beforeLabel}</span>
      <span style={{ ...pill, right: '14px' }}>{afterLabel}</span>

      {/* Handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: '2px',
          background: '#ffffff',
          transform: 'translateX(-1px)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38px',
            height: '38px',
            borderRadius: '9999px',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  )
}
