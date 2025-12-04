import './ScoreBoard.css'

interface ScoreBoardProps {
  team1Score: number
  team2Score: number
  activeTeam: 1 | 2
}

function ScoreBoard({ team1Score, team2Score, activeTeam }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className={`team-score team-1 ${activeTeam === 1 ? 'active' : ''}`}>
        <div className="team-label">Team 1</div>
        <div className="score-value">{team1Score}</div>
      </div>
      <div className={`team-score team-2 ${activeTeam === 2 ? 'active' : ''}`}>
        <div className="team-label">Team 2</div>
        <div className="score-value">{team2Score}</div>
      </div>
    </div>
  )
}

export default ScoreBoard



