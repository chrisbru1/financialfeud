import { useState } from 'react'
import { SurveyAnswer } from '../data/questions'
import './RankingBoard.css'

interface RankingBoardProps {
  answers: SurveyAnswer[]
  team1Name: string
  team2Name: string
  activeTeam: 1 | 2
  onScore: (team: 1 | 2, points: number) => void
}

// Helper function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function RankingBoard({ answers, team1Name, team2Name, activeTeam, onScore }: RankingBoardProps) {
  // Randomize initial order for both teams
  const [team1Ranking, setTeam1Ranking] = useState<number[]>(() => shuffleArray(answers.map((_, i) => i)))
  const [team2Ranking, setTeam2Ranking] = useState<number[]>(() => shuffleArray(answers.map((_, i) => i)))
  const [team1Scored, setTeam1Scored] = useState(false)
  const [team2Scored, setTeam2Scored] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Correct order is by points (highest to lowest)
  const correctOrder = answers
    .map((answer, index) => ({ index, points: answer.points }))
    .sort((a, b) => b.points - a.points)
    .map(item => item.index)

  const handleDragStart = (e: React.DragEvent, index: number, team: 1 | 2) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', index.toString())
    e.dataTransfer.setData('team', team.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number, team: 1 | 2) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'))
    const dragTeam = parseInt(e.dataTransfer.getData('team'))

    if (dragTeam !== team) return

    if (team === 1 && !team1Scored) {
      const newRanking = [...team1Ranking]
      const [removed] = newRanking.splice(dragIndex, 1)
      newRanking.splice(dropIndex, 0, removed)
      setTeam1Ranking(newRanking)
    } else if (team === 2 && !team2Scored) {
      const newRanking = [...team2Ranking]
      const [removed] = newRanking.splice(dragIndex, 1)
      newRanking.splice(dropIndex, 0, removed)
      setTeam2Ranking(newRanking)
    }
  }

  const calculateScore = (ranking: number[]): number => {
    let score = 0
    ranking.forEach((answerIndex, position) => {
      const correctPosition = correctOrder.indexOf(answerIndex)
      // Award points based on how close the position is to correct
      const positionDiff = Math.abs(position - correctPosition)
      if (positionDiff === 0) {
        // Perfect position match
        score += answers[answerIndex].points
      } else if (positionDiff === 1) {
        // One position off - give partial points
        score += Math.round(answers[answerIndex].points * 0.5)
      }
      // More than one position off = 0 points for that item
    })
    return score
  }

  const handleScore = (team: 1 | 2) => {
    if (team === 1 && !team1Scored) {
      const points = calculateScore(team1Ranking)
      onScore(1, points)
      setTeam1Scored(true)
    } else if (team === 2 && !team2Scored) {
      const points = calculateScore(team2Ranking)
      onScore(2, points)
      setTeam2Scored(true)
    }

    // Show results when both teams have scored
    if ((team === 1 && team2Scored) || (team === 2 && team1Scored)) {
      setShowResults(true)
    }
  }

  const renderRankingList = (ranking: number[], team: 1 | 2, teamName: string, isScored: boolean) => {
    const isActive = activeTeam === team

    return (
      <div className={`ranking-section ${isActive ? 'active' : ''} ${isScored ? 'scored' : ''}`}>
        <div className="ranking-header">
          <h3>{teamName}</h3>
          {isScored && (
            <div className="ranking-score">
              Score: {calculateScore(ranking)} points
            </div>
          )}
        </div>
        <div className="ranking-list">
          {ranking.map((answerIndex, position) => {
            const answer = answers[answerIndex]
            const correctPosition = correctOrder.indexOf(answerIndex)
            const isCorrectPosition = position === correctPosition
            const showCorrect = showResults && isCorrectPosition

            return (
              <div
                key={answerIndex}
                className={`ranking-item ${showCorrect ? 'correct-position' : ''} ${showResults && !isCorrectPosition ? 'incorrect-position' : ''}`}
                draggable={!isScored}
                onDragStart={(e) => handleDragStart(e, position, team)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, position, team)}
              >
                <div className="ranking-position">{position + 1}</div>
                <div className="ranking-content">
                  <div className="ranking-label">{answer.label}</div>
                  {showResults && (
                    <div className="ranking-feedback">
                      {isCorrectPosition ? (
                        <span className="correct-indicator">✓ Correct position ({answer.points} pts)</span>
                      ) : (
                        <span className="incorrect-indicator">
                          Should be position {correctPosition + 1}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {!isScored && (
                  <div className="drag-handle">⋮⋮</div>
                )}
              </div>
            )
          })}
        </div>
        {!isScored && (
          <button
            onClick={() => handleScore(team)}
            className="score-ranking-btn"
          >
            Score {teamName}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="ranking-board">
      <div className="ranking-instructions">
        Drag and drop to rank the answers. Both teams rank independently.
      </div>
      <div className="ranking-container">
        {renderRankingList(team1Ranking, 1, team1Name, team1Scored)}
        {renderRankingList(team2Ranking, 2, team2Name, team2Scored)}
      </div>
      {showResults && (
        <div className="correct-order-reveal">
          <h4>Correct Order:</h4>
          <div className="correct-order-list">
            {correctOrder.map((answerIndex, position) => (
              <div key={answerIndex} className="correct-order-item">
                <span className="correct-position-number">{position + 1}</span>
                <span className="correct-order-label">{answers[answerIndex].label}</span>
                <span className="correct-order-points">{answers[answerIndex].points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default RankingBoard

