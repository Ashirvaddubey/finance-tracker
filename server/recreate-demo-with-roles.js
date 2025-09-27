import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function recreateDemoWithRoles() {
  const demoUsers = [
    { name: 'Demo Admin', email: 'demo-admin@test.com', password: 'admin123', role: 'admin' },
    { name: 'Demo User', email: 'demo-user@test.com', password: 'user123', role: 'user' },
    { name: 'Demo ReadOnly', email: 'demo-readonly@test.com', password: 'readonly123', role: 'read-only' }
  ];

  console.log('🔄 Recreating demo users with correct roles...\n');

  for (const user of demoUsers) {
    try {
      console.log(`Recreating ${user.role} user: ${user.email}`);
      
      // First, try to delete existing user (if any)
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${user.email}`, {
          headers: {
            'Authorization': 'Bearer ' + (await getAdminToken())
          }
        });
        console.log(`   Deleted existing user`);
      } catch (deleteError) {
        // User might not exist, that's okay
        console.log(`   No existing user to delete`);
      }
      
      // Create user with role
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
        console.log(`❌ Failed to create ${user.role} user: ${response.data.message}`);
      }
    } catch (error) {
      console.log(`❌ Error with ${user.role} user:`, error.response?.data?.message || error.message);
    }
    console.log('');
  }
}

async function getAdminToken() {
  // Try to login as admin to get token for deletion
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'demo-admin@test.com',
      password: 'admin123'
    });
    return response.data.token;
  } catch (error) {
    return null;
  }
}

recreateDemoWithRoles();
