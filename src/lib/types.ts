export interface Player {
  id: string
  name: string
  lives: number
  score: number
  streak: number
  isAlive: boolean
  isHost: boolean
  connected: boolean
}

export type QuestionType =
  | 'trivia'
  | 'this-or-that'
  | 'challenge'
  | 'never-have-i-ever'
  | 'poll'
  | 'would-you-rather'
  | 'finish-the-lyric'
  | 'hot-take'

export interface Question {
  id: string
  prompt: string
  answer?: string
  options: string[]
  category: string
  type: QuestionType
  hasCorrectAnswer: boolean
}

export interface Sabotage {
  id: string
  name: string
  description: string
  duration: number
  icon: string
}

export interface GameRoom {
  code: string
  players: Player[]
  state: GameState
  currentRound: number
  maxRounds: number
  currentPlayerIndex: number
  hostId: string
  mode: 'pass-and-play' | 'multi-device'
  settings: GameSettings
  currentQuestion: Question | null
  activeSabotages: ActiveSabotage[]
  roundStartTime: number
}

export interface GameSettings {
  totalLives: number
  initialTimer: number
  timerSpeedIncrease: number
  maxRounds: number
  sabotageEnabled: boolean
}

export type GameState =
  | 'lobby'
  | 'starting'
  | 'playing'
  | 'answering'
  | 'result'
  | 'game-over'

export interface ActiveSabotage {
  sabotageId: string
  targetPlayerId: string
  sourcePlayerId: string
  expiresAt: number
}

export interface GameEvent {
  type: string
  payload: any
  timestamp: number
}

export const SABOTAGES: Sabotage[] = [
  {
    id: 'blind-mode',
    name: 'Blind Mode',
    description: 'Hide the screen for 5 seconds!',
    duration: 5,
    icon: '🙈',
  },
  {
    id: 'reverse',
    name: 'Reverse',
    description: 'Answer must be typed backward!',
    duration: 8,
    icon: '🔄',
  },
  {
    id: 'time-slice',
    name: 'Time Slice',
    description: 'Cut their timer in half!',
    duration: 0,
    icon: '⏳',
  },
  {
    id: 'double-trouble',
    name: 'Double Trouble',
    description: 'They must answer 2 questions!',
    duration: 0,
    icon: '2️⃣',
  },
  {
    id: 'silent-mode',
    name: 'Silent Mode',
    description: 'Mute all sounds for them!',
    duration: 10,
    icon: '🔇',
  },
]

export const GAME_DEFAULTS: GameSettings = {
  totalLives: 3,
  initialTimer: 15,
  timerSpeedIncrease: 1.5,
  maxRounds: 10,
  sabotageEnabled: true,
}

export const SCORING = {
  correctAnswer: 100,
  participation: 75,
  streakMultiplier: 50,
  speedBonus: 25,
  sabotageUse: 75,
  survivalBonus: 50,
}
