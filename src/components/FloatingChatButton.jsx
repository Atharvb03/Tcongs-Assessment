import { motion, useReducedMotion } from "motion/react"
import { Bot } from "lucide-react"
import { useState } from "react"

function FloatingChatButton() {
  const shouldReduceMotion = useReducedMotion()
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.6, 
        delay: shouldReduceMotion ? 0 : 1,
        ease: [0.33, 1, 0.68, 1]
      }}
      className="fixed right-6 bottom-6 z-50"
    >
      {!isMinimized ? (
        <motion.button
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white font-semibold text-sm shadow-[0_0_30px_rgba(74,222,128,0.5)] hover:shadow-[0_0_40px_rgba(74,222,128,0.7)] transition-all duration-300 overflow-hidden"
          aria-label="Open Chat"
        >
          {/* Animated background shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          
          {/* Pulsing dot indicator */}
          <motion.span
            animate={shouldReduceMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] shrink-0"
          />
          
          {/* Chat text */}
          <span className="relative z-10 tracking-wide">Chat</span>
          
          {/* Robot icon */}
          <Bot size={18} className="relative z-10 shrink-0" strokeWidth={2} />
        </motion.button>
      ) : (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-white flex items-center justify-center shadow-[0_0_25px_rgba(74,222,128,0.5)] hover:shadow-[0_0_35px_rgba(74,222,128,0.7)] transition-all duration-300"
          aria-label="Expand chat button"
        >
          <Bot size={22} strokeWidth={2} />
        </motion.button>
      )}
    </motion.div>
  )
}

export default FloatingChatButton
