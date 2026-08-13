import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { useMediaQuery } from "../hooks/useMediaQuery"

function CursorGlow() {
  const glowRef = useRef(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const shouldReduceMotion = useReducedMotion()
  
  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animation for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 80, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Disable on mobile or when reduced motion is preferred
    if (!isDesktop || shouldReduceMotion) return

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isDesktop, shouldReduceMotion, mouseX, mouseY])

  useEffect(() => {
    if (!isDesktop || shouldReduceMotion || !glowRef.current) return

    // Subscribe to spring values and update DOM directly
    const unsubscribeX = smoothX.on("change", (latest) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${latest}px`
      }
    })

    const unsubscribeY = smoothY.on("change", (latest) => {
      if (glowRef.current) {
        glowRef.current.style.top = `${latest}px`
      }
    })

    return () => {
      unsubscribeX()
      unsubscribeY()
    }
  }, [isDesktop, shouldReduceMotion, smoothX, smoothY])

  // Don't render on mobile
  if (!isDesktop) return null

  // Static subtle glow if reduced motion is enabled
  if (shouldReduceMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.03), transparent 50%)"
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(34, 211, 238, 0.4) 20%, rgba(77, 124, 255, 0.3) 40%, rgba(77, 124, 255, 0.2) 60%, transparent 80%)",
        filter: "blur(30px)",
        willChange: "transform",
        transition: "none",
        zIndex: 9999,
        mixBlendMode: "screen"
      }}
      aria-hidden="true"
    />
  )
}

export default CursorGlow
