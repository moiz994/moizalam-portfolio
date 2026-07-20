'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import GetInTouchButton from './GetInTouchButton'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Root-relative so they land on the home page sections from any route;
// on the home page itself the browser treats them as same-page scrolls.
const links: [string, string][] = [
  ['Home', '/'],
  ['About', '/#about'],
  ['Work', '/#work'],
]

// Next skips the scroll reset when the route doesn't change, so clicking
// Home while already on the landing page needs a manual scroll to top.
function scrollTopIfHome(href: string) {
  if (href === '/' && window.location.pathname === '/') {
    window.scrollTo({ top: 0 })
  }
}

export default function Navbar() {
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setProgress(Math.min(window.scrollY / window.innerHeight, 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu if the viewport grows back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Interpolate white (255,255,255) → dark navy (15,23,42)
  const r = Math.round(lerp(255, 15, progress))
  const g = Math.round(lerp(255, 23, progress))
  const b = Math.round(lerp(255, 42, progress))
  const textColor = `rgb(${r},${g},${b})`

  const shadowAlpha = (0.4 * (1 - progress)).toFixed(2)
  const textShadow = progress < 0.99 ? `0 1px 4px rgba(0,0,0,${shadowAlpha})` : 'none'

  const borderAlpha = lerp(0.3, 0.18, progress).toFixed(2)
  const borderColor = `rgba(${r},${g},${b},${borderAlpha})`

  // Frosted background fades in only as we leave the hero
  const bgT = Math.min(Math.max((progress - 0.8) / 0.2, 0), 1)
  const navBg = `rgba(255,255,255,${(bgT * 0.6).toFixed(2)})`
  const navBlur = bgT > 0.02 ? 'saturate(180%) blur(14px)' : 'none'
  const navBorder = `1px solid rgba(15,23,42,${(bgT * 0.07).toFixed(3)})`

  // When the mobile menu is open, the navbar itself stays transparent — the
  // single white surface comes from the menu panel, which spans from the very
  // top of the screen (behind the navbar) down past the links.
  const headerBg = menuOpen ? 'transparent' : navBg
  const headerBlur = menuOpen ? 'none' : navBlur
  const headerBorder = menuOpen ? 'none' : navBorder
  const iconColor = menuOpen ? '#0f172a' : textColor
  const brandColor = menuOpen ? '#0f172a' : textColor
  const brandShadow = menuOpen ? 'none' : textShadow

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background: headerBg,
        backdropFilter: headerBlur,
        WebkitBackdropFilter: headerBlur,
        borderBottom: headerBorder,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
      }}
    >
      <span
        className="t-brand text-xl"
        style={{ color: brandColor, textShadow: brandShadow, transition: 'color 0.3s ease' }}
      >
        Moiz<span style={{ color: '#7dd3fc' }}>.</span>
      </span>

      <div className="flex items-center gap-8">
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 t-nav">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => scrollTopIfHome(href)}
              style={{ color: textColor, textShadow, transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Get in touch — ghost variant: scroll-driven colors at rest, fills on hover */}
        <a
          href="mailto:moizalam994@gmail.com"
          className="hidden md:flex git-btn git-btn--ghost"
          style={{
            '--nav-text': textColor,
            '--nav-border': borderColor,
            '--nav-bg': `rgba(255,255,255,${lerp(0.12, 0, progress).toFixed(2)})`,
            '--nav-shadow': textShadow,
            '--nav-blur': progress < 0.5 ? 'blur(12px)' : 'none',
          } as React.CSSProperties}
        >
          <span className="git-btn__label">Get in touch</span>
          <span className="git-btn__circle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </a>

        {/* Mobile hamburger → X */}
        <button
          className={`nav-toggle md:hidden ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
          style={{ color: iconColor }}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </div>

      {/* Mobile menu — one continuous surface from the top of the screen,
          sitting behind the navbar (z-index below the logo/toggle). */}
      <div
        className={`nav-menu md:hidden fixed inset-x-0 top-0 flex flex-col px-8 pt-20 pb-8 gap-1 ${menuOpen ? 'is-open' : ''}`}
        style={{ zIndex: -1 }}
      >
        {links.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            onClick={() => {
              setMenuOpen(false)
              scrollTopIfHome(href)
            }}
            className="t-nav py-3"
            style={{ color: '#0f172a', fontSize: '1.25rem' }}
          >
            {label}
          </Link>
        ))}
        <div className="mt-4">
          <GetInTouchButton variant="onLight" />
        </div>
      </div>
    </nav>
  )
}
