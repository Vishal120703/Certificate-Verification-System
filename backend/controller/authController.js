const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const {generateToken} = require("../utility/generateToken")
exports.createAdmin = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({
        msg: "Please fill all required fields"
      });
    }

    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({
        msg: "This username already exists"
      });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        msg: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true
    });

    await newUser.save();

    return res.status(201).json({
      msg: "Admin is created"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Something went wrong"
    });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        msg: "Fill all required fields"
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid username or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid username or password"
      });
    }

    const token = generateToken(user);
    res.cookie("token", token, {httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.status(200).json({
      msg: "Login Successful"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Something went wrong"
    });
  }
};
