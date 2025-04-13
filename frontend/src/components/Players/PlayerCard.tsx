interface PlayerCardProps {
    id: number;
    name: string;
    age: number;
    nationality: string;
    photo: string;
    team?: {
      name: string;
      logo: string;
    };
  }
  
  const PlayerCard: React.FC<PlayerCardProps> = ({ id, name, age, nationality, photo, team }) => {
    return (
      <div className="player-card">
        <img src={photo} alt={name} className="player-photo" />
        <div className="player-info">
          <h3>{name}</h3>
          <p>Age: {age}</p>
          <p>Nationality: {nationality}</p>
          {team && (
            <div className="player-team">
              <img src={team.logo} alt={team.name} className="team-logo" />
              <span>{team.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default PlayerCard;