import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

export default function Home() {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState('')
  const [showJoin, setShowJoin] = useState(false)

  const handleCreate = () => {
    router.push('/host')
  }

  const handleJoin = () => {
    if (roomCode.trim()) {
      router.push(`/join?code=${roomCode.trim().toUpperCase()}`)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-display gradient-text mb-2">
          PARTY<br />GAMES!
        </h1>
        <p className="text-white/40 text-sm mt-2">
          The chaotic party game for 2-10+ players
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full flex flex-col gap-4"
      >
        <Button
          onClick={handleCreate}
          size="lg"
          fullWidth
          icon="🎮"
        >
          Create Game
        </Button>

        {showJoin ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-3"
          >
            <Input
              value={roomCode}
              onChange={setRoomCode}
              placeholder="Enter room code (e.g. HAPPY-FAST)"
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
                Join
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

        <Card variant="glass" className="text-center mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-2xl mb-1">📱</div>
              <div className="font-bold text-neon-blue">Pass & Play</div>
              <div className="text-white/40 text-xs mt-1">One phone, all the fun</div>
            </div>
            <div>
              <div className="text-2xl mb-1">🔄</div>
              <div className="font-bold text-neon-green">Multi-Device</div>
              <div className="text-white/40 text-xs mt-1">Each player, their own screen</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-white/20 text-xs text-center"
      >
        2-10+ players • Hot Potato Trivia • Sabotage & Mayhem
      </motion.p>
    </div>
  )
}
