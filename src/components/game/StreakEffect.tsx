import { motion, AnimatePresence } from 'framer-motion'

interface StreakEffectProps {
  streak: number
}

export default function StreakEffect({ streak }: StreakEffectProps) {
  return (
    <AnimatePresence>
      {streak > 1 && (
        <motion.div
          key={streak}
          initial={{ opacity: 0, scale: 0.3, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.5, y: -40 }}
          className="fixed top-4 right-4 z-50"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-dark-900 font-extrabold px-5 py-2.5 rounded-full text-sm shadow-lg shadow-orange-500/30"
          >
            🔥 x{streak} STREAK!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
