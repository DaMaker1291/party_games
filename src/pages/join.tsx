import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import TimerBar from '../components/ui/TimerBar'
import QuestionCard from '../components/game/QuestionCard'
import ScoreBoard from '../components/game/ScoreBoard'
import { useSocket, useGameRoom } from '../hooks/useSocket'
import { useTimer } from '../hooks/useTimer'
import { getCurrentTimer, getCurrentPlayer } from '../lib/gameUtils'

export default function Join() {
  const router = useRouter()
  const { roomCode: urlCode } = router.query
  const { connected } = useSocket()
  const {
    room, playerId,
    joinRoom, submitAnswer, nextTurn, timerExpired,
  } = useGameRoom()

  const [playerName, setPlayerName] = useState('')
  const [joined, setJoined] = useState(false)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')
  const [answerResult, setAnswerResult] = useState<{ correct: boolean; points: number } | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)

  const handleJoin = async () => {
    if (!playerName.trim() || !urlCode) return
    setJoining(true)
    setError('')
    const result = await joinRoom(urlCode as string, playerName.trim())
    if (result.success) {
      setJoined(true)
    } else {
      setError(result.error || 'Failed to join room')
    }
    setJoining(false)
  }

  const currentPlayer = room ? getCurrentPlayer(room) : undefined
  const isMyTurn = currentPlayer?.id === playerId
  const timerSeconds = room ? getCurrentTimer(room) : 15

  const handleTimerExpire = useCallback(() => {
    if (room && room.state === 'playing') {
      timerExpired(room.code)
      setAnswerResult({ correct: false, points: 0 })
    }
  }, [room, timerExpired])

  const timer = useTimer({
    initialTime: timerSeconds,
    onExpire: handleTimerExpire,
    autoStart: false,
    paused: room?.state !== 'playing',
  })

  useEffect(() => {
    if (room?.state === 'playing' && !timer.isRunning) {
      timer.reset(timerSeconds)
      timer.start()
    }
  }, [room?.currentRound, room?.state, timer, timerSeconds])

  useEffect(() => {
    if (room?.state === 'game-over') timer.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.state])

  const handleAnswer = async (answerIndex: number) => {
    if (!room || !playerId) return
    timer.stop()
    const result = await submitAnswer(room.code, playerId, answerIndex)
    if (result.success) {
      setAnswerResult({ correct: result.correct || false, points: result.pointsEarned || 0 })
      setCurrentStreak(result.correct ? (s) => s + 1 : 0)
    }
  }

  if (!urlCode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <Card variant="glass" className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔗</div>
          <h2 className="text-2xl font-black gradient-text mb-2">Invalid Link</h2>
          <p className="text-white/30 text-sm mb-6">No room code provided</p>
          <Button onClick={() => router.push('/')} variant="primary">Go Home</Button>
        </Card>
      </div>
    )
  }

  if (!joined) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            🔗
          </motion.div>
          <h1 className="text-3xl font-black gradient-text mb-2">Join Game</h1>
          <p className="text-white/30 text-sm">
            Room: <span className="font-mono font-bold text-neon-yellow tracking-wider">{urlCode}</span>
          </p>
        </motion.div>

        <div className="w-full max-w-sm">
          <Input
            value={playerName}
            onChange={setPlayerName}
            placeholder="Enter your name"
            maxLength={16}
            icon="👤"
            autoFocus
            onSubmit={handleJoin}
            error={error}
          />
        </div>

        <div className="flex gap-2 w-full max-w-sm">
          <Button onClick={() => router.push('/')} variant="ghost" className="flex-1">Back</Button>
          <Button
            onClick={handleJoin}
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={!playerName.trim() || joining}
            loading={joining}
          >
            Join!
          </Button>
        </div>

        {!connected && (
          <div className="text-center text-red-400/80 text-xs bg-red-500/5 rounded-xl py-2 px-4">
            ⚠️ Connecting to game server...
          </div>
        )}
      </div>
    )
  }

  if (!room) return null

  // Lobby waiting
  if (room.state === 'lobby') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black gradient-text mb-2">You're In!</h2>
          <p className="text-white/40 text-sm mb-6">Waiting for host to start the game...</p>

          <div className="flex gap-3 justify-center mb-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                className="text-3xl"
              >
                🎲
              </motion.div>
            ))}
          </div>

          <Card variant="glass" className="text-center !p-4">
            <p className="text-xs text-white/30">
              Players in room: <span className="text-white font-bold">{room.players.length}</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {room.players.map((p) => (
                <span key={p.id} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium">
                  {p.name}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Game Over
  if (room.state === 'game-over') {
    const sorted = [...room.players].sort((a, b) => b.score - a.score)
    return (
      <div className="flex-1 flex flex-col px-6 py-8 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-black gradient-text mb-1">Game Over!</h1>
        </motion.div>

        <Card variant="glass-strong" className="flex-1 !p-4">
          <div className="flex flex-col gap-2">
            {sorted.map((player, index) => {
              const podiums = ['👑', '🥈', '🥉']
              const isTop3 = index < 3
              const isMe = player.id === playerId
              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center justify-between p-4 rounded-xl
                    ${isMe ? 'bg-neon-blue/10 border border-neon-blue/20' : 'bg-white/[0.02] border border-white/[0.04]'}
                  `}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-2xl flex-shrink-0">
                      {isTop3 ? podiums[index] : `#${index + 1}`}
                    </span>
                    <span className="font-bold truncate">
                      {player.name}
                      {isMe && <span className="text-neon-blue text-xs ml-2">(You)</span>}
                    </span>
                  </div>
                  <span className={`text-xl font-black flex-shrink-0 ${index === 0 ? 'gradient-text-gold' : ''}`}>
                    {player.score}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </Card>

        <Button onClick={() => router.push('/')} variant="primary" size="lg" fullWidth>
          Back to Menu
        </Button>
      </div>
    )
  }

  // Playing
  return (
    <div className="flex-1 flex flex-col px-5 py-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06]">
          <span className="text-xs font-bold text-white/40">
            Round <span className="text-white/70">{room.currentRound}</span>
            <span className="text-white/20">/</span>
            <span className="text-white/30">{room.maxRounds}</span>
          </span>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30 uppercase tracking-wider">Playing</div>
          <div className="font-bold text-sm text-neon-blue">{currentPlayer?.name}</div>
        </div>
      </div>

      <TimerBar timeLeft={timer.timeLeft} totalTime={timerSeconds} paused={room.state !== 'playing'} />

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {answerResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className={`text-8xl mb-5 ${answerResult.correct ? '' : 'animate-shake'}`}
              >
                {answerResult.correct ? '✅' : '💥'}
              </motion.div>
              <h2 className={`text-3xl font-black mb-2 ${answerResult.correct ? 'text-emerald-400' : 'text-red-400'}`}>
                {answerResult.correct ? 'CORRECT!' : 'WRONG!'}
              </h2>
              {answerResult.correct && (
                <p className="text-2xl font-black gradient-text-gold">+{answerResult.points} pts</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`q-${room.currentRound}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {room.currentQuestion && (
                <QuestionCard
                  question={room.currentQuestion}
                  onAnswer={handleAnswer}
                  disabled={!isMyTurn}
                />
              )}
              {!isMyTurn && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-white/20 text-sm mt-6"
                >
                  Waiting for <span className="text-neon-blue font-bold">{currentPlayer?.name}</span>
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScoreBoard players={room.players} currentPlayerId={currentPlayer?.id} compact />
    </div>
  )
}
