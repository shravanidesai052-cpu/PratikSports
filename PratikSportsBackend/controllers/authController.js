// Update user profile by mobile
export const updateUserProfile = async (req, res) => {
  const { mobile } = req.params;
  const { username, email, address, mobile: newMobile } = req.body;
  // If mobile is being changed, update it as well
  const updateFields = { username, email, address };
  if (newMobile && newMobile !== mobile) {
    updateFields.mobile = newMobile;
  }
  const user = await User.findOneAndUpdate(
    { mobile },
    updateFields,
    { new: true, fields: "-password" }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
// Get user by mobile (no password)
export const getUserByMobile = async (req, res) => {
  const { mobile } = req.params;
  const user = await User.findOne({ mobile }, "-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, mobile, password: hash });
  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json("Wrong password");
  const token = jwt.sign({ id: user._id }, "pratik_secret");
  res.json({ token, user });
};

export const resetPassword = async (req, res) => {
  try {
    const { mobile, newPassword } = req.body;

    // Find user by mobile
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hash = await bcrypt.hash(newPassword, 10);

    // Update user password
    const updatedUser = await User.findOneAndUpdate(
      { mobile },
      { password: hash },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "Failed to reset password" });
    }

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};