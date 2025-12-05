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
import RankingBoard from './components/RankingBoard'
import ControlPanel from './components/ControlPanel'
import IntroScreen from './components/IntroScreen'
import { QUESTIONS, Question } from './data/questions'
import './App.css'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [team1Name, setTeam1Name] = useState('Team 1')
  const [team2Name, setTeam2Name] = useState('Team 2')
  const [team1Score, setTeam1Score] = useState(0)
  const [team2Score, setTeam2Score] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question>(QUESTIONS[0])
  const [activeTeam, setActiveTeam] = useState<1 | 2>(1)
  const [strikes, setStrikes] = useState(0)
  
  // State for different question types
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [team1SelectedIndex, setTeam1SelectedIndex] = useState<number | null>(null)
  const [team2SelectedIndex, setTeam2SelectedIndex] = useState<number | null>(null)
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

    if (currentQuestion.type === 'survey') {
      const answer = currentQuestion.answers[index]
      handleScore(activeTeam, answer.points)
    }
  }

  const handleMultiSelect = (index: number) => {
    if (multiShowResult) return
    if (activeTeam === 1) {
      setTeam1SelectedIndex(index)
    } else {
      setTeam2SelectedIndex(index)
    }
  }

  const handleMultiReveal = () => {
    if (team1SelectedIndex === null || team2SelectedIndex === null) return
    setMultiShowResult(true)
    
    if (currentQuestion.type === 'multi') {
      // Score Team 1
      const team1Answer = currentQuestion.answers[team1SelectedIndex]
      if (team1Answer.isCorrect) {
        handleScore(1, 50)
      }
      
      // Score Team 2
      const team2Answer = currentQuestion.answers[team2SelectedIndex]
      if (team2Answer.isCorrect) {
        handleScore(2, 50)
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
    setTeam1SelectedIndex(null)
    setTeam2SelectedIndex(null)
    setMultiShowResult(false)
  }

  const handleStartGame = (name1: string, name2: string) => {
    setTeam1Name(name1)
    setTeam2Name(name2)
    setShowIntro(false)
  }

  const resetGame = () => {
    setTeam1Score(0)
    setTeam2Score(0)
    setCurrentQuestionIndex(0)
    setCurrentQuestion(QUESTIONS[0])
    setActiveTeam(1)
    setStrikes(0)
    setRevealedIndices(new Set())
    setTeam1SelectedIndex(null)
    setTeam2SelectedIndex(null)
    setMultiShowResult(false)
  }

  const goToIntro = () => {
    setShowIntro(true)
    resetGame()
  }

  const renderAnswerBoard = () => {
    switch (currentQuestion.type) {
      case 'survey':
        // Round 13 (id: 13) uses drag-and-drop ranking
        if (currentQuestion.id === 13) {
          return (
            <RankingBoard
              answers={currentQuestion.answers}
              team1Name={team1Name}
              team2Name={team2Name}
              activeTeam={activeTeam}
              onScore={handleScore}
            />
          )
        }
        // Other survey questions use the regular answer board
        return (
          <SurveyAnswerBoard
            answers={currentQuestion.answers}
            revealedIndices={revealedIndices}
            onReveal={revealSurveyAnswer}
            onStrike={addStrike}
            activeTeam={activeTeam}
            activeTeamName={activeTeam === 1 ? team1Name : team2Name}
          />
        )

      case 'closest':
        return (
          <ClosestAnswerBoard
            correctAnswer={currentQuestion.correctAnswer}
            expectedRange={currentQuestion.expectedRange}
            onScore={handleScore}
            activeTeam={activeTeam}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        )

      case 'multi':
        return (
          <>
            <MultiAnswerBoard
              answers={currentQuestion.answers}
              team1SelectedIndex={team1SelectedIndex}
              team2SelectedIndex={team2SelectedIndex}
              team1Name={team1Name}
              team2Name={team2Name}
              activeTeam={activeTeam}
              onSelect={handleMultiSelect}
              showResult={multiShowResult}
            />
            {team1SelectedIndex !== null && team2SelectedIndex !== null && !multiShowResult && (
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
                  Reveal Answers
                </button>
              </div>
            )}
            {((team1SelectedIndex === null || team2SelectedIndex === null) && !multiShowResult) && (
              <div style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem' }}>
                {team1SelectedIndex === null && `Waiting for ${team1Name} to select...`}
                {team1SelectedIndex !== null && team2SelectedIndex === null && `Waiting for ${team2Name} to select...`}
              </div>
            )}
          </>
        )

      case 'open':
        return (
          <OpenAnswerBoard
            onScore={handleScore}
            activeTeam={activeTeam}
            maxPoints={40}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        )

      case 'lightning':
        return (
          <LightningAnswerBoard
            onScore={handleScore}
            activeTeam={activeTeam}
            team1Name={team1Name}
            team2Name={team2Name}
          />
        )

      default:
        return null
    }
  }

  if (showIntro) {
    return <IntroScreen onStart={handleStartGame} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Financial Feud 💰</h1>
      </header>
      <GameBoard>
        <ScoreBoard 
          team1Name={team1Name}
          team2Name={team2Name}
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
          onGoToIntro={goToIntro}
        />
      </GameBoard>
    </div>
  )
}

export default App
