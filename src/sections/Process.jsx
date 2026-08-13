import { useState, useRef, useEffect as React_useEffect } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"
import { processSteps } from "../data/process"
import Container from "../components/Container"
import ProcessVisual from "../components/ProcessVisual"

// Alias for React.useEffect
const React = { useEffect: React_useEffect }

function Process() {
  const [activeStep, setActiveStep] = useState(1)
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

  return (
    <section 
      id="process" 
      className="relative py-12 md:py-16 lg:py-20 scroll-mt-20 lg:scroll-mt-21"
    >
      <Container>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div 
            variants={headerVariants}
            className="text-center mb-16 lg:mb-24"
          >
            {/* Eyebrow */}
            <p className="text-[#4d7cff] text-xs lg:text-sm uppercase tracking-[0.2em] font-medium mb-4">
              OUR PROCESS, YOUR GROWTH
            </p>
            
            {/* Heading */}
            <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,4vw,4rem)] leading-[1.1] font-bold text-[#f5f7fa] mb-4">
              From Idea to Scalable<br />Digital Solution
            </h2>
            
            {/* Description */}
            <p className="text-[#8b93a3] text-base lg:text-lg leading-relaxed max-w-162.5 mx-auto">
              We transform ideas into thoughtful digital products through strategy, design, development and continuous optimization.
            </p>
          </motion.div>

          {/* Process Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Process Steps */}
            <div className="relative">
              {/* Vertical Timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.10)] hidden lg:block" />
              
              {/* Active Progress Indicator */}
              <motion.div
                className="absolute left-8 w-px bg-linear-to-b from-[#4d7cff] to-[#22d3ee] hidden lg:block"
                style={{
                  top: 0,
                  height: `${((activeStep - 1) / (processSteps.length - 1)) * 100}%`
                }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.33, 1, 0.68, 1] }}
              />

              {/* Process Items */}
              <div className="space-y-0">
                {processSteps.map((step) => (
                  <ProcessStep
                    key={step.id}
                    step={step}
                    isActive={activeStep === step.id}
                    onActivate={() => setActiveStep(step.id)}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>

            {/* Right: Sticky Visual (Desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div className="w-full h-125">
                  <ProcessVisual 
                    activeStep={activeStep} 
                    step={processSteps[activeStep - 1]}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function ProcessStep({ step, isActive, onActivate, shouldReduceMotion }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    margin: "-40% 0px -40% 0px"
  })

  // Update active step when in view using useEffect
  const prevInView = useRef(isInView)
  
  React.useEffect(() => {
    if (isInView && !prevInView.current && !isActive) {
      onActivate()
    }
    prevInView.current = isInView
  }, [isInView, isActive, onActivate])

  return (
    <div ref={ref} className="relative min-h-70 lg:min-h-80">
      <div className="pl-0 lg:pl-20 py-8">
        {/* Number */}
        <motion.span
          className={`text-sm font-mono font-semibold transition-colors duration-300 ${
            isActive ? "text-[#4d7cff]" : "text-[rgba(255,255,255,0.35)]"
          }`}
          animate={shouldReduceMotion ? {} : {
            scale: isActive ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {step.number}
        </motion.span>

        {/* Title */}
        <motion.h3
          className={`font-['Space_Grotesk'] text-2xl lg:text-3xl font-bold mt-2 transition-colors duration-300 ${
            isActive ? "text-[#22d3ee]" : "text-[#f5f7fa]"
          }`}
        >
          {step.title}
        </motion.h3>

        {/* Category */}
        <p className={`text-sm mt-1 transition-colors duration-300 ${
          isActive ? "text-[#8b93a3]" : "text-[rgba(255,255,255,0.4)]"
        }`}>
          {step.category}
        </p>

        {/* Description */}
        <motion.p
          className="text-[#8b93a3] text-base leading-relaxed mt-4"
          animate={{
            opacity: isActive ? 1 : 0.5
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        >
          {step.description}
        </motion.p>

        {/* Active Indicator Dot (Timeline) */}
        <motion.div
          className="absolute left-7.5 top-8 w-2 h-2 rounded-full border-2 hidden lg:block"
          style={{
            borderColor: isActive ? "#4d7cff" : "rgba(255,255,255,0.2)",
            backgroundColor: isActive ? "#4d7cff" : "transparent"
          }}
          animate={shouldReduceMotion ? {} : {
            scale: isActive ? [1, 1.3, 1] : 1
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        />

        {/* Mobile Visual */}
        <div className="lg:hidden mt-8">
          <div className="w-full h-80">
            <ProcessVisual 
              activeStep={step.id} 
              step={step}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Process
