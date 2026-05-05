export default function Button({ children, variant = 'primary', type = 'button', disabled = false, className = '', ...props }) {
  const baseClasses = 'button'
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
