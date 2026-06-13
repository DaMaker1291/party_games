import { motion } from 'framer-motion'
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
  const { socket, connected } = useSocket()
  const {
    room, setRoom, playerId, isHost,
    joinRoom, submitAnswer, nextTurn, timerExpired,
  } = useGameRoom()

  const [playerName, setPlayerName] = useState('')
  const [joined, setJoined] = useState(false)
  const [answerResult, setAnswerResult] = useState<{ correct: boolean; points: number } | null>(null)
  const [currentStreak, setCurrentStreak] = useState(0)

  const handleJoin = async () => {
    if (!playerName.trim() || !urlCode) return
    const result = await joinRoom(urlCode as string, playerName.trim())
    if (result.success) {
      setJoined(true)
    } else {
      alert(result.error || 'Failed to join room')
    }
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
  }, [room?.currentRound])

  useEffect(() => {
    if (room?.state === 'game-over') {
      timer.stop()
    }
  }, [room?.state])

  const handleAnswer = async (answerIndex: number) => {
    if (!room || !playerId) return
    timer.stop()
    const result = await submitAnswer(room.code, playerId, answerIndex)
    if (result.success) {
      setAnswerResult({
        correct: result.correct || false,
        points: result.pointsEarned || 0,
      })
      if (result.correct) {
        setCurrentStreak((s) => s + 1)
      } else {
        setCurrentStreak(0)
      }
    }
  }

  const handleNextTurn = async () => {
    setAnswerResult(null)
    if (!room) return
    await nextTurn(room.code)
  }

  if (!urlCode) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <Card variant="glass" className="text-center">
          <div className="text-4xl mb-4">🔗</div>
          <h2 className="text-xl font-display gradient-text mb-4">Invalid Link</h2>
          <Button onClick={() => router.push('/')} variant="primary">
            Go Home
          </Button>
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
          className="text-center"
        >
          <div className="text-5xl mb-4">🔗</div>
          <h1 className="text-2xl font-display gradient-text mb-2">Join Game</h1>
          <p className="text-white/40 text-sm">
            Room: <span className="font-bold text-neon-yellow">{urlCode}</span>
          </p>
        </motion.div>

        <Input
          value={playerName}
          onChange={setPlayerName}
          placeholder="Enter your name"
          maxLength={16}
          icon="👤"
          autoFocus
          onSubmit={handleJoin}
        />

        <div className="flex gap-2 w-full">
          <Button
            onClick={() => router.push('/')}
            variant="ghost"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleJoin}
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={!playerName.trim()}
          >
            Join!
          </Button>
        </div>

        {!connected && (
          <div className="text-center text-red-400 text-sm">
            ⚠️ Connecting...
          </div>
        )}
      </div>
    )
  }

  if (!room) return null

  if (room.state === 'lobby') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-display gradient-text mb-4">Waiting for host to start...</h2>
          <div className="flex gap-2 justify-center">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="text-2xl"
            >🎲</motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="text-2xl"
            >🎲</motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="text-2xl"
            >🎲</motion.span>
          </div>
          <p className="text-white/40 text-sm mt-4">
            Players in room: <span className="text-white font-bold">{room.players.length}</span>
          </p>
        </motion.div>
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
        </motion.div>

        <Card variant="glass" className="flex-1">
          <div className="flex flex-col gap-3">
            {sorted.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  index === 0 ? 'bg-neon-yellow/10 border border-neon-yellow/30' : 'bg-dark-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </span>
                  <span className="font-bold">{player.name}</span>
                </div>
                <span className="text-xl font-bold gradient-text">{player.score}</span>
                {player.id === playerId && <span className="text-xs text-neon-blue">(You)</span>}
              </motion.div>
            ))}
          </div>
        </Card>

        <Button onClick={() => router.push('/')} variant="primary" size="lg" fullWidth>
          Back to Menu
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col px-6 py-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-white/40">
          Round {room.currentRound}/{room.maxRounds}
        </div>
        <div className="text-right">
          <div className="text-xs text-white/40">Current Player</div>
          <div className="font-bold text-neon-blue">{currentPlayer?.name}</div>
        </div>
      </div>

      <TimerBar
        timeLeft={timer.timeLeft}
        totalTime={timerSeconds}
        paused={room.state !== 'playing'}
      />

      <div className="flex-1 flex flex-col justify-center">
        {answerResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
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
          </motion.div>
        ) : (
          <QuestionCard
            question={room.currentQuestion!}
            onAnswer={handleAnswer}
            disabled={!isMyTurn}
          />
        )}
      </div>

      <ScoreBoard
        players={room.players}
        currentPlayerId={currentPlayer?.id}
      />
    </div>
  )
}
