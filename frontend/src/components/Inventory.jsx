import React, { useState, useEffect } from 'react';
import Header from './Header';

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchInventoryData = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/inventory?page=${page}&search_query=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        setInventoryData(data.inventory);
        setTotalCount(data.total_count);
        setCurrentPage(data.page);
      } else {
        console.error('Error fetching data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData(1);
  }, [searchQuery]);

  const handleNextPage = () => {
    if (currentPage * 100 < totalCount) {
      fetchInventoryData(currentPage + 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5 pt-5 d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="mb-4 w-100 d-flex flex-column align-items-center">
          <div className="d-flex justify-content-center w-75">
            <input 
              type="text" 
              className="form-control me-2 rounded-pill shadow-sm border-light"
              placeholder="Search by Part No or Dealer Code..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ maxWidth: '350px' }}
            />
            <button className="btn btn-primary rounded-pill ms-3 px-4 shadow-sm">
              Search
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}

        <div className="w-75 mt-4">
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-primary">
              <tr>
                <th scope="col">Dealer Code</th>
                <th scope="col">Part No</th>
                <th scope="col">Predicted Today</th>
                <th scope="col">Predicted Tomorrow</th>
                <th scope="col">Predicted Weekly</th>
                <th scope="col">Predicted Monthly</th>
                <th scope="col">Prediction Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(item => (
                <tr key={`${item.dlr_cd}-${item.part_no}`}>
                  <td>{item.dlr_cd}</td>
                  <td>{item.part_no}</td>
                  <td>{item.predicted_today}</td>
                  <td>{item.predicted_tomorrow}</td>
                  <td>{item.predicted_weekly}</td>
                  <td>{item.predicted_monthly}</td>
                  <td>{item.prediction_date}</td>
                </tr>
              ))}
              {inventoryData.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && currentPage * 100 < totalCount && (
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleNextPage}>Next 100</button>
          </div>
        )}
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2025 Inventory Predict. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Inventory;
