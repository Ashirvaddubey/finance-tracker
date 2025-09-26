import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  bio: { type: String, default: '' },
  currency: { type: String, default: 'USD' },
  theme: { type: String, default: 'light' },
  role: { 
    type: String, 
    default: 'user', 
    enum: ['admin', 'user', 'read-only'],
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Regular User',
    email: 'user@demo.com',
    password: 'user123',
    role: 'user'
  },
  {
    name: 'Read Only User',
    email: 'readonly@demo.com',
    password: 'readonly123',
    role: 'read-only'
  }
];

async function createDemoUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('Creating demo users...');

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email} (${userData.role})`);
        continue;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const user = new User({
        ...userData,
        password: hashedPassword
      });

      await user.save();
      console.log(`✅ Created user: ${userData.email} (${userData.role})`);
    }

    console.log('\n🎉 Demo users created successfully!');
    console.log('\n📋 Demo Account Summary:');
    console.log('┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐');
    console.log('│ Role            │ Email           │ Password        │ Description     │');
    console.log('├─────────────────┼─────────────────┼─────────────────┼─────────────────┤');
    console.log('│ Admin           │ admin@demo.com  │ admin123        │ Full privileges │');
    console.log('│ User            │ user@demo.com   │ user123         │ Standard user   │');
    console.log('│ Read-Only       │ readonly@demo.com│ readonly123    │ View only       │');
    console.log('└─────────────────┴─────────────────┴─────────────────┴─────────────────┘');

  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

createDemoUsers();
