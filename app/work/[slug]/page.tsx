import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, getProject } from '@/data/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkHero from '@/components/work/WorkHero'
import WorkTldr from '@/components/work/WorkTldr'
import WorkBody from '@/components/work/WorkBody'
import WorkCta from '@/components/work/WorkCta'

export function generateStaticParams() {
  return projects.filter((p) => p.published).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} · Moiz Alam`,
    description: project.description,
  }
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <div style={{ background: '#05101e' }}>
      <main
        style={{ borderRadius: '0 0 80px 80px', overflow: 'hidden', background: '#ffffff' }}
      >
        <Navbar />
        <WorkHero project={project} />
        <WorkTldr project={project} />
        <WorkBody project={project} />
        <WorkCta />
      </main>
      <Footer />
    </div>
  )
}
