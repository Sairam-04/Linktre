import { useState } from 'react'
import Landing from './components/landing/Landing'
import LoginPage from './components/login-signup/LoginPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/homepage/HomePage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
