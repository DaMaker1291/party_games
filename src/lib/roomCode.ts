const ADJECTIVES = [
  'HAPPY', 'FAST', 'COOL', 'WILD', 'FUNK', 'NEON', 'RARE', 'BOLD',
  'EPIC', 'MOON', 'STAR', 'BLUE', 'FIRE', 'ICE', 'ZERO', 'GOLD',
  'JAZZ', 'LUCK', 'PLAY', 'RUSH', 'BOOM', 'ZAP', 'KICK', 'VIBE',
  'PULP', 'ZOOM', 'GLOW', 'BUMP', 'RACE', 'BEAT',
]

export function generateRoomCode(): string {
  const a = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  const b = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]
  return `${a}-${b}`
}

export function generatePlayerId(): string {
  return `player_${Math.random().toString(36).substring(2, 10)}`
}

export function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
}
