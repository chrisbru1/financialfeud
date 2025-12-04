import { useState } from 'react'
import { calculateSimilarity } from '../utils/fuzzyMatch'
import './AnswerInput.css'

interface AnswerInputProps {
  answers: string[]
  revealedIndices: Set<number>
  onReveal: (index: number) => void
  onStrike: () => void
  activeTeamName: string
}

function AnswerInput({ answers, revealedIndices, onReveal, onStrike, activeTeamName }: AnswerInputProps) {
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (input.trim().length === 0) return
    
    const trimmedInput = input.trim()
    
    // Check if all answers are revealed
    if (revealedIndices.size === answers.length) {
      setFeedback({ type: 'error', message: 'All answers have been revealed!' })
      setTimeout(() => setFeedback({ type: null, message: '' }), 2000)
      setInput('')
      return
    }
    
    // Check against all answers, but only consider unrevealed ones
    type MatchResult = { index: number; similarity: number }
    let bestMatch: MatchResult | null = null
    
    for (let index = 0; index < answers.length; index++) {
      // Skip already revealed answers
      if (revealedIndices.has(index)) continue
      
      const answer = answers[index]
      
      // Calculate similarity directly
      const similarity = calculateSimilarity(trimmedInput, answer)
      
      // Also check for partial matches (key words)
      const words = answer.toLowerCase().split(/\s+/)
      const inputWords = trimmedInput.toLowerCase().split(/\s+/)
      
      let wordMatchScore = 0
      words.forEach(word => {
        // Check for word matches (even shorter words now)
        if (word.length > 2 && inputWords.some(inputWord => 
          inputWord.includes(word) || word.includes(inputWord)
        )) {
          wordMatchScore += 0.25
        }
      })
      
      // Check if any significant word from answer appears in input
      const significantWords = words.filter(w => w.length > 3)
      if (significantWords.length > 0) {
        const matchedWords = significantWords.filter(word => 
          trimmedInput.toLowerCase().includes(word)
        )
        if (matchedWords.length > 0) {
          wordMatchScore += (matchedWords.length / significantWords.length) * 0.3
        }
      }
      
      const finalSimilarity = Math.max(similarity, wordMatchScore)
      
      // Use a very lenient threshold (0.35 = 35% similarity)
      if (finalSimilarity >= 0.35) {
        if (!bestMatch || finalSimilarity > bestMatch.similarity) {
          bestMatch = { index, similarity: finalSimilarity }
        }
      }
    }
    
    if (bestMatch !== null) {
      // Close match - reveal the answer
      onReveal(bestMatch.index)
      setFeedback({ type: 'success', message: '✓ Correct! Answer revealed.' })
      setInput('')
      setTimeout(() => setFeedback({ type: null, message: '' }), 2000)
    } else {
      // No match - add a strike
      onStrike()
      setFeedback({ type: 'error', message: '✗ Wrong answer! Strike added.' })
      setInput('')
      setTimeout(() => setFeedback({ type: null, message: '' }), 2000)
    }
  }

  const handleClear = () => {
    setInput('')
    setFeedback({ type: null, message: '' })
  }

  return (
    <div className="answer-input-container">
      <form onSubmit={handleSubmit} className="answer-input-form">
        <div className="answer-input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${activeTeamName}: Type your answer...`}
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
      
      {feedback.type && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  )
}

export default AnswerInput
