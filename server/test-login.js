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

async function testLogin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Test all demo users
    const demoUsers = [
      { email: 'admin@demo.com', password: 'admin123' },
      { email: 'user@demo.com', password: 'user123' },
      { email: 'readonly@demo.com', password: 'readonly123' }
    ];

    for (const { email, password } of demoUsers) {
      console.log(`\n🔍 Testing ${email}:`);
      
      const user = await User.findOne({ email });
      if (!user) {
        console.log('❌ User not found');
        continue;
      }

      console.log('✅ User found:', {
        email: user.email,
        role: user.role,
        passwordLength: user.password.length
      });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('🔐 Password valid:', isPasswordValid);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

testLogin();
