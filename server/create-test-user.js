import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

const createTestUser = async () => {
  try {
    console.log('🔗 Connecting to production MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing test user if exists
    await User.deleteOne({ email: 'test@test.com' });
    console.log('🗑️ Deleted existing test user if any');

    // Create new test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123',
      role: 'admin'
    });

    await testUser.save();
    console.log('✅ Test user created successfully!');
    console.log('📧 Email: test@test.com');
    console.log('🔑 Password: test123');
    console.log('👤 Role: admin');

    // Test password validation
    const isValid = await testUser.comparePassword('test123');
    console.log(`🔐 Password validation test: ${isValid}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
};

createTestUser();