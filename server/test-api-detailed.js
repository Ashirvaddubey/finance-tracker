import axios from 'axios';

const API_BASE_URL = 'https://finance-tracker-18ib.onrender.com';

async function testApiDetailed() {
  try {
    console.log('🧪 Testing API with detailed logging...\n');
    
    // Test demo admin login
    console.log('Testing demo admin login...');
    console.log('Request data:', {
      email: 'demo-admin@test.com',
      password: 'admin123'
    });
    
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: 'demo-admin@test.com',
      password: 'admin123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    
  } catch (error) {
    console.log('❌ Error occurred:');
    console.log('Status:', error.response?.status);
    console.log('Status text:', error.response?.statusText);
    console.log('Response data:', error.response?.data);
    console.log('Request config:', {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data
    });
  }
}

testApiDetailed();
