// Single source of truth for featured work, read by both the home grid
// (components/FeaturedWork.tsx) and the detail pages (app/work/[slug]/page.tsx).

export type Block =
  | { type: 'section'; label?: string; heading: string; body?: string[]; bullets?: string[] }
  | { type: 'image'; src?: string; ratio?: string; caption?: string }
  | { type: 'gallery'; items: { src?: string; ratio?: string; caption?: string; tint?: boolean }[] }
  | { type: 'callout'; text: string; attribution?: string }
  | { type: 'quote'; label?: string; text: string; attribution?: string }
  | { type: 'metrics'; items: { value: string; label: string }[] }
  | {
      type: 'points'
      label?: string
      heading?: string
      items: { title: string; body: string }[]
    }
  | {
      // text + image side by side (stacks on mobile)
      type: 'split'
      label?: string
      heading?: string
      body?: string[]
      bullets?: string[]
      src?: string
      ratio?: string
      caption?: string
      imageSide?: 'left' | 'right'
    }
  | { type: 'fullbleed'; src?: string; ratio?: string; caption?: string }
  | { type: 'stat'; value: string; label: string; caption?: string }
  | {
      type: 'columns'
      label?: string
      heading?: string
      items: { heading?: string; body: string[] }[]
    }
  | {
      // multi-image grid (3 across on desktop)
      type: 'photos'
      items: { src?: string; ratio?: string; caption?: string }[]
    }
  | { type: 'embed'; src?: string; ratio?: string; caption?: string; title?: string }
  | {
      type: 'timeline'
      label?: string
      heading?: string
      items: { date?: string; title: string; body?: string }[]
    }
  | {
      // grayscale logos (with src) or tech/tool pills (label only)
      type: 'logos'
      label?: string
      items: { label: string; src?: string }[]
    }
  | {
      // draggable before/after image comparison
      type: 'beforeAfter'
      beforeSrc?: string
      afterSrc?: string
      ratio?: string
      beforeLabel?: string
      afterLabel?: string
      caption?: string
    }
  | { type: 'statChart'; value: string; label: string; caption?: string; data: number[] }
  | { type: 'takeaways'; heading?: string; items: string[] }
  | {
      // horizontal process/pipeline, connected steps with arrows between them.
      // Stacks vertically on mobile (arrows point down). Best with 3–5 steps.
      type: 'process'
      label?: string
      heading?: string
      steps: { title: string; body?: string }[]
    }
  | {
      // auto-advancing gallery: full-width main image with a clickable thumbnail
      // strip below. Rotates every 5s (clicking a thumb resets the timer);
      // arrows appear when the thumbnails overflow their single row.
      type: 'carousel'
      ratio?: string
      items: { src?: string; caption?: string }[]
    }
  | {
      // responsive 3-column tile grid. Content tiles (with a title) auto-number
      // in order; image tiles (no title) render a src or a placeholder box.
      type: 'tileGrid'
      label?: string
      heading?: string
      items: { title?: string; body?: string; src?: string; placeholder?: string }[]
    }

export type Project = {
  slug: string
  // set true once the real case study is written; unpublished projects are
  // hidden from the home grid and don't get a /work/[slug] page built
  published?: boolean
  // card (home grid)
  title: string
  description: string
  tags: string[]
  placeholder: string
  image: string | null
  // brand/product logo shown on the card thumbnail (bottom-left); rendered white via CSS filter
  logo?: string | null
  // detail page
  year: string
  company: string
  platform: string
  liveUrl?: string
  heroImage?: string | null
  heroPlaceholder: string
  // optional override for the hero meta strip (defaults to Company/Platform/Year)
  heroMeta?: [string, string][]
  tldr: {
    statement: string
    paragraph: string
    facts?: { label: string; value: string }[]
  }
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
      `This is placeholder copy for ${title}. Replace it with the real narrative, what the problem was, who it affected, and why it mattered now.`,
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
    published: true,
    title: 'edX Mobile App Rewrite',
    description:
      'Legacy edX mobile apps rebuilt as modern native iOS and Android, on a tight timeline.',
    tags: ['Mobile', 'Platform Rewrite', 'Product Delivery'],
    placeholder: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
    image: '/work/edx-featured.png',
    logo: '/logos/edX by 2U logo.svg',
    year: '2023',
    company: 'edX',
    platform: 'iOS · Android',
    liveUrl: 'https://www.edx.org/',
    heroImage: '/work/edx-hero.png',
    heroPlaceholder: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
    heroMeta: [
      ['Company', 'edX'],
      ['Role', 'Product Manager'],
      ['Platform', 'iOS & Android'],
    ],
    tldr: {
      statement:
        'A ground-up rewrite of the edX mobile apps, shipped across iOS and Android without disrupting millions of active learners.',
      paragraph:
        'I led the product side of rebuilding edX’s iOS and Android apps: scoping the MVP, aligning teams across three organizations, and steering a high-stakes launch that kept reliability rock-solid.',
      facts: [
        { label: 'Role', value: 'Product lead' },
        { label: 'Teams', value: '3 orgs, 1 roadmap' },
        { label: 'Reliability', value: '99%+ crash-free' },
      ],
    },
    blocks: [
      {
        type: 'section',
        label: 'The Challenge',
        heading: 'A platform learners trusted, on architecture that couldn’t carry the future',
        body: [
          'The edX mobile apps were stable and serving learners at scale. But the architecture underneath had hit its limit: it was getting harder to build the experiences we wanted, and harder for internal teams and the Open edX community to contribute.',
          'This was never a rescue mission for a broken app. As a major contributor to the Open edX ecosystem, edX had a chance to move onto a modern native foundation that both edX.org learners and the wider community could build on for years.',
        ],
      },
      {
        type: 'callout',
        text: 'Rebuild everything on a modern foundation, while preserving the reliability, quality, and learner trust the existing apps had already earned.',
      },
      {
        type: 'image',
        src: '/work/edx-learn.png',
      },
      {
        type: 'section',
        label: 'Approach',
        heading: 'Ruthless scope, one roadmap, many teams',
        body: [
          'I owned the product side end to end, scope definition, roadmap, delivery coordination, launch planning, and stakeholder communication.',
          'We anchored on an MVP at ~80% feature parity with production, making explicit calls on what had to ship at launch versus what could follow. Every decision was weighed against timeline, learner impact, and the risk of disrupting familiar behavior.',
        ],
        bullets: [
          'Aligned three organizations, edX.org mobile, TouchApp Media, and Open edX contributors (Racoon Gang, Schema Education), around a single roadmap and shared ways of working',
          'Set up cross-team planning, async updates, internal and community demos, decision logs, and clear blocker escalation',
          'Partnered with design and engineering so the apps weren’t just modern under the hood, but meaningfully better for learners',
          'Worked with branding and UX on store presence, preview assets, and the “What’s New” moment, so it landed as a product release, not a migration',
        ],
      },
      {
        type: 'gallery',
        items: [
          { src: '/work/edx-dates.png' },
          { src: '/work/edx-dark.png' },
        ],
      },
      {
        type: 'points',
        label: 'What made it complex',
        heading: 'Not a rewrite, a multi-team product transformation',
        items: [
          {
            title: 'Coordination without authority',
            body: 'Internal teams, external partners, and community contributors, each with different ownership models and working styles. My job was to align priorities and keep everyone moving together toward one launch.',
          },
          {
            title: 'Holding the line on scope',
            body: 'A rewrite invites an endless wish list. We made disciplined trade-offs across parity, learner experience, accessibility, in-app purchases, analytics, and release readiness, ambitious enough to justify the rewrite, focused enough to ship.',
          },
          {
            title: 'Launching without regressions',
            body: 'The quality bar was already high, so success wasn’t about fixing broken metrics. It meant shipping a fully rebuilt app while preserving engagement and reliability across a large global learner base.',
          },
        ],
      },
      {
        type: 'section',
        label: 'Outcome',
        heading: 'A modern app, shipped without breaking trust',
        body: [
          'The new apps launched on iOS and Android, built with SwiftUI and Jetpack Compose, bringing a redesigned Learn tab, improved Course Home, clearer Dates, better Discussions, refreshed branding, and Dark Mode.',
          'Most importantly, the rebuild held edX’s reliability bar through the transition, and store ratings improved as learners responded to the new experience.',
        ],
      },
      {
        type: 'metrics',
        items: [
          { value: '~99%+', label: 'Crash-free stability, carried through the transition' },
          { value: 'iOS + Android', label: 'Rebuilt natively, in parallel' },
          { value: '80%', label: 'Feature parity targeted for the MVP' },
          { value: 'Higher', label: 'App Store & Play Store ratings after launch' },
        ],
      },
      {
        type: 'quote',
        text: 'A defining example of leading through ambiguity, bringing product, engineering, design, QA, branding, and community together to ship a high-stakes rewrite without compromising learner trust.',
      },
    ],
  },
  {
    slug: 'edx-in-app-payments',
    published: true,
    title: 'edX In-App Payments',
    description:
      'Native App Store and Play Store purchases that turned course upgrades into a real mobile revenue channel.',
    tags: ['Monetization', 'Mobile', 'Growth'],
    placeholder: 'linear-gradient(135deg, #091a2e 0%, #0f2d4a 100%)',
    image: null,
    logo: '/logos/edX by 2U logo.svg',
    year: '2024',
    company: 'edX',
    platform: 'iOS · Android',
    liveUrl: 'https://www.edx.org/',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #091a2e 0%, #0f2d4a 100%)',
    heroMeta: [
      ['Company', 'edX'],
      ['Role', 'Product Manager'],
      ['Platform', 'iOS & Android'],
    ],
    tldr: {
      statement:
        'Native in-app purchases that turned the edX mobile apps into a $700K+ revenue channel in year one.',
      paragraph:
        'I led product definition for in-app payments on iOS and Android at edX, working across mobile engineering, payments infrastructure, and the commerce platform to bring course upgrades natively into the app, validated first, then built and launched across thousands of courses.',
      facts: [
        { label: 'Role', value: 'Product lead' },
        { label: 'Launch', value: '3,000+ courses' },
        { label: 'Year 1 revenue', value: '$700K+' },
      ],
    },
    blocks: [
      {
        type: 'section',
        label: 'The Challenge',
        heading: 'A purchase path that sent mobile intent somewhere else',
        body: [
          'Mobile learners could discover courses, enroll, and learn inside the edX app, but they couldn’t complete a paid upgrade without leaving it. Buying meant exiting to a browser, signing in again, and working through a multi-step web checkout.',
          'For a platform with millions of mobile learners, that gap mattered: people were showing purchase intent on mobile, and the app was routing it away at exactly the moment it needed to hold on to it.',
        ],
      },
      {
        type: 'callout',
        text: 'Bring the payment experience into the app, and get from upgrade intent to purchase in as few taps as possible.',
      },
      {
        type: 'beforeAfter',
        beforeLabel: 'Web checkout',
        afterLabel: 'Native in-app purchase',
        caption: 'Placeholder: the old path left the app, signed learners in again, and finished on a web checkout. The new path completed the upgrade without ever leaving the course.',
      },
      {
        type: 'process',
        label: 'Approach',
        heading: 'Validating intent before building anything',
        steps: [
          {
            title: 'Painted door test',
            body: 'Surfaced the upgrade option inside the learning experience to see if learners would engage with it at all.',
          },
          {
            title: 'Positive signal',
            body: 'The experiment showed meaningful purchase intent from mobile learners, enough to justify real investment.',
          },
          {
            title: 'Native build greenlit',
            body: 'Moved forward with a full native in-app purchase implementation for iOS and Android.',
          },
        ],
      },
      {
        type: 'section',
        heading: 'Leading product across two platforms and three systems',
        body: [
          'I owned product definition for both iOS and Android, working across mobile engineering, payments infrastructure, and the edX commerce platform. The build ran through Apple App Store and Google Play’s in-app purchase checkout flows, which meant designing around each platform’s rules for digital content, purchase handling, refunds, entitlements, and review approval.',
        ],
        bullets: [
          'Defined the purchase flow, entitlement logic, and failure states with engineering and commerce, so a failed or refunded payment never left a learner stuck mid-course',
          'Shaped the post-purchase experience so an upgrade felt instant and confirmed, not just “payment received”',
          'Partnered with the data team from the start to define conversion and revenue tracking, so mobile purchases were attributed correctly at launch instead of retrofitted after',
        ],
      },
      {
        type: 'gallery',
        items: [
          { caption: 'Placeholder: iOS App Store purchase sheet for a course upgrade.' },
          { caption: 'Placeholder: Android Play Store purchase sheet for a course upgrade.' },
        ],
      },
      {
        type: 'split',
        label: 'The constraint that shaped everything',
        heading: 'Thousands of courses, not one store product at a time',
        body: [
          'edX.org’s course library was large and constantly changing, so creating a dedicated App Store or Play Store product for every course wasn’t a scalable path.',
          'We shifted the strategy to consumable products on the mobile stores, letting the app support thousands of course upgrades without a one-to-one mapping between every edX course and a dedicated store product.',
        ],
        caption: 'Placeholder: diagram of the consumable-product model mapping store purchases to thousands of edX courses.',
      },
      {
        type: 'points',
        label: 'What made it complex',
        heading: 'Not just a checkout feature',
        items: [
          {
            title: 'Platform compliance',
            body: 'Adapting edX’s web-first commerce system to Apple and Google’s in-app purchase rules, so payments, failures, refunds, and entitlement activation all worked without breaking the learner experience.',
          },
          {
            title: 'Catalog scale',
            body: 'Thousands of eligible courses meant the solution couldn’t rely on manually configuring every course as its own store product. The consumable-product strategy kept it operationally manageable at that scale.',
          },
          {
            title: 'Measurement',
            body: 'A new revenue channel needed reliable analytics from day one, so we defined events, revenue attribution, and conversion tracking before launch, not after.',
          },
        ],
      },
      {
        type: 'section',
        label: 'Outcome',
        heading: 'A new, measurable revenue channel',
        body: [
          'In-app payments launched across 3,000+ courses on both iOS and Android.',
          'The feature generated over $700,000 in its first year, and turned the mobile app from a learning-only surface into a real monetization channel for edX.',
        ],
      },
      {
        type: 'metrics',
        items: [
          { value: '$700K+', label: 'Revenue generated in the first year' },
          { value: '3,000+', label: 'Courses enabled for native in-app purchase' },
          { value: 'iOS + Android', label: 'Launched natively across both platforms' },
        ],
      },
      {
        type: 'quote',
        text: 'A clear example of product work where the value was measurable: validated learner intent, solved for platform and catalog complexity, cut checkout friction, and unlocked revenue the app couldn’t capture before.',
      },
    ],
  },
  {
    slug: 'interiors-source',
    published: true,
    title: 'Interiors Source',
    description:
      '0→1 discovery for a B2B trade marketplace, run on an AI-first product workflow.',
    tags: ['Marketplace', '0→1 Discovery', 'AI Workflow'],
    placeholder: 'linear-gradient(135deg, #0a1f1a 0%, #103028 100%)',
    image: '/work/interiors-source-hero.png',
    logo: '/logos/Interiors Source Logo.svg',
    year: '2025',
    company: 'Interiors Source',
    platform: 'Web',
    heroImage: '/work/interiors-source-hero.png',
    heroPlaceholder: 'linear-gradient(135deg, #0a1f1a 0%, #103028 100%)',
    heroMeta: [
      ['Company', 'Interiors Source'],
      ['Role', 'Product Manager'],
      ['Platform', 'B2B Marketplace'],
    ],
    tldr: {
      statement:
        'A B2B trade marketplace taken from a broad, ambiguous vision to a clear, buildable MVP in two weeks, using an AI-first discovery workflow.',
      paragraph:
        'I led discovery and product definition for Interiors Source, a marketplace built to unify the fragmented workflows of interior-design trade professionals, suppliers, and clients. Using AI as an operating layer for research, synthesis, and prototyping, I compressed 0→1 discovery and aligned the client and team around a sharp, defensible MVP scope.',
      facts: [
        { label: 'Role', value: 'Product lead, discovery' },
        { label: 'Timeline', value: '2 weeks, concept → MVP' },
        { label: 'Approach', value: 'AI-first workflow' },
      ],
    },
    blocks: [
      {
        type: 'section',
        label: 'The Challenge',
        heading: 'A trade industry that ran on relationships, not systems',
        body: [
          'Interiors Source set out to build a B2B trade marketplace for the interior-design industry: one platform to reduce the fragmentation across a wide cast of actors. That cast included interior designers as the primary user, plus their end clients, vendors and manufacturers, general contractors and developers, retailers, and the internal team running operations.',
          'The opportunity wasn’t simply to “put products online.” The real challenge was understanding how the pieces of the trade journey could come together in one seamless flow: discovery, pricing visibility, trade access, quoting, wishlists, project management, purchasing, payments, order tracking, and logistics.',
          'This was a space where work happened through supplier relationships, scattered catalogs, email threads, and phone calls. It was manual, offline, and rarely connected through technology.',
        ],
      },
      {
        type: 'callout',
        text: 'Bring clarity to the ambiguity: understand the market, map the trade journey, define the business model, align stakeholders, and translate a broad vision into a buildable MVP.',
      },
      {
        type: 'image',
        src: '/work/interiors-source-fragmented-journey.png',
        ratio: '16 / 9',
        caption: 'How sourcing worked before Interiors Source: a designer at the center of a dozen disconnected tools.',
      },
      {
        type: 'section',
        label: 'Approach',
        heading: 'One PM, one connected workflow',
        body: [
          'The usual 0→1 model splits the work across people and weeks: a PM runs discovery and research, hands findings to a designer, waits for a prototype, and pays for every revision in days. On Interiors Source, it was a single connected loop. I ran the interviews, the research, and the prototyping myself, with AI as the connective tissue between them.',
          'Instead of a stack of documents, the whole vision became something we could see, which made the scope calls (ship now, simplify, defer) far sharper.',
        ],
      },
      {
        type: 'tileGrid',
        label: 'The AI workflow',
        heading: 'How the pieces connected',
        items: [
          {
            title: 'AI notetakers',
            body: 'Captured every discovery session accurately, so I could drive the conversation instead of scribbling notes.',
          },
          {
            title: 'Consistent context',
            body: 'Fed those transcripts into LLMs to synthesize inputs and keep decisions structured and consistent.',
          },
          { src: '/work/interiors-source-prototyping.png', placeholder: 'AI prototyping' },
          { src: '/work/interiors-source-notetaker.png', placeholder: 'AI notetaker' },
          {
            title: 'Grounded research',
            body: 'That shared context sharpened market and tooling research across the trade workflow.',
          },
          {
            title: 'Tailored prototypes',
            body: 'Flows built fast and cheap, using industry-standard patterns shaped to the Interiors Source vision.',
          },
        ],
      },
      {
        type: 'timeline',
        label: 'How it unfolded',
        heading: 'Five discovery sessions, then into the build',
        items: [
          {
            date: 'Sessions 1–2',
            title: 'Users & use cases',
            body: 'Mapped every actor in the trade: designers as the primary user, plus end clients, vendors, GCs and developers, retailers, and admins. Captured their pain points, how they get work done today, and what the ideal solution looks like.',
          },
          {
            date: 'Session 3',
            title: 'Market & tooling landscape',
            body: 'What solutions already exist, and the tools trade pros stitch together for sourcing, communication, quoting, and project management.',
          },
          {
            date: 'Start of ideation',
            title: 'AI prototyping begins',
            body: 'Started building the first flows straight out of discovery, covering catalog, pricing, and quoting, all tailored to Interiors Source and ready to react to.',
          },
          {
            date: 'Session 4',
            title: 'Launch priorities & early validation',
            body: 'What’s essential for launch, how monetization works, and the gaps still open, alongside early validation on the first prototype flows.',
          },
          {
            date: 'Session 5',
            title: 'Business model & validation',
            body: 'Quoting, commissions, the business model, and project management, all reviewed against the live prototype rather than a deck.',
          },
          {
            date: 'Next',
            title: 'Into MVP development',
            body: 'The prototype and discovery report carried straight into the build as a living reference for engineering and design.',
          },
        ],
      },
      {
        type: 'callout',
        text: 'Because prototyping ran alongside the last two sessions, we reviewed working flows instead of slideware, and tested assumptions in days, not weeks.',
      },
      {
        type: 'gallery',
        items: [
          {
            src: '/work/interiors-source-proto-catalog.png',
            ratio: '16 / 9',
            tint: true,
            caption: 'Marketplace browsing: trade pricing shown against MSRP, with category, color, and delivery filters.',
          },
          {
            src: '/work/interiors-source-proto-quote.png',
            ratio: '16 / 9',
            tint: true,
            caption: 'Pricing and commission: trade vs MSRP per item, client discounts, and commission calculated automatically.',
          },
        ],
      },
      {
        type: 'points',
        label: 'What made it complex',
        heading: 'Several product models, fused into one platform',
        items: [
          {
            title: 'Many products in one',
            body: 'Interiors Source was part marketplace, part trade portal, part workflow tool, and eventually part project-management system. Each model carried its own logic, and they all had to coexist.',
          },
          {
            title: 'Different needs per user',
            body: 'Trade professionals, end clients, suppliers, and internal admins couldn’t all see or do the same things. Role-based permissions and expectations shaped nearly every flow.',
          },
          {
            title: 'Pricing vs product',
            body: 'Trade tiers, pricing visibility, commissions, and purchase flows affected the product experience so business model alignment and MVP scoping had to happen together.',
          },
        ],
      },
      {
        type: 'callout',
        text: 'The biggest product challenge was avoiding an overloaded MVP. When the vision is broad, every feature feels important, but the AI-assisted prototypes made the trade-offs tangible enough to actually make.',
      },
      {
        type: 'section',
        heading: 'So, one question shaped the MVP',
        body: [
          'Would interior designers actually adopt a centralized sourcing marketplace in their day-to-day workflow?',
          'The core value proposition was clear: give designers one place to browse products across brands and vendors, access trade pricing, save selections, share them with clients, and complete purchases on-platform. So the MVP was deliberately kept focused on the smallest experience needed to test that behavior.',
          'Anything that was not required to prove adoption was kept manual or deferred. Vendor onboarding and order status updates could be handled by the Interiors Source team in the early stage, giving the business a real workflow without overbuilding automation too soon.',
          'Larger product bets like project management, trade professional profiles, community features, advanced vendor logistics, and AI renderings stayed on the roadmap for later phases.',
        ],
      },
      {
        type: 'section',
        label: 'Outcome',
        heading: 'A foundation the team could build on',
        body: [
          'Interiors Source moved from a broad product concept to a clear, buildable MVP scope in two weeks. The process aligned the client and internal team around the core marketplace experience, while cleanly separating the immediate MVP from future capabilities.',
          'The result was a product foundation that gave design and engineering enough clarity to move into execution without losing sight of the larger vision.',
        ],
      },
      {
        type: 'stat',
        value: '2 weeks',
        label: 'From kickoff to a locked MVP scope',
        caption: 'Discovery, synthesis, prototyping, and stakeholder alignment accelerated through an AI-assisted workflow.',
      },
      {
        type: 'quote',
        label: 'What I took away',
        text: 'AI can meaningfully change early-stage product work. Not by replacing product judgment, but by helping a PM explore more options, synthesize faster, align stakeholders earlier, and make sharper scope decisions under ambiguity.',
      },
    ],
  },
  {
    slug: 'juniper',
    title: 'Juniper by Arbisoft',
    description:
      'An internal product movement, hackathons, incubation, and a stronger product culture.',
    tags: ['Product Culture', 'Incubation', 'Leadership'],
    placeholder: 'linear-gradient(135deg, #1a1020 0%, #2a1a38 100%)',
    image: null,
    logo: '/logos/Juniper logo.svg',
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
    published: true,
    title: 'Idea Bank',
    description:
      'A lightweight internal idea platform, shipped solo in two weeks with AI-assisted dev.',
    tags: ['Internal Tool', 'AI-assisted Build', 'Community'],
    placeholder: 'linear-gradient(135deg, #0f1e30 0%, #1c3248 100%)',
    image: '/work/idea-bank-hero.png',
    logo: '/logos/Juniper logo.svg',
    year: '2025',
    company: 'Arbisoft',
    platform: 'Web',
    heroImage: '/work/idea-bank-hero.png',
    heroPlaceholder: 'linear-gradient(135deg, #0f1e30 0%, #1c3248 100%)',
    heroMeta: [
      ['Company', 'Arbisoft'],
      ['Role', 'Product Manager'],
      ['Platform', 'Internal Web'],
    ],
    tldr: {
      statement:
        'A lightweight internal idea platform, taken from discovery to MVP launch in two weeks, solo, with AI-assisted development.',
      paragraph:
        'As part of Juniper, Arbisoft’s internal innovation initiative, I built the Idea Bank: a platform where employees submit, discuss, and build traction around product ideas. I ran discovery, scoped the MVP, and built, tested, and launched it myself, no dedicated engineering team, just AI-assisted tools and a disciplined, tight scope.',
      facts: [
        { label: 'Role', value: 'Product lead & solo builder' },
        { label: 'Timeline', value: '2 weeks, concept → launch' },
        { label: 'Adoption', value: '200+ employees' },
      ],
    },
    blocks: [
      {
        type: 'section',
        label: 'Context',
        heading: 'Juniper needed a home for product ideas',
        body: [
          'Juniper is an internal initiative I lead at Arbisoft to build stronger product thinking, experimentation, and innovation across the company. Idea Bank grew out of it: a lightweight platform where employees could submit ideas, discuss them, and build traction around the ones worth pursuing.',
          'The goal wasn’t just to collect ideas. It was to create a visible space where product conversations could happen more naturally across teams, not just inside product or leadership.',
        ],
      },
      {
        type: 'section',
        label: 'The Challenge',
        heading: 'Good ideas with nowhere to go',
        body: [
          'Arbisoft had plenty of product-minded people, but no structured channel for ideas to surface, evolve, and gain traction. Good ideas were scattered across Slack threads, hallway conversations, and personal notes. Some people had ideas but didn’t know where to take them; others wanted to build on someone else’s thinking but had no shared space to even find it.',
          'The deeper challenge was cultural, not operational. Through Juniper, we wanted product conversations to feel like anyone’s territory, problems, opportunities, ideas, not something reserved for PMs or leadership.',
        ],
      },
      {
        type: 'callout',
        text: 'Build a low-friction platform where anyone at Arbisoft could share an idea, engage with someone else’s, and help the good ones move toward evaluation and incubation.',
      },
      {
        type: 'section',
        label: 'Approach',
        heading: 'Product thinking and solo execution, in two weeks',
        body: [
          'I approached Idea Bank like a product from day one, and took it from discovery to MVP launch in two weeks. Discovery came first: understanding why ideas weren’t being shared consistently, what friction got in the way, and what would make people comfortable contributing. That shaped a focused MVP scope, small enough to build fast, test internally, and improve from real usage.',
          'There was no dedicated engineering or sprint team behind it. I built and launched the platform myself using AI-assisted development tools, handling the product thinking, scope, build, QA, launch, and iteration end to end.',
        ],
        bullets: [
          'Submit an idea, browse what others had shared, upvote, and comment',
          'Small gamification layered on top, leaderboards, badges, awards, to make participation feel visible and rewarding without becoming the product itself',
        ],
      },
      {
        type: 'gallery',
        items: [
          { caption: 'Placeholder: idea submission flow.' },
          { caption: 'Placeholder: leaderboard and badges.' },
        ],
      },
      {
        type: 'columns',
        label: 'Running it as an experiment',
        heading: 'Two bets, tested at once',
        items: [
          {
            heading: 'People will share, if it’s easy',
            body: [
              'That employees had ideas worth sharing, as long as the process to contribute was simple enough to lower the activation energy.',
            ],
          },
          {
            heading: 'AI can stand in for a delivery team',
            body: [
              'That AI-assisted development could take a product manager from concept to a working launch without waiting on a traditional engineering team.',
            ],
          },
        ],
      },
      {
        type: 'points',
        label: 'What made this complex',
        heading: 'Not a feature problem, a behavior problem',
        items: [
          {
            title: 'Simple, but structured',
            body: 'The product had to feel simple enough for anyone to use, but structured enough that the ideas stayed useful. Too formal, and people hesitate to contribute. Too casual, and nothing is actionable.',
          },
          {
            title: 'Earning trust',
            body: 'People needed to believe that submitting an idea was worth it, that it would be seen, and that good ideas had a real shot at moving forward.',
          },
          {
            title: 'PM and builder, at once',
            body: 'The build was its own experiment in AI-assisted development. I had to define scope, make trade-offs, test flows, and fix issues, while keeping the product focused enough to launch in two weeks.',
          },
        ],
      },
      {
        type: 'section',
        label: 'Outcome',
        heading: 'A space that changed who gets to have product ideas',
        body: [
          'Idea Bank has been adopted by 200+ employees at Arbisoft, creating a visible space for people to share, discuss, and build on product ideas.',
          'It also surfaced a pattern worth noticing: some people are strong at spotting problems and proposing ideas, others are excited to execute and refine them. Idea Bank brought both groups into the same space, and let them find each other.',
          'Beyond the product itself, Idea Bank became part of Juniper’s broader product incubation engine, giving Arbisoft a practical way to capture internal ideas, build product conversations, and identify concepts worth deeper evaluation.',
        ],
      },
      {
        type: 'metrics',
        items: [
          { value: '200+', label: 'Employees actively using Idea Bank' },
          { value: '2 weeks', label: 'From discovery to MVP launch' },
          { value: 'Solo', label: 'Built end-to-end with AI-assisted development, no dedicated eng team' },
        ],
      },
      {
        type: 'quote',
        text: 'Idea Bank became proof of what AI-assisted solo development can unlock for product managers, not a replacement for engineering teams, but a way to move faster from idea to working product when the scope is clear and the process is disciplined.',
      },
    ],
  },
  {
    slug: 'benchprep',
    title: 'BenchPrep',
    description:
      'Incubating an AI-powered mock interview platform for candidates and hiring teams.',
    tags: ['AI Product', 'Incubation', 'HR Tech'],
    placeholder: 'linear-gradient(135deg, #0d1c0e 0%, #162e18 100%)',
    image: null,
    logo: '/logos/Arbisoft Logo.svg',
    year: '2026',
    company: 'Arbisoft',
    platform: 'Web',
    heroImage: null,
    heroPlaceholder: 'linear-gradient(135deg, #0d1c0e 0%, #162e18 100%)',
    tldr: {
      statement: 'An AI-powered mock interview platform, in incubation.',
      paragraph:
        'Building a product that helps candidates practice and hiring teams evaluate, currently being incubated 0→1.',
    },
    blocks: defaultBlocks('BenchPrep'),
  },
]

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)
