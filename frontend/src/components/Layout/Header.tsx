import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
          FootballViz
        </Link>
        
        <nav className="nav">
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/leagues" className={`nav-item ${isActive('/leagues') ? 'active' : ''}`}>Leagues</Link>
          <Link to="/teams" className={`nav-item ${isActive('/teams') ? 'active' : ''}`}>Teams</Link>
          <Link to="/games" className={`nav-item ${isActive('/games') ? 'active' : ''}`}>Games</Link>
          <Link to="/players" className={`nav-item ${isActive('/players') ? 'active' : ''}`}>Players</Link>
          <Link to="/journals" className={`nav-item ${isActive('/journals') ? 'active' : ''}`}>Journals</Link>
        </nav>
        
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-menu-item">Dashboard</Link>
          <Link to="/leagues" className="mobile-menu-item">Leagues</Link>
          <Link to="/teams" className="mobile-menu-item">Teams</Link>
          <Link to="/matches" className="mobile-menu-item">Matches</Link>
          <Link to="/players" className="mobile-menu-item">Players</Link>
          <Link to="/journals" className="mobile-menu-item">Journals</Link>
        </div>
      )}
    </header>
  );
};

export default Header;