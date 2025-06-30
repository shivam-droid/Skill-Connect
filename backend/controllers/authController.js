import jwt from "jsonwebtoken";
import AuthService from "../services/auth-service.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const authService = new AuthService();

export const registerUser = async (req, res) => {

  try {
    const user = await authService.registerUser(req.body);

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      selectedServiceType: user.selectedServiceType,
      token,
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a new user",
      err: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      selectedServiceType: user.selectedServiceType,
      token,
    });
  } catch (error) {
    console.log("Something went wrong in the controller layer");
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to fetch users",
      err: error.message,
    });
  }
};
