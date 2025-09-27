import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://expense-tracker-user:Dubey123@cluster0.4ighnqq.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0');

import User from './models/User.js';

async function deleteAndRecreateDemo() {
  try {
    console.log('🗑️ Deleting existing demo users...');
    
    // Delete existing demo users from database
    const result = await User.deleteMany({
      email: { $in: ['demo-admin@test.com', 'demo-user@test.com', 'demo-readonly@test.com'] }
    });
    
    console.log(`✅ Deleted ${result.deletedCount} existing demo users`);
    
    // Recreate via API with correct roles
    console.log('\n🆕 Creating demo users with correct roles via API...');
    
    const demoUsers = [
      { name: 'Demo Admin', email: 'demo-admin@test.com', password: 'admin123', role: 'admin' },
      { name: 'Demo User', email: 'demo-user@test.com', password: 'user123', role: 'user' },
      { name: 'Demo ReadOnly', email: 'demo-readonly@test.com', password: 'readonly123', role: 'read-only' }
    ];
    
    for (const user of demoUsers) {
      try {
        console.log(`Creating ${user.role} user: ${user.email}`);
        
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        });
        
        if (response.data.success) {
          console.log(`✅ Created successfully! Role: ${response.data.user.role}`);
          
          // Test login
          const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email: user.email,
            password: user.password
          });
          
          if (loginResponse.data.success) {
            console.log(`   ✅ Login test passed! Role: ${loginResponse.data.user.role}`);
          } else {
            console.log(`   ❌ Login test failed: ${loginResponse.data.message}`);
          }
        } else {
          console.log(`❌ Failed: ${response.data.message}`);
        }
      } catch (error) {
        console.log(`❌ Error: ${error.response?.data?.message || error.message}`);
      }
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

deleteAndRecreateDemo();
