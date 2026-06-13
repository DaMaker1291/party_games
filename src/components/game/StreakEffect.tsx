import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StreakEffectProps {
  streak: number
}

export default function StreakEffect({ streak }: StreakEffectProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([])

  useEffect(() => {
    if (streak > 1) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
      }))
      setParticles(newParticles)
    } else {
      setParticles([])
    }
  }, [streak])

  return (
    <>
      <AnimatePresence>
        {streak > 1 && (
          <motion.div
            key={streak}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute top-4 right-4 z-50"
          >
            <div className="bg-gradient-to-r from-neon-orange to-neon-yellow text-dark-900 font-bold px-4 py-2 rounded-full text-sm">
              🔥 x{streak}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none"
          initial={{
            opacity: 1,
            x: '50vw',
            y: '50vh',
            scale: 1,
          }}
          animate={{
            opacity: 0,
            x: `${p.x}vw`,
            y: '10vh',
            scale: 0,
          }}
          transition={{
            duration: 1,
            delay: p.delay,
            ease: 'easeOut',
          }}
        >
          <span className="text-2xl">🔥</span>
        </motion.div>
      ))}
    </>
  )
}
