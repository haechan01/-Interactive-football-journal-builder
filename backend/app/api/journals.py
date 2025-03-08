from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.api import api_bp
from app.models.journal import Journal
from app.extensions import db

@api_bp.route('/journals', methods=['GET'])
def get_journals():
    """Get all journals."""
    # In a real app, filter by current user ID
    journals = Journal.query.all()
    return jsonify([
        {
            'id': journal.id,
            'title': journal.title,
            'content': journal.content,
            'created_at': journal.created_at.isoformat(),
            'updated_at': journal.updated_at.isoformat()
        }
        for journal in journals
    ])

@api_bp.route('/journals/<int:id>', methods=['GET'])
def get_journal(id):
    """Get a specific journal."""
    journal = Journal.query.get_or_404(id)
    # In a real app, check if the journal belongs to the current user
    return jsonify({
        'id': journal.id,
        'title': journal.title,
        'content': journal.content,
        'created_at': journal.created_at.isoformat(),
        'updated_at': journal.updated_at.isoformat()
    })

@api_bp.route('/journals', methods=['POST'])
def create_journal():
    """Create a new journal."""
    json_data = request.get_json()
    
    # In a real app, add the current user ID
    # current_user = get_jwt_identity()
    # json_data['user_id'] = current_user.id
    
    # Validate data
    if not json_data.get('title'):
        return jsonify({"error": "Title is required"}), 400
    if not json_data.get('content'):
        return jsonify({"error": "Content is required"}), 400
    
    try:
        journal = Journal(
            title=json_data['title'],
            content=json_data['content']
        )
        db.session.add(journal)
        db.session.commit()
        return jsonify({
            'id': journal.id,
            'title': journal.title,
            'content': journal.content,
            'created_at': journal.created_at.isoformat(),
            'updated_at': journal.updated_at.isoformat()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@api_bp.route('/journals/<int:id>', methods=['PUT'])
def update_journal(id):
    """Update a journal."""
    journal = Journal.query.get_or_404(id)
    
    # In a real app, check if the journal belongs to the current user
    
    json_data = request.get_json()
    
    # Update fields if provided
    if 'title' in json_data:
        journal.title = json_data['title']
    if 'content' in json_data:
        journal.content = json_data['content']
    
    try:
        db.session.commit()
        return jsonify({
            'id': journal.id,
            'title': journal.title,
            'content': journal.content,
            'created_at': journal.created_at.isoformat(),
            'updated_at': journal.updated_at.isoformat()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
    

@api_bp.route('/journals/<int:id>', methods=['DELETE'])
def delete_journal(id):
    """Delete a journal."""
    journal = Journal.query.get_or_404(id)
    
    # In a real app, check if the journal belongs to the current user
    
    try:
        db.session.delete(journal)
        db.session.commit()
        return jsonify({"message": "Journal deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
