'use client'

import GetInTouchButton from './GetInTouchButton'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#05101e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main content — sits above the watermark */}
      <div className="relative px-6 md:px-14 pt-20 pb-10 max-w-6xl mx-auto" style={{ zIndex: 1 }}>

        {/* 2-column grid — branding left, contact right */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-14 md:gap-8 mb-20">

          {/* Left: branding + copy */}
          <div className="flex flex-col gap-6">
            <p className="t-brand" style={{ color: '#ffffff' }}>
              Moiz Alam<span style={{ color: '#0ea5e9' }}>.</span>
            </p>
            <p
              className="t-body-lg font-bold leading-snug"
              style={{ color: '#ffffff', maxWidth: '26rem' }}
            >
              Product work should create clarity, momentum, and shipped outcomes.
            </p>
            <p
              className="t-body-sm"
              style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '28rem' }}
            >
              This portfolio is a snapshot of how I think, build, lead, and learn through product
              work. If something here resonates, I'd love to hear from you.
            </p>
            <div>
              <GetInTouchButton />
            </div>
          </div>

          {/* Right: contact */}
          <div className="flex flex-col gap-4">
            <p className="t-eyebrow-sm mb-2" style={{ color: '#0ea5e9' }}>
              Contact
            </p>
            {[
              { label: 'Email', href: 'mailto:moizalam994@gmail.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com/in/moizalam' },
              { label: 'Resume', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="t-link transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar — no border */}
        <div className="flex items-center justify-between py-6">
          <p className="t-body-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2026 Moiz Alam
          </p>
          <p className="t-body-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Built with intention.
          </p>
        </div>

      </div>

      {/* Large background watermark — pushed down so text is clipped */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.35em',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'clamp(100px, 22vw, 300px)',
          fontWeight: 900,
          fontFamily: 'Satoshi, sans-serif',
          color: 'rgba(255,255,255,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        Moiz Alam
      </div>

    </footer>
  )
}
