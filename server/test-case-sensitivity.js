import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

const testCaseSensitivity = async () => {
  try {
    console.log('🔗 Connecting to production MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const testEmails = [
      'admin@demo.com',
      'ADMIN@DEMO.COM',
      'Admin@Demo.com',
      'ADMIN@demo.com',
      'admin@DEMO.com'
    ];

    for (const email of testEmails) {
      console.log(`\n🔍 Testing email: "${email}"`);
      const user = await User.findOne({ email });
      if (user) {
        console.log(`✅ Found user: ${user.email} (${user.role})`);
        const isValid = await user.comparePassword('admin123');
        console.log(`🔐 Password valid: ${isValid}`);
      } else {
        console.log('❌ User not found');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
};

testCaseSensitivity();
