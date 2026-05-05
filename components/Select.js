export default function Select({ label, options, value, onChange, required = false, className = '', ...props }) {
  return (
    <div className={`form-field ${className}`}>
      {label && (
        <label>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
