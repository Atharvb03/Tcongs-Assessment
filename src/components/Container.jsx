function Container({ children, className = "" }) {
  return (
    <div className={`max-w-360 mx-auto px-6 md:px-8 lg:px-16 ${className}`}>
      {children}
    </div>
  )
}

export default Container
