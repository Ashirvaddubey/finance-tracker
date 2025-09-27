import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://expense-tracker-user:Dubey123@cluster0.4ighnqq.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0');

import User from './models/User.js';

async function fixDemoUsers() {
  try {
    console.log('🔍 Checking demo users...');
    
    // Check if demo users exist
    const existingUsers = await User.find({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log('📊 Found existing demo users:', existingUsers.length);
    
    // Delete existing demo users
    if (existingUsers.length > 0) {
      console.log('🗑️ Deleting existing demo users...');
      await User.deleteMany({
        email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
      });
      console.log('✅ Deleted existing demo users');
    }
    
    // Create fresh demo users with proper password hashing
    console.log('🆕 Creating fresh demo users...');
    
    const demoUsers = [
      {
        name: 'Demo Admin',
        email: 'demo-admin@test.com',
        password: 'admin123',
        role: 'admin'
      },
      {
        name: 'Demo User',
        email: 'demo-user@test.com',
        password: 'user123',
        role: 'user'
      },
      {
        name: 'Demo ReadOnly',
        email: 'demo-readonly@test.com',
        password: 'readonly123',
        role: 'read-only'
      }
    ];
    
    for (const userData of demoUsers) {
      // Create user and let the pre-save hook handle password hashing
      const user = new User({
        name: userData.name,
        email: userData.email,
        password: userData.password, // Let pre-save hook hash it
        role: userData.role
      });
      
      await user.save();
      console.log(`✅ Created ${userData.role} user: ${userData.email}`);
    }
    
    // Verify the users were created correctly
    console.log('\n🔍 Verifying demo users...');
    const createdUsers = await User.find({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log('📊 Created users:', createdUsers.length);
    
    for (const user of createdUsers) {
      console.log(`- ${user.email} (${user.role}) - Password hash: ${user.password.substring(0, 20)}...`);
      
      // Test password verification with correct password for each user
      let testPassword;
      if (user.email === 'demo-admin@test.com') testPassword = 'admin123';
      else if (user.email === 'demo-user@test.com') testPassword = 'user123';
      else if (user.email === 'demo-readonly@test.com') testPassword = 'readonly123';
      
      const isPasswordValid = await bcrypt.compare(testPassword, user.password);
      console.log(`  Password verification test (${testPassword}): ${isPasswordValid ? '✅ PASS' : '❌ FAIL'}`);
    }
    
    console.log('\n🎉 Demo users fixed successfully!');
    console.log('\n📝 Test credentials:');
    console.log('Admin: demo-admin@test.com / admin123');
    console.log('User: demo-user@test.com / user123');
    console.log('ReadOnly: demo-readonly@test.com / readonly123');
    
  } catch (error) {
    console.error('❌ Error fixing demo users:', error);
  } finally {
    mongoose.connection.close();
  }
}

fixDemoUsers();
