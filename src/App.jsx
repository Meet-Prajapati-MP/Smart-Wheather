import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Responsive Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">
            {/* Sun Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="logo-icon">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <span className="logo-text">Smart<span className="logo-text-bold">Weather</span></span>
          </div>
          
          <button 
            className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#" className="navbar-link active" onClick={() => setMobileMenuOpen(false)}>Dashboard</a>
          <div className="navbar-divider"></div>
          <a href="https://github.com/Meet-Prajapati-MP/Smart-Wheather" target="_blank" rel="noreferrer" className="navbar-btn" onClick={() => setMobileMenuOpen(false)}>
            <span>Github Code</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Main content area */}
      <Dashboard />

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Smart Weather & City Dashboard. Powered by Vite + React + Node.js. Designed for Appsrow Solution LLP.</p>
      </footer>
    </div>
  );
}

export default App;
