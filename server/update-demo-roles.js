import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function updateDemoRoles() {
  const roleUpdates = [
    { email: 'demo-admin@test.com', role: 'admin' },
    { email: 'demo-user@test.com', role: 'user' },
    { email: 'demo-readonly@test.com', role: 'read-only' }
  ];

  console.log('🔄 Updating demo user roles...\n');

  for (const update of roleUpdates) {
    try {
      console.log(`Updating ${update.email} to role: ${update.role}`);
      
      // First login to get a token
      const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: update.email,
        password: update.email === 'demo-admin@test.com' ? 'admin123' :
                 update.email === 'demo-user@test.com' ? 'user123' : 'readonly123'
      });
      
      if (loginResponse.data.success) {
        const token = loginResponse.data.token;
        console.log(`   ✅ Logged in successfully`);
        
        // Update role (this would require an admin endpoint, but let's test login first)
        console.log(`   Current role: ${loginResponse.data.user.role}`);
        console.log(`   Target role: ${update.role}`);
        
        if (loginResponse.data.user.role === update.role) {
          console.log(`   ✅ Role already correct!`);
        } else {
          console.log(`   ⚠️  Role needs to be updated (requires admin access)`);
        }
      } else {
        console.log(`   ❌ Login failed: ${loginResponse.data.message}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.response?.data?.message || error.message}`);
    }
    console.log('');
  }
}

updateDemoRoles();
