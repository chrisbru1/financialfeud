import { useState } from 'react'
import './ClosestAnswerBoard.css'

interface ClosestAnswerBoardProps {
  correctAnswer: number
  expectedRange?: { min: number; max: number }
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
  team1Name: string
  team2Name: string
}

function ClosestAnswerBoard({ correctAnswer, onScore, activeTeam, team1Name, team2Name }: ClosestAnswerBoardProps) {
  const [team1Guess, setTeam1Guess] = useState<string>('')
  const [team2Guess, setTeam2Guess] = useState<string>('')
  const [team1Scored, setTeam1Scored] = useState(false)
  const [team2Scored, setTeam2Scored] = useState(false)
  const [team1PointsAwarded, setTeam1PointsAwarded] = useState<number | null>(null)
  const [team2PointsAwarded, setTeam2PointsAwarded] = useState<number | null>(null)

  const calculatePoints = (guess: number): number => {
    if (correctAnswer === 0) return 0 // Not configured
    
    const difference = Math.abs(guess - correctAnswer)
    // Use a more forgiving range (40% of the answer value) for closer answers
    const range = correctAnswer * 0.4
    const percentage = (1 - difference / range) * 100
    
    // More forgiving: even answers that are 50% off still get some points
    if (percentage <= 0) {
      // For very far answers, use a wider range (60% of answer)
      const wideRange = correctAnswer * 0.6
      const widePercentage = (1 - difference / wideRange) * 100
      if (widePercentage <= 0) return 0
      // Give at least 5 points if within 60% range
      return Math.max(5, Math.round(widePercentage * 0.3))
    }
    
    if (percentage >= 100) return 50 // Exact or very close = max points
    
    // More forgiving curve: use square root to give more points for closer answers
    const normalizedScore = Math.sqrt(percentage / 100) * 50
    return Math.round(normalizedScore)
  }

  const handleScore = (team: 1 | 2, guess: string) => {
    const numGuess = parseFloat(guess)
    if (isNaN(numGuess)) return
    
    if (team === 1 && !team1Scored) {
      const points = calculatePoints(numGuess)
      setTeam1PointsAwarded(points)
      onScore(1, points)
      setTeam1Scored(true)
    } else if (team === 2 && !team2Scored) {
      const points = calculatePoints(numGuess)
      setTeam2PointsAwarded(points)
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
          <label>{team1Name} Guess:</label>
          <input
            type="number"
            value={team1Guess}
            onChange={(e) => setTeam1Guess(e.target.value)}
            disabled={team1Scored}
            placeholder="Enter number"
          />
          {team1Scored ? (
            <div className="points-awarded">
              Points awarded: {team1PointsAwarded}
            </div>
          ) : (
            <button
              onClick={() => handleScore(1, team1Guess)}
              disabled={!team1Guess}
              className="score-btn"
            >
              Score
            </button>
          )}
        </div>
        <div className={`closest-input-group ${activeTeam === 2 ? 'active' : ''}`}>
          <label>{team2Name} Guess:</label>
          <input
            type="number"
            value={team2Guess}
            onChange={(e) => setTeam2Guess(e.target.value)}
            disabled={team2Scored}
            placeholder="Enter number"
          />
          {team2Scored ? (
            <div className="points-awarded">
              Points awarded: {team2PointsAwarded}
            </div>
          ) : (
            <button
              onClick={() => handleScore(2, team2Guess)}
              disabled={!team2Guess}
              className="score-btn"
            >
              Score
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClosestAnswerBoard



