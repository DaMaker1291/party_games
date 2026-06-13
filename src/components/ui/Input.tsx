import { motion } from 'framer-motion'

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
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-4 text-xl">{icon}</span>
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={autoFocus}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSubmit) {
              onSubmit()
            }
          }}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-dark-700 border border-white/10
            text-white placeholder-white/30
            focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50
            transition-all duration-200
            font-body text-lg
            ${icon ? 'pl-12' : ''}
          `}
        />
      </div>
    </div>
  )
}
