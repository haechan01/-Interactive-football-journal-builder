import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TeamDetail } from '../../types/team';

interface TeamStatsProps {
  teamId: number;
}

interface TeamStatistics {
  name: string;
  value: number;
}

const TeamStats = ({ teamId }: TeamStatsProps) => {
  const [stats, setStats] = useState<TeamStatistics[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch data from your API
    // For this example, we'll use a mock data loader
    const loadMockData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app this would come from API
        const mockStats = [
          { name: 'Goals Scored', value: 45 },
          { name: 'Goals Conceded', value: 23 },
          { name: 'Clean Sheets', value: 12 },
          { name: 'Wins', value: 18 },
          { name: 'Draws', value: 7 },
          { name: 'Losses', value: 5 },
        ];
        
        setStats(mockStats);
        setLoading(false);
      } catch (err) {
        setError('Failed to load team statistics');
        setLoading(false);
      }
    };
    
    loadMockData();
  }, [teamId]);

  if (loading) {
    return <div className="text-center py-10">Loading team statistics...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="card">
      <h3 className="section-title">Team Statistics</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stats}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Value" fill="#0284c7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamStats;
