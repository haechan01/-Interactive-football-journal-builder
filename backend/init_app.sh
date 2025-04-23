#!/bin/bash
set -e

# Function to check if PostgreSQL is ready
check_postgres() {
  pg_isready -h db -U postgres
  return $?
}

# Wait for the database to be ready
echo "Waiting for database..."
until check_postgres; do
  echo "Database is unavailable - sleeping"
  sleep 2
done
echo "Database is up - continuing"

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

# Check if there are valid migrations
if [ -d "migrations/versions" ] && [ "$(ls -A migrations/versions)" ]; then
    echo "Found existing migrations, trying to apply them..."
    flask db stamp head
fi

# Create and apply migrations with a fresh start
echo "Creating migration..."
flask db migrate -m "Initial migration"

echo "Applying migrations..."
# Using --sql option to see the SQL being executed
flask db upgrade --sql || {
    echo "Migration failed, attempting to stamp the database and retry..."
    flask db stamp head
    flask db migrate -m "Fresh migration" --sql
    flask db upgrade --sql
}

# Start the Flask application
echo "Starting Flask application..."
flask run --host=0.0.0.0 --port=8000
