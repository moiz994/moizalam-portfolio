import type { Project } from '@/data/projects'

export default function WorkTldr({ project }: { project: Project }) {
  return (
    <section
      className="px-6 md:px-14 pt-16 pb-24 md:pt-20 md:pb-28"
      style={{ background: '#f5f5f5', borderRadius: '0 0 80px 80px' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <h2 className="t-h3" style={{ color: '#0f172a' }}>
            {project.tldr.statement}
          </h2>
          <p className="t-body-lg md:pt-2" style={{ color: '#475569' }}>
            {project.tldr.paragraph}
          </p>
        </div>
      </div>
    </section>
  )
}
