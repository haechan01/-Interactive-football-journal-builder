import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useTeams } from '../hooks/useFootballData';

const Teams = () => {
  const [leagueId, setLeagueId] = useState<number | undefined>(undefined);
  const [season, setSeason] = useState<number>(new Date().getFullYear());
  const { teams, loading, error } = useTeams(leagueId, season);
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Football Teams</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label htmlFor="league" className="label">League</label>
            <select
              id="league"
              className="input"
              value={leagueId || ''}
              onChange={(e) => setLeagueId(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="">All Leagues</option>
              <option value="39">Premier League</option>
              <option value="140">La Liga</option>
              <option value="78">Bundesliga</option>
              <option value="135">Serie A</option>
              <option value="61">Ligue 1</option>
            </select>
          </div>
          
          <div className="w-full md:w-1/3">
            <label htmlFor="season" className="label">Season</label>
            <select
              id="season"
              className="input"
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>
        
        {loading && (
          <div className="text-center py-10">Loading teams...</div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        {!loading && !error && teams.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No teams found. Try changing your filters.
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className="card cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/teams/${team.id}`)}
            >
              <div className="flex items-center">
                <img 
                  src={team.logo} 
                  alt={`${team.name} logo`}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div>
                  <h3 className="font-bold text-lg">{team.name}</h3>
                  <p className="text-gray-600">{team.country}</p>
                  {team.founded && (
                    <p className="text-sm text-gray-500">Founded: {team.founded}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
