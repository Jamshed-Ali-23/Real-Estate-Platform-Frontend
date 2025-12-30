const OutlineButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  loading = false,
  size = 'md',
  fullWidth = false,
  icon = null,
  variant = 'primary',
  className = ''
}) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variants = {
    primary: 'border-primary-500 text-primary-500 hover:bg-primary-50',
    secondary: 'border-secondary-300 text-secondary-700 hover:bg-secondary-50',
    danger: 'border-error text-error hover:bg-red-50'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${variants[variant]}
        inline-flex items-center justify-center gap-2
        bg-transparent border-2 font-semibold rounded-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}

export default OutlineButton
