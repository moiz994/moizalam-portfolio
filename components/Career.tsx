'use client'

import { useState } from 'react'

const roles = [
  {
    title: 'Senior Product Manager',
    duration: '2025 – Present',
    company: 'Arbisoft',
    logos: [{ src: '/logos/Arbisoft Logo.svg', alt: 'Arbisoft', h: 60 }],
    description:
      'Leading multiple product bets, teams, and AI-first workflows while building stronger systems for discovery, product decision-making, and mentorship.',
    bullets: [
      "Leading Juniper, Arbisoft's internal product innovation movement",
      'Learning how to create product direction across multiple teams without becoming the bottleneck for every decision',
      'Using AI as part of the actual product workflow, from research and synthesis to prototyping and MVP definition',
      'Mentoring and helping teams move from scattered inputs to sharper product decisions',
    ],
    tags: ['AI-first discovery', 'Product strategy', 'Product mentorship', '0→1 products'],
  },
  {
    title: 'Product Manager',
    duration: '2022 – 2025',
    company: 'Arbisoft',
    logos: [{ src: '/logos/Arbisoft Logo.svg', alt: 'Arbisoft', h: 60 }],
    description:
      'Led mobile product work at scale, at edX, while building an internal product movement, at Arbisoft, focused on MVP thinking, incubation, and 0→1 momentum.',
    bullets: [
      'Learned how large product teams move from discovery to specs, delivery, measurement, and product strategy',
      'Worked on mobile learning experiences where small product decisions could affect millions of learners',
      'Shipped high-impact platform work, including the edX mobile rewrite and in-app payments across thousands of courses',
      "Founded Juniper and learned how to build product culture, community, and 0→1 momentum inside an organization",
    ],
    tags: ['Mobile products', 'Product operations', 'Product discovery', 'Community Building'],
  },
  {
    title: 'Associate Product Manager',
    duration: '2020 – 2022',
    company: 'Dubizzle Labs',
    logos: [{ src: '/logos/Dubizzle Labs Logo.svg', alt: 'Dubizzle Labs', h: 56 }],
    description:
      'Solidified my product fundamentals by working closely with engineers, designers, regional stakeholders, and complex platform decisions.',
    bullets: [
      'Built the habit of asking better questions before jumping into solutions',
      'Learned how to work closely with engineering and UX to shape products, not just pass requirements forward',
      'Got comfortable with pushback, both receiving it and giving it when product decisions needed defending',
      'Delivered a multi-tenant CRM and field sales app, which taught me the difference between shipping features and solving operational problems',
    ],
    tags: ['Product fundamentals', 'Cross-functional work', 'Platform products', 'Stakeholder alignment'],
  },
  {
    title: 'Business Analyst → Team Lead',
    duration: '2017 – 2020',
    company: 'Rolustech',
    logos: [{ src: '/logos/Rolustec Logo.svg', alt: 'Rolustech', h: 56 }],
    description:
      'Built a foundation for keeping real customer problems at the center of software development.',
    bullets: [
      'Learned how to understand customer workflows before turning them into requirements',
      'Built a foundation in CRM products, business processes, integrations, and edge cases',
      'Started moving from documenting requirements to shaping better solutions with clients and engineering teams',
      'Grew into team leadership while learning how to coordinate people, scope, and delivery expectations',
    ],
    tags: ['Problem framing', 'Requirement shaping', 'CRM workflows', 'Team leadership'],
  },
  {
    title: 'BSc Engineering Sciences',
    duration: '2013 – 2017',
    company: 'Ghulam Ishaq Khan Institute',
    logos: [{ src: '/logos/giki logo.svg', alt: 'GIK Institute', h: 72 }],
    description:
      'My engineering degree gave me a technical foundation, but university also taught me how to build, coordinate, and lead outside the classroom.',
    bullets: [
      'Built a technical foundation across engineering, systems thinking, and problem solving',
      'Created an automated solar-powered irrigation system that won 2nd prize at the annual industrial open house',
      'Took part in multiple university societies alongside academics, learning coordination beyond coursework',
      'Helped organize 8 national-level events, building early confidence in planning, collaboration, and execution',
    ],
    tags: ['Technical foundation', 'Systems thinking', 'Early leadership', 'Collaboration'],
  },
]

export default function Career() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="px-6 md:px-14 py-28">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16 items-end">
          <div>
            <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
              Career journey
            </p>
            <h2 className="t-h2" style={{ color: '#0f172a' }}>
              The path that shaped how I build products.
            </h2>
          </div>
          <div className="md:pb-2">
            <p className="t-body-lg" style={{ color: '#475569' }}>
              From CRM systems and platform products to mobile learning, AI-first discovery,
              and product incubation, my journey has shaped how I bring structure to ambiguity and
              help teams move toward shipped outcomes.
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          {roles.map((role, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>

                {/* Row header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="t-title" style={{ color: '#0f172a' }}>
                      {role.title}
                    </span>
                    <span className="t-body-sm" style={{ color: '#94a3b8', flexShrink: 0 }}>
                      {role.duration}
                    </span>
                  </div>

                  {/* +/× indicator */}
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: isOpen ? '#0ea5e9' : '#f5f5f5',
                      color: isOpen ? 'white' : '#94a3b8',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'background 0.25s, color 0.25s, transform 0.35s',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>

                {/* Expandable content */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16 pb-10 pt-1">

                      {/* Company logo(s) */}
                      <div className="flex flex-col justify-start gap-4">
                        <div className="flex flex-wrap items-start gap-5">
                          {role.logos.map((logo) => (
                            <img
                              key={logo.alt}
                              src={logo.src}
                              alt={logo.alt}
                              style={{
                                height: logo.h,
                                width: 'auto',
                                filter: 'brightness(0) opacity(0.75)',
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Description + bullets + tags */}
                      <div className="flex flex-col gap-5">
                        <p className="t-body" style={{ color: '#475569' }}>
                          {role.description}
                        </p>
                        {'bullets' in role && role.bullets && (
                          <ul className="flex flex-col gap-2">
                            {role.bullets.map((bullet) => (
                              <li key={bullet} className="t-body-sm flex items-start gap-2.5" style={{ color: '#475569' }}>
                                <span className="mt-[0.5em] w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#0ea5e9' }} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {role.tags.map((tag) => (
                            <span
                              key={tag}
                              className="t-tag px-3 py-1.5 rounded-full"
                              style={{
                                background: '#f0f9ff',
                                color: '#0369a1',
                                border: '1px solid rgba(14,165,233,0.2)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
