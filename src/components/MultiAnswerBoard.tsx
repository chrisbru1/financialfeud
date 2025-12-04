import { MultiAnswer } from '../data/questions'
import './MultiAnswerBoard.css'

interface MultiAnswerBoardProps {
  answers: MultiAnswer[]
  selectedIndex: number | null
  onSelect: (index: number) => void
  showResult: boolean
}

function MultiAnswerBoard({ answers, selectedIndex, onSelect, showResult }: MultiAnswerBoardProps) {
  return (
    <div className="multi-answer-board">
      {answers.map((answer, index) => {
        const isSelected = selectedIndex === index
        const isCorrect = answer.isCorrect
        let cardClass = 'multi-answer-card'
        
        if (showResult) {
          if (isCorrect) {
            cardClass += ' correct'
          } else if (isSelected) {
            cardClass += ' incorrect'
          }
        } else if (isSelected) {
          cardClass += ' selected'
        }
        
        return (
          <div
            key={index}
            className={cardClass}
            onClick={() => !showResult && onSelect(index)}
          >
            <div className="multi-answer-label">{answer.label}</div>
            {showResult && (
              <div className="multi-answer-result">
                {isCorrect ? '✓ Correct!' : isSelected ? '✗ Incorrect' : ''}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MultiAnswerBoard


