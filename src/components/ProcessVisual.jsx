import { motion, AnimatePresence } from "motion/react"

function ProcessVisual({ activeStep, step, shouldReduceMotion }) {
  return (
    <div className="relative w-full h-full">
      {/* Main Container with subtle background */}
      <div className="absolute inset-0 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-linear-to-br from-[rgba(77,124,255,0.04)] to-[rgba(34,211,238,0.02)] backdrop-blur-sm overflow-hidden">
        
        {/* Process Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-contain"
              style={{
                filter: "drop-shadow(0 0 20px rgba(77, 124, 255, 0.3))"
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Process Number Badge */}
        <div className="absolute top-6 left-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="px-4 py-2 rounded-lg bg-[rgba(7,9,13,0.8)] backdrop-blur-sm border border-[rgba(77,124,255,0.3)]"
            >
              <span className="text-[#4d7cff] font-mono text-sm font-semibold">
                PROCESS / {step.number}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Label */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="px-4 py-3 rounded-lg bg-[rgba(7,9,13,0.8)] backdrop-blur-sm border border-[rgba(34,211,238,0.2)]"
            >
              <p className="text-[#22d3ee] text-sm font-semibold uppercase tracking-wider">
                {step.title}
              </p>
              <p className="text-[#8b93a3] text-xs mt-1">
                {step.category}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(7,9,13,0.4)] via-transparent to-[rgba(7,9,13,0.3)] pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#4d7cff] opacity-25" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#22d3ee] opacity-25" />
      </div>
    </div>
  )
}

export default ProcessVisual
