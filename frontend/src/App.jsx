import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Signup from "./components/Signup";
import HomePage from "./components/homepage";
import Profile from "./components/profile";
import { UserProvider } from "./components/userContext";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <UserProvider>
      <Router>
        <NavBar onSearch={(query) => setSearchQuery(query)} />
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};