# app/services/football_api.py
import requests
import os
from flask import current_app, g

class FootballAPIService:
    """
    Service for interacting with the API-Football API.
    """
    
    @staticmethod
    def get_instance():
        if 'football_api_service' not in g:
            g.football_api_service = FootballAPIService()
        return g.football_api_service
    
    def __init__(self):
        # Use instance variables instead of accessing current_app directly
        # This avoids application context issues
        self.api_key = None
        self.base_url = None
        self.headers = None
        
    def _initialize(self):
        """Initialize API settings if not already done"""
        if self.api_key is None:
            if current_app.config.get('API_FOOTBALL_PROVIDER') == 'RAPIDAPI':
                self.api_key = current_app.config.get('API_FOOTBALL_KEY')
                self.base_url = "https://api-football-v1.p.rapidapi.com/v3"
                self.headers = {
                    "x-rapidapi-key": self.api_key,
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
                }
            else:
                # Default to API-SPORTS
                self.api_key = current_app.config.get('API_FOOTBALL_KEY')
                self.base_url = "https://v3.football.api-sports.io"
                self.headers = {
                    # Change this line - API-SPORTS requires 'x-apisports-key' header
                    "x-apisports-key": self.api_key
                }
    
    def _make_request(self, endpoint, params=None):
        """
        Make a request to the API-Football API.
        """
        self._initialize()
        
        if not self.api_key:
            raise ValueError("API key not configured. Please set API_FOOTBALL_KEY in your environment.")
        
        url = f"{self.base_url}/{endpoint}"
        
        try:
            # Print the exact request details for debugging
            print(f"Making API request to: {url}")
            print(f"With headers: {self.headers}")
            print(f"With params: {params}")
            
            # Create a clean session to avoid any framework-added headers
            session = requests.Session()
            
            # Make the request with only the necessary headers
            response = session.get(url, headers=self.headers, params=params)
            
            # Print response details
            print(f"API response status code: {response.status_code}")
            print(f"API response headers: {response.headers}")
            print(f"API response content: {response.text[:500]}...")  # Print first 500 chars
            
            if response.status_code != 200:
                raise requests.exceptions.HTTPError(f"HTTP error {response.status_code}: {response.text}")
            
            data = response.json()
            
            # Check for API response errors
            if 'errors' in data and data['errors']:
                error_message = '; '.join([f"{k}: {v}" for k, v in data['errors'].items()])
                raise ValueError(f"API error: {error_message}")
            
            return data["response"]
        except Exception as e:
            print(f"API request failed: {str(e)}")
            raise
    
    # Rest of the methods (get_teams, etc.) remain the same
    def get_teams(self, id=None, name=None, league=None, season=None, country=None, code=None, venue=None, search=None):
        """Get a list of teams."""
        params = {}
        if id is not None:
            params["id"] = id
        if name is not None:
            params["name"] = name
        if league is not None:
            params["league"] = league
        if season is not None:
            params["season"] = season
        if country is not None:
            params["country"] = country
        if code is not None:
            params["code"] = code
        if venue is not None:
            params["venue"] = venue
        if search is not None:
            params["search"] = search
            
        return self._make_request("teams", params)
    
    def get_leagues(self, id=None, name=None, country=None, code=None, season=None, team=None, type=None, current=None, search=None, last=None):
        """Get a list of leagues."""
        params = {}
        if id is not None:
            params["id"] = id
        if name is not None:
            params["name"] = name
        if country is not None:
            params["country"] = country
        if code is not None:
            params["code"] = code
        if season is not None:
            params["season"] = season
        if team is not None:
            params["team"] = team
        if type is not None:
            params["type"] = type
        if current is not None:
            params["current"] = current
        if search is not None:
            params["search"] = search
        if last is not None:
            params["last"] = last
            
        return self._make_request("leagues", params)
    
    def get_fixtures(self, id=None, live=None, date=None, league=None, season=None, team=None, last=None, next=None, from_date=None, to_date=None, round=None, status=None):
        """Get fixtures/matches."""
        params = {}
        if id is not None:
            params["id"] = id
        if live is not None:
            params["live"] = live
        if date is not None:
            params["date"] = date
        if league is not None:
            params["league"] = league
        if season is not None:
            params["season"] = season
        if team is not None:
            params["team"] = team
        if last is not None:
            params["last"] = last
        if next is not None:
            params["next"] = next
        if from_date is not None:
            params["from"] = from_date
        if to_date is not None:
            params["to"] = to_date
        if round is not None:
            params["round"] = round
        if status is not None:
            params["status"] = status
            
        return self._make_request("fixtures", params)
    
    def get_players(self, id=None, team=None, league=None, season=None):
        """Get players."""
        params = {}
        if id is not None:
            params["id"] = id
        if team is not None:
            params["team"] = team
        if league is not None:
            params["league"] = league
        if season is not None:
            params["season"] = season
            
        return self._make_request("players", params)
    
    def get_standings(self, league, season, team=None):
        """Get standings."""
        params = {
            "league": league,
            "season": season
        }
        if team is not None:
            params["team"] = team
            
        return self._make_request("standings", params)