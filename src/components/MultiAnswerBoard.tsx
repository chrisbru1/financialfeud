import { MultiAnswer } from '../data/questions'
import './MultiAnswerBoard.css'

interface MultiAnswerBoardProps {
  answers: MultiAnswer[]
  team1SelectedIndex: number | null
  team2SelectedIndex: number | null
  team1Name: string
  team2Name: string
  activeTeam: 1 | 2
  onSelect: (index: number) => void
  showResult: boolean
}

function MultiAnswerBoard({ 
  answers, 
  team1SelectedIndex, 
  team2SelectedIndex, 
  team1Name,
  team2Name,
  activeTeam,
  onSelect, 
  showResult 
}: MultiAnswerBoardProps) {
  return (
    <div className="multi-answer-board">
      {answers.map((answer, index) => {
        const isTeam1Selected = team1SelectedIndex === index
        const isTeam2Selected = team2SelectedIndex === index
        const isCorrect = answer.isCorrect
        let cardClass = 'multi-answer-card'
        
        if (showResult) {
          if (isCorrect) {
            cardClass += ' correct'
          } else if (isTeam1Selected || isTeam2Selected) {
            cardClass += ' incorrect'
          }
        } else {
          if (isTeam1Selected) {
            cardClass += ' team1-selected'
          }
          if (isTeam2Selected) {
            cardClass += ' team2-selected'
          }
          if (activeTeam === 1 && !isTeam1Selected) {
            // Team 1 can still select
          } else if (activeTeam === 2 && !isTeam2Selected) {
            // Team 2 can still select
          }
        }
        
        const canSelect = !showResult && (
          (activeTeam === 1 && !isTeam1Selected) || 
          (activeTeam === 2 && !isTeam2Selected)
        )
        
        return (
          <div
            key={index}
            className={cardClass}
            onClick={() => canSelect && onSelect(index)}
          >
            <div className="multi-answer-label">{answer.label}</div>
            {!showResult && (
              <div className="multi-answer-selections">
                {isTeam1Selected && <span className="team1-badge">{team1Name}</span>}
                {isTeam2Selected && <span className="team2-badge">{team2Name}</span>}
              </div>
            )}
            {showResult && (
              <div className="multi-answer-result">
                {isCorrect ? '✓ Correct!' : (isTeam1Selected || isTeam2Selected) ? '✗ Incorrect' : ''}
                {isCorrect && (isTeam1Selected || isTeam2Selected) && (
                  <div className="correct-teams">
                    {isTeam1Selected && <span>{team1Name} +50</span>}
                    {isTeam2Selected && <span>{team2Name} +50</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MultiAnswerBoard


