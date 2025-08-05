import React from 'react';
import Header from './Header'; // Import Header component

const Home = () => {
  return (
    <div>
      <Header /> {/* Use the Header here */}

      {/* Main Content below the navbar */}
      <div className="container d-flex flex-column justify-content-center align-items-center text-center mt-5 pt-5 flex-grow-1 min-vh-100">
        <h2 className="display-3 fw-bold text-primary">Inventory Predict</h2>
        <p className="mt-3 lead text-muted">Center Of Excellence</p>
      </div>

      {/* Optional Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 Inventory Predict. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
  