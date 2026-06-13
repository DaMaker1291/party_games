import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'solid' | 'neon'
  onClick?: () => void
  animate?: boolean
}

const variantStyles = {
  glass: 'glass',
  solid: 'bg-dark-700 border border-white/10',
  neon: 'bg-dark-700 border-2 border-neon-pink/50 shadow-lg shadow-neon-pink/20',
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
  onClick,
  animate = true,
}: CardProps) {
  const Component = animate ? motion.div : 'div'
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {}

  return (
    <Component
      {...motionProps}
      onClick={onClick}
      className={`
        rounded-2xl p-6
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
