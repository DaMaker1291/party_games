import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useRef } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import TimerBar from '../components/ui/TimerBar'
import PlayerList from '../components/lobby/PlayerList'
import QuestionCard from '../components/game/QuestionCard'
import ScoreBoard from '../components/game/ScoreBoard'
import SabotagePanel from '../components/game/SabotagePanel'
import StreakEffect from '../components/game/StreakEffect'
import { useSocket, useGameRoom, getSocket } from '../hooks/useSocket'
import { useTimer } from '../hooks/useTimer'
import { getCurrentTimer, getCurrentPlayer } from '../lib/gameUtils'

export default function Host() {
  const router = useRouter()
  const { connected } = useSocket()
  const {
    room, playerId, isHost,
    createRoom, addPassAndPlayPlayer, startGame,
    submitAnswer, nextTurn, timerExpired, useSabotage,
  } = useGameRoom()

  const [playerName, setPlayerName] = useState('')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [showSabotage, setShowSabotage] = useState(false)
  const [answerResult, setAnswerResult] = useState<{ correct: boolean; points: number } | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [gameMode, setGameMode] = useState<'pass-and-play' | 'multi-device'>('pass-and-play')
  const [showModeSelect, setShowModeSelect] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const creatingRef = useRef(false)
  const [copied, setCopied] = useState(false)

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
    paused: !gameStarted || (room?.state !== 'playing'),
  })

  useEffect(() => {
    if (room?.state === 'playing' && !timer.isRunning) {
      timer.reset(getCurrentTimer(room))
      timer.start()
    }
  }, [room?.currentRound, room?.state, timer])

  useEffect(() => {
    if (room?.state === 'game-over') timer.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.state])

  const handleModeSelect = useCallback(async (mode: 'pass-and-play' | 'multi-device') => {
    if (!playerName.trim() || creatingRef.current) return
    creatingRef.current = true
    setGameMode(mode)
    setConnecting(true)

    const s = getSocket()
    if (!s?.connected) {
      await new Promise<void>((resolve) => {
        const check = setInterval(() => {
          if (getSocket()?.connected) { clearInterval(check); resolve() }
        }, 100)
        setTimeout(() => clearInterval(check), 8000)
      })
    }

    const result = await createRoom(playerName.trim(), mode)
    if (result.success) setShowModeSelect(false)
    setConnecting(false)
    creatingRef.current = false
  }, [playerName, createRoom])

  const handleAddPlayer = async () => {
    if (!newPlayerName.trim() || !room) return
    await addPassAndPlayPlayer(room.code, newPlayerName.trim())
    setNewPlayerName('')
  }

  const handleStartGame = async () => {
    if (!room) return
    await startGame(room.code)
    setGameStarted(true)
    setCurrentStreak(0)
  }

  const handleAnswer = async (answerIndex: number) => {
    if (!room || !playerId) return
    timer.stop()
    const result = await submitAnswer(room.code, playerId, answerIndex)
    if (result.success) {
      setAnswerResult({ correct: result.correct || false, points: result.pointsEarned || 0 })
      setCurrentStreak(result.correct ? (s) => s + 1 : 0)
    }
  }

  const handleNextTurn = async () => {
    setAnswerResult(null)
    setShowSabotage(false)
    if (!room) return
    await nextTurn(room.code)
  }

  const handleUseSabotage = async (targetPlayerId: string, sabotageId: string) => {
    if (!room) return
    await useSabotage(room.code, targetPlayerId, sabotageId)
  }

  const copyRoomCode = () => {
    if (room?.code) {
      navigator.clipboard.writeText(room.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePlayAgain = () => window.location.reload()

  // ── Mode Select Screen ──
  if (showModeSelect) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🎮
            </motion.div>
            <h1 className="text-3xl font-black gradient-text">Create Game</h1>
            <p className="text-white/30 text-sm mt-2">Set up your party</p>
          </div>

          <Input
            value={playerName}
            onChange={setPlayerName}
            placeholder="Your name"
            maxLength={16}
            icon="👤"
            autoFocus
            className="mb-6"
          />

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => handleModeSelect('pass-and-play')}
              variant="primary"
              size="xl"
              fullWidth
              icon="📱"
              disabled={!playerName.trim() || connecting}
              loading={connecting}
            >
              Pass & Play
            </Button>
            <Button
              onClick={() => handleModeSelect('multi-device')}
              variant="secondary"
              size="lg"
              fullWidth
              icon="🔄"
              disabled={!playerName.trim() || connecting}
              loading={connecting}
            >
              Multi-Device
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── Loading ──
  if (!room) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="text-5xl"
        >
          🎲
        </motion.div>
        <p className="text-white/30 text-sm animate-pulse">Creating room...</p>
      </div>
    )
  }

  // ── Lobby ──
  if (room.state === 'lobby') {
    return (
      <div className="flex-1 flex flex-col px-6 py-6 gap-5 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-2xl font-black gradient-text">Game Lobby</h1>
          <p className="text-white/30 text-xs mt-1">
            {gameMode === 'pass-and-play' ? 'Pass the phone around!' : 'Share the code below!'}
          </p>
        </motion.div>

        {gameMode === 'multi-device' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="neon-blue" glow className="text-center !p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-neon-blue font-semibold mb-2">
                Room Code
              </p>
              <motion.button
                onClick={copyRoomCode}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3"
              >
                <h2 className="text-4xl font-black tracking-[0.15em] text-white font-mono">
                  {room.code}
                </h2>
                <span className="text-xs text-white/20 group-hover:text-white/60 transition-colors">
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </span>
              </motion.button>
              <p className="text-xs text-white/20 mt-3">
                Friends scan the QR or enter code at the join page
              </p>
            </Card>
          </motion.div>
        )}

        <div className="flex-1 overflow-y-auto">
          <PlayerList players={room.players} isHost={isHost} />
        </div>

        {isHost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-3"
          >
            <Input
              value={newPlayerName}
              onChange={setNewPlayerName}
              placeholder="Add player name"
              maxLength={16}
              icon="👤"
              onSubmit={handleAddPlayer}
            />
            <div className="flex gap-2">
              <Button onClick={() => router.push('/')} variant="ghost" className="flex-1">Leave</Button>
              <Button
                onClick={handleStartGame}
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={room.players.length < 2}
                icon={room.players.length >= 2 ? '🚀' : undefined}
              >
                {room.players.length < 2 ? `Need 2+ Players (${room.players.length})` : 'Start Game!'}
              </Button>
            </div>
          </motion.div>
        )}

        {!connected && (
          <div className="text-center text-red-400/80 text-xs bg-red-500/5 rounded-xl py-2">
            ⚠️ Connection lost. Reconnecting...
          </div>
        )}
      </div>
    )
  }

  // ── Game Over ──
  if (room.state === 'game-over') {
    const sorted = [...room.players].sort((a, b) => b.score - a.score)
    return (
      <div className="flex-1 flex flex-col px-6 py-8 gap-6 relative">
        {/* Confetti */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-lg"
            initial={{ x: Math.random() * 100 + '%', y: -20, rotate: 0, scale: 0 }}
            animate={{
              y: '100vh',
              rotate: 720,
              scale: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1.5,
              ease: 'easeIn',
            }}
          >
            {['🎉', '✨', '⭐', '🎊', '💫', '🌟', '🎆'][i % 7]}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-7xl mb-4"
          >
            🏆
          </motion.div>
          <h1 className="text-3xl font-black gradient-text mb-1">Game Over!</h1>
          <p className="text-white/30 text-sm">{room.players.length} players battled</p>
        </motion.div>

        <div className="flex-1">
          <Card variant="glass-strong" className="!p-4">
            <div className="flex flex-col gap-2">
              {sorted.map((player, index) => {
                const podiums = ['👑', '🥈', '🥉']
                const isTop3 = index < 3
                return (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className={`
                      flex items-center justify-between p-4 rounded-xl
                      ${isTop3
                        ? `bg-gradient-to-r ${['from-yellow-500/10', 'from-gray-300/10', 'from-amber-600/10'][index]} border border-white/10`
                        : 'bg-white/[0.02] border border-white/[0.04]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-2xl flex-shrink-0">
                        {isTop3 ? podiums[index] : `#${index + 1}`}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-base truncate block">{player.name}</span>
                        <span className="text-xs text-white/30">
                          {player.isAlive ? 'Survived! 🎉' : 'Eliminated 💀'}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                      className={`text-2xl font-black flex-shrink-0 ${index === 0 ? 'gradient-text-gold' : index <= 2 ? 'text-white' : 'text-white/40'}`}
                    >
                      {player.score}
                    </motion.span>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handlePlayAgain} variant="primary" size="lg" fullWidth icon="🔄">
            Play Again
          </Button>
          <Button onClick={() => router.push('/')} variant="ghost" fullWidth>
            Back to Menu
          </Button>
        </div>
      </div>
    )
  }

  // ── Game Playing ──
  return (
    <div className="flex-1 flex flex-col px-5 py-4 gap-4 relative">
      <StreakEffect streak={currentStreak} />

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06]">
            <span className="text-xs font-bold text-white/40">
              Round <span className="text-white/70">{room.currentRound}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/30">{room.maxRounds}</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/30 uppercase tracking-wider">Playing</div>
          <motion.div
            key={currentPlayer?.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-bold text-sm text-neon-blue"
          >
            {currentPlayer?.name}
          </motion.div>
        </div>
      </div>

      {/* Timer */}
      <TimerBar timeLeft={timer.timeLeft} totalTime={timerSeconds} paused={room.state !== 'playing'} />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {answerResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', damping: 15 }}
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
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-3xl font-black mb-2 ${answerResult.correct ? 'text-emerald-400' : 'text-red-400'}`}
              >
                {answerResult.correct ? 'CORRECT!' : 'WRONG!'}
              </motion.h2>
              {answerResult.correct && (
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-black gradient-text-gold"
                >
                  +{answerResult.points} pts
                </motion.p>
              )}

              {isHost && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 mt-8"
                >
                  {showSabotage && (
                    <SabotagePanel
                      players={room.players}
                      currentPlayerId={playerId || ''}
                      onUseSabotage={handleUseSabotage}
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowSabotage(!showSabotage)}
                      variant="secondary"
                      icon="⚡"
                      className="flex-1"
                      size="md"
                    >
                      {showSabotage ? 'Cancel' : 'Sabotage'}
                    </Button>
                    <Button
                      onClick={handleNextTurn}
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      icon="⏭️"
                    >
                      Next Player
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`q-${room.currentRound}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
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
                  Pass the phone to <span className="text-neon-blue font-bold">{currentPlayer?.name}</span>
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom scoreboard */}
      <ScoreBoard players={room.players} currentPlayerId={currentPlayer?.id} compact />
    </div>
  )
}
