import { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { Plus, ArrowUpRight } from "lucide-react"
import { faqItems } from "../data/faq"
import Container from "../components/Container"

function FAQ() {
  const [activeFaq, setActiveFaq] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef(null)

  // Ensure video plays when section comes into view
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(error => {
              console.log("Video autoplay failed:", error)
            })
          }
        })
      },
      { threshold: 0.1 } // Play when 10% of video is visible
    )

    observer.observe(videoElement)

    // Also try to play immediately on mount
    videoElement.play().catch(() => {
      // Silently fail if autoplay is blocked
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id)
  }

  // Section entrance animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  }

  const headerVariants = {
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

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <section 
      id="faq" 
      className="relative bg-[#07090d] py-12 md:py-16 lg:py-20 scroll-mt-20 lg:scroll-mt-21 overflow-hidden"
    >
      {/* Blue Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/videos/blue.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#07090d] opacity-40" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Intro Content */}
            <motion.div variants={headerVariants}>
              {/* Eyebrow */}
              <p className="text-[#4d7cff] text-xs lg:text-sm uppercase tracking-[0.2em] font-medium mb-4">
                QUESTIONS? WE'VE GOT ANSWERS
              </p>

              {/* Heading */}
              <h2 className="font-['Space_Grotesk'] text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-bold text-[#f5f7fa] mb-6">
                Questions?<br />We've Got<br />Answers.
              </h2>

              {/* Description */}
              <p className="text-[#8b93a3] text-base lg:text-lg leading-relaxed max-w-md mb-8">
                Everything you need to know about working with our digital studio.
              </p>

              {/* Book a Free Call Button */}
              <motion.a
                href="#connect"
                onClick={(e) => {
                  e.preventDefault()
                  const connectSection = document.querySelector("#connect")
                  if (connectSection) {
                    connectSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#4d7cff] to-[#22d3ee] text-white rounded-full font-semibold text-base lg:text-lg hover:shadow-[0_0_30px_rgba(77,124,255,0.4)] transition-all duration-300 group relative overflow-hidden"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {/* Animated background overlay on hover */}
                <span className="absolute inset-0 bg-linear-to-r from-[#22d3ee] to-[#4d7cff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10">Book a Free Call</span>
                <span className="relative z-10 text-xl">🚀</span>
                <ArrowUpRight 
                  size={20} 
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </motion.a>
            </motion.div>

            {/* Right: FAQ Accordion */}
            <div className="space-y-0">
              {faqItems.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={itemVariants}
                >
                  <FAQItem
                    faq={faq}
                    index={index}
                    isActive={activeFaq === faq.id}
                    onToggle={() => toggleFaq(faq.id)}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function FAQItem({ faq, index, isActive, onToggle, shouldReduceMotion }) {
  return (
    <div
      className={`
        border-b transition-all duration-300
        ${isActive 
          ? "border-[rgba(77,124,255,0.35)] bg-[rgba(77,124,255,0.02)]" 
          : "border-[rgba(255,255,255,0.10)] bg-transparent hover:bg-[rgba(77,124,255,0.015)]"
        }
      `}
    >
      <button
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        className="w-full text-left py-6 px-6 lg:px-8 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff] focus-visible:ring-inset"
        aria-expanded={isActive}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex items-start justify-between gap-6">
          {/* Left: Number + Question */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4">
              {/* Number */}
              <span 
                className={`
                  text-sm font-mono transition-colors duration-300 pt-1
                  ${isActive ? "text-[#4d7cff]" : "text-[rgba(255,255,255,0.35)] group-hover:text-[#4d7cff]"}
                `}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Question */}
              <motion.h3
                className={`
                  font-['Space_Grotesk'] text-lg lg:text-xl font-semibold
                  transition-all duration-300
                  ${isActive 
                    ? "text-[#22d3ee]" 
                    : "text-[#f5f7fa] group-hover:text-[#22d3ee]"
                  }
                `}
                animate={shouldReduceMotion ? {} : {
                  x: isActive ? 8 : 0
                }}
                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                {faq.question}
              </motion.h3>
            </div>
          </div>

          {/* Right: Plus/Cross Icon */}
          <motion.div
            className={`
              shrink-0 w-6 h-6 flex items-center justify-center
              transition-colors duration-300
              ${isActive 
                ? "text-[#22d3ee]" 
                : "text-[rgba(255,255,255,0.4)] group-hover:text-[#22d3ee]"
              }
            `}
            animate={shouldReduceMotion ? {} : {
              rotate: isActive ? 45 : 0
            }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <Plus size={24} strokeWidth={2} />
          </motion.div>
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { 
              height: 0, 
              opacity: 0 
            }}
            animate={shouldReduceMotion ? { opacity: 1 } : { 
              height: "auto", 
              opacity: 1 
            }}
            exit={shouldReduceMotion ? { opacity: 0 } : { 
              height: 0, 
              opacity: 0 
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              ease: [0.33, 1, 0.68, 1]
            }}
            className="overflow-hidden"
          >
            <div className="px-6 lg:px-8 pb-6 pl-18 lg:pl-20">
              <p className="text-[#8b93a3] text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQ
