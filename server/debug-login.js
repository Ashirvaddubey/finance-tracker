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

async function debugLogin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find the admin user
    const user = await User.findOne({ email: 'admin@demo.com' });
    
    if (!user) {
      console.log('❌ User not found: admin@demo.com');
      return;
    }

    console.log('✅ User found:', {
      email: user.email,
      role: user.role,
      passwordLength: user.password.length,
      passwordStartsWith: user.password.substring(0, 10) + '...'
    });

    // Test password comparison
    const testPassword = 'admin123';
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    
    console.log('🔐 Password test:');
    console.log('  Test password:', testPassword);
    console.log('  Is valid:', isPasswordValid);

    // Test with different password
    const wrongPassword = 'wrong123';
    const isWrongPasswordValid = await bcrypt.compare(wrongPassword, user.password);
    console.log('  Wrong password test:', isWrongPasswordValid);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

debugLogin();
