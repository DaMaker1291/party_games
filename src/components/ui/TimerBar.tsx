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

  const barColor = isCritical
    ? 'from-red-500 to-red-600'
    : isUrgent
    ? 'from-orange-400 to-red-500'
    : 'from-neon-blue to-neon-green'

  return (
    <div className="w-full">
      <div className="relative h-4 bg-dark-700 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} relative`}
          animate={{
            width: `${Math.max(0, progress * 100)}%`,
            transition: { duration: 0.1, ease: 'linear' },
          }}
        >
          {(isUrgent || isCritical) && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {isUrgent && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-right mt-1"
          >
            <span className={`text-xs font-bold ${isCritical ? 'text-red-400' : 'text-orange-400'}`}>
              {isCritical ? '🔥 CRITICAL!' : '⚡ HURRY!'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
