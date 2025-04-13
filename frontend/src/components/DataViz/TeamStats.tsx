import { useState, useEffect } from 'react';
import { Spinner } from '../UI/Loaders';

interface TeamStatsProps {
  teamId: number;
  leagueId?: number;
  season?: number;
}

interface TeamStatistic {
  name: string;
  value: number;
  color: string;
}

const TeamStats = ({ teamId, leagueId, season }: TeamStatsProps) => {
  const [stats, setStats] = useState<TeamStatistic[]>([]);
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch data from your API
        // Here we'll simulate API delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockTeam = {
          id: teamId,
          name: 'Manchester United',
          logo: 'https://media.api-sports.io/football/teams/33.png',
          country: 'England',
          founded: 1878,
        };
        
        // Generate random stats for demo purposes
        const mockStats = [
          { name: 'Goals Scored', value: 48, color: '#2563eb' },
          { name: 'Goals Conceded', value: 25, color: '#ef4444' },
          { name: 'Clean Sheets', value: 14, color: '#10b981' },
          { name: 'Wins', value: 19, color: '#8b5cf6' },
          { name: 'Draws', value: 8, color: '#f59e0b' },
          { name: 'Losses', value: 6, color: '#6b7280' },
          { name: 'Yellow Cards', value: 61, color: '#fbbf24' },
          { name: 'Red Cards', value: 3, color: '#dc2626' }
        ];
        
        setTeam(mockTeam);
        setStats(mockStats);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team statistics. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, [teamId, leagueId, season]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="stats-card">
      {team && (
        <div className="card-content">
          <div className="team-header">
            <img src={team.logo} alt={team.name} className="team-header-logo" />
            <div>
              <h3 className="team-header-name">{team.name}</h3>
              <p className="team-header-info">{team.country} · Founded: {team.founded}</p>
            </div>
          </div>
          
          <h4 className="section-title">Season Statistics</h4>
          
          <div className="chart-container">
            {/* Actual chart would be rendered here with a charting library */}
            {/* Since we can't use Recharts without configuration, showing stats in a simple way */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: stat.color, color: 'white' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                  <div>{stat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamStats;