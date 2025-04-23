# Interactive Football Journal Builder

A web application for creating and managing football journals, built with a Flask backend, PostgreSQL database, and a modern frontend.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/interactive-football-journal-builder.git
cd interactive-football-journal-builder
```

### 2. Environment Setup

Create a `.env` file in the project root with the following variables:

```
SECRET_KEY=your_secret_key_here
API_FOOTBALL_KEY=your_api_football_key_here
```

You can obtain an API key from [API-Football](https://www.api-football.com/).

### 3. Start the Application

Build and start the containers:

```bash
docker-compose up -d
```

This will start three containers:
- PostgreSQL database (port 5432)
- Flask backend (port 8000)
- Frontend (port 5173)

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

## Development

### Backend

The backend uses Flask with SQLAlchemy, Flask-Migrate, and other extensions. Database migrations are automatically handled during container startup.

### Frontend

The frontend is built with React and TypeScript, providing a responsive and interactive user experience:

- **Tech Stack**: React, TypeScript, React Router, and custom CSS for styling
- **Routing**: Uses React Router for navigation between different sections
- **Main Pages**:
  - **Home**: Dashboard and entry point to the application
  - **Teams**: View and explore football teams
  - **Players**: Browse and search for football players with filtering options
  - **Games**: Access match information and results

#### Player Features
The Players page offers robust functionality for exploring football talent:
- Advanced filtering by league, season, country, and player name
- Real-time API integration with the backend
- Responsive grid layout for player cards
- Error handling and loading states for improved user experience
- Client-side filtering for quick searches

#### Component Structure
The application follows a modular component structure:
- Layout components for consistent UI across pages
- Specialized components like PlayerCard and PlayerFilter
- UI components including loaders and skeleton placeholders for loading states

### Database

PostgreSQL is used as the database. The schema is managed through Flask-Migrate.

## Troubleshooting

### Migration Issues

If you encounter database migration issues, you can reset the database:

```bash
docker-compose down
docker volume rm interactive-football-journal-builder_postgres_data
docker-compose up -d
```

### Container Logs

View logs for specific containers:

```bash
# For all containers
docker-compose logs

# For specific container
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## License

[MIT License](LICENSE) 