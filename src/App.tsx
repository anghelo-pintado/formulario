import { useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import CandidateTable from './components/candidateTable'
import { initCandidate } from './data'
import { Candidate } from './types'
import MessageTemplateSystem from './components/candidateForm'

function App() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [ candidates, setCanidates ] = useState(initCandidate)
  const [showMessageModal, setShowMessageModal] = useState(false);
  
  const handleOpenMessageModal = () => {
    setShowMessageModal(true);
  };
  
  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
  };

  return (
    <div>
      Mensajeria
      <CandidateTable candidates={candidates} onSelectionChange={setSelectedCandidates}/>
      <Button disabled={selectedCandidates.length === 0} variant="contained" onClick={handleOpenMessageModal} >Enviar mensaje</Button>
      {showMessageModal && (
        <MessageTemplateSystem 
          selectedCandidates={selectedCandidates}
          onClose={handleCloseMessageModal}
        />
      )}
    </div>
  )
}

export default App
