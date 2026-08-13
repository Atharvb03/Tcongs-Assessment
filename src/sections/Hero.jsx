import { motion } from "motion/react"
import { ArrowUpRight, ArrowDown } from "lucide-react"
import AnimatedButton from "../components/AnimatedButton"
import Container from "../components/Container"

function Hero() {
  // Staggered animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  }

  return (
    <section className="relative bg-[#07090d] flex items-center justify-center pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden z-10">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        >
          <source src="/videos/animation.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay for text readability while keeping video visible */}
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(7,9,13,0.4)] via-[rgba(7,9,13,0.5)] to-[rgba(7,9,13,0.7)]" />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-5xl mx-auto"
        >
          {/* Trusted By Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 lg:mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
              {/* Shield Icon */}
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#4d7cff] to-[#22d3ee] flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              
              {/* Text */}
              <span className="text-[#f5f7fa] text-xs lg:text-sm font-medium whitespace-nowrap">
                Trusted by businesses worldwide to build scalable digital solutions
              </span>
              
              {/* Tech Logos */}
              <div className="flex items-center gap-2 pl-2 border-l border-[rgba(255,255,255,0.1)]">
                {/* React/Atom Logo */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[rgba(97,218,251,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="2" fill="#61dafb"/>
                    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61dafb" strokeWidth="1.5" fill="none"/>
                    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)"/>
                    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61dafb" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)"/>
                  </svg>
                </motion.div>

                {/* Code/Dev Logo */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[rgba(139,147,163,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b93a3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8"/>
                    <path d="M12 17v4"/>
                    <path d="m8 9 3 3-3 3"/>
                    <path d="M13 15h3"/>
                  </svg>
                </motion.div>

                {/* Figma/Colors Logo */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[rgba(162,89,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="7" cy="7" r="3" fill="#FF7262"/>
                    <circle cx="17" cy="7" r="3" fill="#A259FF"/>
                    <circle cx="7" cy="17" r="3" fill="#0ACF83"/>
                    <circle cx="17" cy="17" r="3" fill="#1ABCFE"/>
                  </svg>
                </motion.div>

                {/* Megaphone/Marketing Logo */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[rgba(255,153,0,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 11 18-5v12L3 14v-3z"/>
                    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
                  </svg>
                </motion.div>

                {/* Node/Server Logo */}
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-[rgba(104,160,99,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#68a063"/>
                    <path d="M12 2L5 6v6l7 4 7-4V6l-7-4z" stroke="#68a063" strokeWidth="1.5" fill="none"/>
                    <path d="M12 12v10" stroke="#68a063" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 12l7 4 7-4" stroke="#68a063" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-['Space_Grotesk'] text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.15] font-black mb-6 lg:mb-8"
            style={{ letterSpacing: "0.01em" }}
          >
            <span className="text-[#f5f7fa]">DIGITAL SOLUTIONS</span>
            <br />
            <span className="text-[#f5f7fa]">BUILT FOR MODERN</span>
            <br />
            <span className="text-[#f5f7fa]">BUSINESSES</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[#8b93a3] text-base lg:text-lg leading-relaxed max-w-150 mb-8 lg:mb-10"
          >
            We combine strategy, design and technology to create digital
            experiences that help ambitious businesses move forward.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <AnimatedButton
              label={
                <span className="flex items-center gap-2">
                  SCHEDULE MEETING <ArrowUpRight size={16} />
                </span>
              }
              href="#connect"
              className="w-full sm:w-auto"
            />
            <a
              href="#services"
              className="group relative px-6 py-3 text-sm font-medium text-[#f5f7fa] hover:text-[#22d3ee] transition-colors duration-300 flex items-center gap-2"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowDown
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#22d3ee] transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Hero
