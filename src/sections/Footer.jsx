import { motion, useReducedMotion } from "motion/react"
import Container from "../components/Container"

function Footer() {
  const shouldReduceMotion = useReducedMotion()

  // Staggered animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  const companyLinks = [
    { label: "Home", href: "#" },
    { label: "Company", href: "#company" },
    { label: "Solution", href: "#services" },
    { label: "Connect", href: "#connect" }
  ]

  const servicesLinks = [
    { label: "Web & App Development", href: "#services" },
    { label: "Software Development", href: "#services" },
    { label: "E-commerce Solutions", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
    { label: "Branding & UI/UX", href: "#services" },
    { label: "Business Growth", href: "#services" }
  ]

  const scaleLinks = [
    { label: "Launch on Top Marketplaces", href: "#services" },
    { label: "Build High-Converting Stores", href: "#services" },
    { label: "Optimize Listings for Sales", href: "#services" },
    { label: "Run Profitable Ad Campaigns", href: "#services" },
    { label: "Grow Globally", href: "#services" }
  ]

  return (
    <footer className="relative bg-[#07090d] border-t border-[rgba(255,255,255,0.08)]">
      {/* Subtle atmospheric background gradient */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(77,124,255,0.05), transparent 60%)"
        }}
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-16 lg:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Brand Statement */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <p className="text-[#8b93a3] text-sm leading-relaxed mb-8">
                Empowering global brands with 8+ years of expertise in custom web development, e-commerce marketplace optimization, and Generative Engine Optimization (GEO). We turn complex challenges into seamless digital growth.
              </p>
              
              {/* Social Links */}
              <motion.a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] text-[#8b93a3] hover:text-[#4d7cff] hover:bg-[rgba(77,124,255,0.1)] transition-all duration-300"
                aria-label="LinkedIn"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Column 2: Company */}
            <motion.nav 
              variants={itemVariants}
              aria-label="Footer Company Navigation"
              className="lg:col-span-1"
            >
              <h3 className="text-[#f5f7fa] text-sm font-semibold mb-6">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      duration: shouldReduceMotion ? 0 : 0.4 
                    }}
                  >
                    <a
                      href={link.href}
                      className="text-[#8b93a3] hover:text-[#4d7cff] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Column 3: Specialized Services */}
            <motion.nav 
              variants={itemVariants}
              aria-label="Footer Services Navigation"
              className="lg:col-span-1"
            >
              <h3 className="text-[#f5f7fa] text-sm font-semibold mb-6">
                Specialized Services
              </h3>
              <ul className="space-y-3">
                {servicesLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      duration: shouldReduceMotion ? 0 : 0.4 
                    }}
                  >
                    <a
                      href={link.href}
                      className="text-[#8b93a3] hover:text-[#22d3ee] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Column 4: Scale Your Online Business */}
            <motion.nav 
              variants={itemVariants}
              aria-label="Footer Business Solutions Navigation"
              className="lg:col-span-1"
            >
              <h3 className="text-[#f5f7fa] text-sm font-semibold mb-6">
                Scale Your Online Business
              </h3>
              <ul className="space-y-3">
                {scaleLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      duration: shouldReduceMotion ? 0 : 0.4 
                    }}
                  >
                    <a
                      href={link.href}
                      className="text-[#8b93a3] hover:text-[#4d7cff] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-[#8b93a3] text-xs">
              <span className="font-semibold text-[#f5f7fa]">Mumbai Office:</span> Based in Mumbai, India. Serving clients worldwide.
            </p>

            <p className="text-[#8b93a3] text-xs">
              © {new Date().getFullYear()} Tcongs Infotech. All Rights Reserved.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  )
}

export default Footer
