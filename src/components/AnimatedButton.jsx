import { motion } from "motion/react"
import { useState } from "react"

function AnimatedButton({ 
  label, 
  hoverLabel, 
  href, 
  onClick, 
  variant = "primary",
  className = "" 
}) {
  const [isHovered, setIsHovered] = useState(false)

  const variants = {
    primary: "bg-[#4d7cff] hover:bg-[#22d3ee] text-white",
    secondary: "bg-[#0e1118] hover:bg-[#151a24] text-[#f5f7fa] border border-[rgba(255,255,255,0.1)]",
    ghost: "bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-[#f5f7fa]"
  }

  const content = (
    <span className="relative inline-flex items-center gap-2 min-w-45 justify-center">
      <motion.span
        className="inline-flex items-center gap-2"
        animate={{ 
          opacity: isHovered && hoverLabel ? 0 : 1,
          y: isHovered && hoverLabel ? -10 : 0
        }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      >
        {label}
      </motion.span>
      {hoverLabel && (
        <motion.span
          className="absolute inset-0 inline-flex items-center gap-2 justify-center"
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          {hoverLabel}
        </motion.span>
      )}
    </span>
  )

  const baseClasses = `
    relative px-6 py-3 rounded-lg font-medium text-sm
    transition-colors duration-300
    ${variants[variant]}
    ${className}
  `

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}

export default AnimatedButton
