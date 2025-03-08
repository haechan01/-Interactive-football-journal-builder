from flask import jsonify
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/status', methods=['GET'])
def get_status():
    """Get API status and account information."""
    football_api = FootballAPIService()
    try:
        status = football_api.get_status()
        return jsonify(status)
    except Exception as e:
        return jsonify({"error": str(e)}), 500