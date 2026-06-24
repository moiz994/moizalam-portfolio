const logos = [
  { src: '/logos/OLX New Logo.svg',         alt: 'OLX'             },
  { src: '/logos/Rolustec Logo.svg',        alt: 'Rolustech'       },
  { src: '/logos/edX by 2U logo.svg',       alt: 'edX'             },
  { src: '/logos/Arbisoft Logo.svg',        alt: 'Arbisoft'        },
  { src: '/logos/Juniper logo.svg',         alt: 'Juniper'         },
  { src: '/logos/Interiors Source Logo.svg',alt: 'Interiors Source'},
  { src: '/logos/Dubizzle Labs Logo.svg',   alt: 'Dubizzle Labs'   },
  { src: '/logos/Kaidee logo.svg',          alt: 'Kaidee'          },
]

const doubled = [...logos, ...logos]

export default function Marquee() {
  return (
    <div
      className="overflow-hidden py-20"
      style={{
        borderRadius: '0 0 80px 80px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <p
        className="t-eyebrow-sm text-center mb-8"
        style={{ color: '#94a3b8' }}
      >
        Trusted by teams I've helped ship
      </p>

      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              style={{
                padding: '0 52px',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{
                  height: 32,
                  width: 'auto',
                  display: 'block',
                  filter: 'brightness(0) opacity(0.55)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
