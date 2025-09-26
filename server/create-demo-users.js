import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createDemoUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
    console.log('Connected to MongoDB');

    // Demo users data
    const demoUsers = [
      {
        name: 'Demo Admin',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
        bio: 'System Administrator'
      },
      {
        name: 'Demo User',
        email: 'user@demo.com',
        password: 'user123',
        role: 'user',
        bio: 'Regular User Account'
      },
      {
        name: 'Demo Read-Only',
        email: 'readonly@demo.com',
        password: 'readonly123',
        role: 'read-only',
        bio: 'Read-Only User Account'
      }
    ];

    console.log('Creating demo users...\n');

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
        continue;
      }

      // Create user
      const user = new User(userData);
      await user.save();
      
      console.log(`✅ Created ${userData.role} user:`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   Bio: ${userData.bio}\n`);
    }

    console.log('🎉 Demo users created successfully!');
    console.log('\n📋 Demo Account Summary:');
    console.log('┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐');
    console.log('│ Role            │ Email           │ Password        │ Description     │');
    console.log('├─────────────────┼─────────────────┼─────────────────┼─────────────────┤');
    console.log('│ Admin           │ admin@demo.com  │ admin123        │ Full privileges │');
    console.log('│ User            │ user@demo.com   │ user123         │ Standard user   │');
    console.log('│ Read-Only       │ readonly@demo.com│ readonly123    │ View only       │');
    console.log('└─────────────────┴─────────────────┴─────────────────┴─────────────────┘');
    
    console.log('\n🚀 You can now test the application with these accounts!');
    console.log('   Frontend: http://localhost:5173');
    console.log('   Backend: http://localhost:5000');

  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

createDemoUsers();
