'use client'

import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="px-6 md:px-14 py-28" style={{ background: '#f5f5f5' }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-14 items-end">
          <div>
            <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
              Featured Work
            </p>
            <h2 className="t-h2" style={{ color: '#0f172a' }}>
              Selected work across products and initiatives.
            </h2>
          </div>
          <div className="md:pb-2">
            <p className="t-body-lg" style={{ color: '#475569' }}>
              A selection of product stories across mobile learning, monetization, marketplaces,
              AI workflows, and internal innovation.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const isHovered = hoveredIndex === i
            return (
              <Link
                key={i}
                href={`/work/${project.slug}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  display: 'block',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '4 / 5',
                  cursor: 'pointer',
                  background: project.image ? `url(${project.image}) center/cover no-repeat` : project.placeholder,
                  boxShadow: isHovered
                    ? '0 20px 60px rgba(0,0,0,0.18)'
                    : '0 2px 12px rgba(0,0,0,0.07)',
                  transition: 'box-shadow 0.35s ease, transform 0.35s ease',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Placeholder label — remove once images are in */}
                {!project.image && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: isHovered ? 0 : 0.25,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <span className="t-eyebrow-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      Image coming soon
                    </span>
                  </div>
                )}

                {/* Mobile/tablet: always-visible title overlay (no hover available) */}
                <div
                  className="flex flex-col justify-end md:hidden"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5,16,30,0.92) 0%, rgba(5,16,30,0.3) 50%, transparent 100%)',
                    padding: '1.25rem',
                  }}
                >
                  <h3 className="t-title" style={{ color: '#ffffff' }}>
                    {project.title}
                  </h3>
                </div>

                {/* Desktop: full hover overlay */}
                <div
                  className="hidden md:flex"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(5,16,30,0.97) 0%, rgba(5,16,30,0.82) 50%, rgba(5,16,30,0.4) 100%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.75rem',
                  }}
                >
                  {/* Content slides up on hover */}
                  <div
                    style={{
                      transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                      transition: 'transform 0.35s ease',
                    }}
                  >
                    <h3 className="t-title mb-2" style={{ color: '#ffffff' }}>
                      {project.title}
                    </h3>
                    <p className="t-body-sm mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="t-tag px-3 py-1 rounded-full"
                          style={{
                            background: 'rgba(56,189,248,0.15)',
                            color: '#7dd3fc',
                            border: '1px solid rgba(56,189,248,0.25)',
                            backdropFilter: 'blur(4px)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
