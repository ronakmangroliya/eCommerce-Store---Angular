const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({
        status: "failed",
        data:{},
        message: "User already exists",
    });
    }

    const newUser = new User({ username, password });
    const token = jwt.generateToken(newUser);
    newUser.token = token;
  
    await newUser.save();  

    return res.status(200).json({
      status: "success",
      data:newUser,
      message: "User created successfully",
  })
  } catch (error) {
    console.error(error);
    return
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.generateToken(user);

    user.token = token;

    const newUser = await user.save();

    return res.status(200).json({
      status: "success",
      data:newUser,
      message: "User created successfully",
  })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  signup,
  login,
};
