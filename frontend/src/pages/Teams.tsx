import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TeamCard from '../components/Teams/TeamCard';
import TeamFilter from '../components/Teams/TeamFilter';
import { Spinner, SkeletonCard } from '../components/UI/Loaders';

interface Team {
  id: number;
  name: string;
  country: string;
  logo: string;
  founded?: number;
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{
    league?: number;
    season?: number;
    country?: string;
    search?: string;
  }>({
    league: 39, // Default to Premier League
    season: 2023, // Default to current season
  });

  // ... existing code ...

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        
        // Build API URL with filters
        // Use absolute URL to bypass Vite's dev server
        let apiUrl = 'http://127.0.0.1:8000/api/teams?';
        
        // If you're using a proxy in vite.config.js, use this instead:
        // let apiUrl = '/api/teams?';
        
        const queryParams = [];
        
        if (filters.league) {
          queryParams.push(`league=${filters.league}`);
        }
        
        if (filters.season) {
          queryParams.push(`season=${filters.season}`);
        }
        
        apiUrl += queryParams.join('&');
        
        console.log('Fetching teams from:', apiUrl);
        
        // Make the actual API request
        const response = await fetch(apiUrl);
        
        // Check for non-JSON responses
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
        
        // Handle both formats: {response: [...]} or direct array
        let fetchedTeams = Array.isArray(data) ? data : (data.response || []);
        
        // Apply client-side filters if needed
        if (filters.country) {
          fetchedTeams = fetchedTeams.filter((team: any) => {
            const teamData = team.team || team;
            return teamData.country?.toLowerCase().includes(filters.country!.toLowerCase());
          });
        }
        
        if (filters.search) {
          fetchedTeams = fetchedTeams.filter((team: any) => {
            const teamData = team.team || team;
            return teamData.name?.toLowerCase().includes(filters.search!.toLowerCase());
          });
        }
        
        // Map API response to our Team interface, handling both possible response formats
        const mappedTeams: Team[] = fetchedTeams.map((item: any) => {
          const teamData = item.team || item;
          return {
            id: teamData.id,
            name: teamData.name,
            country: teamData.country,
            logo: teamData.logo,
            founded: teamData.founded
          };
        });
        
        setTeams(mappedTeams);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(`Failed to load teams: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    fetchTeams();
  }, [filters]);



  const handleFilterChange = (newFilters: {
    league?: number;
    season?: number;
    country?: string;
    search?: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Football Teams</h1>
      
      <TeamFilter onFilterChange={handleFilterChange} />
      
      {loading && (
        <div className="team-grid">
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
      
      {!loading && !error && teams.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
          <p>No teams found matching your filters. Try adjusting your search criteria.</p>
        </div>
      )}
      
      {!loading && !error && teams.length > 0 && (
        <div className="team-grid">
          {teams.map(team => (
            <TeamCard 
              key={team.id} 
              id={team.id} 
              name={team.name} 
              country={team.country} 
              logo={team.logo} 
              founded={team.founded} 
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Teams;