import { useState } from 'react'
import './HostNotes.css'

interface HostNotesProps {
  notes: string
}

function HostNotes({ notes }: HostNotesProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="host-notes">
      <button 
        className="host-notes-toggle"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'Hide' : 'Show'} Host Notes
      </button>
      {isVisible && (
        <div className="host-notes-content">
          <strong>Host Notes:</strong> {notes}
        </div>
      )}
    </div>
  )
}

export default HostNotes


