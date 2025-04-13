# app/api/status.py
from flask import jsonify, current_app
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/status', methods=['GET'])
def get_status():
    """Get API status and account information."""
    try:
        # Check if API key is configured
        if not current_app.config.get('API_FOOTBALL_KEY'):
            return jsonify({"error": "API key not configured. Please set API_FOOTBALL_KEY in your configuration."}), 401
            
        football_api = FootballAPIService()
        status = football_api._make_request("status")
        return jsonify(status)
    except Exception as e:
        current_app.logger.error(f"Error fetching API status: {str(e)}")
        return jsonify({"error": str(e)}), 500

@api_bp.route('/test-connection', methods=['GET'])
def test_connection():
    """Test connection to API-Football."""
    try:
        # Check if API key is configured
        if not current_app.config.get('API_FOOTBALL_KEY'):
            return jsonify({
                "status": "error",
                "message": "API key not configured. Please set API_FOOTBALL_KEY in your configuration.",
                "config": {
                    "api_provider": current_app.config.get('API_FOOTBALL_PROVIDER'),
                    "api_key_set": False
                }
            }), 401
        # Try to get leagues to test the API connection
        football_api = FootballAPIService()
        leagues = football_api.get_leagues(current='true')
        
        # If successful, return details about the connection
        return jsonify({
            "status": "success",
            "message": "Successfully connected to API-Football",
            "data": {
                "leagues_found": len(leagues),
                "first_league": leagues[0] if leagues else None
            },
            "config": {
                "api_provider": current_app.config.get('API_FOOTBALL_PROVIDER'),
                "api_key_set": bool(current_app.config.get('API_FOOTBALL_KEY'))
            }
        })
    except Exception as e:
        current_app.logger.error(f"API connection test failed: {str(e)}")
        return jsonify({
            "status": "error",
            "message": f"Failed to connect to API-Football: {str(e)}",
            "config": {
                "api_provider": current_app.config.get('API_FOOTBALL_PROVIDER'),
                "api_key_set": bool(current_app.config.get('API_FOOTBALL_KEY'))
            }
        }), 500