from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/venues', methods=['GET'])
def get_venues():
    """Get the list of available venues."""
    football_api = FootballAPIService()
    id = request.args.get('id', type=int)
    name = request.args.get('name')
    city = request.args.get('city')
    country = request.args.get('country')
    search = request.args.get('search')
    
    try:
        venues = football_api.get_venues(
            id=id, 
            name=name, 
            city=city, 
            country=country, 
            search=search
        )
        return jsonify(venues)
    except Exception as e:
        return jsonify({"error": str(e)}), 500