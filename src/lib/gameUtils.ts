import { GameRoom, Player, GameSettings, GAME_DEFAULTS, SCORING, SABOTAGES } from './types'

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

export function getLeaderboard(room: GameRoom): Player[] {
  return [...room.players].sort((a, b) => b.score - a.score)
}

export function calculateScore(
  isCorrect: boolean,
  streak: number,
  timeTaken: number
): number {
  if (!isCorrect) return 0

  let points = SCORING.correctAnswer
  if (streak > 1) {
    points += streak * SCORING.streakMultiplier
  }
  if (timeTaken < 5) {
    points += SCORING.speedBonus
  }
  return points
}
