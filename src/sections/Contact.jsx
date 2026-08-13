import { useState, useEffect } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, CheckCircle2, Globe, ExternalLink } from "lucide-react"
import { contactContent } from "../data/contact"
import Container from "../components/Container"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    message: "",
    verification: ""
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Generate random math question
  const [mathQuestion, setMathQuestion] = useState({ num1: 0, num2: 0, answer: 0 })

  // Generate new math question on component mount
  useEffect(() => {
    generateMathQuestion()
  }, [])

  // Generate new math question
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1 // 1-10
    const num2 = Math.floor(Math.random() * 10) + 1 // 1-10
    setMathQuestion({
      num1,
      num2,
      answer: num1 + num2
    })
  }

  // Section entrance animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2
      }
    }
  }

  const itemVariants = {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation - at least 2 characters, only letters and spaces
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name."
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name should only contain letters and spaces."
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }

    // Phone validation - 10 digits for India
    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number."
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number."
    }

    // Verification validation - check against dynamic math answer
    if (!formData.verification.trim()) {
      newErrors.verification = "Please answer the verification question."
    } else if (parseInt(formData.verification.trim()) !== mathQuestion.answer) {
      newErrors.verification = "Incorrect answer. Please try again."
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      message: "",
      verification: ""
    })
    setErrors({})
    setIsSuccess(false)
    generateMathQuestion() // Generate new math question on reset
  }

  return (
    <section 
      id="connect" 
      className="relative bg-[#07090d] py-20 md:py-28 lg:py-36 overflow-hidden scroll-mt-20 lg:scroll-mt-21"
    >
      {/* Blue Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/blue.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#07090d] opacity-40" />
      </div>

      {/* Atmospheric Gradient Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(77,124,255,0.12), rgba(34,211,238,0.06), transparent 60%)"
        }}
      />

      <Container className="relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Content */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5"
            >
              {/* Eyebrow */}
              <p className="text-[#4d7cff] text-xs lg:text-sm uppercase tracking-[0.2em] font-medium mb-6">
                {contactContent.eyebrow}
              </p>

              {/* Heading */}
              <h2 className="font-['Space_Grotesk'] text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] font-bold mb-6">
                <span className="text-[#f5f7fa]">{contactContent.title}</span>
              </h2>

              {/* Description */}
              <p className="text-[#8b93a3] text-base lg:text-lg leading-relaxed max-w-md mb-8">
                {contactContent.description}
              </p>

              {/* Process Steps */}
              <div className="space-y-4 mb-10">
                {contactContent.processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.5, 
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="flex items-start gap-3"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[rgba(77,124,255,0.15)] flex items-center justify-center mt-0.5">
                      <span className="text-[#4d7cff] text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-[#f5f7fa] text-sm leading-relaxed">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-[#8b93a3] text-xs uppercase tracking-wider mb-2">
                    EMAIL
                  </p>
                  <a 
                    href={`mailto:${contactContent.email}`}
                    className="text-[#f5f7fa] hover:text-[#22d3ee] transition-colors duration-300"
                  >
                    {contactContent.email}
                  </a>
                </div>

                <div>
                  <p className="text-[#8b93a3] text-xs uppercase tracking-wider mb-2">
                    LOCATION
                  </p>
                  <p className="text-[#f5f7fa]">{contactContent.location}</p>
                </div>

                <div>
                  <p className="text-[#8b93a3] text-xs uppercase tracking-wider mb-2">
                    SOCIAL
                  </p>
                  <div className="flex flex-col gap-3">
                    {contactContent.socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        className="text-[#f5f7fa] hover:text-[#22d3ee] transition-colors duration-300 flex items-center gap-2 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe size={16} />
                        <span>{link.name}</span>
                        <ExternalLink size={12} className="opacity-60" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-7"
            >
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-8 border border-[#22d3ee] rounded-2xl p-6 lg:p-8" noValidate>
                  {contactContent.fields.map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className={`
                          block text-sm font-medium mb-3 transition-colors duration-300
                          ${errors[field.id] 
                            ? "text-[#ff6b6b]" 
                            : formData[field.id] 
                            ? "text-[#4d7cff]" 
                            : "text-[#8b93a3]"
                          }
                        `}
                      >
                        {/* Dynamic label for verification field */}
                        {field.isDynamic 
                          ? `${field.label}: ${mathQuestion.num1} + ${mathQuestion.num2} =`
                          : field.label
                        }
                        {field.required && <span className="text-[#4d7cff] ml-1">*</span>}
                      </label>

                      {/* Special handling for phone field with country code */}
                      {field.hasCountryCode ? (
                        <div className="flex gap-3">
                          {/* Country Code Dropdown */}
                          <div className="relative w-40 shrink-0">
                            <select
                              value={formData.countryCode}
                              onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                              className={`
                                w-full bg-transparent text-[#f5f7fa] appearance-none
                                border-0 border-b py-3 pr-8 transition-all duration-300
                                focus:outline-none focus:ring-0 cursor-pointer text-sm
                                ${errors[field.id]
                                  ? "border-[#ff6b6b]"
                                  : "border-[rgba(255,255,255,0.12)] focus:border-[#4d7cff]"
                                }
                              `}
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%238b93a3' d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 0.5rem center',
                                backgroundSize: '1rem'
                              }}
                            >
                              {contactContent.countryCodes.map((country) => (
                                <option 
                                  key={country.code + country.country} 
                                  value={country.code}
                                  className="bg-[#0e1118] text-[#f5f7fa]"
                                >
                                  {country.flag} {country.code}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Phone Number Input */}
                          <div className="flex-1">
                            <input
                              type="tel"
                              id={field.id}
                              name={field.id}
                              value={formData[field.id]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              autoComplete={field.autocomplete}
                              aria-invalid={!!errors[field.id]}
                              aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                              className={`
                                w-full bg-transparent text-[#f5f7fa] placeholder:text-[#8b93a3]
                                border-0 border-b py-3 transition-all duration-300
                                focus:outline-none focus:ring-0
                                ${errors[field.id]
                                  ? "border-[#ff6b6b]"
                                  : "border-[rgba(255,255,255,0.12)] focus:border-[#4d7cff]"
                                }
                              `}
                            />
                          </div>
                        </div>
                      ) : field.type === "textarea" ? (
                        /* Textarea for message field */
                        <textarea
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          rows={field.rows}
                          required={field.required}
                          aria-invalid={!!errors[field.id]}
                          aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                          className={`
                            w-full bg-transparent text-[#f5f7fa] placeholder:text-[#8b93a3]
                            border-0 border-b transition-all duration-300
                            focus:outline-none focus:ring-0 resize-y py-3
                            ${errors[field.id]
                              ? "border-[#ff6b6b]"
                              : "border-[rgba(255,255,255,0.12)] focus:border-[#4d7cff]"
                            }
                          `}
                        />
                      ) : (
                        /* Regular input fields */
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          autoComplete={field.autocomplete}
                          aria-invalid={!!errors[field.id]}
                          aria-describedby={errors[field.id] ? `${field.id}-error` : undefined}
                          className={`
                            w-full bg-transparent text-[#f5f7fa] placeholder:text-[#8b93a3]
                            border-0 border-b py-3 transition-all duration-300
                            focus:outline-none focus:ring-0
                            ${errors[field.id]
                              ? "border-[#ff6b6b]"
                              : "border-[rgba(255,255,255,0.12)] focus:border-[#4d7cff]"
                            }
                          `}
                        />
                      )}

                      {errors[field.id] && (
                        <p 
                          id={`${field.id}-error`}
                          className="text-[#ff6b6b] text-sm mt-2"
                        >
                          {errors[field.id]}
                        </p>
                      )}
                    </div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full lg:w-auto px-8 py-4 rounded-lg font-medium text-sm
                      transition-all duration-300 flex items-center justify-center gap-2
                      ${isSubmitting
                        ? "bg-[#4d7cff] opacity-50 cursor-not-allowed"
                        : "bg-[#4d7cff] hover:bg-[#22d3ee]"
                      }
                      text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4d7cff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090d]
                    `}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
                    {!isSubmitting && <ArrowUpRight size={18} />}
                  </motion.button>

                  {/* Alternative Contact Method */}
                  <p className="text-[#8b93a3] text-sm mt-6">
                    Prefer email instead? Feel free to contact us directly at{" "}
                    <a 
                      href="mailto:info@tcongsinfotech.com"
                      className="text-[#4d7cff] hover:text-[#22d3ee] transition-colors duration-300"
                    >
                      info@tcongsinfotech.com
                    </a>
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.33, 1, 0.68, 1] }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={shouldReduceMotion ? { scale: 1 } : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: shouldReduceMotion ? 0 : 0.2,
                      ease: [0.33, 1, 0.68, 1]
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(77,124,255,0.15)] mb-6"
                  >
                    <CheckCircle2 size={32} className="text-[#22d3ee]" />
                  </motion.div>

                  <h3 className="font-['Space_Grotesk'] text-2xl lg:text-3xl font-bold text-[#f5f7fa] mb-3">
                    Thanks — we've received your inquiry.
                  </h3>

                  <p className="text-[#8b93a3] mb-8 max-w-md mx-auto">
                    We'll be in touch shortly.
                  </p>

                  <button
                    onClick={handleReset}
                    className="text-[#4d7cff] hover:text-[#22d3ee] transition-colors duration-300 text-sm font-medium"
                  >
                    Send another inquiry →
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Contact
