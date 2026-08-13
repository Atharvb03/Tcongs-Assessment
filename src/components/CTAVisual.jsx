import { motion, useReducedMotion } from "motion/react"
import { useRef, useEffect } from "react"

function CTAVisual() {
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Handle reduced motion - pause video if user prefers reduced motion
    if (shouldReduceMotion) {
      videoRef.current.pause()
    } else {
      // Attempt to play video
      videoRef.current.play().catch(err => {
        console.log("Video autoplay prevented:", err)
      })
    }
  }, [shouldReduceMotion])

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(7,9,13,0.4)] overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Agency showcase visual"
          poster=""
        >
          <source src="/ctavideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle dark overlay to prevent video from overpowering text */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(7,9,13,0.3), rgba(7,9,13,0.4))"
          }}
        />

        {/* Corner Accents - maintain existing design */}
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#4d7cff] opacity-25" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#22d3ee] opacity-25" />
      </motion.div>
    </div>
  )
}

export default CTAVisual
