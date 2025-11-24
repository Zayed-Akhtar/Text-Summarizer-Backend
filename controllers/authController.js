const { badRequestResponse, errorResponse, successResponse } = require("../helpers/errorResponses");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {    
    const { firstName, lastName, email, password } = req.body;
    
    // 🔹 Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return badRequestResponse(res, "Email already in use");
    }

    // 🔹 Hash password (await inside Promise)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Create user
    const createdUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // 🔹 Generate JWT token
    const token = generateToken(createdUser);

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: createdUser._id,
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, `Server error: ${err.message}`);
  }
};

const login = async (req, res) => {
  try {    
    const { email, password } = req.body;

    // 🔹 Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {      
      return badRequestResponse(res, "Invalid credentials");
    }

    // 🔹 Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return badRequestResponse(res, "Invalid credentials");
    }

    // 🔹 Generate JWT token
    const token = generateToken(user);

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, `Server error: ${err.message}`);
  }
};

const logout = (req, res) => {
  try {
    if (req.cookies && req.cookies.token) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return successResponse(res, "Logged out successfully");
    } else {
      return errorResponse(res, "User must be logged in first");
    }
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// ✅ Export using CommonJS
module.exports = {
  signup,
  login,
  logout,
};
