import { SurveyAnswer } from '../data/questions'
import AnswerInput from './AnswerInput'
import './AnswerBoard.css'

interface SurveyAnswerBoardProps {
  answers: SurveyAnswer[]
  revealedIndices: Set<number>
  onReveal: (index: number) => void
  activeTeam: 1 | 2
}

function SurveyAnswerBoard({ answers, revealedIndices, onReveal, activeTeam }: SurveyAnswerBoardProps) {
  const answerLabels = answers.map(a => a.label)
  
  return (
    <>
      <AnswerInput
        answers={answerLabels}
        revealedIndices={revealedIndices}
        onReveal={onReveal}
        activeTeam={activeTeam}
      />
      <div className="answer-board">
        {answers.map((answer, index) => {
          const isRevealed = revealedIndices.has(index)
          return (
            <div
              key={index}
              className={`answer-card ${isRevealed ? 'revealed' : 'hidden'}`}
              onClick={() => !isRevealed && onReveal(index)}
            >
              <div className="answer-number">{index + 1}</div>
              <div className="answer-content">
                {isRevealed ? (
                  <>
                    <div className="answer-text">{answer.label}</div>
                    <div className="answer-points">{answer.points}</div>
                  </>
                ) : (
                  <div className="answer-hidden">?</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SurveyAnswerBoard


