import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const floatingEmojis = ['🎉', '🎮', '🔥', '⚡', '🎯', '💥', '👑', '🎲']

export default function Home() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState('')
  const [showJoin, setShowJoin] = useState(false)
  const [emojiPositions, setEmojiPositions] = useState<{ emoji: string; x: number; y: number; delay: number; size: number }[]>([])

  useEffect(() => {
    setEmojiPositions(
      floatingEmojis.map((emoji) => ({
        emoji,
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        delay: Math.random() * 3,
        size: Math.random() * 16 + 20,
      }))
    )
  }, [])

  const handleCreate = () => router.push('/host')
  const handleJoin = () => {
    if (roomCode.trim()) {
      router.push(`/join?code=${roomCode.trim().toUpperCase()}`)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8 relative">
      {/* Floating emojis */}
      {emojiPositions.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${item.x}%`, top: `${item.y}%`, fontSize: item.size }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6 + item.delay,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-7xl mb-6"
        >
          🎉
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-3">
          <span className="gradient-text">PARTY</span>
          <br />
          <span className="text-white">GAMES</span>
        </h1>
        <p className="text-white/30 text-sm md:text-base mt-4 font-light tracking-wide">
          The chaotic party game for 2–10+ players
        </p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-6 mx-auto max-w-xs"
        />
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="w-full flex flex-col gap-3 relative z-10 max-w-sm"
      >
        <Button
          onClick={handleCreate}
          size="xl"
          fullWidth
          icon="🎮"
          className="text-lg"
        >
          Create Game
        </Button>

        {showJoin ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-3"
          >
            <Input
              value={roomCode}
              onChange={setRoomCode}
              placeholder="Enter room code"
              maxLength={9}
              onSubmit={handleJoin}
              icon="🔑"
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setShowJoin(false)}
                variant="ghost"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleJoin}
                variant="secondary"
                className="flex-1"
                disabled={roomCode.trim().length < 3}
              >
                Join ➜
              </Button>
            </div>
          </motion.div>
        ) : (
          <Button
            onClick={() => setShowJoin(true)}
            variant="secondary"
            size="lg"
            fullWidth
            icon="🔗"
          >
            Join Game
          </Button>
        )}
      </motion.div>

      {/* Mode cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="grid grid-cols-2 gap-3">
          <Card variant="glass" className="text-center p-5">
            <div className="text-3xl mb-2">📱</div>
            <div className="font-bold text-sm text-neon-blue">Pass & Play</div>
            <p className="text-white/30 text-xs mt-1">One phone</p>
          </Card>
          <Card variant="glass" className="text-center p-5">
            <div className="text-3xl mb-2">🔄</div>
            <div className="font-bold text-sm text-neon-green">Multi-Device</div>
            <p className="text-white/30 text-xs mt-1">Each their own</p>
          </Card>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/10 text-xs text-center relative z-10"
      >
        Hot Potato Trivia • Sabotage & Mayhem
      </motion.p>
    </div>
  )
}
