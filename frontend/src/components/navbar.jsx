import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./userContext";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const { userData, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav>
      <div className="navbar">
        <div className="logodiv">
          <div className="logos" onClick={() => navigate("/")}>            
            <img src="logo.png" alt="" />
          </div>
          <div className="category">
            <img className="catsym" src="category.png" alt="" />
            <h4>Category</h4>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <img src="search.png" alt="" />
        </div>
        <div className="cartes">
          {userData ? (
            <div className="account-menu">
              <button
                className="account-btn"
                onClick={toggleDropdown}
              >
                My Account
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li onClick={() => navigate("/orders")}>Orders</li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="linear"></div>
    </nav>
  );
};

export default Navbar;
