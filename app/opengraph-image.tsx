import { ImageResponse } from 'next/og'

// Branded share card, generated at build time. Shown when the site is
// shared on LinkedIn, iMessage, Slack, etc.

export const dynamic = 'force-static'

export const alt = 'Moiz Alam · Product Manager'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0c2340 0%, #1a3a5c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: '#ffffff' }}>
          Moiz<span style={{ color: '#7dd3fc' }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            Product Manager
          </div>
          <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.75)', marginTop: 24 }}>
            From zero to one, I build things users actually want.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 28, color: '#7dd3fc' }}>moizalam.com</div>
          <div
            style={{
              width: 64,
              height: 8,
              background: '#0ea5e9',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
