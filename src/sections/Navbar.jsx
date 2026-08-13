import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  MonitorSmartphone, 
  Code2, 
  ShoppingBag, 
  Megaphone, 
  PenTool, 
  TrendingUp,
  ChevronDown
} from "lucide-react"
import { useScrollDirection } from "../hooks/useScrollDirection"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { services } from "../data/services"
import AnimatedButton from "../components/AnimatedButton"
import Container from "../components/Container"

const iconMap = {
  MonitorSmartphone,
  Code2,
  ShoppingBag,
  Megaphone,
  PenTool,
  TrendingUp
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [activeService, setActiveService] = useState(services[0])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false)
  
  const { scrollY } = useScrollDirection()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  
  const isScrolled = scrollY > 50

  // Handle mobile menu scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Close solutions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSolutionsOpen && !e.target.closest('[data-solutions-menu]')) {
        setIsSolutionsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isSolutionsOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSolutionsOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const navLinks = [
    { label: "Home", href: "#hero", section: "home" },
    { label: "Company", href: "#company", section: "company" },
    { label: "Solutions", href: "#solutions", section: "solutions", hasDropdown: true },
    { label: "Connect", href: "#connect", section: "connect" }
  ]

  const handleNavClick = (section, hasDropdown, href) => {
    if (hasDropdown) {
      setIsSolutionsOpen(!isSolutionsOpen)
    } else {
      setActiveSection(section)
      setIsSolutionsOpen(false)
      setIsMobileMenuOpen(false)
      
      // Scroll to section
      if (href) {
        if (href === "#hero" || href === "#") {
          // Scroll to top for home
          window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
          // Scroll to specific section
          const targetSection = document.querySelector(href)
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }
  }

  const handleLetsTalkClick = () => {
    // Placeholder - will be implemented in later task
    const connectSection = document.querySelector("#connect")
    if (connectSection) {
      connectSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[rgba(7,9,13,0.80)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.08)]"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <Container>
          <div className="flex items-center justify-between h-20 lg:h-21">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-300 ml-4 lg:ml-6"
            >
              <img 
                src="/logo.png" 
                alt="Tcongs Infotech" 
                className="h-16 lg:h-20 w-auto"
              />
            </a>

            {/* Desktop Navigation - Centered */}
            {isDesktop && (
              <>
                <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
                  {navLinks.map((link) => (
                    <li key={link.section}>
                      <button
                        onClick={() => handleNavClick(link.section, link.hasDropdown, link.href)}
                        className={`relative text-sm font-medium transition-colors duration-300 ${
                          activeSection === link.section
                            ? "text-[#4d7cff]"
                            : "text-[#f5f7fa] hover:text-[#22d3ee]"
                        }`}
                        data-solutions-menu={link.hasDropdown ? "" : undefined}
                        aria-expanded={link.hasDropdown ? isSolutionsOpen : undefined}
                        aria-controls={link.hasDropdown ? "solutions-menu" : undefined}
                      >
                        <span className="flex items-center gap-1">
                          {link.label}
                          {link.hasDropdown && (
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-300 ${
                                isSolutionsOpen ? "rotate-180" : ""
                              }`}
                            />
                          )}
                        </span>
                        {activeSection === link.section && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4d7cff]"
                            layoutId="activeNav"
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>

                <AnimatedButton
                  label={
                    <span className="flex items-center gap-2">
                      LET'S TALK <ArrowUpRight size={16} />
                    </span>
                  }
                  hoverLabel={
                    <span className="flex items-center gap-2">
                      START A PROJECT <ArrowUpRight size={16} />
                    </span>
                  }
                  onClick={handleLetsTalkClick}
                  className="whitespace-nowrap"
                />
              </>
            )}

            {/* Mobile Menu Button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 hover:text-[#22d3ee] transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </Container>

        {/* Solutions Mega Menu - Desktop */}
        <AnimatePresence>
          {isSolutionsOpen && isDesktop && (
            <motion.div
              id="solutions-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="absolute top-full left-0 right-0 bg-[rgba(14,17,24,0.95)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.08)]"
              data-solutions-menu
            >
              <Container>
                <div className="grid grid-cols-2 gap-12 py-12">
                  {/* Left Column - Services List */}
                  <div>
                    <h3 className="text-[#8b93a3] text-xs font-semibold uppercase tracking-wider mb-6">
                      SERVICES
                    </h3>
                    <ul className="space-y-2">
                      {services.map((service, index) => {
                        const Icon = iconMap[service.icon]
                        const isActive = activeService.id === service.id

                        return (
                          <motion.li
                            key={service.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => setActiveService(service)}
                              onMouseEnter={() => setActiveService(service)}
                              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group ${
                                isActive
                                  ? "bg-[#151a24] text-[#4d7cff]"
                                  : "text-[#f5f7fa] hover:bg-[#151a24] hover:text-[#4d7cff]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-[#8b93a3] text-sm font-mono">
                                  {String(service.id).padStart(2, "0")}
                                </span>
                                <span className="font-medium">{service.title}</span>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ 
                                    opacity: isActive ? 1 : 0, 
                                    x: isActive ? 0 : -10 
                                  }}
                                  transition={{ duration: 0.3 }}
                                  className="ml-auto"
                                >
                                  {Icon && <Icon size={18} />}
                                </motion.div>
                              </div>
                            </button>
                          </motion.li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Right Column - Active Service Details */}
                  <div className="border-l border-[rgba(255,255,255,0.08)] pl-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeService.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          {iconMap[activeService.icon] && (
                            <div className="mb-4 text-[#4d7cff]">
                              {(() => {
                                const Icon = iconMap[activeService.icon]
                                return <Icon size={32} />
                              })()}
                            </div>
                          )}
                          <h4 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-3">
                            {activeService.title}
                          </h4>
                          <p className="text-[#8b93a3] leading-relaxed">
                            {activeService.description}
                          </p>
                        </div>
                        <a
                          href={`#services?open=${activeService.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setIsSolutionsOpen(false)
                            
                            // Scroll to services section
                            const servicesSection = document.querySelector("#services")
                            if (servicesSection) {
                              servicesSection.scrollIntoView({ behavior: "smooth" })
                            }
                            
                            // Trigger custom event to open the specific service panel
                            setTimeout(() => {
                              window.dispatchEvent(
                                new CustomEvent("openServicePanel", { 
                                  detail: { serviceId: activeService.id } 
                                })
                              )
                            }, 500)
                          }}
                          className="inline-flex items-center gap-2 text-[#4d7cff] hover:text-[#22d3ee] font-medium transition-colors duration-300"
                        >
                          Explore Service <ArrowUpRight size={16} />
                        </a>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#07090d]"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.section}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                            className={`w-full text-left px-4 py-4 text-lg font-medium transition-colors rounded-lg ${
                              activeSection === link.section
                                ? "text-[#4d7cff] bg-[#0e1118]"
                                : "text-[#f5f7fa] hover:bg-[#0e1118]"
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              {link.label}
                              <ChevronDown 
                                size={20} 
                                className={`transition-transform duration-300 ${
                                  isMobileSolutionsOpen ? "rotate-180" : ""
                                }`}
                              />
                            </span>
                          </button>
                          <AnimatePresence>
                            {isMobileSolutionsOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 ml-4 space-y-1"
                              >
                                {services.map((service) => (
                                  <li key={service.id}>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setIsMobileMenuOpen(false)
                                        
                                        // Scroll to services section
                                        const servicesSection = document.querySelector("#services")
                                        if (servicesSection) {
                                          servicesSection.scrollIntoView({ behavior: "smooth" })
                                        }
                                        
                                        // Trigger custom event to open the specific service panel
                                        setTimeout(() => {
                                          window.dispatchEvent(
                                            new CustomEvent("openServicePanel", { 
                                              detail: { serviceId: service.id } 
                                            })
                                          )
                                        }, 500)
                                      }}
                                      className="w-full text-left px-4 py-3 text-sm text-[#8b93a3] hover:text-[#4d7cff] hover:bg-[#0e1118] rounded-lg transition-colors"
                                    >
                                      <div className="font-medium mb-1">{service.title}</div>
                                      <div className="text-xs">{service.description}</div>
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault()
                            handleNavClick(link.section, false, link.href)
                          }}
                          className={`block px-4 py-4 text-lg font-medium transition-colors rounded-lg ${
                            activeSection === link.section
                              ? "text-[#4d7cff] bg-[#0e1118]"
                              : "text-[#f5f7fa] hover:bg-[#0e1118]"
                          }`}
                        >
                          {link.label}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-[rgba(255,255,255,0.08)]"
              >
                <AnimatedButton
                  label={
                    <span className="flex items-center justify-center gap-2">
                      LET'S TALK <ArrowUpRight size={16} />
                    </span>
                  }
                  hoverLabel={
                    <span className="flex items-center justify-center gap-2">
                      START A PROJECT <ArrowUpRight size={16} />
                    </span>
                  }
                  onClick={() => {
                    handleLetsTalkClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
