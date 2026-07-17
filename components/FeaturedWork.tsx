import Link from 'next/link'
import { projects } from '@/data/projects'

const publishedProjects = projects.filter((project) => project.published)

export default function FeaturedWork() {
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
          {publishedProjects.map((project, i) => (
            <Link
              key={i}
              href={`/work/${project.slug}`}
              className="featured-card"
              style={{
                position: 'relative',
                display: 'block',
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '12 / 9',
                cursor: 'pointer',
                background: project.image
                  ? `url(${project.image}) center/cover no-repeat`
                  : project.placeholder,
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                transition: 'box-shadow 0.35s ease',
              }}
            >
              {/* Base gradient — a light resting wash under the logo. Kept subtle so darker
                  thumbnail images aren't over-darkened; the logo still reads white against it. */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(5,16,30,0.6) 0%, rgba(5,16,30,0.18) 45%, transparent 100%)',
                }}
              />

              {/* Deeper gradient — fades in on hover so the revealed text stays legible */}
              <div
                className="featured-hover-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(5,16,30,0.97) 0%, rgba(5,16,30,0.82) 50%, rgba(5,16,30,0.4) 100%)',
                }}
              />

              {/* Placeholder label — remove once images are in. Fades on hover. */}
              {!project.image && (
                <div
                  className="featured-coming-soon"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.25,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <span className="t-eyebrow-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Image coming soon
                  </span>
                </div>
              )}

              {/* Single bottom-anchored content block. The logo rests at the bottom; on hover the
                  reveal below it expands, pushing the logo upward in one smooth motion. */}
              <div
                className="flex flex-col justify-end"
                style={{ position: 'absolute', inset: 0, padding: '1.5rem' }}
              >
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={project.title}
                    style={{
                      height: 28,
                      width: 'auto',
                      maxWidth: '65%',
                      objectFit: 'contain',
                      objectPosition: 'left bottom',
                      filter: 'brightness(0) invert(1)',
                      opacity: 0.95,
                    }}
                  />
                ) : (
                  <h3 className="t-title" style={{ color: '#ffffff' }}>
                    {project.title}
                  </h3>
                )}

                {/* Reveal: collapsed to zero height at rest, grows below the logo on hover */}
                <div className="featured-reveal-wrap">
                  <div className="featured-reveal-inner">
                    <p
                      className="t-body-sm"
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: '0.85rem',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
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
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
