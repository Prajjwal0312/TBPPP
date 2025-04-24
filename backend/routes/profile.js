const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    res.status(200).json({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      location: user.location,
      gender: user.gender,
      mobile: user.mobile,
      profilePic: user.profilePic || "avatar1.png",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile data." });
  }
});

router.put("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.fullName) user.fullName = req.body.fullName;
    if (req.body.location) user.location = req.body.location;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.mobile) user.mobile = req.body.mobile;

    if (req.body.profilePic && typeof req.body.profilePic === "string") {
      user.profilePic = req.body.profilePic.startsWith("/avatars/")
        ? req.body.profilePic
        : `/avatars/${req.body.profilePic}`;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

module.exports = router;