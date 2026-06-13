import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '../../lib/types'

interface PlayerListProps {
  players: Player[]
  onRemove?: (playerId: string) => void
  isHost?: boolean
}

const avatarColors = [
  'from-neon-pink to-rose-500',
  'from-neon-blue to-cyan-500',
  'from-neon-purple to-violet-500',
  'from-neon-green to-emerald-500',
  'from-neon-yellow to-amber-500',
  'from-neon-orange to-red-500',
  'from-teal-400 to-cyan-500',
  'from-pink-400 to-fuchsia-500',
  'from-indigo-400 to-purple-500',
  'from-lime-400 to-green-500',
]

export default function PlayerList({ players, onRemove, isHost }: PlayerListProps) {
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {players.map((player, index) => {
          const colorIndex = players.indexOf(player) % avatarColors.length
          const gradient = avatarColors[colorIndex]

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.9, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0.175, 0.885, 0.32, 1.275] }}
              layout
              className={`
                relative flex items-center justify-between p-4 rounded-2xl overflow-hidden
                ${player.isHost ? 'bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20' : 'bg-white/[0.03] border border-white/[0.06]'}
                backdrop-blur-xl
              `}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient}
                  flex items-center justify-center text-lg font-bold text-white shadow-lg
                `}>
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base truncate">{player.name}</span>
                    {player.isHost && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold"
                      >
                        HOST
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-white/30 mt-0.5">
                    Player {index + 1}
                    {!player.connected && <span className="text-red-400 ml-2">(disconnected)</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg"
                >
                  {player.connected ? '🟢' : '🔴'}
                </motion.div>
                {onRemove && !player.isHost && isHost && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(player.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {players.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-white/20"
        >
          <div className="text-4xl mb-3">👥</div>
          <p className="text-sm">No players yet</p>
          <p className="text-xs mt-1">Add players to get started!</p>
        </motion.div>
      )}
    </div>
  )
}
