import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = (user) => {
    localStorage.setItem("token", user.token);
    setUserData(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <UserContext.Provider value={{ userData, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};