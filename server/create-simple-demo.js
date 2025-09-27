import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker';

const createSimpleDemo = async () => {
  try {
    console.log('🔗 Connecting to production MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing demo users
    console.log('🗑️ Deleting existing demo users...');
    await User.deleteMany({ 
      email: { 
        $in: [
          'admin@demo.com', 
          'user@demo.com', 
          'readonly@demo.com',
          'demo-admin@test.com',
          'demo-user@test.com', 
          'demo-readonly@test.com'
        ] 
      } 
    });
    console.log('✅ Deleted existing demo users');

    // Create new demo users with different email format
    console.log('👥 Creating new demo users...');
    
    const demoUsers = [
      { name: 'Demo Admin', email: 'demo-admin@test.com', password: 'admin123', role: 'admin' },
      { name: 'Demo User', email: 'demo-user@test.com', password: 'user123', role: 'user' },
      { name: 'Demo ReadOnly', email: 'demo-readonly@test.com', password: 'readonly123', role: 'read-only' }
    ];

    for (const userData of demoUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created ${userData.role}: ${userData.email}`);
    }

    console.log('\n🎉 Demo users created successfully!');
    console.log('\n📋 NEW Demo Account Credentials:');
    console.log('┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐');
    console.log('│ Role            │ Email           │ Password        │ Description     │');
    console.log('├─────────────────┼─────────────────┼─────────────────┼─────────────────┤');
    demoUsers.forEach(user => {
      console.log(`│ ${user.role.padEnd(15)} │ ${user.email.padEnd(15)} │ ${user.password.padEnd(15)} │ ${user.role === 'admin' ? 'Full privileges' : user.role === 'user' ? 'Standard user' : 'View only'}`.padEnd(47) + ' │');
    });
    console.log('└─────────────────┴─────────────────┴─────────────────┴─────────────────┘');

    // Test login for each user
    console.log('\n🧪 Testing login for each user:');
    for (const userData of demoUsers) {
      const user = await User.findOne({ email: userData.email });
      if (user) {
        const isValid = await user.comparePassword(userData.password);
        console.log(`   ${userData.email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

createSimpleDemo();
