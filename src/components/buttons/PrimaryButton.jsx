const PrimaryButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false, 
  loading = false,
  size = 'md',
  fullWidth = false,
  icon = null,
  className = ''
}) => {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        inline-flex items-center justify-center gap-2
        bg-primary-500 hover:bg-primary-600 active:bg-primary-700
        text-white font-semibold rounded-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30
        ${className}
      `}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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

export default PrimaryButton
