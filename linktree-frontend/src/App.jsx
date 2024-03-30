import { useState } from 'react'
import Landing from './components/landing/Landing'
import LoginPage from './components/login-signup/LoginPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/homepage/HomePage'
import HomepageContent from './components/homepage/HomepageContent'
import FeaturesPage from './components/homepage/FeaturesPage'
import AboutPage from './components/homepage/AboutPage'
import FAQPage from './components/homepage/FAQPage'
import RegisterPage from './components/login-signup/RegisterPage'
import UserRegistrationPage from './components/login-signup/UserRegistrationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route index element={<HomepageContent />}></Route>
          <Route path='/features' element={<FeaturesPage />}></Route>
          <Route path='/about' element={<AboutPage />}></Route>
          <Route path='/faq' element={<FAQPage />}></Route>
        </Route>
        <Route path='/register' element={<UserRegistrationPage />}>
          <Route index element={<RegisterPage />}></Route>
          <Route path='/register/signup' element={<RegisterPage />}></Route>
          <Route path='/register/login' element={<LoginPage />}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
