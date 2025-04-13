import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="hero">
        <h1 className="hero-title">Football Data & Journal App</h1>
        <p className="hero-description">
          Access comprehensive football statistics and create insightful journals about your favorite teams, matches, and players.
        </p>
        <Link to="/dashboard" className="hero-button">
          Get Started
        </Link>
      </div>

      <div className="features">
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="feature-title">Rich Data Visualization</h3>
            <p className="feature-description">
              Explore comprehensive statistics with intuitive charts and graphs.
            </p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="feature-title">Journal Creation</h3>
            <p className="feature-description">
              Write and publish your own analyses and insights on football events.
            </p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="feature-title">Player Analysis</h3>
            <p className="feature-description">
              Track player performance with detailed statistics and historical data.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;