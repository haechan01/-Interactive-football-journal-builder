from flask import jsonify
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/timezones', methods=['GET'])
def get_timezones():
    """Get the list of available timezones."""
    football_api = FootballAPIService()
    try:
        timezones = football_api.get_timezones()
        return jsonify(timezones)
    except Exception as e:
        return jsonify({"error": str(e)}), 500