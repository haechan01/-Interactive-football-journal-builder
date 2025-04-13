// src/pages/Games.tsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GameSearch from '../components/Games/GameSearch';
import GameResults from '../components/Games/GameResults';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useWidget, setUseWidget] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Initial search with default parameters
    handleSearch({ season: 2023, league: 39 });
    
    // Try to get API key from env if needed for widget
    const key = import.meta.env.VITE_API_FOOTBALL_KEY || '';
    setApiKey(key);
  }, []);

  const handleSearch = async (params) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string
      const queryParams = new URLSearchParams();
      if (params.season) queryParams.append('season', params.season.toString());
      if (params.league) queryParams.append('league', params.league.toString());
      if (params.date) queryParams.append('date', params.date);
      if (params.from) queryParams.append('from', params.from);
      if (params.to) queryParams.append('to', params.to);
      
      console.log('Searching with params:', params);
      console.log('Query string:', queryParams.toString());
      
      const response = await fetch(`/api/fixtures/search?${queryParams.toString()}`);
      
      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned non-JSON response');
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch games');
      }
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleViewMode = () => {
    setUseWidget(!useWidget);
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Football Games</h1>
            <p className="mt-1 text-sm text-gray-500">
              Search games from top leagues (2021-2023 seasons)
            </p>
          </div>
          <button 
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={toggleViewMode}
          >
            {useWidget ? 'Switch to Custom View' : 'Switch to Widget View'}
          </button>
        </div>
        
        {!useWidget ? (
          <>
            <GameSearch onSearch={handleSearch} />
            <GameResults 
              games={games} 
              loading={loading} 
              error={error} 
            />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Your widget component here */}
            <div className="p-6 text-center text-gray-500">
              Widget view is not implemented yet
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Games;