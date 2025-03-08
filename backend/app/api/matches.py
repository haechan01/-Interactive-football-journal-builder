from flask import jsonify, request
from app.api import api_bp
from app.services.football_api import FootballAPIService

@api_bp.route('/fixtures', methods=['GET'])
def get_fixtures():
    """Get fixtures/matches with various filters."""
    football_api = FootballAPIService()
    id = request.args.get('id', type=int)
    ids = request.args.get('ids')
    live = request.args.get('live')
    date = request.args.get('date')
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    team = request.args.get('team', type=int)
    last = request.args.get('last', type=int)
    next = request.args.get('next', type=int)
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    round = request.args.get('round')
    status = request.args.get('status')
    venue = request.args.get('venue', type=int)
    timezone = request.args.get('timezone')
    
    try:
        fixtures = football_api.get_fixtures(
            id=id,
            ids=ids,
            live=live,
            date=date,
            league=league,
            season=season,
            team=team,
            last=last,
            next=next,
            from_date=from_date,
            to_date=to_date,
            round=round,
            status=status,
            venue=venue,
            timezone=timezone
        )
        return jsonify(fixtures)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/live', methods=['GET'])
def get_live_fixtures():
    """Get all live fixtures/matches."""
    football_api = FootballAPIService()
    league_ids = request.args.get('leagues')
    
    try:
        live_fixtures = football_api.get_live_matches(league_ids)
        return jsonify(live_fixtures)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/<int:fixture_id>', methods=['GET'])
def get_fixture(fixture_id):
    """Get a specific fixture/match by ID."""
    football_api = FootballAPIService()
    timezone = request.args.get('timezone')
    
    try:
        fixture = football_api.get_fixtures(id=fixture_id, timezone=timezone)
        if not fixture:
            return jsonify({"error": "Fixture not found"}), 404
        return jsonify(fixture[0])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/rounds', methods=['GET'])
def get_fixture_rounds():
    """Get rounds for a league or cup."""
    football_api = FootballAPIService()
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    current = request.args.get('current')
    dates = request.args.get('dates')
    timezone = request.args.get('timezone')
    
    if not league or not season:
        return jsonify({"error": "League and season parameters are required"}), 400
    
    try:
        rounds = football_api.get_fixture_rounds(
            league_id=league,
            season=season,
            current=current,
            dates=dates,
            timezone=timezone
        )
        return jsonify(rounds)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/headtohead', methods=['GET'])
def get_head_to_head():
    """Get head-to-head results between two teams."""
    football_api = FootballAPIService()
    
    h2h = request.args.get('h2h')
    if not h2h or '-' not in h2h:
        return jsonify({"error": "Valid h2h parameter is required (format: team1-team2)"}), 400
    
    team_ids = h2h.split('-')
    if len(team_ids) != 2:
        return jsonify({"error": "Invalid h2h format. Expected: team1-team2"}), 400
    
    try:
        team1_id = int(team_ids[0])
        team2_id = int(team_ids[1])
    except ValueError:
        return jsonify({"error": "Team IDs must be integers"}), 400
    
    date = request.args.get('date')
    league = request.args.get('league', type=int)
    season = request.args.get('season', type=int)
    last = request.args.get('last', type=int)
    next = request.args.get('next', type=int)
    from_date = request.args.get('from')
    to_date = request.args.get('to')
    status = request.args.get('status')
    venue = request.args.get('venue', type=int)
    timezone = request.args.get('timezone')
    
    try:
        h2h_fixtures = football_api.get_head_to_head(
            team1_id=team1_id,
            team2_id=team2_id,
            date=date,
            league=league,
            season=season,
            last=last,
            next=next,
            from_date=from_date,
            to_date=to_date,
            status=status,
            venue=venue,
            timezone=timezone
        )
        return jsonify(h2h_fixtures)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/<int:fixture_id>/statistics', methods=['GET'])
def get_fixture_statistics(fixture_id):
    """Get statistics for a fixture."""
    football_api = FootballAPIService()
    team = request.args.get('team', type=int)
    type = request.args.get('type')
    half = request.args.get('half')
    
    try:
        statistics = football_api.get_fixture_statistics(
            fixture_id=fixture_id,
            team=team,
            type=type,
            half=half
        )
        return jsonify(statistics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/<int:fixture_id>/events', methods=['GET'])
def get_fixture_events(fixture_id):
    """Get events for a fixture."""
    football_api = FootballAPIService()
    team = request.args.get('team', type=int)
    player = request.args.get('player', type=int)
    type = request.args.get('type')
    
    try:
        events = football_api.get_fixture_events(
            fixture_id=fixture_id,
            team=team,
            player=player,
            type=type
        )
        return jsonify(events)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/<int:fixture_id>/lineups', methods=['GET'])
def get_fixture_lineups(fixture_id):
    """Get lineups for a fixture."""
    football_api = FootballAPIService()
    team = request.args.get('team', type=int)
    player = request.args.get('player', type=int)
    type = request.args.get('type')
    
    try:
        lineups = football_api.get_fixture_lineups(
            fixture_id=fixture_id,
            team=team,
            player=player,
            type=type
        )
        return jsonify(lineups)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api_bp.route('/fixtures/<int:fixture_id>/players', methods=['GET'])
def get_fixture_players(fixture_id):
    """Get player statistics for a fixture."""
    football_api = FootballAPIService()
    team = request.args.get('team', type=int)
    
    try:
        player_stats = football_api.get_fixture_players_statistics(
            fixture_id=fixture_id,
            team=team
        )
        return jsonify(player_stats)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
