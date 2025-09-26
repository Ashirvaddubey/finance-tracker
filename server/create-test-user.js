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

async function createTestUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Delete existing test user if exists
    await User.deleteOne({ email: 'test@test.com' });
    console.log('Deleted existing test user if any');

    // Create new test user
    const hashedPassword = await bcrypt.hash('test123', 12);
    const user = new User({
      name: 'Test User',
      email: 'test@test.com',
      password: hashedPassword,
      role: 'admin'
    });

    await user.save();
    console.log('✅ Created test user: test@test.com / test123');

    // Test password
    const testUser = await User.findOne({ email: 'test@test.com' });
    const isPasswordValid = await bcrypt.compare('test123', testUser.password);
    console.log('🔐 Password test:', isPasswordValid);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📡 Disconnected from MongoDB');
  }
}

createTestUser();
