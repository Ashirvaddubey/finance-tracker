import axios from 'axios';

const createDemoUsersViaAPI = async () => {
  try {
    console.log('🧪 Creating demo users via API registration...');
    
    const demoUsers = [
      { name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
      { name: 'Standard User', email: 'user@demo.com', password: 'user123', role: 'user' },
      { name: 'Read-Only User', email: 'readonly@demo.com', password: 'readonly123', role: 'read-only' }
    ];

    for (const userData of demoUsers) {
      try {
        console.log(`\n📝 Registering ${userData.role}: ${userData.email}`);
        
        // First, try to delete existing user if any
        try {
          await axios.delete(`https://finance-tracker-18ib.onrender.com/api/users/delete-by-email`, {
            data: { email: userData.email }
          });
          console.log(`   🗑️ Deleted existing user if any`);
        } catch (deleteError) {
          // Ignore delete errors
        }

        // Register new user
        const response = await axios.post('https://finance-tracker-18ib.onrender.com/api/auth/register', {
          name: userData.name,
          email: userData.email,
          password: userData.password
        });

        if (response.data.success) {
          console.log(`   ✅ Registered successfully`);
          
          // Update role if not admin (since registration creates user by default)
          if (userData.role !== 'user') {
            try {
              await axios.put(`https://finance-tracker-18ib.onrender.com/api/users/${response.data.user._id}/role`, {
                role: userData.role
              }, {
                headers: {
                  'Authorization': `Bearer ${response.data.token}`
                }
              });
              console.log(`   🔄 Updated role to ${userData.role}`);
            } catch (roleError) {
              console.log(`   ⚠️ Could not update role: ${roleError.response?.data?.message || roleError.message}`);
            }
          }
        }
      } catch (error) {
        console.log(`   ❌ Failed to register ${userData.email}: ${error.response?.data?.message || error.message}`);
      }
    }

    console.log('\n🎉 Demo user creation completed!');
    console.log('\n📋 Test these credentials:');
    console.log('┌─────────────────┬─────────────────┬─────────────────┐');
    console.log('│ Email           │ Password        │ Role            │');
    console.log('├─────────────────┼─────────────────┼─────────────────┤');
    demoUsers.forEach(user => {
      console.log(`│ ${user.email.padEnd(15)} │ ${user.password.padEnd(15)} │ ${user.role.padEnd(15)} │`);
    });
    console.log('└─────────────────┴─────────────────┴─────────────────┘');

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

createDemoUsersViaAPI();
