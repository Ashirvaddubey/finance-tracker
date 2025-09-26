import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

const testProductionLogin = async () => {
  try {
    console.log('🔗 Connecting to production MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const testEmail = 'admin@demo.com';
    const testPassword = 'admin123';

    console.log(`\n🔍 Testing login for: ${testEmail}`);
    
    // Find user
    const user = await User.findOne({ email: testEmail });
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }

    console.log('✅ User found:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password hash length: ${user.password.length}`);
    console.log(`   Password hash starts with: ${user.password.substring(0, 20)}...`);

    // Test password
    console.log('\n🔐 Testing password validation:');
    const isValid = await user.comparePassword(testPassword);
    console.log(`   Password "${testPassword}" is valid: ${isValid}`);

    if (!isValid) {
      console.log('❌ Password validation failed!');
      
      // Test with different passwords
      const testPasswords = ['admin123', 'Admin123', 'ADMIN123', 'admin', 'password'];
      console.log('\n🧪 Testing other possible passwords:');
      
      for (const pwd of testPasswords) {
        const result = await user.comparePassword(pwd);
        console.log(`   "${pwd}": ${result}`);
      }
    } else {
      console.log('✅ Password validation successful!');
    }

    // Check all demo users
    console.log('\n📋 All demo users in database:');
    const demoUsers = await User.find({ 
      email: { 
        $in: [
          'admin@demo.com', 
          'user@demo.com', 
          'readonly@demo.com'
        ] 
      } 
    });
    
    demoUsers.forEach(user => {
      console.log(`   ${user.email} (${user.role})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

testProductionLogin();
