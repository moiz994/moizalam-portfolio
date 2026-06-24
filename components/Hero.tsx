'use client'

import { useEffect, useRef } from 'react'

const expertise = [
  ['01', 'Product Discovery'],
  ['02', 'Strategy & Roadmaps'],
  ['03', 'Cross-functional Execution'],
  ['04', 'Data & Metrics'],
]

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null)
  const darkenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)

      // Zoom photo: 1.0 at top → 1.25 after one full viewport scroll
      if (photoRef.current) {
        photoRef.current.style.transform = `scale(${1 + progress * 0.30})`
      }

      // Darken overlay: 0 opacity at top → 0.70 after one full viewport scroll
      if (darkenRef.current) {
        darkenRef.current.style.opacity = String(progress * 0.75)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderRadius: '0 0 80px 80px',
        minHeight: '100dvh',
        backgroundColor: '#1a3a5c',
      }}
    >
      {/* Photo layer — scales on scroll */}
      <div
        ref={photoRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/moiz.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* Static gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(3,14,31,0.76) 0%, rgba(3,14,31,0.60) 20%, rgba(3,14,31,0.35) 40%, rgba(3,14,31,0.12) 55%, transparent 75%)',
        }}
      />

      {/* Scroll-driven darkening overlay */}
      <div
        ref={darkenRef}
        className="absolute inset-0"
        style={{
          backgroundColor: '#030e1f',
          opacity: 0,
          willChange: 'opacity',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col"
        style={{ minHeight: '100dvh', padding: 'clamp(2rem, 5vw, 4rem)' }}
      >
        {/* Navbar spacer */}
        <div style={{ height: '5rem' }} />

        {/* Flex-1 pushes all content toward the bottom */}
        <div className="flex-1 flex flex-col justify-end gap-6 md:gap-24" style={{ paddingBottom: 'clamp(1.5rem, 4vh, 3rem)' }}>

          {/* Heading + Quote grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem',
              alignItems: 'end',
            }}
            className="md-hero-grid"
          >
            {/* Left: eyebrow + heading */}
            <div>
              <p className="t-lead mb-3" style={{ color: '#7dd3fc' }}>
                Hey, I'm Moiz,
              </p>
              <h1 className="t-display-xl text-white">
                Product<br />Manager
              </h1>
            </div>

            {/* Right: quote + tagline */}
            <div className="flex flex-col gap-3">
              <p
                className="hidden md:block text-white text-lg md:text-2xl font-bold leading-snug"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Good products solve problems. Great ones solve problems people didn't know they had.
              </p>
              <p className="t-body text-white/75">
                From zero to one, I build things users actually want.
              </p>
            </div>
          </div>

          {/* Competencies strip — 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {expertise.map(([num, label]) => (
              <div key={num}>
                <span className="t-label block mb-1.5">
                  <span style={{ color: '#7dd3fc' }}>#</span>
                  <span style={{ color: 'white' }}>{num}</span>
                </span>
                <span className="t-body text-white">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
