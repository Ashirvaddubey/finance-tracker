import axios from 'axios';

const testDebugEndpoint = async () => {
  try {
    console.log('🧪 Testing debug endpoint...');
    
    const response = await axios.post('https://finance-tracker-18ib.onrender.com/api/debug', {
      email: 'admin@demo.com',
      password: 'admin123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Debug endpoint successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.log('❌ Debug endpoint failed!');
    console.log('Error:', error.response?.data || error.message);
    console.log('Status:', error.response?.status);
  }
};

testDebugEndpoint();
