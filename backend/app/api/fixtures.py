
from flask import jsonify, request, current_app
from app.api import api_bp
from app.services.football_api import FootballAPIService

# app/api/fixtures.py
from flask import jsonify, request, current_app
from app.api import api_bp
from app.services.football_api import FootballAPIService
import datetime

# app/api/fixtures.py
from flask import jsonify, request, current_app
import datetime

@api_bp.route('/fixtures/search', methods=['GET'])
def search_fixtures():
    """Search fixtures/games with filters."""
    try:
        football_api = FootballAPIService()
        
        # Get search parameters from request
        date = request.args.get('date')
        league = request.args.get('league', type=int)
        season = request.args.get('season', type=int)
        team = request.args.get('team', type=int)
        from_date = request.args.get('from')
        to_date = request.args.get('to')
        
        # Validate required parameters
        if not season or season < 2021 or season > 2023:
            return jsonify({"error": "Season must be between 2021 and 2023"}), 400
            
        if not league:
            return jsonify({"error": "League parameter is required"}), 400
        
        # Call football API service
        fixtures = football_api.get_fixtures(
            date=date,
            league=league,
            season=season,
            team=team,
            from_date=from_date,
            to_date=to_date
        )
        
        return jsonify(fixtures)
    except Exception as e:
        current_app.logger.error(f"Error in search_fixtures: {str(e)}")
        return jsonify({"error": str(e)}), 500

@api_bp.route('/leagues/list', methods=['GET'])
def list_leagues():
    """Get a list of leagues for the dropdown menu."""
    try:
        football_api = FootballAPIService()
        
        # Get only popular leagues with current=true to get active leagues
        leagues = football_api.get_leagues(current='true')
        
        # Simplify the response to just what we need for the dropdown
        simplified_leagues = []
        for league in leagues:
            if 'league' in league:
                simplified_leagues.append({
                    'id': league['league']['id'],
                    'name': league['league']['name'],
                    'country': league.get('country', {}).get('name', ''),
                    'logo': league['league'].get('logo', '')
                })
        
        return jsonify(simplified_leagues)
    except Exception as e:
        current_app.logger.error(f"Error fetching leagues: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@api_bp.route('/fixtures/test', methods=['GET'])
def test_fixtures():
    """A simple test endpoint that always returns valid JSON."""
    return jsonify({
        "message": "API is working",
        "test_data": [
            {
                "fixture": {
                    "id": 123,
                    "date": "2025-04-15T15:00:00+00:00",
                    "status": {"short": "NS", "long": "Not Started"}
                },
                "league": {
                    "id": 39,
                    "name": "Premier League",
                    "country": "England",
                    "logo": "https://media.api-sports.io/football/leagues/39.png"
                },
                "teams": {
                    "home": {"id": 33, "name": "Manchester United", "logo": "https://media.api-sports.io/football/teams/33.png"},
                    "away": {"id": 40, "name": "Liverpool", "logo": "https://media.api-sports.io/football/teams/40.png"}
                },
                "goals": {"home": 1, "away": 1}
            }
        ]
    })