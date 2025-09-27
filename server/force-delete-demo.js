import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://expense-tracker-user:Dubey123@cluster0.4ighnqq.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0');

import User from './models/User.js';

async function forceDeleteDemo() {
  try {
    console.log('🔍 Checking existing demo users...');
    
    const existingUsers = await User.find({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log(`Found ${existingUsers.length} existing demo users:`);
    for (const user of existingUsers) {
      console.log(`- ${user.email} (${user.role}) - ID: ${user._id}`);
    }
    
    if (existingUsers.length > 0) {
      console.log('\n🗑️ Force deleting all demo users...');
      const result = await User.deleteMany({
        email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
      });
      console.log(`✅ Deleted ${result.deletedCount} users`);
    }
    
    // Verify deletion
    const remainingUsers = await User.find({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log(`\n📊 Remaining demo users: ${remainingUsers.length}`);
    if (remainingUsers.length === 0) {
      console.log('✅ All demo users successfully deleted!');
    } else {
      console.log('❌ Some users still exist:');
      for (const user of remainingUsers) {
        console.log(`- ${user.email} (${user.role})`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

forceDeleteDemo();
