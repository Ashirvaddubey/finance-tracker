import mongoose from 'mongoose';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const testUsersAPI = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
    console.log('Connected to MongoDB');
    
    // Get admin user
    const adminUser = await User.findOne({ email: 'admin@demo.com' });
    if (!adminUser) {
      console.log('Admin user not found');
      return;
    }
    
    // Create JWT token
    const token = jwt.sign(
      { userId: adminUser._id, role: adminUser.role }, 
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '1h' }
    );
    
    console.log('Admin user:', adminUser.email, adminUser.role);
    console.log('JWT Token created');
    
    // Test the users endpoint
    const response = await fetch('http://localhost:5000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('API Response Status:', response.status);
    console.log('API Response:', data);
    
    if (data.success && data.users) {
      console.log(`Found ${data.users.length} users:`);
      data.users.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - ${user.role}`);
      });
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testUsersAPI();
