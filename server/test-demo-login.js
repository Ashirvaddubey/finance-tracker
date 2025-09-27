import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function testDemoLogin() {
  const demoUsers = [
    { email: 'demo-admin@test.com', password: 'admin123', role: 'admin' },
    { email: 'demo-user@test.com', password: 'user123', role: 'user' },
    { email: 'demo-readonly@test.com', password: 'readonly123', role: 'read-only' }
  ];

  console.log('🧪 Testing demo user logins...\n');

  for (const user of demoUsers) {
    try {
      console.log(`Testing ${user.role} login: ${user.email}`);
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: user.email,
        password: user.password
      });

      if (response.data.success) {
        console.log(`✅ ${user.role} login successful!`);
        console.log(`   Token: ${response.data.token.substring(0, 20)}...`);
        console.log(`   User role: ${response.data.user.role}`);
      } else {
        console.log(`❌ ${user.role} login failed: ${response.data.message}`);
      }
    } catch (error) {
      console.log(`❌ ${user.role} login error:`, error.response?.data?.message || error.message);
    }
    console.log('');
  }
}

testDemoLogin();
