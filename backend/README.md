# Football Data App - Flask Backend

Backend API for the Football Data Visualization and Journal Application.

## Features

- Integration with API-Football
- User authentication with JWT
- Football data visualization endpoints
- Journal creation and management

## Setup

1. Clone the repository
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: 
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in your details
6. Initialize the database:
   - `flask db init`
   - `flask db migrate -m "Initial migration"`
   - `flask db upgrade`
7. Run the application:
   - Development: `flask run --port=8000`
   - Production: `gunicorn wsgi:app`

## API Documentation

### Authentication
- POST /auth/login - Login and get JWT token
- GET /auth/profile - Get user profile information

### Teams
- GET /api/teams - Get list of teams
- GET /api/teams/<id> - Get team details

### Journals
- GET /api/journals - Get all journals
- GET /api/journals/<id> - Get a specific journal
- POST /api/journals - Create a new journal
- PUT /api/journals/<id> - Update a journal
- DELETE /api/journals/<id> - Delete a journal
