import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    // 1. Basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    // 2. Role validation
    if (role === "Doctor" && !specialization) {
      return res
        .status(400)
        .json({ message: "Specialization required for doctors" });
    }

    // 3. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
