from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/standings', methods=['GET'])
def get_standings():
    """Get standings for a league or team."""
    football_api = FootballAPIService()
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    team = request.args.get('team', type=int)
    
    if not season:
        return jsonify({"error": "Season parameter is required"}), 400
    
    try:
        standings = football_api.get_standings(
            league_id=league,
            season=season,
            team_id=team
        )
        return jsonify(standings)
    except Exception as e:
        return jsonify({"error": str(e)}), 500