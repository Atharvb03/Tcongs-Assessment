import { useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import SolutionCard from "./SolutionCard"

function SolutionsPanel({ 
  isOpen, 
  activeService, 
  onClose,
  shouldReduceMotion 
}) {
  const panelRef = useRef(null)

  // Determine grid columns based on number of solutions
  const gridColumns = activeService?.solutions.length === 8 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Handle outside click
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }

    // Delay to avoid immediate close on open
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Focus trap - basic implementation
  useEffect(() => {
    if (!isOpen || !panelRef.current) return

    const focusableElements = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTab = (e) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [isOpen])

  if (!activeService) return null

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.2 }
    }
  }

  const panelVariants = {
    hidden: shouldReduceMotion ? { 
      opacity: 0 
    } : { 
      opacity: 0, 
      y: -10, 
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    },
    exit: shouldReduceMotion ? {
      opacity: 0
    } : {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-[rgba(7,9,13,0.6)] backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-350 bg-[#0e1118] border border-[rgba(255,255,255,0.1)] rounded-xl shadow-2xl z-50 p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeService.title} Solutions`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 lg:top-4 lg:right-4 w-9 h-9 flex items-center justify-center rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[#8b93a3] hover:text-[#f5f7fa] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff] z-10"
              aria-label="Close panel"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {/* Panel Header - Compact */}
            <div className="mb-6 pr-10">
              <div className="flex items-center gap-3 mb-2">
                <motion.p
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.1 }}
                  className="text-[#4d7cff] text-xs uppercase tracking-[0.2em] font-medium"
                >
                  {activeService.number}
                </motion.p>
                <motion.h3
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.15 }}
                  className="font-['Space_Grotesk'] text-xl lg:text-2xl font-bold text-[#f5f7fa]"
                >
                  {activeService.title}
                </motion.h3>
              </div>
              <motion.p
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.2 }}
                className="text-[#8b93a3] text-sm lg:text-base leading-relaxed max-w-3xl"
              >
                {activeService.description}
              </motion.p>
            </div>

            {/* Solutions Grid - Dynamic columns based on solution count */}
            <div className={`grid ${gridColumns} gap-3 lg:gap-4`}>
              {activeService.solutions.map((solution, index) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SolutionsPanel
