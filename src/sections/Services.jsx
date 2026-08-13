import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"
import { 
  MonitorSmartphone, 
  Code2, 
  ShoppingBag, 
  Megaphone, 
  PenTool, 
  TrendingUp,
  ChevronRight
} from "lucide-react"
import { services } from "../data/services"
import Container from "../components/Container"
import SolutionsPanel from "../components/SolutionsPanel"

const iconMap = {
  MonitorSmartphone,
  Code2,
  ShoppingBag,
  Megaphone,
  PenTool,
  TrendingUp
}

function Services() {
  const [activeService, setActiveService] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  // Listen for openServicePanel event from Navbar
  useEffect(() => {
    const handleOpenServicePanel = (event) => {
      const serviceId = event.detail?.serviceId
      if (serviceId) {
        const service = services.find(s => s.id === serviceId)
        if (service) {
          setActiveService(service)
          setIsPanelOpen(true)
        }
      }
    }

    window.addEventListener("openServicePanel", handleOpenServicePanel)
    return () => window.removeEventListener("openServicePanel", handleOpenServicePanel)
  }, [])

  const handleServiceClick = (service) => {
    setActiveService(service)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    // Delay clearing activeService for exit animation
    setTimeout(() => setActiveService(null), 300)
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
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
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
      id="services" 
      className="relative py-20 md:py-28 lg:py-36 scroll-mt-20 lg:scroll-mt-21"
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
            className="text-center mb-16 lg:mb-20"
          >
            {/* Eyebrow */}
            <p className="text-[#4d7cff] text-xs lg:text-sm uppercase tracking-[0.2em] font-medium mb-4">
              WE ARE GREAT AT
            </p>
            
            {/* Heading */}
            <h2 className="font-['Space_Grotesk'] text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] font-bold text-[#f5f7fa] mb-4">
              Digital Solutions & Development Services
            </h2>
            
            {/* Description */}
            <p className="text-[#8b93a3] text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
              Scalable digital solutions designed to help modern businesses build, launch and grow.
            </p>
          </motion.div>

          {/* Services List */}
          <div 
            className="max-w-5xl mx-auto"
            onMouseLeave={() => setHoveredService(null)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {services.map((service, index) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  index={index}
                  isHovered={hoveredService === service.id}
                  onHover={() => setHoveredService(service.id)}
                  onClick={() => handleServiceClick(service)}
                  variants={itemVariants}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Solutions Panel */}
      <SolutionsPanel
        isOpen={isPanelOpen}
        activeService={activeService}
        onClose={handleClosePanel}
        shouldReduceMotion={shouldReduceMotion}
      />
    </section>
  )
}

function ServiceItem({ 
  service, 
  index, 
  isHovered, 
  onHover,
  onClick, 
  variants,
  shouldReduceMotion 
}) {
  const Icon = iconMap[service.icon]
  const [isFocused, setIsFocused] = useState(false)
  const isHighlighted = isHovered || isFocused

  return (
    <motion.div
      variants={variants}
      className="relative"
    >
      <button
        onClick={onClick}
        onMouseEnter={onHover}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full text-left px-6 lg:px-8 py-8 lg:py-10
          border-b border-[rgba(255,255,255,0.10)]
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff] focus-visible:ring-inset
          ${isHighlighted 
            ? "bg-[rgba(77,124,255,0.035)] border-[rgba(77,124,255,0.35)]" 
            : "bg-transparent hover:bg-[rgba(77,124,255,0.02)]"
          }
        `}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Left Side: Number + Title */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Number */}
              <span 
                className={`
                  text-sm font-mono transition-colors duration-300
                  ${isHighlighted ? "text-[#4d7cff]" : "text-[rgba(255,255,255,0.35)]"}
                `}
              >
                {String(service.id).padStart(2, "0")}
              </span>

              {/* Title */}
              <div className="flex flex-col gap-1">
                {/* Eyebrow */}
                <span 
                  className={`
                    text-xs uppercase tracking-wider font-medium transition-colors duration-300
                    ${isHighlighted ? "text-[#8b93a3]" : "text-[rgba(255,255,255,0.4)]"}
                  `}
                >
                  {service.eyebrow}
                </span>
                
                {/* Title */}
                <motion.h3
                  className={`
                    font-['Space_Grotesk'] text-lg lg:text-xl font-semibold
                    transition-colors duration-300
                    ${isHighlighted ? "text-[#22d3ee]" : "text-[#f5f7fa]"}
                  `}
                  animate={shouldReduceMotion ? {} : {
                    x: isHighlighted ? 8 : 0
                  }}
                  transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  {service.title}
                </motion.h3>
              </div>
            </div>

            {/* Description with Solution Count */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isHighlighted ? "auto" : 0,
                opacity: isHighlighted ? 1 : 0
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="lg:hidden overflow-hidden mt-3 ml-10"
            >
              <p className="text-sm text-[#8b93a3] mb-2">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#4d7cff]">
                <span>{service.solutions.length} Solutions</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          </div>

          {/* Right Side: Icon + Arrow */}
          <div className="flex items-center gap-3">
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: isHighlighted ? 1 : 0.4
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="shrink-0"
            >
              <div className={`
                w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center
                transition-colors duration-300
                ${isHighlighted 
                  ? "bg-[rgba(77,124,255,0.15)]" 
                  : "bg-[rgba(77,124,255,0.08)]"
                }
              `}>
                {Icon && (
                  <Icon 
                    size={20} 
                    className={`transition-colors duration-300 ${
                      isHighlighted ? "text-[#22d3ee]" : "text-[#4d7cff]"
                    }`}
                    strokeWidth={2}
                  />
                )}
              </div>
            </motion.div>

            {/* Arrow - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={shouldReduceMotion ? {
                opacity: isHighlighted ? 1 : 0
              } : {
                opacity: isHighlighted ? 1 : 0,
                x: isHighlighted ? 0 : -10
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="hidden lg:block shrink-0"
            >
              <ChevronRight 
                size={20} 
                className="text-[#22d3ee]"
                strokeWidth={2}
              />
            </motion.div>
          </div>
        </div>

        {/* Active Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-[#4d7cff] to-[#22d3ee]"
          initial={{ width: 0 }}
          animate={{
            width: isHighlighted ? "100%" : 0
          }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.33, 1, 0.68, 1] }}
        />
      </button>
    </motion.div>
  )
}

export default Services
