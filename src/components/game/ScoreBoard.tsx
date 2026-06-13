import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '../../lib/types'

interface ScoreBoardProps {
  players: Player[]
  currentPlayerId?: string
  showHeader?: boolean
}

export default function ScoreBoard({ players, currentPlayerId, showHeader = true }: ScoreBoardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider">Players</h3>
          <span className="text-xs text-white/30">{players.length} players</span>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {sorted.map((player, index) => {
            const isCurrent = player.id === currentPlayerId
            const isFirst = index === 0 && player.score > 0

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`
                  flex items-center justify-between p-3 rounded-xl transition-all duration-200
                  ${isCurrent ? 'bg-neon-blue/10 border border-neon-blue/30' : 'bg-dark-700/50 border border-white/5'}
                  ${!player.isAlive ? 'opacity-40' : ''}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 ${isFirst ? 'text-neon-yellow' : 'text-white/30'}`}>
                    {isFirst ? '👑' : `#${index + 1}`}
                  </span>
                  <div>
                    <span className="font-bold text-sm">
                      {player.name}
                      {!player.isAlive && (
                        <span className="text-red-400 text-xs ml-2">💀</span>
                      )}
                    </span>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: player.lives }).map((_, i) => (
                        <span key={i} className="text-xs">❤️</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold gradient-text">{player.score}</span>
                  {player.streak > 1 && (
                    <div className="text-xs text-neon-orange font-bold">🔥 x{player.streak}</div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
