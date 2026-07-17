'use client'

import { useEffect, useRef, useState } from 'react'

type Item = { src?: string; caption?: string }

const AUTO_MS = 5000

// cycled for items that don't have a src yet, so placeholder thumbs are distinguishable
const placeholderGradients = [
  'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
  'linear-gradient(135deg, #0a1f1a 0%, #103028 100%)',
  'linear-gradient(135deg, #1a1020 0%, #2a1a38 100%)',
  'linear-gradient(135deg, #091a2e 0%, #0f2d4a 100%)',
  'linear-gradient(135deg, #0d1c0e 0%, #162e18 100%)',
]

const itemBackground = (item: Item, i: number) =>
  item.src
    ? `url(${item.src}) center/cover no-repeat`
    : placeholderGradients[i % placeholderGradients.length]

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Scroll thumbnails left' : 'Scroll thumbnails right'}
      className="flex items-center justify-center flex-shrink-0 rounded-full"
      style={{
        width: '34px',
        height: '34px',
        background: '#ffffff',
        border: '1px solid rgba(15,23,42,0.12)',
        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
        cursor: 'pointer',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0ea5e9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  )
}

export default function InlineGallery({
  items,
  ratio = '16 / 9',
}: {
  items: Item[]
  ratio?: string
}) {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const count = items.length
  const autoPlaying = count > 1 && inView && !reducedMotion

  // Auto-advance. Re-arming on every `active` change is what makes a manual
  // thumbnail click reset the 5-second window.
  useEffect(() => {
    if (!autoPlaying) return
    const id = setTimeout(() => setActive((a) => (a + 1) % count), AUTO_MS)
    return () => clearTimeout(id)
  }, [active, count, autoPlaying])

  // Only run the rotation while the gallery is actually on screen.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Arrows only appear when the strip actually overflows its row.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const check = () => setOverflowing(strip.scrollWidth > strip.clientWidth + 1)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(strip)
    return () => ro.disconnect()
  }, [count])

  // Keep the active thumb visible as the gallery rotates. Manual scrollTo
  // (not scrollIntoView) so the page never scrolls, only the strip.
  useEffect(() => {
    const strip = stripRef.current
    const thumb = strip?.children[active] as HTMLElement | undefined
    if (!strip || !thumb) return
    const target = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2
    strip.scrollTo({ left: target, behavior: 'smooth' })
  }, [active])

  const scrollStrip = (direction: 1 | -1) => {
    const strip = stripRef.current
    if (!strip) return
    strip.scrollBy({ left: direction * strip.clientWidth * 0.7, behavior: 'smooth' })
  }

  if (count === 0) return null

  const hasCaptions = items.some((item) => item.caption)

  return (
    <figure ref={rootRef} className="m-0">
      <style>{`@keyframes gallery-progress { from { width: 0% } to { width: 100% } }`}</style>

      {/* Main image: fixed ratio so slides crossfade without the layout jumping */}
      <div
        style={{
          position: 'relative',
          aspectRatio: ratio,
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            style={{
              position: 'absolute',
              inset: 0,
              background: itemBackground(item, i),
              opacity: i === active ? 1 : 0,
              transition: reducedMotion ? 'none' : 'opacity 0.45s ease',
            }}
          >
            {!item.src && (
              <div className="flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                <span className="t-eyebrow-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Image {i + 1} coming soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Thumbnail strip, one row; arrows appear only on overflow */}
      <div className="flex items-center gap-3 mt-4">
        {overflowing && <ArrowButton direction="left" onClick={() => scrollStrip(-1)} />}
        <div
          ref={stripRef}
          className="flex gap-2"
          style={{
            // positioned so the thumbs' offsetLeft is measured against the
            // strip itself (the centering math depends on it)
            position: 'relative',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            // breathing room so the active ring isn't clipped by overflow
            padding: '3px',
            margin: '-3px',
            flex: 1,
            minWidth: 0,
          }}
        >
          {items.map((item, i) => {
            const selected = i === active
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}${item.caption ? `: ${item.caption}` : ''}`}
                aria-current={selected}
                className="flex-shrink-0"
                style={{
                  position: 'relative',
                  width: '104px',
                  aspectRatio: '16 / 10',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: itemBackground(item, i),
                  opacity: selected ? 1 : 0.55,
                  boxShadow: selected ? '0 0 0 2px #0ea5e9' : '0 0 0 1px rgba(15,23,42,0.08)',
                  transition: 'opacity 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Countdown to the next auto-advance, drawn on the active thumb */}
                {selected && autoPlaying && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      height: '3px',
                      background: '#0ea5e9',
                      animation: `gallery-progress ${AUTO_MS}ms linear`,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
        {overflowing && <ArrowButton direction="right" onClick={() => scrollStrip(1)} />}
      </div>

      {hasCaptions && (
        <figcaption
          className="t-body-sm mt-3"
          style={{ color: '#94a3b8', minHeight: '1.5em' }}
        >
          {items[active].caption}
        </figcaption>
      )}
    </figure>
  )
}
