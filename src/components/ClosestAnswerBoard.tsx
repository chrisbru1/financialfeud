import { useState } from 'react'
import './ClosestAnswerBoard.css'

interface ClosestAnswerBoardProps {
  correctAnswer: number | null
  expectedRange?: { min: number; max: number }
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
  team1Name: string
  team2Name: string
}

function ClosestAnswerBoard({ correctAnswer, expectedRange, onScore, activeTeam, team1Name, team2Name }: ClosestAnswerBoardProps) {
  const [team1Guess, setTeam1Guess] = useState<string>('')
  const [team2Guess, setTeam2Guess] = useState<string>('')
  const [team1Scored, setTeam1Scored] = useState(false)
  const [team2Scored, setTeam2Scored] = useState(false)
  const [team1PointsAwarded, setTeam1PointsAwarded] = useState<number | null>(null)
  const [team2PointsAwarded, setTeam2PointsAwarded] = useState<number | null>(null)

  const calculatePoints = (guess: number): number => {
    if (correctAnswer === null || correctAnswer === 0) return 0 // Not configured
    
    const difference = Math.abs(guess - correctAnswer)
    
    // Exact match = 75 points
    if (difference === 0) return 75
    
    // Check if within expected range
    if (expectedRange) {
      const { min, max } = expectedRange
      // If outside expected range, return 0 points
      if (guess < min || guess > max) return 0
      
      // Within range: calculate points based on closeness to center
      const distanceFromCenter = Math.abs(guess - correctAnswer)
      const maxDistanceFromCenter = Math.max(correctAnswer - min, max - correctAnswer)
      
      // Calculate how close to center (0 = at center, 1 = at edge)
      const normalizedDistance = distanceFromCenter / maxDistanceFromCenter
      
      // Scoring tiers:
      // Very close (within 10% of range from center) = 50 points
      // Close (within 30% of range from center) = 25-40 points
      // Medium (within 60% of range from center) = 15-25 points
      // Far but in range (60-100% from center) = 10-15 points
      
      if (normalizedDistance <= 0.1) {
        // Very close to center
        return 50
      } else if (normalizedDistance <= 0.3) {
        // Close to center - scale from 50 to 25
        const scale = 1 - ((normalizedDistance - 0.1) / 0.2)
        return Math.round(25 + (scale * 25))
      } else if (normalizedDistance <= 0.6) {
        // Medium distance - scale from 25 to 15
        const scale = 1 - ((normalizedDistance - 0.3) / 0.3)
        return Math.round(15 + (scale * 10))
      } else {
        // Far but still in range - scale from 15 to 10
        const scale = 1 - ((normalizedDistance - 0.6) / 0.4)
        return Math.round(10 + (scale * 5))
      }
    }
    
    // Fallback if no expected range: use 20% of answer as range
    const range = correctAnswer * 0.2
    if (difference > range) return 0
    
    // Scale points based on distance
    const percentage = (1 - difference / range) * 100
    if (percentage >= 90) return 50 // Very close
    if (percentage >= 50) return 25 // Close
    return Math.max(10, Math.round(percentage * 0.2)) // Further away
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



