'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/data/projects'

export default function WorkHero({ project }: { project: Project }) {
  const photoRef = useRef<HTMLDivElement>(null)
  const darkenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      if (photoRef.current) {
        photoRef.current.style.transform = `scale(${1 + progress * 0.3})`
      }
      if (darkenRef.current) {
        darkenRef.current.style.opacity = String(progress * 0.75)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const hasImage = Boolean(project.heroImage)
  const meta: [string, string][] = project.heroMeta ?? [
    ['Company', project.company],
    ['Platform', project.platform],
    ['Year', project.year],
  ]

  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderRadius: '0 0 80px 80px',
        minHeight: '72vh',
        backgroundColor: '#1a3a5c',
      }}
    >
      {/* Image / placeholder layer — scales on scroll */}
      <div
        ref={photoRef}
        className="absolute inset-0"
        style={{
          background: hasImage
            ? `url(${project.heroImage}) center/cover no-repeat`
            : project.heroPlaceholder,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      />

      {/* Placeholder label */}
      {!hasImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="t-eyebrow-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Image coming soon
          </span>
        </div>
      )}

      {/* Static gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(3,14,31,0.80) 0%, rgba(3,14,31,0.62) 22%, rgba(3,14,31,0.35) 42%, rgba(3,14,31,0.12) 58%, transparent 78%)',
        }}
      />

      {/* Scroll-driven darken overlay */}
      <div
        ref={darkenRef}
        className="absolute inset-0"
        style={{ backgroundColor: '#030e1f', opacity: 0, willChange: 'opacity' }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col"
        style={{ minHeight: '72vh', padding: 'clamp(2rem, 5vw, 4rem)' }}
      >
        <div style={{ height: '5rem' }} />

        <div
          className="flex-1 flex flex-col justify-end gap-8 md:gap-16"
          style={{ paddingBottom: 'clamp(1.5rem, 4vh, 3rem)' }}
        >
          {/* Eyebrow (year) + title */}
          <div>
            <p className="t-lead mb-3" style={{ color: '#7dd3fc' }}>
              {project.year}
            </p>
            <h1 className="t-display-lg text-white">
              {project.title}
            </h1>
          </div>

          {/* Meta strip */}
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {meta.map(([label, value]) => (
              <div key={label}>
                <span className="t-label block mb-1.5" style={{ color: '#7dd3fc' }}>
                  # {label}
                </span>
                <span className="t-body text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
