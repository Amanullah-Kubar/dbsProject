import React from 'react'
import LandingPage from './Pages/LandingPage'
import DonorRegistrationForm from './Pages/DonorRegistrationForm'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import PatientRequestForm from './Pages/PatientRequestForm'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DonorRegistrationForm" element={<DonorRegistrationForm />} />
          <Route path="/PatientRequestForm" element={<PatientRequestForm/>} />
        </Routes>
      </Router>



    </>
  )
}
