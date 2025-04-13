import { useState } from 'react';

interface TeamFilterProps {
  onFilterChange: (filters: {
    league?: number;
    season?: number;
    country?: string;
    search?: string;
  }) => void;
}

const TeamFilter = ({ onFilterChange }: TeamFilterProps) => {
  const [league, setLeague] = useState<number | undefined>(undefined);
  const [season, setSeason] = useState<number>(new Date().getFullYear());
  const [country, setCountry] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleApplyFilters = () => {
    onFilterChange({
      league,
      season,
      country: country || undefined,
      search: search || undefined,
    });
  };

  const handleResetFilters = () => {
    setLeague(undefined);
    setSeason(new Date().getFullYear());
    setCountry('');
    setSearch('');
    onFilterChange({});
  };

  return (
    <div className="filter-card">
      <h2 className="filter-title">Filter Teams</h2>
      
      <div className="filter-grid">
        <div>
          <label htmlFor="league" className="filter-label">League</label>
          <select
            id="league"
            className="filter-input"
            value={league || ''}
            onChange={(e) => setLeague(e.target.value ? Number(e.target.value) : undefined)}
          >
            <option value="">All Leagues</option>
            <option value="39">Premier League</option>
            <option value="140">La Liga</option>
            <option value="78">Bundesliga</option>
            <option value="135">Serie A</option>
            <option value="61">Ligue 1</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="season" className="filter-label">Season</label>
          <select
            id="season"
            className="filter-input"
            value={season}
            onChange={(e) => setSeason(Number(e.target.value))}
          >
            <option value="2025">2024/2025</option>
            <option value="2024">2023/2024</option>
            <option value="2023">2022/2023</option>
            <option value="2022">2021/2022</option>
            <option value="2021">2020/2021</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="country" className="filter-label">Country</label>
          <select
            id="country"
            className="filter-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            <option value="England">England</option>
            <option value="Spain">Spain</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="France">France</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="search" className="filter-label">Search</label>
          <input
            type="text"
            id="search"
            className="filter-input"
            placeholder="Team name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="filter-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={handleResetFilters}
        >
          Reset
        </button>
        <button
          type="button"
          className="button button-primary"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default TeamFilter;