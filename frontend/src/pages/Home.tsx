import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Football Data & Journal App
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Access comprehensive football statistics and create insightful journals about your favorite teams, matches, and players.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/dashboard"
                className="btn-primary text-lg px-6 py-3"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="card text-center">
                <div className="text-primary-600 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-5h10v2H7v-2zm0-4h10v2H7v-2zm0-4h5v2H7V7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Rich Data Visualization</h3>
                <p className="mt-2 text-gray-500">
                  Explore comprehensive statistics with intuitive charts and graphs.
                </p>
              </div>

              <div className="card text-center">
                <div className="text-primary-600 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-2-2H7v-2h10v2zm0-4H7v-2h10v2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Journal Creation</h3>
                <p className="mt-2 text-gray-500">
                  Write and publish your own analyses and insights on football events.
                </p>
              </div>

              <div className="card text-center">
                <div className="text-primary-600 mb-4">
                  <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Player Analysis</h3>
                <p className="mt-2 text-gray-500">
                  Track player performance with detailed statistics and historical data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
