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
  const { socket, connected } = useSocket()
  const {
    room, setRoom, playerId, isHost,
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
  const roomCode = room?.code || ''
  const creatingRef = useRef(false)

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
  }, [room?.currentRound, room?.state])

  useEffect(() => {
    if (room?.state === 'game-over') {
      timer.stop()
    }
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
          if (getSocket()?.connected) {
            clearInterval(check)
            resolve()
          }
        }, 100)
        setTimeout(() => clearInterval(check), 5000)
      })
    }

    const result = await createRoom(playerName.trim(), mode)
    if (result.success) {
      setShowModeSelect(false)
    }
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
      setAnswerResult({
        correct: result.correct || false,
        points: result.pointsEarned || 0,
      })
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

  const handlePlayAgain = () => window.location.reload()

  if (showModeSelect) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎮</div>
            <h1 className="text-2xl font-display gradient-text">Create Game</h1>
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
            <h2 className="text-sm font-bold text-white/40 uppercase tracking-wider text-center">
              Game Mode
            </h2>
            <Button
              onClick={() => handleModeSelect('pass-and-play')}
              variant="primary"
              size="lg"
              fullWidth
              icon="📱"
              disabled={!playerName.trim() || connecting}
            >
              {connecting ? 'Connecting...' : 'Pass & Play'}
            </Button>
            <Button
              onClick={() => handleModeSelect('multi-device')}
              variant="secondary"
              size="lg"
              fullWidth
              icon="🔄"
              disabled={!playerName.trim() || connecting}
            >
              {connecting ? 'Connecting...' : 'Multi-Device'}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          🎲
        </motion.div>
        <p className="text-white/40 text-sm ml-3">Creating room...</p>
      </div>
    )
  }

  if (room.state === 'lobby') {
    return (
      <div className="flex-1 flex flex-col px-6 py-8 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-xl font-display gradient-text">Lobby</h1>
        </motion.div>

        {gameMode === 'multi-device' && (
          <Card variant="neon" className="text-center">
            <p className="text-xs uppercase tracking-widest text-neon-blue font-bold mb-2">
              Room Code
            </p>
            <h2 className="text-3xl font-display tracking-widest text-neon-yellow">
              {room.code}
            </h2>
            <p className="text-xs text-white/40 mt-2">
              Share this code with friends to join!
            </p>
          </Card>
        )}

        <div className="flex-1">
          <PlayerList
            players={room.players}
            isHost={isHost}
          />
        </div>

        {isHost && (
          <div className="flex flex-col gap-3">
            <Input
              value={newPlayerName}
              onChange={setNewPlayerName}
              placeholder="Add player name"
              maxLength={16}
              icon="👤"
              onSubmit={handleAddPlayer}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => router.push('/')}
                variant="ghost"
                className="flex-1"
              >
                Leave
              </Button>
              <Button
                onClick={handleStartGame}
                variant="primary"
                size="lg"
                className="flex-1"
                disabled={room.players.length < 2}
              >
                {room.players.length < 2 ? 'Need 2+ Players' : 'Start Game!'}
              </Button>
            </div>
          </div>
        )}

        {!connected && (
          <div className="text-center text-red-400 text-sm">
            ⚠️ Connection lost. Reconnecting...
          </div>
        )}
      </div>
    )
  }

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
          <h1 className="text-2xl font-display gradient-text mb-2">Game Over!</h1>
          <p className="text-white/40 text-sm">{room.players.length} players battled</p>
        </motion.div>

        <div className="flex-1">
          <Card variant="glass">
            <div className="flex flex-col gap-3">
              {sorted.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center justify-between p-4 rounded-xl
                    ${index === 0 ? 'bg-neon-yellow/10 border border-neon-yellow/30' : 'bg-dark-700/50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </span>
                    <div>
                      <span className="font-bold">{player.name}</span>
                      {!player.isAlive && <span className="text-red-400 text-xs ml-2">💀</span>}
                    </div>
                  </div>
                  <span className="text-xl font-bold gradient-text">{player.score}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        <Button onClick={handlePlayAgain} size="lg" fullWidth icon="🔄">
          Play Again
        </Button>

        <Button onClick={() => router.push('/')} variant="ghost" fullWidth>
          Back to Menu
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-4 gap-4">
      <StreakEffect streak={currentStreak} />

      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-white/40">
          Round {room.currentRound}/{room.maxRounds}
        </div>
        <div className="text-right">
          <div className="text-xs text-white/40">Current Player</div>
          <motion.div
            key={currentPlayer?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-bold text-neon-blue"
          >
            {currentPlayer?.name}
          </motion.div>
        </div>
      </div>

      <TimerBar
        timeLeft={timer.timeLeft}
        totalTime={timerSeconds}
        paused={!gameStarted || room.state !== 'playing'}
      />

      <div className="flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {answerResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <div className={`text-7xl mb-4 ${answerResult.correct ? 'animate-bounce-in' : 'animate-shake'}`}>
                {answerResult.correct ? '✅' : '💥'}
              </div>
              <h2 className={`text-2xl font-display mb-2 ${answerResult.correct ? 'text-neon-green' : 'text-red-400'}`}>
                {answerResult.correct ? 'CORRECT!' : 'OOPS!'}
              </h2>
              {answerResult.correct && (
                <p className="text-neon-yellow font-bold text-lg">+{answerResult.points} pts</p>
              )}

              {isHost && (
                <div className="flex flex-col gap-3 mt-6">
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
                    >
                      {showSabotage ? 'Hide' : 'Sabotage'}
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
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuestionCard
                question={room.currentQuestion!}
                onAnswer={handleAnswer}
                disabled={!isMyTurn}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ScoreBoard
        players={room.players}
        currentPlayerId={currentPlayer?.id}
      />
    </div>
  )
}
