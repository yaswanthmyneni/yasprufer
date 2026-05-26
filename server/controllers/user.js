import bcrypt from "bcrypt";
import User from "../models/user.js";

/**
 * @method POST
 * @path /user/signup
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  // check if the user exists in database
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists)
    return res.status(409).json({ msg: "User already exists!" });

  //create a new user
  const user = new User({ email, password });
  await user.save();

  const token = user.generateJWT();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(201).json(user);
};

/**
 * @method POST
 * @path /user/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = user.generateJWT();

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      domain: isProd ? ".yasprufer.online" : undefined,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * @method GET
 * @path /user/logout
 */
const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out!" });
};

export { signup, login, logout };
