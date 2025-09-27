import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function testWorkingUser() {
  try {
    console.log('🧪 Testing with a working user...');
    
    // First, let's register a test user
    console.log('1. Registering test user...');
    const registerResponse = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123'
    });
    
    if (registerResponse.data.success) {
      console.log('✅ Registration successful!');
      console.log('   Token:', registerResponse.data.token.substring(0, 20) + '...');
    } else {
      console.log('❌ Registration failed:', registerResponse.data.message);
      return;
    }
    
    console.log('\n2. Testing login with registered user...');
    const loginResponse = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'test@example.com',
      password: 'test123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Login successful!');
      console.log('   Token:', loginResponse.data.token.substring(0, 20) + '...');
      console.log('   User role:', loginResponse.data.user.role);
    } else {
      console.log('❌ Login failed:', loginResponse.data.message);
    }
    
  } catch (error) {
    console.log('❌ Error:', error.response?.data?.message || error.message);
  }
}

testWorkingUser();
