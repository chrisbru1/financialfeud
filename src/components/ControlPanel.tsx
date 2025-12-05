import './ControlPanel.css'

interface ControlPanelProps {
  strikes: number
  onStrike: () => void
  onNextQuestion: () => void
  onReset: () => void
  onSwitchTeam: () => void
  onGoToIntro: () => void
  isLastQuestion: boolean
}

function ControlPanel({ strikes, onStrike, onNextQuestion, onReset, onSwitchTeam, onGoToIntro, isLastQuestion }: ControlPanelProps) {
  return (
    <div className="control-panel">
      <div className="strikes-display">
        <div className="strikes-label">Strikes:</div>
        <div className="strikes-indicator">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`strike ${num <= strikes ? 'active' : ''}`}
            >
              ✗
            </div>
          ))}
        </div>
      </div>
      <div className="control-buttons">
        <button className="btn btn-strike" onClick={onStrike}>
          Add Strike
        </button>
        <button className="btn btn-switch" onClick={onSwitchTeam}>
          Switch Team
        </button>
        <button className="btn btn-next" onClick={onNextQuestion}>
          {isLastQuestion ? 'End Game' : 'Next Question'}
        </button>
        <button className="btn btn-reset" onClick={onReset}>
          Reset Game
        </button>
        <button className="btn btn-intro" onClick={onGoToIntro}>
          Change Teams
        </button>
      </div>
    </div>
  )
}

export default ControlPanel



