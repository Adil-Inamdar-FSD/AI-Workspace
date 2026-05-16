import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Check existing user
    let user = await User.findOne({ email });

    // Create new user if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Check environment
    const isProduction = process.env.NODE_ENV === "production";

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction, // false for localhost
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google auth error",
      error: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.log("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout error",
      error: error.message,
    });
  }
};
