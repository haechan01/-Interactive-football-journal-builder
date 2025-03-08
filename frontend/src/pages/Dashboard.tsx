import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [recentMatches, setRecentMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        setRecentMatches([
          { id: 1, homeTeam: 'Arsenal', awayTeam: 'Chelsea', score: '2-1', date: '2024-03-05' },
          { id: 2, homeTeam: 'Manchester City', awayTeam: 'Liverpool', score: '3-2', date: '2024-03-03' },
          { id: 3, homeTeam: 'Barcelona', awayTeam: 'Real Madrid', score: '1-1', date: '2024-03-01' },
        ]);
        
        setUpcomingMatches([
          { id: 4, homeTeam: 'Bayern Munich', awayTeam: 'Dortmund', date: '2024-03-10' },
          { id: 5, homeTeam: 'PSG', awayTeam: 'Lyon', date: '2024-03-12' },
          { id: 6, homeTeam: 'Juventus', awayTeam: 'Inter Milan', date: '2024-03-15' },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="section-title">Recent Matches</h2>
            
            {loading ? (
              <div className="text-center py-6">Loading recent matches...</div>
            ) : (
              <div className="space-y-4">
                {recentMatches.map((match: any) => (
                  <div key={match.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                      <div className="font-bold">{match.score}</div>
                    </div>
                    <div className="text-sm text-gray-500">{match.date}</div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Link to="/matches" className="text-primary-600 hover:text-primary-700 font-medium">
                    View all matches →
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <div className="card">
            <h2 className="section-title">Upcoming Matches</h2>
            
            {loading ? (
              <div className="text-center py-6">Loading upcoming matches...</div>
            ) : (
              <div className="space-y-4">
                {upcomingMatches.map((match: any) => (
                  <div key={match.id} className="border-b pb-3 last:border-0">
                    <div className="font-medium">{match.homeTeam} vs {match.awayTeam}</div>
                    <div className="text-sm text-gray-500">{match.date}</div>
                  </div>
                ))}
                
                <div className="mt-4">
                  <Link to="/matches" className="text-primary-600 hover:text-primary-700 font-medium">
                    View all matches →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <Link to="/teams">
              <div className="text-5xl font-bold text-primary-600 mb-2">39</div>
              <div className="text-lg font-medium">Teams</div>
            </Link>
          </div>
          
          <div className="card text-center">
            <Link to="/leagues">
              <div className="text-5xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-lg font-medium">Leagues</div>
            </Link>
          </div>
          
          <div className="card text-center">
            <Link to="/journals">
              <div className="text-5xl font-bold text-primary-600 mb-2">12</div>
              <div className="text-lg font-medium">Your Journals</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
