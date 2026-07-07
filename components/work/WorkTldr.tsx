import type { Project } from '@/data/projects'

export default function WorkTldr({ project }: { project: Project }) {
  return (
    <section
      className="px-6 md:px-14 pt-16 pb-24 md:pt-20 md:pb-28"
      style={{ background: '#f5f5f5', borderRadius: '0 0 80px 80px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-start">
          <h2 className="t-h3" style={{ color: '#0f172a' }}>
            {project.tldr.statement}
          </h2>
          <p className="t-body-lg md:pt-2" style={{ color: '#475569' }}>
            {project.tldr.paragraph}
          </p>
        </div>

        {project.tldr.facts && project.tldr.facts.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 mt-12 md:mt-16 pt-10"
            style={{ borderTop: '1px solid rgba(15,23,42,0.1)' }}
          >
            {project.tldr.facts.map((fact) => (
              <div key={fact.label}>
                <p className="t-eyebrow mb-2" style={{ color: '#0ea5e9' }}>
                  {fact.label}
                </p>
                <p
                  className="font-black leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
                    color: '#0f172a',
                  }}
                >
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
