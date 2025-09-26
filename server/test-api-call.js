import axios from 'axios';

const testApiCall = async () => {
  try {
    console.log('🧪 Testing API call to production backend...');
    
    const response = await axios.post('https://finance-tracker-18ib.onrender.com/api/auth/login', {
      email: 'admin@demo.com',
      password: 'admin123'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.log('❌ Login failed!');
    console.log('Error:', error.response?.data || error.message);
    console.log('Status:', error.response?.status);
    console.log('Headers:', error.response?.headers);
  }
};

testApiCall();
