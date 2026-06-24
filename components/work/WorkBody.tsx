import type { Block, Project } from '@/data/projects'

// Rounded gradient placeholder used for image / gallery blocks until the
// user drops in real screenshots. Mirrors the FeaturedWork card treatment.
function ImagePlaceholder({ ratio = '16 / 9', caption }: { ratio?: string; caption?: string }) {
  return (
    <figure className="m-0">
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
      {caption && (
        <figcaption className="t-body-sm mt-3" style={{ color: '#94a3b8' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function BlockView({ block }: { block: Block }) {
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
          <div className="flex flex-col gap-4">
            {block.body.map((para, i) => (
              <p key={i} className="t-body-lg" style={{ color: '#475569' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )

    case 'image':
      return <ImagePlaceholder ratio={block.ratio} caption={block.caption} />

    case 'gallery':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {block.items.map((item, i) => (
            <ImagePlaceholder key={i} ratio={item.ratio} caption={item.caption} />
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
