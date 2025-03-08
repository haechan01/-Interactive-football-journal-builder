import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">Football Data App</Link>
        
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-primary-200">Dashboard</Link>
          <Link to="/teams" className="hover:text-primary-200">Teams</Link>
          <Link to="/leagues" className="hover:text-primary-200">Leagues</Link>
          <Link to="/matches" className="hover:text-primary-200">Matches</Link>
          <Link to="/players" className="hover:text-primary-200">Players</Link>
          <Link to="/journals" className="hover:text-primary-200">Journals</Link>
        </nav>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-primary-700 shadow-md md:hidden z-10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/teams" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Teams
              </Link>
              <Link 
                to="/leagues" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Leagues
              </Link>
              <Link 
                to="/matches" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Matches
              </Link>
              <Link 
                to="/players" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Players
              </Link>
              <Link 
                to="/journals" 
                className="block px-3 py-2 rounded-md hover:bg-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Journals
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
