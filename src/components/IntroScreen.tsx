import { useState } from 'react'
import './IntroScreen.css'

interface IntroScreenProps {
  onStart: (team1Name: string, team2Name: string) => void
}

function IntroScreen({ onStart }: IntroScreenProps) {
  const [team1Name, setTeam1Name] = useState('Team 1')
  const [team2Name, setTeam2Name] = useState('Team 2')

  const handleStart = () => {
    if (team1Name.trim() && team2Name.trim()) {
      onStart(team1Name.trim(), team2Name.trim())
    }
  }

  return (
    <div className="intro-screen">
      <div className="intro-content">
        <div className="intro-header">
          <h1 className="intro-title">💰 Financial Feud 💰</h1>
          <p className="intro-subtitle">Welcome to the gameshow!</p>
        </div>
        
        <div className="team-naming">
          <div className="team-input-group">
            <label htmlFor="team1">Team 1 Name:</label>
            <input
              id="team1"
              type="text"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              placeholder="Enter Team 1 name"
              className="team-input"
              maxLength={30}
              autoFocus
            />
          </div>
          
          <div className="vs-divider">VS</div>
          
          <div className="team-input-group">
            <label htmlFor="team2">Team 2 Name:</label>
            <input
              id="team2"
              type="text"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              placeholder="Enter Team 2 name"
              className="team-input"
              maxLength={30}
            />
          </div>
        </div>

        <button
          onClick={handleStart}
          className="start-button"
          disabled={!team1Name.trim() || !team2Name.trim()}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default IntroScreen

