import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createExtendedDemoUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
    console.log('Connected to MongoDB');

    // Extended demo users data
    const extendedUsers = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@demo.com',
        password: 'user123',
        role: 'user',
        bio: 'Marketing Manager - Loves tracking business expenses',
        avatar: '👩‍💼'
      },
      {
        name: 'Mike Chen',
        email: 'mike.chen@demo.com',
        password: 'user123',
        role: 'user',
        bio: 'Software Developer - Tech enthusiast',
        avatar: '👨‍💻'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@demo.com',
        password: 'readonly123',
        role: 'read-only',
        bio: 'Financial Auditor - Needs view-only access',
        avatar: '👩‍💼'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@demo.com',
        password: 'user123',
        role: 'user',
        bio: 'Sales Representative - Travels frequently',
        avatar: '👨‍💼'
      },
      {
        name: 'Lisa Brown',
        email: 'lisa.brown@demo.com',
        password: 'readonly123',
        role: 'read-only',
        bio: 'HR Manager - Reviews expense reports',
        avatar: '👩‍💼'
      },
      {
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@demo.com',
        password: 'user123',
        role: 'user',
        bio: 'Project Manager - Team lead with expense oversight',
        avatar: '👨‍💼'
      }
    ];

    console.log('Creating extended demo users...\n');

    let createdCount = 0;
    let existingCount = 0;

    for (const userData of extendedUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
        existingCount++;
        continue;
      }

      // Create user
      const user = new User(userData);
      await user.save();
      createdCount++;
      
      console.log(`✅ Created ${userData.role} user:`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Role: ${userData.role}`);
      console.log(`   Bio: ${userData.bio}\n`);
    }

    console.log('🎉 Extended demo users creation completed!');
    console.log(`📊 Summary: ${createdCount} created, ${existingCount} already existed`);
    
    // Show all demo users
    const allDemoUsers = await User.find({ 
      email: { 
        $in: [
          'admin@demo.com', 'user@demo.com', 'readonly@demo.com',
          'sarah.johnson@demo.com', 'mike.chen@demo.com', 'emily.davis@demo.com',
          'david.wilson@demo.com', 'lisa.brown@demo.com', 'alex.rodriguez@demo.com'
        ] 
      } 
    }).sort({ role: 1, name: 1 });

    console.log('\n📋 Complete Demo User List:');
    console.log('┌─────────────────┬─────────────────────────────┬─────────────────┬─────────────────┐');
    console.log('│ Role            │ Name                        │ Email           │ Password        │');
    console.log('├─────────────────┼─────────────────────────────┼─────────────────┼─────────────────┤');
    
    allDemoUsers.forEach(user => {
      const role = user.role.padEnd(15);
      const name = user.name.padEnd(27);
      const email = user.email.padEnd(31);
      const password = user.password ? 'user123/readonly123' : 'N/A';
      console.log(`│ ${role} │ ${name} │ ${email} │ ${password.padEnd(15)} │`);
    });
    
    console.log('└─────────────────┴─────────────────────────────┴─────────────────┴─────────────────┘');
    
    console.log('\n🚀 Perfect for Vercel deployment demo!');
    console.log('   Frontend: Your Vercel URL');
    console.log('   Backend: Your backend URL');

  } catch (error) {
    console.error('❌ Error creating extended demo users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
};

createExtendedDemoUsers();
