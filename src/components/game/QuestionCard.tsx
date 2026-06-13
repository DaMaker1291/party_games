import { motion } from 'framer-motion'
import { Question } from '../../lib/types'

interface QuestionCardProps {
  question: Question
  onAnswer: (index: number) => void
  disabled?: boolean
  showCorrect?: boolean
  correctIndex?: number
}

const optionColors = [
  { bg: 'from-rose-500/20 to-pink-500/10', border: 'border-rose-500/30', hover: 'hover:border-rose-400/60', glow: 'shadow-rose-500/20', letter: 'bg-rose-500/20 text-rose-300' },
  { bg: 'from-blue-500/20 to-cyan-500/10', border: 'border-blue-500/30', hover: 'hover:border-blue-400/60', glow: 'shadow-blue-500/20', letter: 'bg-blue-500/20 text-blue-300' },
  { bg: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/30', hover: 'hover:border-amber-400/60', glow: 'shadow-amber-500/20', letter: 'bg-amber-500/20 text-amber-300' },
  { bg: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/30', hover: 'hover:border-emerald-400/60', glow: 'shadow-emerald-500/20', letter: 'bg-emerald-500/20 text-emerald-300' },
]

export default function QuestionCard({
  question,
  onAnswer,
  disabled = false,
  showCorrect = false,
  correctIndex,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] bg-white/5 text-neon-blue border border-neon-blue/20 mb-4"
        >
          {question.category}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl md:text-3xl font-bold leading-snug tracking-tight"
        >
          {question.prompt}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          const colors = optionColors[index]
          const isCorrect = showCorrect && correctIndex === index
          const isWrong = showCorrect && correctIndex !== index

          return (
            <motion.button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={disabled}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index + 0.2 }}
              whileHover={disabled ? {} : { scale: 1.02, x: 4 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              className={`
                relative flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200
                font-body text-left text-base md:text-lg
                ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}
                ${isCorrect
                  ? 'bg-emerald-500/20 border-emerald-400/60 shadow-lg shadow-emerald-500/20'
                  : isWrong
                    ? 'bg-dark-700/30 border-white/5 opacity-40'
                    : `${colors.bg} ${colors.border} ${colors.hover} shadow-sm ${colors.glow} hover:shadow-md`
                }
              `}
            >
              <span className={`
                flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                text-sm font-bold transition-all duration-200
                ${isCorrect ? 'bg-emerald-500/30 text-emerald-300' : colors.letter}
              `}>
                {['A', 'B', 'C', 'D'][index]}
              </span>
              <span className="font-medium leading-snug flex-1">{option}</span>
              {isCorrect && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  ✅
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
