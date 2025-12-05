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
  const [team1PointsAwarded, setTeam1PointsAwarded] = useState<number>(0)
  const [team2PointsAwarded, setTeam2PointsAwarded] = useState<number>(0)

  const calculatePoints = (team1Guess: number | null, team2Guess: number | null): { team1Points: number; team2Points: number } => {
    if (correctAnswer === null || correctAnswer === 0) {
      return { team1Points: 0, team2Points: 0 }
    }

    // If both teams haven't guessed yet, return 0
    if (team1Guess === null && team2Guess === null) {
      return { team1Points: 0, team2Points: 0 }
    }

    // If only one team has guessed, we can't determine relative positions yet
    // But we can check for exact match
    if (team1Guess !== null && team2Guess === null) {
      if (Math.abs(team1Guess - correctAnswer) === 0) {
        return { team1Points: 75, team2Points: 0 }
      }
      return { team1Points: 0, team2Points: 0 }
    }
    if (team2Guess !== null && team1Guess === null) {
      if (Math.abs(team2Guess - correctAnswer) === 0) {
        return { team1Points: 0, team2Points: 75 }
      }
      return { team1Points: 0, team2Points: 0 }
    }

    // Both teams have guessed - compare them
    if (team1Guess === null || team2Guess === null) {
      return { team1Points: 0, team2Points: 0 }
    }

    const team1Diff = Math.abs(team1Guess - correctAnswer)
    const team2Diff = Math.abs(team2Guess - correctAnswer)

    // Check for exact matches
    const team1Exact = team1Diff === 0
    const team2Exact = team2Diff === 0

    if (team1Exact) {
      return { team1Points: 75, team2Points: 0 }
    }
    if (team2Exact) {
      return { team1Points: 0, team2Points: 75 }
    }

    // No exact matches - determine closest
    const team1IsCloser = team1Diff < team2Diff
    const team2IsCloser = team2Diff < team1Diff

    // Check if within expected range
    if (expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      if (team1IsCloser) {
        // Team 1 is closest
        const team1Points = team1InRange ? 50 : 0
        // Team 2 gets 25 if they're second closest AND in range
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest
        const team2Points = team2InRange ? 50 : 0
        // Team 1 gets 25 if they're second closest AND in range
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both get 0 (or could both get 50, but rules say "closest" singular)
        return { team1Points: 0, team2Points: 0 }
      }
    }

    // No expected range - use relative scoring
    if (team1IsCloser) {
      return { team1Points: 50, team2Points: 0 }
    } else if (team2IsCloser) {
      return { team1Points: 0, team2Points: 50 }
    } else {
      return { team1Points: 0, team2Points: 0 }
    }
  }

  const handleScore = (team: 1 | 2, guess: string) => {
    const numGuess = parseFloat(guess)
    if (isNaN(numGuess)) return
    
    if (team === 1 && !team1Scored) {
      setTeam1Guess(guess)
      const team1Num = parseFloat(guess)
      const team2Num = team2Guess ? parseFloat(team2Guess) : null
      const { team1Points, team2Points } = calculatePoints(team1Num, team2Num)
      
      // Award points to team 1
      const team1ScoreDiff = team1Points - team1PointsAwarded
      if (team1ScoreDiff !== 0) {
        onScore(1, team1ScoreDiff)
      }
      setTeam1PointsAwarded(team1Points)
      setTeam1Scored(true)
      
      // If team 2 already scored, recalculate their points too
      if (team2Scored && team2Guess) {
        const team2ScoreDiff = team2Points - team2PointsAwarded
        if (team2ScoreDiff !== 0) {
          onScore(2, team2ScoreDiff)
        }
        setTeam2PointsAwarded(team2Points)
      }
    } else if (team === 2 && !team2Scored) {
      setTeam2Guess(guess)
      const team2Num = parseFloat(guess)
      const team1Num = team1Guess ? parseFloat(team1Guess) : null
      const { team1Points, team2Points } = calculatePoints(team1Num, team2Num)
      
      // Award points to team 2
      const team2ScoreDiff = team2Points - team2PointsAwarded
      if (team2ScoreDiff !== 0) {
        onScore(2, team2ScoreDiff)
      }
      setTeam2PointsAwarded(team2Points)
      setTeam2Scored(true)
      
      // If team 1 already scored, recalculate their points too
      if (team1Scored && team1Guess) {
        const team1ScoreDiff = team1Points - team1PointsAwarded
        if (team1ScoreDiff !== 0) {
          onScore(1, team1ScoreDiff)
        }
        setTeam1PointsAwarded(team1Points)
      }
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



