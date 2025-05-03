import React from 'react'
import LandingPage from './Pages/LandingPage'
import DonorRegistrationForm from './Pages/DonorRegistrationForm'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import PatientRequestForm from './Pages/PatientRequestForm'
import InventoryDashboard from './Pages/InventoryDashboard'
import DonorList from './Pages/NoStockMessage'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage />
            } />
          <Route
            path="/DonorRegistrationForm"
            element={
              <DonorRegistrationForm />
            } />
          <Route
            path="/PatientRequestForm"
            element={
              <PatientRequestForm />
            } />
          <Route
            path="/InventoryDashboard"
            element={
              <InventoryDashboard />
            }
          />

          <Route
            path="/donorList"
            element={
              <DonorList />
            }
          />

        </Routes>
      </Router>





    </>
  );
}
