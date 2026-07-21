import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

// Generated at build time into out/sitemap.xml. /blocks is deliberately
// excluded — it's an internal reference page.

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://moizalam.com'
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    ...projects
      .filter((p) => p.published)
      .map((p) => ({
        url: `${base}/work/${p.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
  ]
}
