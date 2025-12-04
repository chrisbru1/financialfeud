import './QuestionDisplay.css'

interface QuestionDisplayProps {
  roundLabel: string
  title: string
  prompt: string
}

function QuestionDisplay({ roundLabel, title, prompt }: QuestionDisplayProps) {
  return (
    <div className="question-display">
      <div className="round-label">{roundLabel}</div>
      <div className="question-title">{title}</div>
      <div className="question-prompt">{prompt}</div>
    </div>
  )
}

export default QuestionDisplay


