import { motion, useReducedMotion } from "motion/react"
import * as LucideIcons from "lucide-react"

function SolutionCard({ solution, index, shouldReduceMotion }) {
  // Dynamically get icon from Lucide
  const Icon = LucideIcons[solution.icon]

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(77,124,255,0.4)] hover:bg-[rgba(77,124,255,0.04)] transition-all duration-300"
    >
      {/* Icon and Title - Horizontal Layout */}
      <div className="flex items-start gap-3 mb-2">
        <motion.div
          className="w-10 h-10 shrink-0 rounded-lg bg-[rgba(77,124,255,0.08)] group-hover:bg-[rgba(77,124,255,0.15)] flex items-center justify-center transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { 
            scale: 1.05
          }}
          transition={{ duration: 0.3 }}
        >
          {Icon && (
            <Icon 
              size={18} 
              className="text-[#4d7cff] group-hover:text-[#22d3ee] transition-colors duration-300"
              strokeWidth={2}
            />
          )}
        </motion.div>

        {/* Title */}
        <h4 className="font-['Space_Grotesk'] text-sm lg:text-base font-semibold text-[#f5f7fa] group-hover:text-[#22d3ee] transition-colors duration-300 leading-snug pt-0.5">
          {solution.title}
        </h4>
      </div>

      {/* Description */}
      <p className="text-[#8b93a3] text-xs lg:text-sm leading-relaxed pl-13">
        {solution.description}
      </p>

      {/* Subtle hover accent */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(77, 124, 255, 0.08), transparent 40%)"
        }}
      />
    </motion.div>
  )
}

export default SolutionCard
