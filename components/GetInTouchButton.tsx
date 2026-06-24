type Props = {
  href?: string
  label?: string
  className?: string
  /** onDark = white base (for dark sections); onLight = sky-blue base (for light sections) */
  variant?: 'onDark' | 'onLight'
}

export default function GetInTouchButton({
  href = 'mailto:moizalam994@gmail.com',
  label = 'Get in touch',
  className = '',
  variant = 'onDark',
}: Props) {
  const variantClass = variant === 'onLight' ? 'git-btn--on-light' : ''
  return (
    <a href={href} className={`git-btn ${variantClass} ${className}`}>
      <span className="git-btn__label">{label}</span>
      <span className="git-btn__circle" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
          <path
            d="M2 6.5h9M8 3l3.5 3.5L8 10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  )
}
