from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/countries', methods=['GET'])
def get_countries():
    """Get the list of available countries for the leagues endpoint."""
    football_api = FootballAPIService()
    name = request.args.get('name')
    code = request.args.get('code')
    search = request.args.get('search')
        
    try:
        countries = football_api.get_countries(name=name, code=code, search=search)
        return jsonify(countries)
    except Exception as e:
        return jsonify({"error": str(e)}), 500