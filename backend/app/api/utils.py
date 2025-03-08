from flask import jsonify
from app.api import api_bp
from app.services.football_api import FootballAPIService
from datetime import datetime

@api_bp.route('/today-matches', methods=['GET'])
def get_today_matches():
    """Get all matches for today."""
    from flask import request
    football_api = FootballAPIService()
    timezone = request.args.get('timezone')
    
    try:
        matches = football_api.get_today_matches(timezone)
        return jsonify(matches)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/teams/<int:team_id>/upcoming', methods=['GET'])
def get_upcoming_matches(team_id):
    """Get upcoming matches for a team."""
    from flask import request
    football_api = FootballAPIService()
    next = request.args.get