import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  const styles = {
    dropUl: {
      marginLeft: '-8rem',
    },
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Inventory Predict</a>

        {/* Dropdown Menu Button */}
        <div className="dropdown ms-auto">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen ? 'true' : 'false'}
          >
            <i className="bi bi-caret-down"></i>
            {/* Dropdown arrow symbol */}
          </button>

          {/* Dropdown Menu */}
          <ul
            className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
            style={styles.dropUl}
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/inventory">Inventory</Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/login">
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
