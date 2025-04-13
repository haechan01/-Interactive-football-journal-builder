export const Spinner = () => {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  };
  
  export const SkeletonCard = () => {
    return (
      <div className="card" style={{ opacity: 0.7 }}>
        <div className="card-content">
          <div className="team-info">
            <div style={{ width: '4rem', height: '4rem', backgroundColor: '#e5e7eb', borderRadius: '0.375rem' }}></div>
            <div style={{ marginLeft: '1rem' }}>
              <div style={{ width: '8rem', height: '1.25rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem', marginBottom: '0.5rem' }}></div>
              <div style={{ width: '6rem', height: '1rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem' }}></div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div style={{ width: '5rem', height: '1rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem', marginLeft: 'auto' }}></div>
        </div>
      </div>
    );
  };