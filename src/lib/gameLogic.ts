import {
  Player,
  GameRoom,
  Question,
  GameState,
  GameSettings,
  GAME_DEFAULTS,
  SCORING,
  SABOTAGES,
  ActiveSabotage,
} from './types'
import { getRandomQuestion } from './questions'
import { generatePlayerId, generateRoomCode } from './roomCode'

const rooms: Map<string, GameRoom> = new Map()

export function createRoom(hostName: string, mode: 'pass-and-play' | 'multi-device' = 'pass-and-play'): GameRoom {
  const code = generateRoomCode()
  const hostId = generatePlayerId()

  const host: Player = {
    id: hostId,
    name: hostName,
    lives: GAME_DEFAULTS.totalLives,
    score: 0,
    streak: 0,
    isAlive: true,
    isHost: true,
    connected: true,
  }

  const room: GameRoom = {
    code,
    players: [host],
    state: 'lobby',
    currentRound: 0,
    maxRounds: GAME_DEFAULTS.maxRounds,
    currentPlayerIndex: 0,
    hostId,
    mode,
    settings: { ...GAME_DEFAULTS },
    currentQuestion: null,
    activeSabotages: [],
    roundStartTime: Date.now(),
  }

  rooms.set(room.code, room)
  return room
}

export function getRoom(code: string): GameRoom | undefined {
  return rooms.get(code)
}

export function addPlayerToRoom(roomCode: string, playerName: string): { room: GameRoom; playerId: string } | null {
  const room = rooms.get(roomCode)
  if (!room) return null
  if (room.state !== 'lobby') return null

  const id = generatePlayerId()
  const player: Player = {
    id,
    name: playerName,
    lives: room.settings.totalLives,
    score: 0,
    streak: 0,
    isAlive: true,
    isHost: false,
    connected: true,
  }

  room.players.push(player)
  return { room, playerId: id }
}

export function addPassAndPlayPlayer(roomCode: string, playerName: string): Player | null {
  const room = rooms.get(roomCode)
  if (!room) return null

  const id = generatePlayerId()
  const player: Player = {
    id,
    name: playerName,
    lives: room.settings.totalLives,
    score: 0,
    streak: 0,
    isAlive: true,
    isHost: false,
    connected: true,
  }

  room.players.push(player)
  return player
}

export function removePlayer(roomCode: string, playerId: string): boolean {
  const room = rooms.get(roomCode)
  if (!room) return false

  room.players = room.players.filter((p) => p.id !== playerId)
  if (room.players.length === 0) {
    rooms.delete(roomCode)
  }
  return true
}

export function startGame(roomCode: string): GameRoom | null {
  const room = rooms.get(roomCode)
  if (!room) return null
  if (room.players.length < 2) return null

  room.state = 'playing'
  room.currentRound = 1
  room.currentPlayerIndex = 0
  room.currentQuestion = getRandomQuestion()
  room.roundStartTime = Date.now()

  return room
}

export function getCurrentTimer(room: GameRoom): number {
  const baseTimer = room.settings.initialTimer
  const speedUpFactor = 1 + (room.currentRound - 1) * room.settings.timerSpeedIncrease / 10
  const timer = Math.max(3, Math.floor(baseTimer / speedUpFactor))

  const timeSliceSabotage = room.activeSabotages.find(
    (s) => s.sabotageId === 'time-slice' && s.targetPlayerId === getCurrentPlayer(room)?.id
  )
  if (timeSliceSabotage) {
    return Math.max(2, Math.floor(timer / 2))
  }

  return timer
}

export function getCurrentPlayer(room: GameRoom): Player | undefined {
  return room.players[room.currentPlayerIndex]
}

export function nextTurn(roomCode: string, keepPlayer: boolean = false): GameRoom | null {
  const room = rooms.get(roomCode)
  if (!room) return null

  if (!keepPlayer) {
    room.currentPlayerIndex = (room.currentPlayerIndex + 1) % room.players.length
  }

  room.currentRound++
  room.currentQuestion = getRandomQuestion(
    room.currentQuestion ? [room.currentQuestion.id] : []
  )
  room.roundStartTime = Date.now()

  if (room.currentRound > room.settings.maxRounds) {
    room.state = 'game-over'
  }

  return room
}

export function answerQuestion(
  roomCode: string,
  playerId: string,
  answerIndex: number
): { correct: boolean; pointsEarned: number; newRoom: GameRoom } {
  const room = rooms.get(roomCode)
  if (!room || !room.currentQuestion) {
    throw new Error('Room or question not found')
  }

  const player = room.players.find((p) => p.id === playerId)
  if (!player) throw new Error('Player not found')

  const q = room.currentQuestion
  const hasCorrectAnswer = q.hasCorrectAnswer

  let isCorrect = true
  let pointsEarned = 0

  if (hasCorrectAnswer) {
    isCorrect =
      answerIndex < q.options.length && q.options[answerIndex] === q.answer

    if (isCorrect) {
      player.streak++
      pointsEarned = SCORING.correctAnswer

      if (player.streak > 1) {
        pointsEarned += player.streak * SCORING.streakMultiplier
      }

      const timeTaken = (Date.now() - room.roundStartTime) / 1000
      if (timeTaken < 5) {
        pointsEarned += SCORING.speedBonus
      }

      player.score += pointsEarned
    } else {
      player.lives--
      player.streak = 0

      if (player.lives <= 0) {
        player.isAlive = false
      }
    }
  } else {
    player.streak++
    pointsEarned = SCORING.participation

    if (player.streak > 1) {
      pointsEarned += player.streak * SCORING.streakMultiplier
    }

    player.score += pointsEarned
  }

  return { correct: isCorrect, pointsEarned, newRoom: room }
}

export function applySabotage(
  roomCode: string,
  sourcePlayerId: string,
  targetPlayerId: string,
  sabotageId: string
): GameRoom | null {
  const room = rooms.get(roomCode)
  if (!room) return null

  const source = room.players.find((p) => p.id === sourcePlayerId)
  if (!source) return null

  const sabotageData = SABOTAGES.find((s) => s.id === sabotageId)
  if (!sabotageData) return null

  source.score += SCORING.sabotageUse

  const activeSabotage: ActiveSabotage = {
    sabotageId,
    targetPlayerId,
    sourcePlayerId,
    expiresAt: Date.now() + sabotageData.duration * 1000,
  }

  room.activeSabotages.push(activeSabotage)

  return room
}

export function checkActiveSabotages(room: GameRoom): void {
  const now = Date.now()
  room.activeSabotages = room.activeSabotages.filter((s) => s.expiresAt > now)
}

export function handleTimerExpiry(roomCode: string): GameRoom | null {
  const room = rooms.get(roomCode)
  if (!room) return null

  const player = getCurrentPlayer(room)
  if (player) {
    player.lives--
    player.streak = 0
    if (player.lives <= 0) {
      player.isAlive = false
    }
  }

  return nextTurn(roomCode)
}

export function endGame(roomCode: string): GameRoom | null {
  const room = rooms.get(roomCode)
  if (!room) return null

  room.state = 'game-over'
  return room
}

export function getLeaderboard(room: GameRoom): Player[] {
  return [...room.players].sort((a, b) => b.score - a.score)
}

export function cleanupOldRooms(): void {
  const THIRTY_MINUTES = 30 * 60 * 1000
  const now = Date.now()

  rooms.forEach((room, code) => {
    if (now - room.roundStartTime > THIRTY_MINUTES) {
      rooms.delete(code)
    }
  })
}

setInterval(cleanupOldRooms, 5 * 60 * 1000)
