import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./userContext";

const Navbar = ({ onSearch, onCategorySelect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const { userData, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories = [
    { label: "All Items", value: "" },
    { label: "🥕 Vegetables", value: "Vegetables" },
    { label: "🍎 Fruits", value: "Fruits" },
    { label: "🧃 Milk & Juice", value: "Milk & Juice" },
    { label: "🍰 Bakery", value: "Bakery" },
    { label: "🪥 Personal Care", value: "Personal Care" },
    { label: "🌽 Grains", value: "Grains" },
    { label: "🥚 Chicken and Egg", value: "Chicken and Egg" },
  ];
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query, "search");
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category === "All Items" ? "" : category);
    setCategoryDropdownOpen(false);
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
            <img src="logo.png" alt="Logo" />
          </div>
          <div className="category-wrapper">
            <div
              className="category"
              onClick={() => setCategoryDropdownOpen((prev) => !prev)}
            >
              <img className="catsym" src="category.png" alt="Category Icon" />
              <h4>Category</h4>
            </div>
            {categoryDropdownOpen && (
              <div className="category-dropdown">
                <ul>
                  {categories.map((cat) => (
                    <li key={cat.label} onClick={() => handleCategorySelect(cat.value)}>
                      {cat.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchInput}
            onChange={handleSearchChange}
          />
          <img src="search.png" alt="Search" />
        </div>

        <div className="cartes">
          <div className="cart-button" onClick={() => navigate("/cart")}>
            <img src="/cart.png" alt="Cart" className="cart-icon" />
          </div>
          {userData ? (
            <div className="profile-dropdown">
              <img
                src={userData.profilePic || "/avatars/default-avatar.png"}
                alt="Profile"
                className="profile-avatar"
                onClick={toggleDropdown}
              />
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
            <button className="login-btn" onClick={() => navigate("/login")}>
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