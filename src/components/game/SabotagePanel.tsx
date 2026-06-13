import { motion, AnimatePresence } from 'framer-motion'
import { SABOTAGES, Player } from '../../lib/types'

interface SabotagePanelProps {
  players: Player[]
  currentPlayerId: string
  onUseSabotage: (targetPlayerId: string, sabotageId: string) => void
  disabled?: boolean
}

export default function SabotagePanel({
  players,
  currentPlayerId,
  onUseSabotage,
  disabled = false,
}: SabotagePanelProps) {
  const targets = players.filter((p) => p.id !== currentPlayerId && p.isAlive)

  return (
    <div className="w-full">
      <h3 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-3">
        ⚡ Sabotage!
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {SABOTAGES.map((sabotage) => (
          <motion.div
            key={sabotage.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-3 rounded-xl border cursor-pointer transition-all duration-200
              ${disabled
                ? 'bg-dark-700/30 border-white/5 opacity-40 cursor-not-allowed'
                : 'bg-dark-700 border-white/10 hover:border-neon-orange hover:bg-dark-600'
              }
            `}
            onClick={() => {
              if (!disabled) {
                const target = targets[Math.floor(Math.random() * targets.length)]
                if (target) onUseSabotage(target.id, sabotage.id)
              }
            }}
          >
            <div className="text-2xl mb-1">{sabotage.icon}</div>
            <div className="text-xs font-bold">{sabotage.name}</div>
            <div className="text-[10px] text-white/40 mt-1">{sabotage.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
