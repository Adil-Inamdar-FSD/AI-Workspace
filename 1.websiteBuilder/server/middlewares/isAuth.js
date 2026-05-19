import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuth = async (req, res, next) => {
  try {
    console.log("TOKEN:", req.cookies.token);
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    console.log("Cookies:", req.cookies);

    req.user = user;

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default isAuth;
