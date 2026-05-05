export default function Input({ label, type = 'text', placeholder, value, onChange, required = false, className = '', ...props }) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
