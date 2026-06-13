import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  icon?: string
  fullWidth?: boolean
}

const variants = {
  primary:
    'bg-gradient-to-r from-neon-pink to-neon-purple text-white hover:shadow-lg hover:shadow-neon-pink/30 active:scale-95',
  secondary:
    'bg-dark-700 text-white border border-white/20 hover:border-neon-blue hover:text-neon-blue',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:scale-95',
  ghost:
    'bg-transparent text-white/60 hover:text-white hover:bg-white/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-bold',
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
  fullWidth = false,
}: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`
        rounded-xl font-bold transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  )
}
