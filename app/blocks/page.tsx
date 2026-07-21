import Link from 'next/link'
import type { Metadata } from 'next'
import type { Block } from '@/data/projects'
import { BlockView } from '@/components/work/WorkBody'

// TEMPORARY internal reference page. Not linked anywhere in the site.
// Reachable only at /blocks. Delete this folder to remove it.

export const metadata: Metadata = {
  title: 'Content blocks · internal',
  robots: { index: false, follow: false },
}

type Entry = { name: string; when: string; block: Block }

const showcase: Entry[] = [
  {
    name: 'section',
    when: 'The workhorse — narrative prose with a label + heading. Use for Challenge, Approach, Outcome, etc.',
    block: {
      type: 'section',
      label: 'Section label',
      heading: 'A section heading goes right here',
      body: [
        'This is the body of a section block — the main way to tell the story. Keep paragraphs tight and outcome-focused.',
        'Add a second paragraph when the point needs room to breathe.',
      ],
    },
  },
  {
    name: 'section + bullets',
    when: 'Same section block, with an optional bulleted list for scannable detail.',
    block: {
      type: 'section',
      label: 'With bullets',
      heading: 'A heading followed by key points',
      body: ['An intro line, then a list of the concrete moves or decisions.'],
      bullets: [
        'First key point — short and specific',
        'Second key point — one idea per bullet',
        'Third key point — easy to skim',
      ],
    },
  },
  {
    name: 'columns',
    when: 'Two columns of text side by side. Good for before/after, problem/solution, or comparing two ideas.',
    block: {
      type: 'columns',
      label: 'Two-column text',
      heading: 'Compare two things at a glance',
      items: [
        {
          heading: 'Before',
          body: ['Describe the starting state — the problem, the old way, or the constraint you began with.'],
        },
        {
          heading: 'After',
          body: ['Describe the result — the new way, the improvement, or the state you delivered.'],
        },
      ],
    },
  },
  {
    name: 'process — pipeline / flow',
    when: 'A connected sequence of steps with arrows between them. Good for a workflow or pipeline where each step feeds the next. Runs horizontally on desktop, stacks vertically on mobile.',
    block: {
      type: 'process',
      label: 'Process label',
      heading: 'How the steps connect',
      steps: [
        { title: 'First step', body: 'What kicks the process off and what it produces.' },
        { title: 'Second step', body: 'How the first step feeds into the next.' },
        { title: 'Third step', body: 'The output that carries the sequence forward.' },
        { title: 'Fourth step', body: 'Where the pipeline lands.' },
      ],
    },
  },
  {
    name: 'callout',
    when: 'Pull one important line out of the flow — a principle, a tension, or a key decision. Sky-blue left rule.',
    block: {
      type: 'callout',
      text: 'A callout draws the eye to a single sentence that matters — the thesis, the constraint, or the turning point.',
    },
  },
  {
    name: 'quote',
    when: 'A centered pull-quote with a quotation mark. Use for reflections, testimonials, or a closing takeaway.',
    block: {
      type: 'quote',
      text: 'A quote reads bigger and calmer than a callout — good for a human voice or a reflective note.',
      attribution: '— Name, Role',
    },
  },
  {
    name: 'stat',
    when: 'A single hero number with a label and optional supporting line. Use to spotlight one figure.',
    block: {
      type: 'stat',
      value: '99%+',
      label: 'Crash-free sessions',
      caption: 'A short supporting sentence gives the number context — what it measures and why it matters.',
    },
  },
  {
    name: 'metrics',
    when: 'A row of headline numbers. Best for outcomes/impact — instantly skimmable.',
    block: {
      type: 'metrics',
      items: [
        { value: '99%+', label: 'Crash-free sessions maintained' },
        { value: '2×', label: 'Faster median load time' },
        { value: '80%', label: 'Feature parity at MVP' },
        { value: '4.6★', label: 'Post-launch store rating' },
      ],
    },
  },
  {
    name: 'points',
    when: 'Three numbered points with title + body. Great for “what made this hard,” principles, or phases.',
    block: {
      type: 'points',
      label: 'Points label',
      heading: 'Three ideas, side by side',
      items: [
        { title: 'First point', body: 'A short paragraph explaining the first idea in a sentence or two.' },
        { title: 'Second point', body: 'The second idea — keep each one to a similar length for balance.' },
        { title: 'Third point', body: 'The third idea, rounding out the trio.' },
      ],
    },
  },
  {
    name: 'image',
    when: 'A full-width image. Add a src for a real image (renders at its natural ratio); without one it shows this placeholder.',
    block: { type: 'image', ratio: '16 / 9', caption: 'Optional caption sits beneath the image.' },
  },
  {
    name: 'split — text + image',
    when: 'Text on one side, image on the other (stacks on mobile). Set imageSide to “left” or “right”.',
    block: {
      type: 'split',
      label: 'Split layout',
      heading: 'Text beside a supporting visual',
      body: ['Use this when a paragraph and an image reinforce each other — a feature and its screenshot, say.'],
      bullets: ['Pairs prose with a visual', 'Image can sit left or right'],
      ratio: '4 / 3',
      imageSide: 'right',
    },
  },
  {
    name: 'gallery — 2-up',
    when: 'Two images side by side (stacks on mobile). Works with placeholders or real images.',
    block: {
      type: 'gallery',
      items: [
        { ratio: '4 / 3', caption: 'First image' },
        { ratio: '4 / 3', caption: 'Second image' },
      ],
    },
  },
  {
    name: 'carousel — inline gallery',
    when: 'A main image with a thumbnail strip below. Auto-advances every 5 seconds (with a countdown bar on the active thumb); clicking a thumbnail jumps to it and resets the timer. Arrows appear when the thumbnails overflow their single row.',
    block: {
      type: 'carousel',
      ratio: '16 / 9',
      items: [
        { caption: 'First slide — captions swap with the image.' },
        { caption: 'Second slide caption.' },
        { caption: 'Third slide caption.' },
        { caption: 'Fourth slide caption.' },
        { caption: 'Fifth slide caption.' },
        { caption: 'Sixth slide caption.' },
        { caption: 'Seventh slide caption.' },
        { caption: 'Eighth slide caption.' },
        { caption: 'Ninth slide caption.' },
        { caption: 'Tenth slide caption.' },
      ],
    },
  },
  {
    name: 'fullbleed — wide image',
    when: 'A wide image that breaks past the text column for emphasis — good for a hero shot or a big screen.',
    block: { type: 'fullbleed', ratio: '21 / 9', caption: 'A wider-than-column image.' },
  },
  {
    name: 'photos — grid',
    when: 'A multi-image grid (3 across on desktop, 2 on mobile). Good for a set of shots that read together.',
    block: {
      type: 'photos',
      items: [
        { ratio: '1 / 1' },
        { ratio: '1 / 1' },
        { ratio: '1 / 1' },
        { ratio: '1 / 1' },
        { ratio: '1 / 1' },
        { ratio: '1 / 1' },
      ],
    },
  },
  {
    name: 'embed — video',
    when: 'A responsive video or interactive embed (YouTube, Loom, Figma). Shows a play placeholder until a src is added.',
    block: { type: 'embed', ratio: '16 / 9', caption: 'A caption can note the source or length.' },
  },
  {
    name: 'timeline',
    when: 'A vertical sequence of milestones with dates. Good for showing how a project unfolded over time.',
    block: {
      type: 'timeline',
      label: 'Timeline',
      heading: 'How it unfolded',
      items: [
        { date: 'Phase 1', title: 'Discovery & scoping', body: 'Framed the problem and locked the MVP scope.' },
        { date: 'Phase 2', title: 'Build & align', body: 'Coordinated the teams and shipped in increments.' },
        { date: 'Phase 3', title: 'Launch', body: 'Released to production and monitored the rollout.' },
      ],
    },
  },
  {
    name: 'logos / tech row',
    when: 'A row of tools, tech, or partner logos. Use text pills (shown here) or real logos by adding a src.',
    block: {
      type: 'logos',
      label: 'Tools & tech',
      items: [
        { label: 'Figma' },
        { label: 'Jira' },
        { label: 'SwiftUI' },
        { label: 'Jetpack Compose' },
        { label: 'Amplitude' },
      ],
    },
  },
  {
    name: 'before / after slider',
    when: 'Drag the handle to compare two images — great for redesigns. Uses placeholders until you add before/after src.',
    block: {
      type: 'beforeAfter',
      ratio: '16 / 9',
      beforeLabel: 'Before',
      afterLabel: 'After',
      caption: 'Drag the handle to reveal the before and after.',
    },
  },
  {
    name: 'stat + chart',
    when: 'A hero number paired with a small inline bar chart — spotlight a figure and show the trend behind it.',
    block: {
      type: 'statChart',
      value: '2.4×',
      label: 'Growth in mobile engagement',
      caption: 'The stat leads; the little chart gives the trend at a glance.',
      data: [28, 34, 31, 45, 52, 61, 78, 95],
    },
  },
  {
    name: 'key takeaways',
    when: 'A highlighted summary box with checkmarks. Great near the end so skimmers still get the headline points.',
    block: {
      type: 'takeaways',
      heading: 'Key takeaways',
      items: [
        'Led a high-stakes rewrite across three organizations',
        'Held ~99% crash-free reliability straight through launch',
        'Turned a migration into a genuine product upgrade',
      ],
    },
  },
]

export default function BlocksPage() {
  return (
    <main style={{ background: '#ffffff', color: '#0f172a' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-14 py-20 md:py-28">
        {/* Header */}
        <Link
          href="/"
          className="t-body-sm inline-flex items-center gap-2 mb-10"
          style={{ color: '#94a3b8' }}
        >
          ← Back to site
        </Link>
        <p className="t-eyebrow mb-4" style={{ color: '#0ea5e9' }}>
          Internal reference · temporary
        </p>
        <h1 className="t-h2 mb-5" style={{ color: '#0f172a' }}>
          Content blocks
        </h1>
        <p className="t-body-lg mb-16 md:mb-24" style={{ color: '#475569', maxWidth: '40rem' }}>
          Every block type available for case-study pages, rendered with the real components. This
          page isn’t linked anywhere — it’s just here so you can see the toolkit at a glance.
        </p>

        {/* Blocks */}
        <div className="flex flex-col gap-20 md:gap-28">
          {showcase.map((entry, i) => (
            <div key={i}>
              <div
                className="mb-8 pb-4"
                style={{ borderBottom: '1px solid rgba(15,23,42,0.1)' }}
              >
                <p
                  className="font-black mb-1"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.02em',
                    color: '#0f172a',
                  }}
                >
                  {entry.name}
                </p>
                <p className="t-body-sm" style={{ color: '#94a3b8' }}>
                  {entry.when}
                </p>
              </div>
              <BlockView block={entry.block} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
