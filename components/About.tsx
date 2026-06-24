import GetInTouchButton from './GetInTouchButton'

export default function About() {
  return (
    <section id="about" className="px-6 md:px-14 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Two-column header */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
          <div>
            <p className="t-eyebrow mb-5" style={{ color: '#0ea5e9' }}>
              Behind the Work
            </p>
            <h2 className="t-h2" style={{ color: '#0f172a' }}>
              Turning Ambiguity<br />Into Shipped<br />Products
            </h2>
          </div>

          <div className="flex flex-col justify-between gap-8 md:pt-16">
            <p className="t-body-lg" style={{ color: '#334155' }}>
              I'm a product manager focused on building clean, intuitive products
              that solve real-world problems. I thrive in the messy middle —
              turning fuzzy user problems into crisp specs, then shipping them.
            </p>
            <div className="flex items-center justify-between gap-6">
              <p className="t-body-sm" style={{ color: '#94a3b8' }}>
                Let's Build Something<br />Meaningful Together
              </p>
              <GetInTouchButton variant="onLight" className="flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '2.5rem' }}
        >
          {[
            { num: '5+', label: 'Years in product' },
            { num: '20+', label: 'Features shipped' },
            { num: '3×', label: 'Avg. retention lift' },
            { num: '0→1', label: 'Products built' },
          ].map(({ num, label }) => (
            <div key={label} className="p-6 rounded-2xl" style={{ background: '#f5f5f5' }}>
              <p className="t-stat mb-1" style={{ color: '#0f172a' }}>{num}</p>
              <p className="t-body-sm" style={{ color: '#94a3b8' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
