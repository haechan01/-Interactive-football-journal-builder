import { useState, useEffect } from 'react';

interface PlayerFilterProps {
  onFilterChange: (filters: {
    league?: number;
    season?: number;
    country?: string;
    search?: string;
  }) => void;
}

const PlayerFilter: React.FC<PlayerFilterProps> = ({ onFilterChange }) => {
  const [league, setLeague] = useState<number>(39);
  const [season, setSeason] = useState<number>(2023);
  const [country, setCountry] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    onFilterChange({
      league,
      season,
      country: country || undefined,
      search: search || undefined,
    });
  }, [league, season, country, search]);

  return (
    <div className="filter-container">
      <select
        value={league}
        onChange={(e) => setLeague(Number(e.target.value))}
        className="filter-select"
      >
        <option value={39}>Premier League</option>
        <option value={140}>La Liga</option>
        <option value={135}>Serie A</option>
        <option value={78}>Bundesliga</option>
        {/* Add more leagues as needed */}
      </select>

      <select
        value={season}
        onChange={(e) => setSeason(Number(e.target.value))}
        className="filter-select"
      >
        <option value={2023}>2023/24</option>
        <option value={2022}>2022/23</option>
        <option value={2021}>2021/22</option>
        {/* Add more seasons as needed */}
      </select>

      <input
        type="text"
        placeholder="Search by country..."
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="filter-input"
      />

      <input
        type="text"
        placeholder="Search players..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="filter-input"
      />
    </div>
  );
};

export default PlayerFilter;