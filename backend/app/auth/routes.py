from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

# Mock user database (replace with actual database in production)
users = {
    'user@example.com': {
        'password': 'password123',  # In production, store hashed passwords
        'name': 'Example User'
    }
}

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400
    
    user = users.get(email, None)
    if not user or user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401
    
    # Create access token
    access_token = create_access_token(
        identity=email,
        additional_claims={"name": user['name']}
    )
    
    return jsonify(access_token=access_token), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    """Get user profile information"""
    current_user = get_jwt_identity()
    user = users.get(current_user, None)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(
        email=current_user,
        name=user['name']
    ), 200
