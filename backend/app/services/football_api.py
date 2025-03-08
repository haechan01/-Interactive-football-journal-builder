import requests
from flask import current_app
from datetime import datetime

class FootballAPIService:
    """
    Service for interacting with the API-Football API.
    Supports both API-SPORTS and RapidAPI providers.
    """
    def __init__(self):
        pass
    
    def _get_headers(self):
        """Get API headers with the current app context"""
        api_key = current_app.config['API_FOOTBALL_KEY']
        
        # Using API-SPORTS URL format based on the documentation
        if current_app.config.get('API_FOOTBALL_PROVIDER') == 'RAPIDAPI':
            return {
                "x-rapidapi-key": api_key,
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
            }
        else:
            # Default to API-SPORTS
            return {
                "x-apisports-key": api_key
            }
    
    def _get_base_url(self):
        """Get the base URL based on the provider"""
        if current_app.config.get('API_FOOTBALL_PROVIDER') == 'RAPIDAPI':
            return "https://api-football-v1.p.rapidapi.com/v3"
        else:
            # Default to API-SPORTS
            return "https://v3.football.api-sports.io"
    
    def _make_request(self, endpoint, params=None):
        """
        Make a request to the API-Football API.
        """
        url = f"{self._get_base_url()}/{endpoint}"
        
        try:
            response = requests.get(url, headers=self._get_headers(), params=params)
            response.raise_for_status()
            
            data = response.json()
            
            # Log remaining requests for monitoring
            if 'x-ratelimit-requests-remaining' in response.headers:
                current_app.logger.info(
                    f"API-FOOTBALL Requests Remaining: {response.headers['x-ratelimit-requests-remaining']}"
                )
            
            return data["response"]
        except requests.exceptions.RequestException as e:
            current_app.logger.error(f"API request error: {str(e)}")
            raise
    
    # API Status
    def get_status(self):
        """
        Get API status and account information.
        """
        return self._make_request("status")
    
    # Timezone
    def get_timezones(self):
        """
        Get the list of available timezones.
        """
        return self._make_request("timezone")
    
    # Countries
    def get_countries(self, name=None, code=None, search=None):
        """
        Get the list of available countries for the leagues endpoint.
        """
        params = {}
        if name:
            params["name"] = name
        if code:
            params["code"] = code
        if search:
            params["search"] = search
            
        return self._make_request("countries", params)
    
    # Leagues
    def get_leagues(self, id=None, name=None, country=None, code=None, season=None, 
                    team=None, type=None, current=None, search=None, last=None):
        """
        Get the list of available leagues and cups.
        """
        params = {}
        if id:
            params["id"] = id
        if name:
            params["name"] = name
        if country:
            params["country"] = country
        if code:
            params["code"] = code
        if season:
            params["season"] = season
        if team:
            params["team"] = team
        if type:
            params["type"] = type
        if current:
            params["current"] = current
        if search:
            params["search"] = search
        if last:
            params["last"] = last
            
        return self._make_request("leagues", params)
    
    def get_seasons(self):
        """
        Get the list of available seasons.
        """
        return self._make_request("leagues/seasons")
    
    # Teams
    def get_teams(self, id=None, name=None, league=None, season=None,
                 country=None, code=None, venue=None, search=None):
        """
        Get the list of available teams.
        """
        params = {}
        if id:
            params["id"] = id
        if name:
            params["name"] = name
        if league:
            params["league"] = league
        if season:
            params["season"] = season
        if country:
            params["country"] = country
        if code:
            params["code"] = code
        if venue:
            params["venue"] = venue
        if search:
            params["search"] = search
            
        return self._make_request("teams", params)
    
    def get_team_details(self, team_id):
        """
        Get detailed information about a specific team.
        """
        params = {"id": team_id}
        teams = self._make_request("teams", params)
        if not teams:
            raise ValueError(f"Team with ID {team_id} not found")
        return teams[0]
    
    def get_team_statistics(self, team_id, league_id, season, date=None):
        """
        Get statistics for a team in a specific league and season.
        Optionally filtered by date.
        """
        params = {
            "team": team_id,
            "league": league_id,
            "season": season
        }
        if date:
            params["date"] = date
            
        return self._make_request("teams/statistics", params)
    
    def get_team_seasons(self, team_id):
        """
        Get the list of seasons available for a team.
        """
        params = {"team": team_id}
        return self._make_request("teams/seasons", params)
    
    def get_team_countries(self):
        """
        Get the list of countries available for the teams endpoint.
        """
        return self._make_request("teams/countries")
    
    # Venues
    def get_venues(self, id=None, name=None, city=None, country=None, search=None):
        """
        Get the list of available venues.
        """
        params = {}
        if id:
            params["id"] = id
        if name:
            params["name"] = name
        if city:
            params["city"] = city
        if country:
            params["country"] = country
        if search:
            params["search"] = search
            
        return self._make_request("venues", params)
    
    # Standings
    def get_standings(self, league_id, season, team_id=None):
        """
        Get the standings for a league or a team.
        """
        params = {
            "season": season
        }
        if league_id:
            params["league"] = league_id
        if team_id:
            params["team"] = team_id
            
        return self._make_request("standings", params)
    
    # Fixtures/Rounds
    def get_fixture_rounds(self, league_id, season, current=None, dates=None, timezone=None):
        """
        Get the rounds for a league or a cup.
        """
        params = {
            "league": league_id,
            "season": season
        }
        if current:
            params["current"] = current
        if dates:
            params["dates"] = dates
        if timezone:
            params["timezone"] = timezone
            
        return self._make_request("fixtures/rounds", params)
    
    # Fixtures
    def get_fixtures(self, id=None, ids=None, live=None, date=None, league=None, season=None,
                    team=None, last=None, next=None, from_date=None, to_date=None,
                    round=None, status=None, venue=None, timezone=None):
        """
        Get fixtures with various filters.
        """
        params = {}
        if id:
            params["id"] = id
        if ids:
            params["ids"] = ids
        if live:
            params["live"] = live
        if date:
            params["date"] = date
        if league:
            params["league"] = league
        if season:
            params["season"] = season
        if team:
            params["team"] = team
        if last:
            params["last"] = last
        if next:
            params["next"] = next
        if from_date:
            params["from"] = from_date
        if to_date:
            params["to"] = to_date
        if round:
            params["round"] = round
        if status:
            params["status"] = status
        if venue:
            params["venue"] = venue
        if timezone:
            params["timezone"] = timezone
            
        return self._make_request("fixtures", params)
    
    # Head to Head
    def get_head_to_head(self, team1_id, team2_id, date=None, league=None, season=None,
                        last=None, next=None, from_date=None, to_date=None,
                        status=None, venue=None, timezone=None):
        """
        Get heads to heads between two teams.
        """
        params = {
            "h2h": f"{team1_id}-{team2_id}"
        }
        if date:
            params["date"] = date
        if league:
            params["league"] = league
        if season:
            params["season"] = season
        if last:
            params["last"] = last
        if next:
            params["next"] = next
        if from_date:
            params["from"] = from_date
        if to_date:
            params["to"] = to_date
        if status:
            params["status"] = status
        if venue:
            params["venue"] = venue
        if timezone:
            params["timezone"] = timezone
            
        return self._make_request("fixtures/headtohead", params)
    
    # Fixture Statistics
    def get_fixture_statistics(self, fixture_id, team=None, type=None, half=None):
        """
        Get statistics for a fixture.
        """
        params = {
            "fixture": fixture_id
        }
        if team:
            params["team"] = team
        if type:
            params["type"] = type
        if half:
            params["half"] = half
            
        return self._make_request("fixtures/statistics", params)
    
    # Fixture Events
    def get_fixture_events(self, fixture_id, team=None, player=None, type=None):
        """
        Get events from a fixture.
        """
        params = {
            "fixture": fixture_id
        }
        if team:
            params["team"] = team
        if player:
            params["player"] = player
        if type:
            params["type"] = type
            
        return self._make_request("fixtures/events", params)
    
    # Fixture Lineups
    def get_fixture_lineups(self, fixture_id, team=None, player=None, type=None):
        """
        Get lineups for a fixture.
        """
        params = {
            "fixture": fixture_id
        }
        if team:
            params["team"] = team
        if player:
            params["player"] = player
        if type:
            params["type"] = type
            
        return self._make_request("fixtures/lineups", params)
    
    # Fixture Player Statistics
    def get_fixture_players_statistics(self, fixture_id, team=None):
        """
        Get players statistics from a fixture.
        """
        params = {
            "fixture": fixture_id
        }
        if team:
            params["team"] = team
            
        return self._make_request("fixtures/players", params)
    
    # Live Matches
    def get_live_matches(self, league_ids=None):
        """
        Get all live fixtures/matches.
        """
        params = {
            "live": "all" if not league_ids else league_ids
        }
        return self._make_request("fixtures", params)
    
    # Helper methods for common queries
    def get_today_matches(self, timezone=None):
        """
        Get all fixtures/matches for today.
        """
        today = datetime.now().strftime("%Y-%m-%d")
        params = {
            "date": today
        }
        if timezone:
            params["timezone"] = timezone
            
        return self._make_request("fixtures", params)
    
    def get_upcoming_matches(self, team_id, next=10, timezone=None):
        """
        Get upcoming fixtures/matches for a team.
        """
        params = {
            "team": team_id,
            "next": next
        }
        if timezone:
            params["timezone"] = timezone
            
        return self._make_request("fixtures", params)
    
    def get_current_round_fixtures(self, league_id, season, timezone=None):
        """
        Get fixtures for the current round of a league.
        """
        # First get the current round
        round_params = {
            "league": league_id,
            "season": season,
            "current": "true"
        }
        
        current_round = self._make_request("fixtures/rounds", round_params)
        
        if not current_round:
            return []
        
        # Then get fixtures for this round
        fixture_params = {
            "league": league_id,
            "season": season,
            "round": current_round[0]
        }
        
        if timezone:
            fixture_params["timezone"] = timezone
            
        return self._make_request("fixtures", fixture_params)