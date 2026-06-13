import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '../../lib/types'

interface ScoreBoardProps {
  players: Player[]
  currentPlayerId?: string
  compact?: boolean
}

export default function ScoreBoard({ players, currentPlayerId, compact = false }: ScoreBoardProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {sorted.map((player, index) => {
            const isCurrent = player.id === currentPlayerId
            const rank = index + 1
            const rankColor = rank === 1 ? 'text-yellow-400' : rank === 2 ? 'text-gray-300' : rank === 3 ? 'text-amber-600' : 'text-white/30'

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`
                  relative rounded-2xl transition-all duration-300 overflow-hidden
                  ${isCurrent ? 'bg-neon-blue/10 border border-neon-blue/30 shadow-lg shadow-neon-blue/10' : 'bg-white/[0.03] border border-white/[0.06]'}
                  ${!player.isAlive ? 'opacity-40' : ''}
                `}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold
                      ${rank <= 3 ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20' : 'bg-white/5'}
                      ${rankColor}
                    `}>
                      {rank <= 3 ? ['👑', '🥈', '🥉'][rank - 1] : `#${rank}`}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm truncate">
                          {player.name}
                        </span>
                        {isCurrent && (
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[10px] font-bold text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded-full"
                          >
                            NOW
                          </motion.span>
                        )}
                        {!player.isAlive && (
                          <span className="text-red-400 text-xs">💀</span>
                        )}
                      </div>
                      {!compact && (
                        <div className="flex gap-1 mt-1.5">
                          {Array.from({ length: player.lives }).map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-xs"
                            >
                              ❤️
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right ml-4">
                    <motion.span
                      key={player.score}
                      initial={{ scale: 1.3, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-lg font-extrabold ${rank === 1 ? 'gradient-text-gold' : rank <= 3 ? 'text-white' : 'text-white/50'}`}
                    >
                      {player.score}
                    </motion.span>
                    {player.streak > 1 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[10px] font-bold text-orange-400 mt-0.5"
                      >
                        🔥 x{player.streak}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
