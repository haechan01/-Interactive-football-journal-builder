# app/api/teams.py
from flask import jsonify, request, current_app
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/teams', methods=['GET'])
def get_teams():
    """Get a list of teams with various filters."""
    try:
        football_api = FootballAPIService()
        
        id = request.args.get('id', type=int)
        name = request.args.get('name')
        league = request.args.get('league', type=int)
        season = request.args.get('season', type=int)
        country = request.args.get('country')
        code = request.args.get('code')
        venue = request.args.get('venue', type=int)
        search = request.args.get('search')
        
        # Log all the parameters
        current_app.logger.info(f"Fetching teams with params: id={id}, name={name}, league={league}, season={season}, country={country}, code={code}, venue={venue}, search={search}")
        
        if league is None and season is None and id is None and search is None and country is None:
            return jsonify({"message": "Please provide at least one parameter (league, season, id, search, or country)"}), 400
        
        teams = football_api.get_teams(
            id=id, 
            name=name, 
            league=league, 
            season=season, 
            country=country, 
            code=code, 
            venue=venue, 
            search=search
        )
        
        current_app.logger.info(f"Found {len(teams)} teams")
        return jsonify(teams)
    except ValueError as e:
        current_app.logger.error(f"Error fetching teams: {str(e)}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        current_app.logger.error(f"Unexpected error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500
    
@api_bp.route('/teams/league/<int:league_id>', methods=['GET'])
def get_teams_by_league(league_id):
    """Get all teams from a specific league."""
    football_api = FootballAPIService()
    season = request.args.get('season', type=int)
    
    if not season:
        return jsonify({"error": "Season parameter is required"}), 400
    
    try:
        teams = football_api.get_teams(league=league_id, season=season)
        return jsonify(teams)
    except Exception as e:
        return jsonify({"error": str(e)}), 500