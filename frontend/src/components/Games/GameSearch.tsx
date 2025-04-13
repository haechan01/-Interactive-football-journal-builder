// src/components/Games/GameSearch.tsx
import React, { useState } from 'react';

interface GameSearchProps {
  onSearch: (params: any) => void;
}

const GameSearch: React.FC<GameSearchProps> = ({ onSearch }) => {
  const [season, setSeason] = useState<number>(2023);
  const [league, setLeague] = useState<number | undefined>(39); // Default to Premier League
  const [date, setDate] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'single' | 'range'>('single');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = {
      season,
      league,
      ...(searchMode === 'single' 
        ? { date: date || undefined }
        : { from: fromDate || undefined, to: toDate || undefined }
      )
    };
    
    onSearch(params);
  };

  const handleReset = () => {
    setSeason(2023);
    setLeague(39);
    setDate('');
    setFromDate('');
    setToDate('');
    setSearchMode('single');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Search Games</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              id="season"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
            >
              <option value="2023">2023/2024</option>
              <option value="2022">2022/2023</option>
              <option value="2021">2021/2022</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="league" className="block text-sm font-medium text-gray-700 mb-1">
              League
            </label>
            <select
              id="league"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={league || ''}
              onChange={(e) => setLeague(e.target.value ? Number(e.target.value) : undefined)}
            >
              <option value="39">Premier League (England)</option>
              <option value="140">La Liga (Spain)</option>
              <option value="135">Serie A (Italy)</option>
              <option value="61">Ligue 1 (France)</option>
              <option value="78">Bundesliga (Germany)</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">Date Filter</legend>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="dateMode"
                    checked={searchMode === 'single'}
                    onChange={() => setSearchMode('single')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Single Date</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    name="dateMode"
                    checked={searchMode === 'range'}
                    onChange={() => setSearchMode('range')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Date Range</span>
                </label>
              </div>
            </fieldset>
          </div>
          
          {searchMode === 'single' ? (
            <div className="md:col-span-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  id="fromDate"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  id="toDate"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
        
        <div className="mt-5 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search Games
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameSearch;