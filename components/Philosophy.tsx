const cards = [
  {
    title: 'Start with the problem',
    body: 'Before jumping to solutions, I try to understand what is broken, who it affects, and why it matters now.',
    dark: false,
  },
  {
    title: 'Create clarity',
    body: 'I turn scattered inputs, user needs, business goals, and constraints into a direction teams can act on.',
    dark: false,
  },
  {
    title: 'Ship to learn',
    body: 'I believe in focused scope, visible tradeoffs, and meaningful releases that create real feedback.',
    dark: true,
  },
  {
    title: 'Build systems',
    body: 'Good product work should improve how teams decide, collaborate, and keep moving after launch.',
    dark: false,
  },
]

export default function Philosophy() {
  return (
    <section className="px-6 md:px-14 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">

          {/* Left: eyebrow + heading + description */}
          <div className="md:sticky md:top-24">
            <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
              Product philosophy
            </p>
            <h2 className="t-h2 mb-8" style={{ color: '#0f172a' }}>
              How I work
            </h2>
            <p className="t-body-lg" style={{ color: '#475569' }}>
              I believe good product work is about creating clarity where there is noise, making tradeoffs visible, and helping teams learn through shipping.
            </p>
          </div>

          {/* Right: 2×2 card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <div
                key={i}
                className="p-7 flex flex-col gap-4"
                style={{
                  borderRadius: '28px',
                  background: card.dark ? '#0ea5e9' : '#f5f5f5',
                }}
              >
                <h3
                  className="t-title"
                  style={{ color: card.dark ? '#ffffff' : '#0f172a' }}
                >
                  {card.title}
                </h3>
                <p
                  className="t-body-sm"
                  style={{ color: card.dark ? 'rgba(255,255,255,0.65)' : '#64748b' }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
