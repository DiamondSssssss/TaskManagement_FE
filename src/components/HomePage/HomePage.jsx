import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="container">
          <div className="logo">TaskMaster</div>
          <div className="nav-links">
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="btn btn-secondary">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Organize Your Life, One Task at a Time</h1>
            <p>TaskMaster helps you stay on top of your daily tasks, projects, and goals.</p>
            <Link to="/register" className="btn btn-primary btn-large">Get Started for Free</Link>
          </div>
          <div className="hero-image">
            <img src="/path/to/your/hero-image.png" alt="TaskMaster app interface" />
          </div>
        </div>
      </header>

      <main>
        <section className="features">
          <div className="container">
            <h2>Why Choose TaskMaster?</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <i className="fas fa-list-ul"></i>
                <h3>Intuitive Interface</h3>
                <p>Simple and easy-to-use design for effortless task management.</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-tasks"></i>
                <h3>Multiple Lists</h3>
                <p>Create and manage multiple to-do lists for different projects.</p>
              </div>
              <div className="feature-item">
                <i className="fas fa-star"></i>
                <h3>Priority Setting</h3>
                <p>Set priorities and due dates to stay on top of important tasks.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
