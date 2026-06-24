// Single source of truth for featured work — read by both the home grid
// (components/FeaturedWork.tsx) and the detail pages (app/work/[slug]/page.tsx).

export type Block =
  | { type: 'section'; label?: string; heading: string; body: string[] }
  | { type: 'image'; ratio?: string; caption?: string }
  | { type: 'gallery'; items: { ratio?: string; caption?: string }[] }
  | { type: 'callout'; text: string; attribution?: string }

export type Project = {
  slug: string
  // card (home grid)
  title: string
  description: string
  tags: string[]
  placeholder: string
  image: string | null
  // detail page
  year: string
  company: string
  platform: string
  liveUrl?: string
  heroImage?: string | null
  heroPlaceholder: string
  tldr: { statement: string; paragraph: string }
  blocks: Block[]
}

// A couple of reusable default blocks so every route renders even before
// the user writes the real case study.
const defaultBlocks = (title: string): Block[] => [
  {
    type: 'section',
    label: 'Overview',
    heading: 'The story behind the work',
    body: [
      `This is placeholder copy for ${title}. Replace it with the real narrative — what the problem was, who it affected, and why it mattered now.`,
      'Keep it tight and outcome-focused. The home page already carries the one-liner; this page is where the thinking gets room to breathe.',
    ],
  },
  { type: 'image', ratio: '16 / 9', caption: 'Add a hero shot or key screen here.' },
  {
    type: 'section',
    label: 'Approach',
    heading: 'How it came together',
    body: [
      'Placeholder paragraph describing the approach, the key decisions, and the tradeoffs made along the way.',
    ],
  },
  {
    type: 'callout',
    text: 'Drop a standout result or a quote here.',
  },
]

export const projects: Project[] = [
  {
    slug: 'edx-mobile-app-rewrite',
    title: 'edX Mobile App Rewrite',
    description:
      'Legacy mobile experience rebuilt into modern native iOS and Android apps under a tight delivery window.',
    tags: ['Mobile', 'Platform Rewrite', 'Product Delivery'],
    placeholder: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
    image: null,
    year: '2023',
    company: 'edX',
    platform: 'iOS · Android',
    liveUrl: 'https://www.edx.org/',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
    tldr: {
      statement: 'A full native rewrite of the edX learner apps, shipped under a tight delivery window.',
      paragraph:
        'We rebuilt the legacy mobile experience into modern native iOS and Android apps — coordinating product, engineering, design, and platform teams to ship without disrupting millions of active learners.',
    },
    blocks: [
      {
        type: 'section',
        label: 'The problem',
        heading: 'A legacy app holding the experience back',
        body: [
          'Placeholder: describe the state of the legacy mobile apps — the performance issues, the maintenance burden, and what it was costing the learner experience.',
          'Set up the stakes and the constraint: a tight delivery window with a large, active user base that could not be disrupted.',
        ],
      },
      { type: 'image', ratio: '16 / 9', caption: 'Before / after, or the new app home screen.' },
      {
        type: 'section',
        label: 'Approach',
        heading: 'Rebuilding native, team by team',
        body: [
          'Placeholder: how the rewrite was scoped and sequenced across iOS and Android, and how cross-functional teams were coordinated.',
        ],
      },
      {
        type: 'gallery',
        items: [
          { ratio: '3 / 4', caption: 'iOS screen' },
          { ratio: '3 / 4', caption: 'Android screen' },
        ],
      },
      {
        type: 'callout',
        text: 'Add a headline outcome here — adoption, performance, or delivery metric.',
      },
    ],
  },
  {
    slug: 'edx-in-app-payments',
    title: 'edX In-App Payments',
    description:
      'Scaled mobile monetization by enabling Apple Pay and Google Pay upgrades across thousands of courses.',
    tags: ['Monetization', 'Mobile', 'Growth'],
    placeholder: 'linear-gradient(135deg, #091a2e 0%, #0f2d4a 100%)',
    image: null,
    year: '2024',
    company: 'edX',
    platform: 'iOS · Android',
    liveUrl: 'https://www.edx.org/',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #091a2e 0%, #0f2d4a 100%)',
    tldr: {
      statement: 'Native in-app payments that unlocked mobile monetization at scale.',
      paragraph:
        'Enabled Apple Pay and Google Pay upgrades across thousands of courses, turning the mobile apps into a real revenue surface.',
    },
    blocks: defaultBlocks('edX In-App Payments'),
  },
  {
    slug: 'interiors-source',
    title: 'Interiors Source',
    description:
      'Compressed 0→1 discovery for a B2B trade marketplace using an AI-first product workflow.',
    tags: ['Marketplace', '0→1 Discovery', 'AI Workflow'],
    placeholder: 'linear-gradient(135deg, #0a1f1a 0%, #103028 100%)',
    image: null,
    year: '2025',
    company: 'Interiors Source',
    platform: 'Web',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #0a1f1a 0%, #103028 100%)',
    tldr: {
      statement: 'A compressed 0→1 discovery for a B2B trade marketplace.',
      paragraph:
        'Used an AI-first product workflow to move from ambiguity to a validated direction in a fraction of the usual time.',
    },
    blocks: defaultBlocks('Interiors Source'),
  },
  {
    slug: 'juniper',
    title: 'Juniper by Arbisoft',
    description:
      'Built an internal product movement around hackathons, incubation, community, and product culture.',
    tags: ['Product Culture', 'Incubation', 'Leadership'],
    placeholder: 'linear-gradient(135deg, #1a1020 0%, #2a1a38 100%)',
    image: null,
    year: '2025',
    company: 'Arbisoft',
    platform: 'Internal',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #1a1020 0%, #2a1a38 100%)',
    tldr: {
      statement: 'An internal product movement, built from the ground up.',
      paragraph:
        'Juniper brought together hackathons, incubation, community, and product culture into one initiative across Arbisoft.',
    },
    blocks: defaultBlocks('Juniper by Arbisoft'),
  },
  {
    slug: 'idea-bank',
    title: 'Idea Bank',
    description:
      'Designed and shipped a lightweight internal idea platform solo in two weeks using AI-assisted development.',
    tags: ['Internal Tool', 'AI-assisted Build', 'Community'],
    placeholder: 'linear-gradient(135deg, #0f1e30 0%, #1c3248 100%)',
    image: null,
    year: '2025',
    company: 'Arbisoft',
    platform: 'Web',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #0f1e30 0%, #1c3248 100%)',
    tldr: {
      statement: 'A lightweight internal idea platform, shipped solo in two weeks.',
      paragraph:
        'Designed and built end-to-end using AI-assisted development — a small tool that gave ideas a home and a path forward.',
    },
    blocks: defaultBlocks('Idea Bank'),
  },
  {
    slug: 'benchprep',
    title: 'BenchPrep',
    description:
      'Incubating an AI-powered mock interview platform for candidates and hiring teams.',
    tags: ['AI Product', 'Incubation', 'HR Tech'],
    placeholder: 'linear-gradient(135deg, #0d1c0e 0%, #162e18 100%)',
    image: null,
    year: '2026',
    company: 'Arbisoft',
    platform: 'Web',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #0d1c0e 0%, #162e18 100%)',
    tldr: {
      statement: 'An AI-powered mock interview platform, in incubation.',
      paragraph:
        'Building a product that helps candidates practice and hiring teams evaluate — currently being incubated 0→1.',
    },
    blocks: defaultBlocks('BenchPrep'),
  },
]

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)
