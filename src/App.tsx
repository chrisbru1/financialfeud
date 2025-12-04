import { useState } from 'react'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'
import QuestionDisplay from './components/QuestionDisplay'
import HostNotes from './components/HostNotes'
import SurveyAnswerBoard from './components/SurveyAnswerBoard'
import ClosestAnswerBoard from './components/ClosestAnswerBoard'
import MultiAnswerBoard from './components/MultiAnswerBoard'
import OpenAnswerBoard from './components/OpenAnswerBoard'
import LightningAnswerBoard from './components/LightningAnswerBoard'
import ControlPanel from './components/ControlPanel'
import { QUESTIONS, Question } from './data/questions'
import './App.css'

function App() {
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(QUESTIONS[0])
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1)
  const [strikes, setStrikes] = useState(0)
  
  // State for different question types
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [multiSelectedIndex, setMultiSelectedIndex] = useState<number | null>(null)
  const [multiShowResult, setMultiShowResult] = useState(false)

  const handleScore = (team: 1 | 2, points: number) => {
    if (team === 1) {
      setTeam1Score(team1Score + points)
    } else {
      setTeam2Score(team2Score + points)
    }
  }

  const revealSurveyAnswer = (index: number) => {
    if (revealedIndices.has(index)) return
    
    const newRevealed = new Set(revealedIndices)
    newRevealed.add(index)
    setRevealedIndices(newRevealed)

    if (currentQuestion.type === 'survey' && currentQuestion.answers) {
      const answer = currentQuestion.answers[index]
      if ('points' in answer) {
        handleScore(activeTeam, answer.points)
      }
    }
  }

  const handleMultiSelect = (index: number) => {
    if (multiShowResult) return
    setMultiSelectedIndex(index)
  }

  const handleMultiReveal = () => {
    if (multiSelectedIndex === null) return
    setMultiShowResult(true)
    
    if (currentQuestion.type === 'multi' && currentQuestion.answers) {
      const answer = currentQuestion.answers[multiSelectedIndex]
      if ('isCorrect' in answer) {
        if (answer.isCorrect) {
          handleScore(activeTeam, 50)
        } else {
          addStrike()
        }
      }
    }
  }

  const addStrike = () => {
    if (strikes < 2) {
      setStrikes(strikes + 1)
    } else {
      // Switch teams after 3 strikes
      setStrikes(0)
      setActiveTeam(activeTeam === 1 ? 2 : 1)
    }
  }

  const nextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % QUESTIONS.length
    setCurrentQuestionIndex(nextIndex)
    setCurrentQuestion(QUESTIONS[nextIndex])
    setStrikes(0)
    setRevealedIndices(new Set())
    setMultiSelectedIndex(null)
    setMultiShowResult(false)
  }

  const resetGame = () => {
    setTeam1Score(0)
    setTeam2Score(0)
    setCurrentQuestionIndex(0)
    setCurrentQuestion(QUESTIONS[0])
    setActiveTeam(1)
    setStrikes(0)
    setRevealedIndices(new Set())
    setMultiSelectedIndex(null)
    setMultiShowResult(false)
  }

  const renderAnswerBoard = () => {
    switch (currentQuestion.type) {
      case 'survey':
        if (currentQuestion.answers && currentQuestion.answers.length > 0 && 'points' in currentQuestion.answers[0]) {
          return (
            <SurveyAnswerBoard
              answers={currentQuestion.answers as any}
              revealedIndices={revealedIndices}
              onReveal={revealSurveyAnswer}
            />
          )
        }
        return null

      case 'closest':
        return (
          <ClosestAnswerBoard
            correctAnswer={currentQuestion.correctAnswer as number || 0}
            expectedRange={currentQuestion.expectedRange}
            onScore={handleScore}
            activeTeam={activeTeam}
          />
        )

      case 'multi':
        if (currentQuestion.answers && currentQuestion.answers.length > 0 && 'isCorrect' in currentQuestion.answers[0]) {
          return (
            <>
              <MultiAnswerBoard
                answers={currentQuestion.answers as any}
                selectedIndex={multiSelectedIndex}
                onSelect={handleMultiSelect}
                showResult={multiShowResult}
              />
              {multiSelectedIndex !== null && !multiShowResult && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    onClick={handleMultiReveal}
                    style={{
                      padding: '15px 30px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #4caf50, #388e3c)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Reveal Answer
                  </button>
                </div>
              )}
            </>
          )
        }
        return null

      case 'open':
        return (
          <OpenAnswerBoard
            onScore={handleScore}
            activeTeam={activeTeam}
            maxPoints={40}
          />
        )

      case 'lightning':
        return (
          <LightningAnswerBoard
            onScore={handleScore}
            activeTeam={activeTeam}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Financial Feud 💰</h1>
      </header>
      <GameBoard>
        <ScoreBoard 
          team1Score={team1Score} 
          team2Score={team2Score}
          activeTeam={activeTeam}
        />
        <QuestionDisplay 
          roundLabel={currentQuestion.roundLabel}
          title={currentQuestion.title}
          prompt={currentQuestion.prompt}
        />
        {renderAnswerBoard()}
        <HostNotes notes={currentQuestion.hostNotes} />
        <ControlPanel
          strikes={strikes}
          onStrike={addStrike}
          onNextQuestion={nextQuestion}
          onReset={resetGame}
          onSwitchTeam={() => setActiveTeam(activeTeam === 1 ? 2 : 1)}
        />
      </GameBoard>
    </div>
  )
}

export default App
