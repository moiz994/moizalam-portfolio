import type { Block, Project } from '@/data/projects'
import BeforeAfterSlider from './BeforeAfterSlider'
import InlineGallery from './InlineGallery'

// Renders a real image when a src is provided, otherwise a rounded gradient
// placeholder. Mirrors the FeaturedWork card treatment.
function ImageBlock({
  src,
  ratio = '16 / 9',
  caption,
  tint = false,
}: {
  src?: string
  ratio?: string
  caption?: string
  // adds a subtle cream wash so white-background screenshots separate from the page
  tint?: boolean
}) {
  return (
    <figure className="m-0">
      {src ? (
        <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
          <img
            src={src}
            alt={caption ?? ''}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          {tint && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: '#c9b48a',
                opacity: 0.1,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            aspectRatio: ratio,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
            overflow: 'hidden',
          }}
        >
          <span className="t-eyebrow-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Image coming soon
          </span>
        </div>
      )}
      {caption && (
        <figcaption className="t-body-sm mt-3" style={{ color: '#94a3b8' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3 mt-6">
      {items.map((item, i) => (
        <li key={i} className="t-body flex items-start gap-3" style={{ color: '#475569' }}>
          <span
            className="mt-[0.55em] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: '#0ea5e9' }}
          />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'section':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          <h2 className="t-h3 mb-5" style={{ color: '#0f172a' }}>
            {block.heading}
          </h2>
          {block.body && (
            <div className="flex flex-col gap-4">
              {block.body.map((para, i) => (
                <p key={i} className="t-body-lg" style={{ color: '#475569' }}>
                  {para}
                </p>
              ))}
            </div>
          )}
          {block.bullets && <Bullets items={block.bullets} />}
        </div>
      )

    case 'image':
      return <ImageBlock src={block.src} ratio={block.ratio} caption={block.caption} />

    case 'gallery':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {block.items.map((item, i) => (
            <ImageBlock key={i} src={item.src} ratio={item.ratio} caption={item.caption} tint={item.tint} />
          ))}
        </div>
      )

    case 'callout':
      return (
        <div
          className="py-2"
          style={{ borderLeft: '3px solid #0ea5e9', paddingLeft: 'clamp(1.25rem, 3vw, 2rem)' }}
        >
          <p className="t-h3" style={{ color: '#0f172a' }}>
            {block.text}
          </p>
          {block.attribution && (
            <p className="t-body-sm mt-4" style={{ color: '#94a3b8' }}>
              {block.attribution}
            </p>
          )}
        </div>
      )

    case 'quote':
      return (
        <figure className="m-0 text-center max-w-3xl mx-auto">
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          <span
            aria-hidden="true"
            className="block leading-none mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '4rem',
              color: 'rgba(14,165,233,0.25)',
              height: '0.6em',
            }}
          >
            &ldquo;
          </span>
          <blockquote
            className="font-black leading-[1.25] m-0"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)',
              color: '#0f172a',
            }}
          >
            {block.text}
          </blockquote>
          {block.attribution && (
            <figcaption className="t-body-sm mt-5" style={{ color: '#94a3b8' }}>
              {block.attribution}
            </figcaption>
          )}
        </figure>
      )

    case 'metrics':
      return (
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 pt-10"
          style={{ borderTop: '1px solid rgba(15,23,42,0.1)' }}
        >
          {block.items.map((item, i) => (
            <div key={i}>
              <p
                className="font-black leading-none mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  color: '#0ea5e9',
                }}
              >
                {item.value}
              </p>
              <p className="t-body-sm" style={{ color: '#475569' }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )

    case 'points':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-10" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {block.items.map((item, i) => (
              <div key={i}>
                <p className="t-label mb-3" style={{ color: '#0ea5e9' }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="t-title mb-2" style={{ color: '#0f172a' }}>
                  {item.title}
                </h3>
                <p className="t-body-sm" style={{ color: '#475569' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )

    case 'split': {
      const text = (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-5" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          {block.body && (
            <div className="flex flex-col gap-4">
              {block.body.map((para, i) => (
                <p key={i} className="t-body-lg" style={{ color: '#475569' }}>
                  {para}
                </p>
              ))}
            </div>
          )}
          {block.bullets && <Bullets items={block.bullets} />}
        </div>
      )
      const image = <ImageBlock src={block.src} ratio={block.ratio ?? '4 / 3'} caption={block.caption} />
      const imageLeft = block.imageSide === 'left'
      return (
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {imageLeft ? (
            <>
              {image}
              {text}
            </>
          ) : (
            <>
              {text}
              {image}
            </>
          )}
        </div>
      )
    }

    case 'fullbleed':
      // Breaks out wider than the text column, centered on the viewport.
      return (
        <div style={{ width: 'min(80rem, 92vw)', marginLeft: '50%', transform: 'translateX(-50%)' }}>
          <ImageBlock src={block.src} ratio={block.ratio ?? '21 / 9'} caption={block.caption} />
        </div>
      )

    case 'stat':
      return (
        <div style={{ marginTop: 'clamp(-1.5rem, -3vw, -2.25rem)' }}>
          <p
            className="font-black leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#0ea5e9',
            }}
          >
            {block.value}
          </p>
          <p className="t-title mt-3" style={{ color: '#0f172a' }}>
            {block.label}
          </p>
          {block.caption && (
            <p className="t-body-lg mt-4" style={{ color: '#475569', maxWidth: '34rem' }}>
              {block.caption}
            </p>
          )}
        </div>
      )

    case 'columns':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-8" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {block.items.map((col, i) => (
              <div key={i}>
                {col.heading && (
                  <h3 className="t-title mb-3" style={{ color: '#0f172a' }}>
                    {col.heading}
                  </h3>
                )}
                <div className="flex flex-col gap-3">
                  {col.body.map((para, j) => (
                    <p key={j} className="t-body" style={{ color: '#475569' }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )

    case 'photos':
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.items.map((item, i) => (
            <ImageBlock key={i} src={item.src} ratio={item.ratio ?? '1 / 1'} caption={item.caption} />
          ))}
        </div>
      )

    case 'embed':
      return (
        <figure className="m-0">
          <div
            style={{
              aspectRatio: block.ratio ?? '16 / 9',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
            }}
          >
            {block.src ? (
              <iframe
                src={block.src}
                title={block.title ?? 'Embedded media'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            ) : (
              <div className="flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{ width: '68px', height: '68px', background: 'rgba(255,255,255,0.15)' }}
                >
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="rgba(255,255,255,0.7)" aria-hidden="true">
                    <path d="M0 0l22 13L0 26z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
          {block.caption && (
            <figcaption className="t-body-sm mt-3" style={{ color: '#94a3b8' }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'timeline':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-10" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          <ol className="m-0 p-0" style={{ listStyle: 'none' }}>
            {block.items.map((item, i) => {
              const last = i === block.items.length - 1
              return (
                <li
                  key={i}
                  className="relative"
                  style={{
                    paddingLeft: '2rem',
                    paddingBottom: last ? 0 : '2rem',
                    borderLeft: last ? 'none' : '2px solid rgba(15,23,42,0.1)',
                    marginLeft: '1px',
                  }}
                >
                  <span
                    className="absolute rounded-full"
                    style={{
                      left: '-6px',
                      top: '4px',
                      width: '12px',
                      height: '12px',
                      background: '#0ea5e9',
                      border: '2px solid #ffffff',
                    }}
                  />
                  {item.date && (
                    <p className="t-label mb-1" style={{ color: '#0ea5e9' }}>
                      {item.date}
                    </p>
                  )}
                  <h3 className="t-title mb-1" style={{ color: '#0f172a' }}>
                    {item.title}
                  </h3>
                  {item.body && (
                    <p className="t-body-sm" style={{ color: '#475569' }}>
                      {item.body}
                    </p>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )

    case 'logos':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {block.items.map((item, i) =>
              item.src ? (
                <img
                  key={i}
                  src={item.src}
                  alt={item.label}
                  style={{ height: 28, width: 'auto', filter: 'brightness(0) opacity(0.55)' }}
                />
              ) : (
                <span
                  key={i}
                  className="t-tag px-4 py-2 rounded-full"
                  style={{
                    background: '#f0f9ff',
                    color: '#0369a1',
                    border: '1px solid rgba(14,165,233,0.2)',
                  }}
                >
                  {item.label}
                </span>
              )
            )}
          </div>
        </div>
      )

    case 'carousel':
      return <InlineGallery items={block.items} ratio={block.ratio} />

    case 'beforeAfter':
      return (
        <figure className="m-0">
          <BeforeAfterSlider
            beforeSrc={block.beforeSrc}
            afterSrc={block.afterSrc}
            ratio={block.ratio}
            beforeLabel={block.beforeLabel}
            afterLabel={block.afterLabel}
          />
          {block.caption && (
            <figcaption className="t-body-sm mt-3" style={{ color: '#94a3b8' }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'statChart': {
      const max = Math.max(...block.data, 1)
      return (
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p
              className="font-black leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 5.5rem)',
                color: '#0ea5e9',
              }}
            >
              {block.value}
            </p>
            <p className="t-title mt-3" style={{ color: '#0f172a' }}>
              {block.label}
            </p>
            {block.caption && (
              <p className="t-body-sm mt-4" style={{ color: '#475569', maxWidth: '30rem' }}>
                {block.caption}
              </p>
            )}
          </div>
          <div className="flex items-end gap-1.5" style={{ height: '120px' }} aria-hidden="true">
            {block.data.map((d, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${Math.max((d / max) * 100, 3)}%`,
                  background: '#0ea5e9',
                  opacity: 0.35 + (i / Math.max(block.data.length - 1, 1)) * 0.65,
                  borderRadius: '5px 5px 0 0',
                }}
              />
            ))}
          </div>
        </div>
      )
    }

    case 'takeaways':
      return (
        <div
          style={{
            background: '#f0f9ff',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
            {block.heading ?? 'Key takeaways'}
          </p>
          <ul className="flex flex-col gap-4">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="t-body-lg flex items-start gap-3"
                style={{ color: '#0f172a' }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ marginTop: '0.2em' }}
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="11" fill="#0ea5e9" />
                  <path d="M6.5 11.5l3 3 6-6.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'tileGrid': {
      let contentNum = 0
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-10" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:auto-rows-fr">
            {block.items.map((tile, i) => {
              // image tile (no title): render a src, or a placeholder box
              if (!tile.title) {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center"
                    style={{ background: '#eceef1', borderRadius: '20px', overflow: 'hidden', minHeight: '180px' }}
                  >
                    {tile.src ? (
                      <img
                        src={tile.src}
                        alt={tile.placeholder ?? ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="t-eyebrow-sm" style={{ color: '#94a3b8' }}>
                        {tile.placeholder ?? 'Image'}
                      </span>
                    )}
                  </div>
                )
              }
              // content tile: big ghosted number, title, rule, body
              contentNum += 1
              return (
                <div
                  key={i}
                  className="flex flex-col"
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '20px',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                  }}
                >
                  <p
                    className="font-black leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.75rem',
                      color: 'rgba(15,23,42,0.13)',
                    }}
                  >
                    {String(contentNum).padStart(2, '0')}
                  </p>
                  <h3 className="t-title mt-6" style={{ color: '#0f172a' }}>
                    {tile.title}
                  </h3>
                  {tile.body && (
                    <p className="t-body-sm mt-4" style={{ color: '#64748b' }}>
                      {tile.body}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    case 'process':
      return (
        <div>
          {block.label && (
            <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
              {block.label}
            </p>
          )}
          {block.heading && (
            <h2 className="t-h3 mb-10" style={{ color: '#0f172a' }}>
              {block.heading}
            </h2>
          )}
          <div className="flex flex-col md:flex-row md:items-stretch gap-3">
            {block.steps.flatMap((step, i) => {
              const card = (
                <div
                  key={`s${i}`}
                  className="md:flex-1 flex flex-col gap-3"
                  style={{
                    background: '#f5f5f5',
                    borderRadius: '24px',
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  }}
                >
                  <h3 className="t-title" style={{ color: '#0f172a' }}>
                    {step.title}
                  </h3>
                  {step.body && (
                    <p className="t-body-sm" style={{ color: '#64748b' }}>
                      {step.body}
                    </p>
                  )}
                </div>
              )
              if (i === 0) return [card]
              const arrow = (
                <div
                  key={`a${i}`}
                  className="flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <svg
                    className="rotate-90 md:rotate-0"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ color: '#cbd5e1' }}
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )
              return [arrow, card]
            })}
          </div>
        </div>
      )

    default:
      return null
  }
}

export default function WorkBody({ project }: { project: Project }) {
  return (
    <section className="px-6 md:px-14 py-24 md:py-28" style={{ background: '#ffffff' }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-24">
        {project.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </div>
    </section>
  )
}
