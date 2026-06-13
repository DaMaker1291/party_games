import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'glass-strong' | 'neon-pink' | 'neon-blue' | 'neon-purple' | 'gradient-border'
  onClick?: () => void
  animate?: boolean
  glow?: boolean
}

const variantStyles = {
  'glass': 'glass',
  'glass-strong': 'glass-strong',
  'neon-pink': 'glass-strong border-neon-pink/20 neon-glow-pink',
  'neon-blue': 'glass-strong border-neon-blue/20 neon-glow-blue',
  'neon-purple': 'glass-strong border-neon-purple/20 neon-glow-purple',
  'gradient-border': 'gradient-border',
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
  onClick,
  animate = true,
  glow = false,
}: CardProps) {
  const Component = animate ? motion.div : 'div'

  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] },
      }
    : {}

  const glowClass = glow ? 'card-glow' : ''

  return (
    <Component
      {...motionProps}
      onClick={onClick}
      className={`
        rounded-2xl p-6
        ${variantStyles[variant]}
        ${glowClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  )
}
