#!/bin/bash
set -e

# Wait for the database to be ready
echo "Waiting for database..."
sleep 5

# Navigate to the app directory
cd /app

# Initialize the database
echo "Checking migrations..."
if [ ! -d "migrations" ] || [ ! -f "migrations/env.py" ]; then
    echo "Initializing migrations..."
    # Remove any partial migrations directory
    rm -rf migrations
    # Initialize flask-migrate
    flask db init
    # Ensure versions directory exists
    mkdir -p migrations/versions
fi

# Create and apply migrations
echo "Creating migration..."
flask db migrate -m "Initial migration"

echo "Applying migrations..."
flask db upgrade

# Start the Flask application
echo "Starting Flask application..."
flask run --host=0.0.0.0 --port=8000
