from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/leagues', methods=['GET'])
def get_leagues():
    """Get a list of leagues with various filters."""
    football_api = FootballAPIService()
    id = request.args.get('id', type=int)
    name = request.args.get('name')
    country = request.args.get('country')
    code = request.args.get('code')
    season = request.args.get('season', type=int)
    team = request.args.get('team', type=int)
    type = request.args.get('type')
    current = request.args.get('current')
    search = request.args.get('search')
    last = request.args.get('last', type=int)
    
    try:
        leagues = football_api.get_leagues(
            id=id, 
            name=name, 
            country=country, 
            code=code, 
            season=season, 
            team=team, 
            type=type, 
            current=current, 
            search=search, 
            last=last
        )
        return jsonify(leagues)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/leagues/seasons', methods=['GET'])
def get_seasons():
    """Get the list of available seasons."""
    football_api = FootballAPIService()
    try:
        seasons = football_api.get_seasons()
        return jsonify(seasons)
    except Exception as e:
        return jsonify({"error": str(e)}), 500