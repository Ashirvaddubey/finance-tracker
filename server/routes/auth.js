import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user with optional role
    const userData = { name, email, password };
    if (role && ['admin', 'user', 'read-only'].includes(role)) {
      userData.role = role;
    }
    
    const user = new User(userData);
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    console.log('=== LOGIN DEBUG START ===');
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    console.log('Body type:', typeof req.body);
    console.log('Body keys:', Object.keys(req.body || {}));
    console.log('Email:', req.body?.email);
    console.log('Password:', req.body?.password);
    console.log('Password length:', req.body?.password?.length);
    console.log('=== LOGIN DEBUG END ===');
    
    const { email, password } = req.body;

    // Find user
    console.log('Looking for user with email:', email);
    const user = await User.findOne({ email });
    console.log('User found:', user ? 'YES' : 'NO');
    if (user) {
      console.log('User details:', { email: user.email, role: user.role });
    }
    
    if (!user) {
      console.log('❌ User not found, returning error');
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    console.log('Checking password for user:', user.email);
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('❌ Password invalid, returning error');
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// Get Current User
router.get('/me', authenticate, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

export default router;