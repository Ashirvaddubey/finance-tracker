# Demo Accounts for Expense Tracker

## 🎯 Quick Start

The following demo accounts have been created for testing the Role-Based Access Control (RBAC) system:

## 📋 Demo Account Credentials

| Role | Email | Password | Description | Access Level |
|------|-------|----------|-------------|--------------|
| **Admin** | `admin@demo.com` | `admin123` | Full system access | Can manage all users and data |
| **User** | `user@demo.com` | `user123` | Standard user access | Can manage own expenses |
| **Read-Only** | `readonly@demo.com` | `readonly123` | View-only access | Can only view own data |

## 🚀 How to Test

### 1. Start the Application
Make sure both servers are running:
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd ..
npm run dev
```

### 2. Access the Application
- **Frontend**: http://localhost:5173 (or http://localhost:5174)
- **Backend API**: http://localhost:5000

### 3. Test Different Roles

#### 🔐 Admin User (`admin@demo.com` / `admin123`)
**What you can do:**
- ✅ View and manage all expenses
- ✅ Access admin dashboard (Admin tab)
- ✅ View all users in the system
- ✅ Change user roles (admin, user, read-only)
- ✅ Delete users
- ✅ View system-wide statistics
- ✅ Create, edit, delete any expense

**Testing Steps:**
1. Login with admin credentials
2. Notice the "Admin" tab in the dashboard
3. Click on "Admin" tab to access user management
4. Try changing a user's role
5. Try deleting a user (except yourself)

#### 👤 Regular User (`user@demo.com` / `user123`)
**What you can do:**
- ✅ Create, edit, delete your own expenses
- ✅ View your own statistics and analytics
- ✅ Update your profile
- ❌ Cannot access admin features
- ❌ Cannot see other users' data

**Testing Steps:**
1. Login with user credentials
2. Notice no "Admin" tab (only admin users see this)
3. Try adding a new expense
4. Try editing an existing expense
5. Try deleting an expense
6. View your expense statistics

#### 👁️ Read-Only User (`readonly@demo.com` / `readonly123`)
**What you can do:**
- ✅ View your own expenses
- ✅ View your own statistics and analytics
- ❌ Cannot create, edit, or delete expenses
- ❌ Cannot access admin features
- ❌ Form fields are disabled

**Testing Steps:**
1. Login with read-only credentials
2. Notice "Read Only" indicators in the UI
3. Try clicking "Add Expense" - form fields will be disabled
4. Try editing an expense - form will be in read-only mode
5. Notice no edit/delete buttons on expense items
6. View your expense statistics (read-only)

## 🧪 Testing Scenarios

### Scenario 1: Role-Based UI Changes
1. Login as each different role
2. Observe how the UI changes based on permissions
3. Notice disabled fields for read-only users
4. Notice admin-only features for admin users

### Scenario 2: Permission Testing
1. Try accessing admin features as a regular user
2. Try creating expenses as a read-only user
3. Try editing other users' data as a regular user

### Scenario 3: Admin Management
1. Login as admin
2. Change a user's role from "user" to "read-only"
3. Login as that user and notice the UI changes
4. Change the role back to "user"

## 🔧 Creating Additional Demo Users

If you need to create more demo users or reset the existing ones:

```bash
# Create demo users
cd server
npm run create-demo

# Create only admin user
npm run create-admin
```

## 📊 Expected Behavior by Role

### Admin User Experience
- **Dashboard**: Shows both "Expenses" and "Admin" tabs
- **Expense Management**: Full CRUD operations on all expenses
- **User Management**: Can view, edit, and delete all users
- **Statistics**: System-wide analytics and user statistics

### Regular User Experience
- **Dashboard**: Shows only "Expenses" tab
- **Expense Management**: Full CRUD operations on own expenses only
- **User Management**: Cannot access user management features
- **Statistics**: Personal expense analytics only

### Read-Only User Experience
- **Dashboard**: Shows only "Expenses" tab
- **Expense Management**: View-only access to own expenses
- **UI Indicators**: "Read Only" badges and disabled form fields
- **Statistics**: Personal expense analytics (view-only)

## 🐛 Troubleshooting

### Common Issues

1. **Cannot login**: Check if the backend server is running on port 5000
2. **UI not updating**: Check browser console for errors
3. **Admin tab not showing**: Ensure you're logged in as admin user
4. **Form fields not disabled**: Check if read-only user role is properly set

### Reset Demo Users
If you need to reset the demo users:
```bash
# Delete existing demo users and recreate
cd server
node -e "
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();
await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker');
await User.deleteMany({ email: { \$in: ['admin@demo.com', 'user@demo.com', 'readonly@demo.com'] } });
console.log('Demo users deleted');
await mongoose.disconnect();
"
npm run create-demo
```

## 📝 Notes

- All demo users have simple passwords for easy testing
- In production, use strong, unique passwords
- The read-only role is perfect for auditors or stakeholders who need view access
- Admin users have full system control - use carefully
- Regular users represent typical end-users of the application

## 🎉 Happy Testing!

Use these demo accounts to explore all the RBAC features and see how the application adapts to different user permission levels.
