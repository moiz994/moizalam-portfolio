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
    openGraph: {
      title: `${project.title} · Moiz Alam`,
      description: project.description,
      url: `https://moizalam.com/work/${project.slug}`,
      siteName: 'Moiz Alam',
      type: 'article',
      // defining openGraph here replaces the root metadata's, so the branded
      // card has to be re-attached explicitly
      images: ['/og-card.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · Moiz Alam`,
      description: project.description,
      images: ['/og-card.png'],
    },
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
