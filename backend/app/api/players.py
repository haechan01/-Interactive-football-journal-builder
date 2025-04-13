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

@api_bp.route('/players/league/<int:league_id>', methods=['GET'])
def get_all_players_by_league(league_id):
    """Get all players from a specific league with pagination handling."""
    football_api = FootballAPIService()
    season = request.args.get('season', type=int)
    
    if not season:
        return jsonify({"error": "Season parameter is required"}), 400
    
    try:
        # Start with page 1
        page = 1
        all_players = []
        
        # Get first page to determine total pages
        players_data = football_api.get_players(league=league_id, season=season, page=page)
        
        # Check if we have pagination info in the response
        if not players_data or 'paging' not in players_data:
            return jsonify({"error": "Unable to retrieve player data"}), 500
            
        all_players.extend(players_data.get('response', []))
        
        # Get total pages from the first response
        total_pages = players_data['paging']['total']
        current_page = players_data['paging']['current']
        
        # Fetch remaining pages
        while current_page < total_pages:
            page += 1
            players_data = football_api.get_players(league=league_id, season=season, page=page)
            
            if not players_data or 'response' not in players_data:
                break
                
            all_players.extend(players_data.get('response', []))
            current_page = players_data['paging']['current']
        
        return jsonify({"total_players": len(all_players), "players": all_players})
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