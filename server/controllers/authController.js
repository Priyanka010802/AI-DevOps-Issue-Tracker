const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing in .env file');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  } catch (err) {
    console.error('Token Generation Error:', err.message);
    throw err;
  }
};

exports.register = async (req, res) => {
  try {
    console.log('--- Registration Started ---');
    const { name, email, password, role } = req.body;
    console.log('Payload:', { name, email, role });

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields (name, email, password) are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Attempt to create user
    console.log('Attempting to create user in DB...');
    const user = await User.create({ name, email, password, role });
    console.log('User created in DB:', user._id);

    const token = generateToken(user._id);
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.error('--- Registration Failed ---');
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error during registration', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
