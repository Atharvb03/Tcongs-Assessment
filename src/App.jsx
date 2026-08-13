import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import Services from "./sections/Services"
import Process from "./sections/Process"
import CTA from "./sections/CTA"
import FAQ from "./sections/FAQ"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"
import CursorGlow from "./components/CursorGlow"
import FloatingChatButton from "./components/FloatingChatButton"

function App() {
  return (
    <>
      <CursorGlow />
      <FloatingChatButton />
      <Navbar />
      
      {/* Global Background Video (for all sections except Hero) */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        >
          <source src="/videos/blue.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay to show video better */}
        <div className="absolute inset-0 bg-[rgba(7,9,13,0.4)]" />
      </div>

      <main className="relative bg-transparent">
        <Hero />
        <Services />
        <Process />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App