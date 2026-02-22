const User = require("../models/user.model")
const bcrypt = require("bcrypt");
const {generateToken} = require("../utility/generateToken")
const Certificate = require("../models/certificate.model")
exports.createAdmin = async (req, res) => {
  try {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,10}$/;
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({
        msg: "Please fill all required fields"
      });
    }
    
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        msg: "Password must be 8-10 characters long, include at least one uppercase letter, one number, and one special character"
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
      msg: "Login Successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
    }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Something went wrong"
    });
  }
};
exports.getStudentCertificate = async(req,res)=>{
  try{
    const {email} = req.params;
    const certificates = await Certificate.find({studentEmail:email});
    return res.status(200).json({msg:"working",certificates});
  }
  catch{
    res.status(500).json({msg:"something wents wrong"})
  }
}

exports.postStudentLogin = async(req,res)=>{
  try{
    const {studentEmail} = req.body;
    if(!studentEmail){
      return res.status(400).json("Fill All the required fileds");
    }
    const user = await Certificate.find({studentEmail});
    if(!user){
      return res.status(404).json({msg:"User is not exist"})

    }
    return res.status(200).json({msg:"Login",user})

  }
  catch{
    res.status(500).json({msg:"Something Went Wrong"});
  }
}

exports.getMe = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user.id,
        role: req.user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong"
    });
  }
};

