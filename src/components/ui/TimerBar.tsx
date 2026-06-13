import { motion, AnimatePresence } from 'framer-motion'

interface TimerBarProps {
  timeLeft: number
  totalTime: number
  paused?: boolean
}

export default function TimerBar({ timeLeft, totalTime, paused = false }: TimerBarProps) {
  const progress = totalTime > 0 ? timeLeft / totalTime : 0
  const isUrgent = progress < 0.3
  const isCritical = progress < 0.15

  const getBarColor = () => {
    if (isCritical) return 'from-red-500 via-red-400 to-rose-400'
    if (isUrgent) return 'from-orange-500 via-amber-400 to-yellow-400'
    return 'from-neon-blue via-cyan-400 to-teal-400'
  }

  const getGlowColor = () => {
    if (isCritical) return 'shadow-red-500/50'
    if (isUrgent) return 'shadow-orange-500/40'
    return 'shadow-neon-blue/40'
  }

  return (
    <div className="w-full">
      <div className="relative h-3 md:h-4 rounded-full overflow-hidden bg-dark-700/50 border border-white/5">
        <motion.div
          className={`
            absolute inset-0 rounded-full bg-gradient-to-r ${getBarColor()}
            shadow-lg ${getGlowColor()}
          `}
          animate={{
            width: `${Math.max(0, progress * 100)}%`,
            transition: { duration: 0.1, ease: 'linear' },
          }}
        />
        {(isUrgent || isCritical) && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
      </div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="flex justify-between items-center mt-2 px-1"
        >
          <span className={`text-xs font-bold font-mono tabular-nums ${
            isCritical ? 'text-red-400' : isUrgent ? 'text-orange-400' : 'text-white/40'
          }`}>
            {timeLeft.toFixed(1)}s
          </span>
          {isCritical && (
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-xs font-bold text-red-400"
            >
              ⚠️ CRITICAL
            </motion.span>
          )}
          {isUrgent && !isCritical && (
            <span className="text-xs font-bold text-orange-400">⚡ HURRY!</span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
