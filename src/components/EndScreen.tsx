import MoneyBub from '../assets/brand/MoneyBub-removebg.png'
import './EndScreen.css'

interface EndScreenProps {
  team1Name: string
  team2Name: string
  team1Score: number
  team2Score: number
  onPlayAgain: () => void
  onNewGame: () => void
}

function EndScreen({ team1Name, team2Name, team1Score, team2Score, onPlayAgain, onNewGame }: EndScreenProps) {
  const winner = team1Score > team2Score ? team1Name : team2Score > team1Score ? team2Name : null
  const isTie = team1Score === team2Score

  return (
    <div className="end-screen">
      <div className="end-content">
        <div className="end-header">
          <img src={MoneyBub} alt="Money Bub" className="end-logo" />
          <h1 className="end-title">Game Over!</h1>
        </div>

        <div className="final-scores">
          <div className={`final-score team1 ${team1Score > team2Score ? 'winner' : ''}`}>
            <div className="final-team-label">{team1Name}</div>
            <div className="final-score-value">{team1Score}</div>
          </div>
          
          <div className="vs-divider-final">VS</div>
          
          <div className={`final-score team2 ${team2Score > team1Score ? 'winner' : ''}`}>
            <div className="final-team-label">{team2Name}</div>
            <div className="final-score-value">{team2Score}</div>
          </div>
        </div>

        {isTie ? (
          <div className="winner-announcement tie">
            <h2>It's a Tie! 🎉</h2>
            <p>Both teams played an amazing game!</p>
          </div>
        ) : (
          <div className="winner-announcement">
            <h2>🏆 {winner} Wins! 🏆</h2>
            <p>Congratulations on an incredible performance!</p>
          </div>
        )}

        <div className="end-actions">
          <button className="end-button play-again" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="end-button new-game" onClick={onNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default EndScreen

