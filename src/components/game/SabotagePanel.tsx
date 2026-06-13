import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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
  const [selectedSabotage, setSelectedSabotage] = useState<string | null>(null)

  const targets = players.filter((p) => p.id !== currentPlayerId && p.isAlive)

  const handleSabotageClick = (sabotageId: string) => {
    if (disabled) return
    if (selectedSabotage === sabotageId) {
      setSelectedSabotage(null)
      return
    }
    setSelectedSabotage(sabotageId)
  }

  const handleTargetClick = (targetId: string) => {
    if (!selectedSabotage) return
    onUseSabotage(targetId, selectedSabotage)
    setSelectedSabotage(null)
  }

  return (
    <div className="w-full">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs font-bold text-white/40 uppercase tracking-[0.15em] mb-3 text-center"
      >
        ⚡ Choose Your Sabotage
      </motion.h3>

      {!selectedSabotage ? (
        <div className="grid grid-cols-5 gap-2">
          {SABOTAGES.map((sabotage) => (
            <motion.button
              key={sabotage.id}
              onClick={() => handleSabotageClick(sabotage.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-200
                ${disabled
                  ? 'bg-dark-700/30 border-white/5 opacity-40 cursor-not-allowed'
                  : 'bg-dark-700/50 border-white/10 hover:border-orange-400/50 hover:bg-dark-600/50 cursor-pointer'
                }
              `}
            >
              <span className="text-2xl">{sabotage.icon}</span>
              <span className="text-[10px] font-bold leading-tight text-center">{sabotage.name}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs text-white/40 text-center mb-3">
            Select a target for {SABOTAGES.find((s) => s.id === selectedSabotage)?.icon} {SABOTAGES.find((s) => s.id === selectedSabotage)?.name}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {targets.map((target) => (
              <motion.button
                key={target.id}
                onClick={() => handleTargetClick(target.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-dark-700/50 border border-white/10 hover:border-orange-400/50 font-medium text-sm"
              >
                {target.name}
              </motion.button>
            ))}
            <motion.button
              onClick={() => setSelectedSabotage(null)}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
