import { useState } from 'react'
import './OpenAnswerBoard.css'

interface OpenAnswerBoardProps {
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
  maxPoints?: number
}

function OpenAnswerBoard({ onScore, activeTeam, maxPoints = 40 }: OpenAnswerBoardProps) {
  const [team1Answer, setTeam1Answer] = useState('')
  const [team2Answer, setTeam2Answer] = useState('')
  const [team1Points, setTeam1Points] = useState<number | null>(null)
  const [team2Points, setTeam2Points] = useState<number | null>(null)
  const [team1PointsInput, setTeam1PointsInput] = useState('')
  const [team2PointsInput, setTeam2PointsInput] = useState('')

  const handleScore = (team: 1 | 2, points: number) => {
    if (team === 1 && team1Points === null) {
      setTeam1Points(points)
      onScore(1, points)
    } else if (team === 2 && team2Points === null) {
      setTeam2Points(points)
      onScore(2, points)
    }
  }

  return (
    <div className="open-answer-board">
      <div className="open-instructions">
        Enter your answer. Host will award points based on depth and quality (max {maxPoints} points).
      </div>
      <div className="open-inputs">
        <div className={`open-input-group ${activeTeam === 1 ? 'active' : ''}`}>
          <label>Team 1 Answer:</label>
          <textarea
            value={team1Answer}
            onChange={(e) => setTeam1Answer(e.target.value)}
            disabled={team1Points !== null}
            placeholder="Enter your answer..."
            rows={4}
          />
          {team1Points === null ? (
            <div className="open-scoring">
              <input
                type="number"
                min="0"
                max={maxPoints}
                placeholder="Points"
                className="points-input"
                value={team1PointsInput}
                onChange={(e) => setTeam1PointsInput(e.target.value)}
              />
              <button
                onClick={() => {
                  const points = parseInt(team1PointsInput || '0')
                  if (points > 0) {
                    handleScore(1, points)
                    setTeam1PointsInput('')
                  }
                }}
                disabled={!team1Answer || !team1PointsInput}
                className="score-btn"
              >
                Score
              </button>
            </div>
          ) : (
            <div className="points-awarded">Points awarded: {team1Points}</div>
          )}
        </div>
        <div className={`open-input-group ${activeTeam === 2 ? 'active' : ''}`}>
          <label>Team 2 Answer:</label>
          <textarea
            value={team2Answer}
            onChange={(e) => setTeam2Answer(e.target.value)}
            disabled={team2Points !== null}
            placeholder="Enter your answer..."
            rows={4}
          />
          {team2Points === null ? (
            <div className="open-scoring">
              <input
                type="number"
                min="0"
                max={maxPoints}
                placeholder="Points"
                className="points-input"
                value={team2PointsInput}
                onChange={(e) => setTeam2PointsInput(e.target.value)}
              />
              <button
                onClick={() => {
                  const points = parseInt(team2PointsInput || '0')
                  if (points > 0) {
                    handleScore(2, points)
                    setTeam2PointsInput('')
                  }
                }}
                disabled={!team2Answer || !team2PointsInput}
                className="score-btn"
              >
                Score
              </button>
            </div>
          ) : (
            <div className="points-awarded">Points awarded: {team2Points}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OpenAnswerBoard

