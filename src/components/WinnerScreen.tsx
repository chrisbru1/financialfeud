import './WinnerScreen.css'

interface WinnerScreenProps {
  team1Name: string
  team2Name: string
  team1Score: number
  team2Score: number
  onPlayAgain: () => void
  onGoToIntro: () => void
}

function WinnerScreen({ team1Name, team2Name, team1Score, team2Score, onPlayAgain, onGoToIntro }: WinnerScreenProps) {
  const winner = team1Score > team2Score ? team1Name : team2Score > team1Score ? team2Name : null
  const isTie = team1Score === team2Score

  return (
    <div className="winner-screen">
      <div className="winner-content">
        <h1 className="winner-title">🎉 Game Over! 🎉</h1>
        
        <div className="final-scores">
          <div className={`final-score ${team1Score > team2Score ? 'winner' : ''}`}>
            <div className="final-team-name">{team1Name}</div>
            <div className="final-score-value">{team1Score}</div>
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className={`final-score ${team2Score > team1Score ? 'winner' : ''}`}>
            <div className="final-team-name">{team2Name}</div>
            <div className="final-score-value">{team2Score}</div>
          </div>
        </div>

        {isTie ? (
          <div className="winner-announcement">
            <h2>It's a Tie!</h2>
            <p>Both teams scored {team1Score} points!</p>
          </div>
        ) : (
          <div className="winner-announcement">
            <h2>🏆 {winner} Wins! 🏆</h2>
            <p>Congratulations on your victory!</p>
          </div>
        )}

        <div className="winner-actions">
          <button className="btn btn-play-again" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="btn btn-change-teams" onClick={onGoToIntro}>
            Change Teams
          </button>
        </div>
      </div>
    </div>
  )
}

export default WinnerScreen

