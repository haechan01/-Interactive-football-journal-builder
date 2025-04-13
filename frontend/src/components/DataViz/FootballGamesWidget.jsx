
import React, { useEffect } from 'react';

const FootballGamesWidget = ({ 
  apiKey, 
  host = "v3.football.api-sports.io",
  date = "", 
  league = "", 
  season = "", 
  theme = "",
  refresh = "15",
  showToolbar = true,
  showErrors = false,
  showLogos = true
}) => {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.type = "module";
    script.async = true;
    
    // Add script after the component mounts
    document.body.appendChild(script);
    
    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2 className="section-title">Football Matches</h2>
      <div 
        id="wg-api-football-games"
        data-host={host}
        data-key={apiKey}
        data-date={date}
        data-league={league}
        data-season={season}
        data-theme={theme}
        data-refresh={refresh}
        data-show-toolbar={showToolbar.toString()}
        data-show-errors={showErrors.toString()}
        data-show-logos={showLogos.toString()}
        data-modal-game="true"
        data-modal-standings="true"
        data-modal-show-logos="true">
      </div>
    </div>
  );
};

export default FootballGamesWidget;