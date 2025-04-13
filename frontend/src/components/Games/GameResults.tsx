// src/components/Games/GameResults.tsx
import React from 'react';

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Score {
  home: number | null;
  away: number | null;
}

interface Game {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
      long: string;
    };
    venue: {
      name: string;
      city: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    round: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: Score;
}

interface GameResultsProps {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const GameResults: React.FC<GameResultsProps> = ({ games, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No games found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search parameters or select a different date.</p>
      </div>
    );
  }

  // Group games by league
  const gamesByLeague: Record<string, Game[]> = {};
  games.forEach(game => {
    const league = game.league.name;
    if (!gamesByLeague[league]) {
      gamesByLeague[league] = [];
    }
    gamesByLeague[league].push(game);
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'FT':
        return 'bg-green-100 text-green-800';
      case 'NS':
        return 'bg-blue-100 text-blue-800';
      case '1H':
      case '2H':
      case 'HT':
        return 'bg-red-100 text-red-800 animate-pulse';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(gamesByLeague).map(([leagueName, leagueGames]) => (
        <div key={leagueName} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center p-4 bg-gray-50 border-b">
            <img 
              src={leagueGames[0]?.league.logo} 
              alt={leagueName} 
              className="w-8 h-8 object-contain mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/30?text=?';
              }}
            />
            <h3 className="text-lg font-semibold text-gray-800">{leagueName} - {leagueGames[0]?.league.country}</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leagueGames.map(game => (
              <div key={game.fixture.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                  <span>{formatDate(game.fixture.date)}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(game.fixture.status.short)}`}>
                    {game.fixture.status.short}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 flex-shrink-0 mr-3">
                      <img 
                        src={game.teams.home.logo} 
                        alt={game.teams.home.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=?';
                        }}
                      />
                    </div>
                    <span className="font-medium text-gray-900 truncate">{game.teams.home.name}</span>
                  </div>
                  
                  <div className="flex items-center justify-center px-4">
                    <span className="text-xl font-bold mx-1 min-w-[24px] text-center">
                      {game.goals.home !== null ? game.goals.home : '-'}
                    </span>
                    <span className="mx-1 text-gray-400">:</span>
                    <span className="text-xl font-bold mx-1 min-w-[24px] text-center">
                      {game.goals.away !== null ? game.goals.away : '-'}
                    </span>
                  </div>
                  
                  <div className="flex items-center flex-1 justify-end text-right">
                    <span className="font-medium text-gray-900 truncate">{game.teams.away.name}</span>
                    <div className="w-10 h-10 flex-shrink-0 ml-3">
                      <img 
                        src={game.teams.away.logo} 
                        alt={game.teams.away.name} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=?';
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {game.fixture.venue && game.fixture.venue.name && (
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    {game.fixture.venue.name}, {game.fixture.venue.city}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameResults;