import { ReactNode } from 'react'
import './GameBoard.css'

interface GameBoardProps {
  children: ReactNode
}

function GameBoard({ children }: GameBoardProps) {
  return (
    <div className="game-board">
      {children}
    </div>
  )
}

export default GameBoard



