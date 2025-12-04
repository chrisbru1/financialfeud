import { useState } from 'react'
import './ClosestAnswerBoard.css'

interface ClosestAnswerBoardProps {
  correctAnswer: number
  expectedRange?: { min: number; max: number }
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
}

function ClosestAnswerBoard({ correctAnswer, expectedRange, onScore, activeTeam }: ClosestAnswerBoardProps) {
  const [team1Guess, setTeam1Guess] = useState<string>('')
  const [team2Guess, setTeam2Guess] = useState<string>('')
  const [team1Scored, setTeam1Scored] = useState(false)
  const [team2Scored, setTeam2Scored] = useState(false)

  const calculatePoints = (guess: number): number => {
    if (correctAnswer === 0) return 0 // Not configured
    
    const difference = Math.abs(guess - correctAnswer)
    const range = expectedRange ? (expectedRange.max - expectedRange.min) : correctAnswer * 0.2
    const percentage = (1 - difference / range) * 100
    
    if (percentage <= 0) return 0
    if (percentage >= 100) return 50
    return Math.round(percentage * 0.5) // Max 50 points
  }

  const handleScore = (team: 1 | 2, guess: string) => {
    const numGuess = parseFloat(guess)
    if (isNaN(numGuess)) return
    
    if (team === 1 && !team1Scored) {
      const points = calculatePoints(numGuess)
      onScore(1, points)
      setTeam1Scored(true)
    } else if (team === 2 && !team2Scored) {
      const points = calculatePoints(numGuess)
      onScore(2, points)
      setTeam2Scored(true)
    }
  }

  return (
    <div className="closest-answer-board">
      <div className="closest-instructions">
        Enter your guess. Closest to the correct answer wins points!
      </div>
      <div className="closest-inputs">
        <div className={`closest-input-group ${activeTeam === 1 ? 'active' : ''}`}>
          <label>Team 1 Guess:</label>
          <input
            type="number"
            value={team1Guess}
            onChange={(e) => setTeam1Guess(e.target.value)}
            disabled={team1Scored}
            placeholder="Enter number"
          />
          <button
            onClick={() => handleScore(1, team1Guess)}
            disabled={team1Scored || !team1Guess}
            className="score-btn"
          >
            {team1Scored ? 'Scored' : 'Score'}
          </button>
        </div>
        <div className={`closest-input-group ${activeTeam === 2 ? 'active' : ''}`}>
          <label>Team 2 Guess:</label>
          <input
            type="number"
            value={team2Guess}
            onChange={(e) => setTeam2Guess(e.target.value)}
            disabled={team2Scored}
            placeholder="Enter number"
          />
          <button
            onClick={() => handleScore(2, team2Guess)}
            disabled={team2Scored || !team2Guess}
            className="score-btn"
          >
            {team2Scored ? 'Scored' : 'Score'}
          </button>
        </div>
      </div>
      {expectedRange && (
        <div className="expected-range">
          Expected range: {expectedRange.min} - {expectedRange.max}
        </div>
      )}
    </div>
  )
}

export default ClosestAnswerBoard


