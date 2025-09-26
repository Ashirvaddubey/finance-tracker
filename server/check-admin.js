import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
    console.log('Connected to MongoDB');
    
    const adminUser = await User.findOne({ email: 'admin@demo.com' });
    if (adminUser) {
      console.log('Admin user found:');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('ID:', adminUser._id);
      console.log('Created:', adminUser.createdAt);
    } else {
      console.log('Admin user not found');
    }
    
    // Check all users with admin role
    const adminUsers = await User.find({ role: 'admin' });
    console.log(`\nTotal admin users: ${adminUsers.length}`);
    adminUsers.forEach(user => {
      console.log(`- ${user.email} (${user.role})`);
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
  }
};

checkAdminUser();
