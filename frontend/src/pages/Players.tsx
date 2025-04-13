import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PlayerCard from '../components/Players/PlayerCard';
import PlayerFilter from '../components/Players/PlayerFilter';
import { Spinner, SkeletonCard } from '../components/UI/Loaders';

interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  photo: string;
  team?: {
    name: string;
    logo: string;
  };
}

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Current filter values (doesn't trigger API call)
  const [currentFilters, setCurrentFilters] = useState<{
    league?: number;
    season?: number;
    search?: string;
    country?: string;
  }>({
    league: 39, // Default to Premier League
    season: 2023, // Default to current season
  });
  // Applied filters that trigger the API call
  const [appliedFilters, setAppliedFilters] = useState(currentFilters);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        
        let apiUrl = 'http://127.0.0.1:8000/api/players?';
        const queryParams = [];
        
        if (appliedFilters.league) {
          queryParams.push(`league=${appliedFilters.league}`);
        }
        
        if (appliedFilters.season) {
          queryParams.push(`season=${appliedFilters.season}`);
        }
        
        apiUrl += queryParams.join('&');
        
        console.log('Fetching players from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Received non-JSON response:', text.substring(0, 100) + '...');
          throw new Error(`API returned non-JSON response (${response.status}: ${response.statusText})`);
        }
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API error: ${response.status} - ${errorData.error || errorData.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.response && !Array.isArray(data)) {
          console.error('Unexpected API response format:', data);
          throw new Error('Unexpected API response format');
        }
        
        let fetchedPlayers = Array.isArray(data) ? data : (data.response || []);
        
        // Apply client-side filters
        if (appliedFilters.country) {
          fetchedPlayers = fetchedPlayers.filter((player: any) => {
            const playerData = player.player || player;
            return playerData.nationality?.toLowerCase().includes(appliedFilters.country!.toLowerCase());
          });
        }
        
        if (appliedFilters.search) {
          fetchedPlayers = fetchedPlayers.filter((player: any) => {
            const playerData = player.player || player;
            const fullName = `${playerData.firstname} ${playerData.lastname}`.toLowerCase();
            return fullName.includes(appliedFilters.search!.toLowerCase());
          });
        }
        
        // Map API response to our Player interface
        const mappedPlayers: Player[] = fetchedPlayers.map((item: any) => {
          const playerData = item.player || item;
          return {
            id: playerData.id,
            name: `${playerData.firstname} ${playerData.lastname}`,
            firstname: playerData.firstname,
            lastname: playerData.lastname,
            age: playerData.age,
            nationality: playerData.nationality,
            photo: playerData.photo,
            team: item.statistics?.[0]?.team || playerData.team,
          };
        });
        
        setPlayers(mappedPlayers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError(`Failed to load players: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, [appliedFilters]);

  const handleFilterChange = (newFilters: {
    league?: number;
    season?: number;
    country?: string;
    search?: string;
  }) => {
    setCurrentFilters(newFilters);
  };

  const handleSearch = () => {
    setAppliedFilters(currentFilters);
  };

  return (
    <Layout>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Football Players</h1>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <PlayerFilter onFilterChange={handleFilterChange} />
        </div>
        <button 
          className="button button-primary"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>
      
      {loading && (
        <div className="player-grid">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <svg className="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="error-message">{error}</p>
          <button 
            className="button button-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}
      
      {!loading && !error && players.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
          <p>No players found matching your filters. Try adjusting your search criteria.</p>
        </div>
      )}
      
      {!loading && !error && players.length > 0 && (
        <div className="player-grid">
          {players.map(player => (
            <PlayerCard 
              key={player.id}
              id={player.id}
              name={player.name}
              age={player.age}
              nationality={player.nationality}
              photo={player.photo}
              team={player.team}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Players;