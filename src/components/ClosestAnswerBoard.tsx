import { useState } from 'react'
import './ClosestAnswerBoard.css'

interface ClosestAnswerBoardProps {
  questionId: number
  correctAnswer: number | null
  expectedRange?: { min: number; max: number }
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
  team1Name: string
  team2Name: string
}

function ClosestAnswerBoard({ questionId, correctAnswer, expectedRange, onScore, activeTeam, team1Name, team2Name }: ClosestAnswerBoardProps) {
  const [team1Guess, setTeam1Guess] = useState<string>('')
  const [team2Guess, setTeam2Guess] = useState<string>('')
  const [isScored, setIsScored] = useState(false)
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

    // Check for exact matches (using small epsilon for floating point comparison)
    const team1Exact = Math.abs(team1Diff) < 0.001
    const team2Exact = Math.abs(team2Diff) < 0.001

    // If both teams get exact answer, both get full points
    if (team1Exact && team2Exact) {
      return { team1Points: 75, team2Points: 75 }
    }

    // Determine closest (needed for all questions)
    const team1IsCloser = team1Diff < team2Diff
    const team2IsCloser = team2Diff < team1Diff

    // Round 2 specific scoring logic
    // 75 points if exact (70)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 65-75
    if (questionId === 2 && expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      // No exact matches - determine closest
      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (65-75)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (65-75)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Round 5 specific scoring logic
    // 75 points if exact (75)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 70-80
    if (questionId === 5 && expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (70-80)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (70-80)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Round 6 specific scoring logic
    // 75 points if exact (60)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 55-65
    if (questionId === 6 && expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (55-65)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (55-65)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Round 8 specific scoring logic
    // 75 points if exact (15)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 10-20
    if (questionId === 8 && expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (10-20)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (10-20)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Round 11 specific scoring logic
    // 75 points if exact (350000)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 300,000–400,000
    if (questionId === 11 && expectedRange) {
      const { min, max } = expectedRange
      const team1InRange = team1Guess >= min && team1Guess <= max
      const team2InRange = team2Guess >= min && team2Guess <= max

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (300,000–400,000)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (300,000–400,000)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Round 12 specific scoring logic
    // 75 points if exact (285000)
    // 50 points for closest if no one gets it exactly (regardless of range)
    // 25 points if second closest answered inside 235,000–335,000
    if (questionId === 12) {
      // Round 12 uses a different range for second closest: 235,000–335,000
      const team1InRange = team1Guess >= 235000 && team1Guess <= 335000
      const team2InRange = team2Guess >= 235000 && team2Guess <= 335000

      // If both teams get exact, both get 75 points
      if (team1Exact && team2Exact) {
        return { team1Points: 75, team2Points: 75 }
      }
      if (team1Exact) {
        // Team 1 got exact - gets 75, Team 2 gets 25 if in range
        return { team1Points: 75, team2Points: team2InRange ? 25 : 0 }
      }
      if (team2Exact) {
        // Team 2 got exact - gets 75, Team 1 gets 25 if in range
        return { team1Points: team1InRange ? 25 : 0, team2Points: 75 }
      }

      if (team1IsCloser) {
        // Team 1 is closest - gets 50 points regardless of range
        const team1Points = 50
        // Team 2 gets 25 if they're second closest AND in range (235,000–335,000)
        const team2Points = team2InRange ? 25 : 0
        return { team1Points, team2Points }
      } else if (team2IsCloser) {
        // Team 2 is closest - gets 50 points regardless of range
        const team2Points = 50
        // Team 1 gets 25 if they're second closest AND in range (235,000–335,000)
        const team1Points = team1InRange ? 25 : 0
        return { team1Points, team2Points }
      } else {
        // Tie - both are equally close, both get 50
        return { team1Points: 50, team2Points: 50 }
      }
    }

    // Check for exact matches (for other questions without specific logic)
    // Note: Both exact case already handled at the top
    if (team1Exact) {
      return { team1Points: 75, team2Points: 0 }
    }
    if (team2Exact) {
      return { team1Points: 0, team2Points: 75 }
    }

    // Check if within expected range (for other questions)
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
        // Tie - both are equally close
        // If both are in range, both get 50 (tie for closest)
        // If only one is in range, that one gets 50
        // If neither is in range, both get 0
        if (team1InRange && team2InRange) {
          return { team1Points: 50, team2Points: 50 }
        } else if (team1InRange) {
          return { team1Points: 50, team2Points: 0 }
        } else if (team2InRange) {
          return { team1Points: 0, team2Points: 50 }
        } else {
          return { team1Points: 0, team2Points: 0 }
        }
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

  const handleSubmit = () => {
    const team1Num = team1Guess ? parseFloat(team1Guess) : null
    const team2Num = team2Guess ? parseFloat(team2Guess) : null
    
    if (team1Num === null || team2Num === null || isNaN(team1Num) || isNaN(team2Num)) {
      return
    }
    
    // Calculate points once with both guesses
    const { team1Points, team2Points } = calculatePoints(team1Num, team2Num)
    
    // Award points to both teams
    onScore(1, team1Points)
    onScore(2, team2Points)
    
    // Update state
    setTeam1PointsAwarded(team1Points)
    setTeam2PointsAwarded(team2Points)
    setIsScored(true)
  }

  const canSubmit = team1Guess && team2Guess && !isScored
  const team1Num = team1Guess ? parseFloat(team1Guess) : null
  const team2Num = team2Guess ? parseFloat(team2Guess) : null
  const isValid = team1Num !== null && team2Num !== null && !isNaN(team1Num) && !isNaN(team2Num)

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
            disabled={isScored}
            placeholder="Enter number"
          />
          {isScored && (
            <div className="points-awarded">
              Points awarded: {team1PointsAwarded}
            </div>
          )}
        </div>
        <div className={`closest-input-group ${activeTeam === 2 ? 'active' : ''}`}>
          <label>{team2Name} Guess:</label>
          <input
            type="number"
            value={team2Guess}
            onChange={(e) => setTeam2Guess(e.target.value)}
            disabled={isScored}
            placeholder="Enter number"
          />
          {isScored && (
            <div className="points-awarded">
              Points awarded: {team2PointsAwarded}
            </div>
          )}
        </div>
      </div>
      {!isScored && (
        <div className="closest-submit-container">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || !isValid}
            className="submit-btn"
          >
            Submit & Score
          </button>
        </div>
      )}
    </div>
  )
}

export default ClosestAnswerBoard
