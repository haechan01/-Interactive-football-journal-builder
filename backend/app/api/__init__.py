from flask import Blueprint

api_bp = Blueprint('api', __name__)

# Import routes to register them with the blueprint
from app.api import teams, leagues, matches, fixtures, players, standings, status, countries, journals, timezones, utils, venues