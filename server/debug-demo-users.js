import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://expense-tracker-user:Dubey123@cluster0.4ighnqq.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0');

import User from './models/User.js';

async function debugDemoUsers() {
  try {
    console.log('🔍 Debugging demo users...\n');
    
    // Check demo users
    const demoUsers = await User.find({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log('📊 Found demo users:', demoUsers.length);
    
    for (const user of demoUsers) {
      console.log(`\n--- ${user.email} (${user.role}) ---`);
      console.log('ID:', user._id);
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Password hash:', user.password.substring(0, 30) + '...');
      console.log('Created:', user.createdAt);
      console.log('Updated:', user.updatedAt);
      
      // Test password comparison using the same method as the auth route
      const testPassword = user.email === 'demo-admin@test.com' ? 'admin123' :
                          user.email === 'demo-user@test.com' ? 'user123' : 'readonly123';
      
      console.log(`Testing password "${testPassword}":`);
      const isValid = await user.comparePassword(testPassword);
      console.log('Result:', isValid ? '✅ VALID' : '❌ INVALID');
    }
    
    // Also check a working user for comparison
    console.log('\n--- Comparison: Working User ---');
    const workingUser = await User.findOne({ email: 'test@example.com' });
    if (workingUser) {
      console.log('Email:', workingUser.email);
      console.log('Password hash:', workingUser.password.substring(0, 30) + '...');
      console.log('Created:', workingUser.createdAt);
      
      const isValid = await workingUser.comparePassword('test123');
      console.log('Password test result:', isValid ? '✅ VALID' : '❌ INVALID');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugDemoUsers();
