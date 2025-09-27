import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function createFreshDemo() {
  const demoUsers = [
    { name: 'Demo Admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { name: 'Demo User', email: 'user@demo.com', password: 'user123', role: 'user' },
    { name: 'Demo ReadOnly', email: 'readonly@demo.com', password: 'readonly123', role: 'read-only' }
  ];

  console.log('🆕 Creating fresh demo users with new emails...\n');

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
        console.log(`✅ ${user.role} user created successfully!`);
        console.log(`   Role: ${response.data.user.role}`);
        
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
  
  console.log('\n🎉 Demo users created!');
  console.log('📝 New credentials:');
  console.log('Admin: admin@demo.com / admin123');
  console.log('User: user@demo.com / user123');
  console.log('ReadOnly: readonly@demo.com / readonly123');
}

createFreshDemo();
