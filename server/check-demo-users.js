import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkDemoUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
    console.log('Connected to MongoDB');

    // Check for all demo users
    const demoEmails = [
      'admin@demo.com', 'user@demo.com', 'readonly@demo.com',
      'sarah.johnson@demo.com', 'mike.chen@demo.com', 'emily.davis@demo.com',
      'david.wilson@demo.com', 'lisa.brown@demo.com', 'alex.rodriguez@demo.com'
    ];
    const users = await User.find({ email: { $in: demoEmails } }).sort({ role: 1, name: 1 });
    
    console.log('\n📊 Demo users in database:');
    console.log('========================');
    
    if (users.length === 0) {
      console.log('❌ No demo users found in database');
      console.log('Run: npm run create-demo-extended');
    } else {
      console.log(`✅ Found ${users.length} demo users:`);
      console.log('\n┌─────────────────┬─────────────────────────────┬─────────────────┐');
      console.log('│ Role            │ Name                        │ Email           │');
      console.log('├─────────────────┼─────────────────────────────┼─────────────────┤');
      
      users.forEach(user => {
        const role = user.role.padEnd(15);
        const name = user.name.padEnd(27);
        const email = user.email.padEnd(31);
        console.log(`│ ${role} │ ${name} │ ${email} │`);
      });
      
      console.log('└─────────────────┴─────────────────────────────┴─────────────────┘');
    }

    // Check total user count
    const totalUsers = await User.countDocuments();
    console.log(`\n📈 Total users in database: ${totalUsers}`);

  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

checkDemoUsers();
