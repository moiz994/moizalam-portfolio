import Link from 'next/link'
import GetInTouchButton from '@/components/GetInTouchButton'

export default function WorkCta() {
  return (
    <section className="px-6 md:px-14 pb-24 md:pb-28" style={{ background: '#ffffff' }}>
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '2.5rem' }}
      >
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 t-link font-bold transition-colors duration-150"
          style={{ color: '#0f172a' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M12 7H3M6 3L2.5 7 6 11"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all work
        </Link>

        <GetInTouchButton variant="onLight" className="flex-shrink-0 self-start md:self-auto" />
      </div>
    </section>
  )
}
