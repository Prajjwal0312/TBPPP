import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    location: "",
    gender: "",
    mobile: "",
    profilePic: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          ...response.data,
          profilePic: response.data.profilePic || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
  
      const updatedData = {
        ...formData,
        profilePic: selectedAvatar || formData.profilePic?.split("/").pop() || "avatar1.png",
      };
  
      await axios.put("http://localhost:5000/api/profile", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  };
  

  const handleAvatarSelect = (avatarName) => {
    setSelectedAvatar(avatarName);
    setPreview(`/avatars/${avatarName}`);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="avatar-container">
          <div className="avatar">
            <img
              src={preview || formData.profilePic || "/avatars/default-avatar.png"}
              alt="Profile Avatar"
              className="avatar-img"
            />
          </div>

          <div className="avatar-options">
            <h3>Select Avatar</h3>
            <div className="avatar-options-grid">
              <img
                src="/avatars/avatar1.png"
                alt="Avatar 1"
                className="avatar-option"
                onClick={() => handleAvatarSelect("avatar1.png")}
              />
              <img
                src="/avatars/avatar2.png"
                alt="Avatar 2"
                className="avatar-option"
                onClick={() => handleAvatarSelect("avatar2.png")}
              />
              <img
                src="/avatars/avatar3.png"
                alt="Avatar 3"
                className="avatar-option"
                onClick={() => handleAvatarSelect("avatar3.png")}
              />
            </div>
          </div>
        </div>

        <div className="form-fields">
          <label>
            Username:
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label>
            Full Name:
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
          </label>
          <label>
            Mobile:
            <input
              type="text"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </label>

          <div className="btn">
            <button type="submit">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;