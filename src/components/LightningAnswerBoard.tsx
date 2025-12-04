import { useState } from 'react'
import './LightningAnswerBoard.css'

interface LightningAnswerBoardProps {
  onScore: (team: 1 | 2, points: number) => void
  activeTeam: 1 | 2
}

function LightningAnswerBoard({ onScore, activeTeam }: LightningAnswerBoardProps) {
  const [team1Points, setTeam1Points] = useState(0)
  const [team2Points, setTeam2Points] = useState(0)

  const handleQuickScore = (team: 1 | 2, points: number) => {
    if (team === 1) {
      const newPoints = team1Points + points
      setTeam1Points(newPoints)
      onScore(1, points)
    } else {
      const newPoints = team2Points + points
      setTeam2Points(newPoints)
      onScore(2, points)
    }
  }

  return (
    <div className="lightning-answer-board">
      <div className="lightning-instructions">
        Rapid-fire round! Award points quickly for reasoning and participation.
      </div>
      <div className="lightning-controls">
        <div className={`lightning-team ${activeTeam === 1 ? 'active' : ''}`}>
          <div className="lightning-team-label">Team 1</div>
          <div className="lightning-quick-buttons">
            <button onClick={() => handleQuickScore(1, 5)} className="quick-btn">+5</button>
            <button onClick={() => handleQuickScore(1, 10)} className="quick-btn">+10</button>
            <button onClick={() => handleQuickScore(1, 15)} className="quick-btn">+15</button>
            <button onClick={() => handleQuickScore(1, 20)} className="quick-btn">+20</button>
          </div>
          <div className="lightning-total">Total: {team1Points}</div>
        </div>
        <div className={`lightning-team ${activeTeam === 2 ? 'active' : ''}`}>
          <div className="lightning-team-label">Team 2</div>
          <div className="lightning-quick-buttons">
            <button onClick={() => handleQuickScore(2, 5)} className="quick-btn">+5</button>
            <button onClick={() => handleQuickScore(2, 10)} className="quick-btn">+10</button>
            <button onClick={() => handleQuickScore(2, 15)} className="quick-btn">+15</button>
            <button onClick={() => handleQuickScore(2, 20)} className="quick-btn">+20</button>
          </div>
          <div className="lightning-total">Total: {team2Points}</div>
        </div>
      </div>
    </div>
  )
}

export default LightningAnswerBoard


