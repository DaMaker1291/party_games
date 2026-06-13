import { motion, AnimatePresence } from 'framer-motion'
import { Player } from '../../lib/types'

interface PlayerListProps {
  players: Player[]
  onRemove?: (playerId: string) => void
  isHost?: boolean
}

export default function PlayerList({ players, onRemove, isHost }: PlayerListProps) {
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {players.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-4 rounded-xl bg-dark-700/50 border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-lg font-bold">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-bold">
                  {player.name}
                  {player.isHost && (
                    <span className="text-neon-yellow text-xs ml-2">👑 HOST</span>
                  )}
                </span>
                <div className="text-xs text-white/40">
                  Player {index + 1}
                  {player.connected ? '' : ' (disconnected)'}
                </div>
              </div>
            </div>
            {onRemove && !player.isHost && isHost && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(player.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                ✕
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
