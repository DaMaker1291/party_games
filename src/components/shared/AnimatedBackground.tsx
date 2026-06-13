import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

const COLORS = ['#ff2d95', '#00d4ff', '#39ff14', '#bf00ff', '#ffea00', '#ff6a00']

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))

    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 10 + 10,
        }))
      )
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{
            x: [`${p.x}vw`, `${(p.x + 20) % 100}vw`, `${p.x}vw`],
            y: [`${p.y}vh`, `${(p.y + 20) % 100}vh`, `${p.y}vh`],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/30 to-dark-900" />
    </div>
  )
}
