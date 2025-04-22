import React from 'react'
import LandingPage from './Pages/LandingPage'
import DonorRegistrationForm from './Pages/DonorRegistrationForm'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/DonorRegistrationForm" element={<DonorRegistrationForm />} />

        </Routes>
      </Router>



    </>
  )
}
