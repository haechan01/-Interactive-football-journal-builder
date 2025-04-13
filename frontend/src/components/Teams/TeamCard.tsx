import { Link } from 'react-router-dom';

interface TeamCardProps {
  id: number;
  name: string;
  country: string;
  logo: string;
  founded?: number;
}

const TeamCard = ({ id, name, country, logo, founded }: TeamCardProps) => {
  return (
    <Link to={`/teams/${id}`} className="card team-card">
      <div className="card-content">
        <div className="team-info">
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="team-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128?text=No+Image';
            }}
          />
          <div>
            <h3 className="team-name">{name}</h3>
            <p className="team-country">{country}</p>
            {founded && (
              <p className="team-founded">Founded: {founded}</p>
            )}
          </div>
        </div>
      </div>
      <div className="card-footer">
        <p className="view-link">
          View Team
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </p>
      </div>
    </Link>
  );
};

export default TeamCard;