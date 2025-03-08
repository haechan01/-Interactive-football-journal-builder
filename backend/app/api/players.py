from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/players', methods=['GET'])
def get_players():
    """Get players with optional filters."""
    football_api = FootballAPIService()
    id = request.args.get('id', type=int)
    team = request.args.get('team', type=int)
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    
    try:
        players = football_api.get_players(id=id, team=team, league=league, season=season)
        return jsonify(players)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    """Get detailed information about a specific player."""
    football_api = FootballAPIService()
    try:
        player = football_api.get_players(id=player_id)
        if not player:
            return jsonify({"error": "Player not found"}), 404
        return jsonify(player[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 500