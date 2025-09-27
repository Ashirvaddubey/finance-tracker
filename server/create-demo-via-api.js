import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function createDemoViaApi() {
  const demoUsers = [
    { name: 'Demo Admin', email: 'demo-admin@test.com', password: 'admin123', role: 'admin' },
    { name: 'Demo User', email: 'demo-user@test.com', password: 'user123', role: 'user' },
    { name: 'Demo ReadOnly', email: 'demo-readonly@test.com', password: 'readonly123', role: 'read-only' }
  ];

  console.log('🚀 Creating demo users via API...\n');

  for (const user of demoUsers) {
    try {
      console.log(`Creating ${user.role} user: ${user.email}`);
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password
      });

      if (response.data.success) {
        console.log(`✅ ${user.role} user created successfully!`);
        console.log(`   Token: ${response.data.token.substring(0, 20)}...`);
        
        // Test login immediately
        console.log(`   Testing login...`);
        const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          email: user.email,
          password: user.password
        });
        
        if (loginResponse.data.success) {
          console.log(`   ✅ Login test passed!`);
        } else {
          console.log(`   ❌ Login test failed: ${loginResponse.data.message}`);
        }
      } else {
        console.log(`❌ Failed to create ${user.role} user: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log(`⚠️  ${user.role} user already exists, testing login...`);
        
        // Test login for existing user
        try {
          const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email: user.email,
            password: user.password
          });
          
          if (loginResponse.data.success) {
            console.log(`   ✅ Login test passed!`);
          } else {
            console.log(`   ❌ Login test failed: ${loginResponse.data.message}`);
          }
        } catch (loginError) {
          console.log(`   ❌ Login error: ${loginError.response?.data?.message || loginError.message}`);
        }
      } else {
        console.log(`❌ Error creating ${user.role} user:`, error.response?.data?.message || error.message);
      }
    }
    console.log('');
  }
}

createDemoViaApi();