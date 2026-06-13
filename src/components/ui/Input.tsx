interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  maxLength?: number
  className?: string
  autoFocus?: boolean
  onSubmit?: () => void
  icon?: string
  error?: string
}

export default function Input({
  value,
  onChange,
  placeholder = '',
  label,
  maxLength,
  className = '',
  autoFocus = false,
  onSubmit,
  icon,
  error,
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-5 text-lg z-10">{icon}</span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={autoFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSubmit) onSubmit()
          }}
          className={`
            w-full px-5 py-4 rounded-2xl
            bg-dark-700/50 border 
            ${error ? 'border-red-500/50' : 'border-white/10'}
            text-white placeholder:text-white/20
            focus:border-neon-blue/50 focus:bg-dark-700/80
            transition-all duration-300
            font-body text-lg
            ${icon ? 'pl-14' : ''}
          `}
        />
        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 p-1 text-white/20 hover:text-white/60 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}
