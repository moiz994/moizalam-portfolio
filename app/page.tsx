import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Philosophy from '@/components/Philosophy'
import FeaturedWork from '@/components/FeaturedWork'
import Career from '@/components/Career'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{ background: '#05101e' }}>
      <main style={{ borderRadius: '0 0 80px 80px', overflow: 'hidden', background: '#ffffff' }}>
        <Navbar />
        <Hero />
        <Marquee />
        {/* Grey floor — reveals through the white section's rounded bottom corners */}
        <div style={{ background: '#f5f5f5' }}>
          <div style={{ background: '#ffffff', borderRadius: '0 0 80px 80px', overflow: 'hidden' }}>
            <About />
            <Philosophy />
            <Career />
          </div>
          <FeaturedWork />
        </div>
      </main>
      <Footer />
    </div>
  )
}
