import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import PricingPage from './components/PricingPage/PricingPage';
import BackButton from './components/BackButton/BackButton';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import { AuthProvider } from './context/AuthContext';
import TaskDetail from './components/TaskDetail/TaskDetail'
import AboutPage from './components/AboutPage/AboutPage'
import FeaturesPage from './components/FeaturesPage/FeaturesPage'
import './App.css'

function ConditionalBackButton() {
  const location = useLocation();
  const hideBackButtonPaths = ['/', '/home', '/main'];
  
  if (hideBackButtonPaths.includes(location.pathname)) {
    return null;
  }
  
  return <BackButton />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ConditionalBackButton />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
