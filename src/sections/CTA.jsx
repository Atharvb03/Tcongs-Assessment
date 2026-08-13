import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import Container from "../components/Container"
import AnimatedButton from "../components/AnimatedButton"
import CTAVisual from "../components/CTAVisual"

function CTA() {
  const shouldReduceMotion = useReducedMotion()

  // Section entrance animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <section 
      id="cta" 
      className="relative bg-[#07090d] py-20 md:py-28 lg:py-36 overflow-hidden scroll-mt-20 lg:scroll-mt-21"
    >
      {/* Atmospheric Gradient Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 75% 50%, rgba(77,124,255,0.18), rgba(34,211,238,0.08), transparent 60%)"
        }}
      />

      <Container>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left: Content */}
          <motion.div variants={itemVariants}>
            {/* Eyebrow */}
            <p className="text-[#4d7cff] text-xs lg:text-sm uppercase tracking-[0.18em] font-medium mb-6 opacity-90">
              READY TO BUILD?
            </p>

            {/* Heading */}
            <h2 className="font-['Space_Grotesk'] text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] font-bold mb-6">
              <span className="text-[#f5f7fa]">LET'S BUILD</span>
              <br />
              <span className="bg-linear-to-r from-[#4d7cff] to-[#22d3ee] bg-clip-text text-transparent">
                WHAT'S NEXT
              </span>
            </h2>

            {/* Description */}
            <p className="text-[#8b93a3] text-base leading-relaxed max-w-140 mb-8">
              From strategy and design to development and growth, we build digital experiences that help ambitious businesses move forward.
            </p>

            {/* CTA Button */}
            <AnimatedButton
              label={
                <span className="flex items-center gap-2">
                  START YOUR PROJECT <ArrowUpRight size={18} />
                </span>
              }
              onClick={() => {
                const contactSection = document.querySelector("#connect")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="inline-flex"
            />
          </motion.div>

          {/* Right: Visual */}
          <motion.div 
            variants={itemVariants}
            className="w-full h-95 lg:h-125"
          >
            <CTAVisual />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default CTA
