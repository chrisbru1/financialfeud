import './ScoreBoard.css'

interface ScoreBoardProps {
  team1Name: string
  team2Name: string
  team1Score: number
  team2Score: number
  activeTeam: 1 | 2
}

function ScoreBoard({ team1Name, team2Name, team1Score, team2Score, activeTeam }: ScoreBoardProps) {
  return (
    <div className="score-board">
      <div className={`team-score team-1 ${activeTeam === 1 ? 'active' : ''}`}>
        <div className="team-label">{team1Name}</div>
        <div className="score-value">{team1Score}</div>
      </div>
      <div className={`team-score team-2 ${activeTeam === 2 ? 'active' : ''}`}>
        <div className="team-label">{team2Name}</div>
        <div className="score-value">{team2Score}</div>
      </div>
    </div>
  )
}

export default ScoreBoard



