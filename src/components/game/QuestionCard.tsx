import { motion } from 'framer-motion'
import { Question } from '../../lib/types'

interface QuestionCardProps {
  question: Question
  onAnswer: (index: number) => void
  disabled?: boolean
  showCorrect?: boolean
  correctIndex?: number
}

const optionLabels = ['A', 'B', 'C', 'D']

export default function QuestionCard({
  question,
  onAnswer,
  disabled = false,
  showCorrect = false,
  correctIndex,
}: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full"
    >
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-neon-blue uppercase tracking-widest">
          {question.category}
        </span>
        <h2 className="text-xl md:text-2xl font-bold mt-2 leading-tight">
          {question.prompt}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => {
          let optionStyle = 'bg-dark-700 border-white/10 hover:border-neon-blue'
          if (showCorrect && correctIndex === index) {
            optionStyle = 'bg-green-900/50 border-neon-green text-neon-green'
          } else if (showCorrect && correctIndex !== index) {
            optionStyle = 'bg-dark-700 border-white/10 opacity-50'
          }

          return (
            <motion.button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={disabled}
              whileTap={disabled ? {} : { scale: 0.98 }}
              whileHover={disabled ? {} : { scale: 1.01 }}
              className={`
                flex items-center gap-4 p-4 rounded-xl border transition-all duration-200
                font-body text-left
                ${optionStyle}
                ${disabled ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-dark-600 flex items-center justify-center text-sm font-bold text-white/60">
                {optionLabels[index]}
              </span>
              <span className="text-base md:text-lg font-medium leading-snug">
                {option}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
