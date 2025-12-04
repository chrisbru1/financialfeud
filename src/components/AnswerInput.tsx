import { useState, useEffect } from 'react'
import { findBestMatch } from '../utils/fuzzyMatch'
import './AnswerInput.css'

interface AnswerInputProps {
  answers: string[]
  revealedIndices: Set<number>
  onReveal: (index: number) => void
  activeTeam: 1 | 2
}

function AnswerInput({ answers, revealedIndices, onReveal, activeTeam }: AnswerInputProps) {
  const [input, setInput] = useState('')
  const [matchResult, setMatchResult] = useState<{ index: number; similarity: number } | null>(null)
  const [showSuggestion, setShowSuggestion] = useState(false)

  useEffect(() => {
    if (input.trim().length > 2) {
      const match = findBestMatch(input, answers, 0.5)
      setMatchResult(match)
      setShowSuggestion(match !== null && match.similarity >= 0.5 && match.similarity < 0.85)
    } else {
      setMatchResult(null)
      setShowSuggestion(false)
    }
  }, [input, answers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (input.trim().length === 0) return
    
    const match = findBestMatch(input, answers, 0.5)
    
    if (match && !revealedIndices.has(match.index)) {
      if (match.similarity >= 0.85) {
        // Auto-reveal if very close match
        onReveal(match.index)
        setInput('')
        setMatchResult(null)
        setShowSuggestion(false)
      } else if (match.similarity >= 0.5) {
        // Show suggestion for manual reveal
        setShowSuggestion(true)
      }
    } else if (match && revealedIndices.has(match.index)) {
      // Already revealed
      setInput('')
      setMatchResult(null)
      setShowSuggestion(false)
    }
  }

  const handleRevealSuggestion = () => {
    if (matchResult && !revealedIndices.has(matchResult.index)) {
      onReveal(matchResult.index)
      setInput('')
      setMatchResult(null)
      setShowSuggestion(false)
    }
  }

  const handleClear = () => {
    setInput('')
    setMatchResult(null)
    setShowSuggestion(false)
  }

  return (
    <div className="answer-input-container">
      <form onSubmit={handleSubmit} className="answer-input-form">
        <div className="answer-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Team ${activeTeam}: Type your answer...`}
            className="answer-input"
            autoComplete="off"
          />
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear input"
            >
              ×
            </button>
          )}
        </div>
        <button type="submit" className="submit-button" disabled={!input.trim()}>
          Check Answer
        </button>
      </form>
      
      {showSuggestion && matchResult && (
        <div className="suggestion-box">
          <div className="suggestion-text">
            Did you mean: <strong>{answers[matchResult.index]}</strong>?
          </div>
          <div className="suggestion-similarity">
            Match: {Math.round(matchResult.similarity * 100)}%
          </div>
          <button
            onClick={handleRevealSuggestion}
            className="reveal-suggestion-button"
          >
            Reveal This Answer
          </button>
        </div>
      )}
      
      {matchResult && matchResult.similarity >= 0.85 && !revealedIndices.has(matchResult.index) && (
        <div className="auto-match-indicator">
          ✓ Auto-matched! Revealing answer...
        </div>
      )}
    </div>
  )
}

export default AnswerInput

