import { Answer } from '../App'
import './AnswerBoard.css'

interface AnswerBoardProps {
  answers: Answer[]
  onReveal: (index: number) => void
}

function AnswerBoard({ answers, onReveal }: AnswerBoardProps) {
  return (
    <div className="answer-board">
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`answer-card ${answer.revealed ? 'revealed' : 'hidden'}`}
          onClick={() => !answer.revealed && onReveal(index)}
        >
          <div className="answer-number">{index + 1}</div>
          <div className="answer-content">
            {answer.revealed ? (
              <>
                <div className="answer-text">{answer.text}</div>
                <div className="answer-points">{answer.points}</div>
              </>
            ) : (
              <div className="answer-hidden">?</div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnswerBoard



