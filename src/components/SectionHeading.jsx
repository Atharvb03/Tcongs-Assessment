function SectionHeading({ 
  title, 
  subtitle, 
  align = "left",
  className = "" 
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }[align]

  return (
    <div className={`${alignClass} ${className}`}>
      {subtitle && (
        <p className="text-[#8b93a3] text-sm font-medium uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f7fa]">
          {title}
        </h2>
      )}
    </div>
  )
}

export default SectionHeading
