from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/teams', methods=['GET'])
def get_teams():
    """Get a list of teams with various filters."""
    football_api = FootballAPIService()
    id = request.args.get('id', type=int)
    name = request.args.get('name')
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    country = request.args.get('country')
    code = request.args.get('code')
    venue = request.args.get('venue', type=int)
    search = request.args.get('search')
    
    try:
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
        return jsonify(teams)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/teams/<int:team_id>', methods=['GET'])
def get_team(team_id):
    """Get detailed information about a specific team."""
    football_api = FootballAPIService()
    try:
        team = football_api.get_team_details(team_id)
        return jsonify(team)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/teams/<int:team_id>/statistics', methods=['GET'])
def get_team_statistics(team_id):
    """Get statistics for a team in a specific league and season."""
    football_api = FootballAPIService()
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    date = request.args.get('date')
    
    if not league or not season:
        return jsonify({"error": "League and season parameters are required"}), 400
    
    try:
        statistics = football_api.get_team_statistics(team_id, league, season, date)
        return jsonify(statistics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/teams/<int:team_id>/seasons', methods=['GET'])
def get_team_seasons(team_id):
    """Get the list of seasons available for a team."""
    football_api = FootballAPIService()
    try:
        seasons = football_api.get_team_seasons(team_id)
        return jsonify(seasons)
    except Exception as e:
        return jsonify({"error": str(e)}), 500