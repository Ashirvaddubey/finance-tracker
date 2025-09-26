# Database Status & Demo Users

## ✅ Database Status

The demo users have been successfully added to the database and are ready for testing!

## 📊 Current Database Contents

### Demo Users (3 accounts)
- ✅ **admin@demo.com** (admin) - Full system access
- ✅ **user@demo.com** (user) - Standard user access  
- ✅ **readonly@demo.com** (read-only) - View-only access

### Total Users in Database: 6
- 3 Demo users (created for testing)
- 3 Additional users (if any were created during development)

## 🔧 Database Management Commands

### Check Users in Database
```bash
cd server
npm run check-users
```

### Create Demo Users (if needed)
```bash
cd server
npm run create-demo
```

### Create Admin User Only
```bash
cd server
npm run create-admin
```

## 🚀 Testing the Application

### 1. Start the Application
```bash
# Terminal 1 - Backend Server
cd server
npm run dev

# Terminal 2 - Frontend Server
cd ..
npm run dev
```

### 2. Access URLs
- **Frontend**: http://localhost:5173 (or http://localhost:5174)
- **Backend API**: http://localhost:5000

### 3. Login with Demo Accounts

| Role | Email | Password | What You Can Do |
|------|-------|----------|-----------------|
| **Admin** | `admin@demo.com` | `admin123` | • Manage all users<br>• Access admin dashboard<br>• Full CRUD on all expenses<br>• System statistics |
| **User** | `user@demo.com` | `user123` | • Create/edit/delete own expenses<br>• View own statistics<br>• Update profile |
| **Read-Only** | `readonly@demo.com` | `readonly123` | • View own expenses only<br>• Disabled form fields<br>• No edit/delete buttons |

## 🧪 Testing Scenarios

### Test Admin Features
1. Login as `admin@demo.com`
2. Click on "Admin" tab in dashboard
3. View all users in the system
4. Try changing a user's role
5. Try deleting a user (except yourself)

### Test User Features
1. Login as `user@demo.com`
2. Notice no "Admin" tab (only admins see this)
3. Add a new expense
4. Edit an existing expense
5. Delete an expense
6. View your statistics

### Test Read-Only Features
1. Login as `readonly@demo.com`
2. Notice "Read Only" indicators in UI
3. Try clicking "Add Expense" - form will be disabled
4. Try editing an expense - form will be read-only
5. Notice no edit/delete buttons on expense items

## 🔍 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'user', 'read-only']),
  avatar: String,
  bio: String,
  currency: String,
  theme: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  _id: ObjectId,
  amount: Number,
  category: String,
  description: String,
  date: Date,
  paymentMethod: String,
  tags: [String],
  user: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Troubleshooting

### If Demo Users Are Missing
```bash
cd server
npm run create-demo
```

### If Database Connection Fails
1. Check if MongoDB is running
2. Verify connection string in `.env` file
3. Check network connectivity

### If Frontend Shows Errors
1. Check browser console for errors
2. Verify backend server is running on port 5000
3. Check CORS settings

## 📝 Notes

- All demo users have simple passwords for easy testing
- In production, use strong, unique passwords
- The database uses MongoDB with Mongoose ODM
- All passwords are hashed using bcryptjs
- JWT tokens include role information for authorization

## 🎉 Ready to Test!

The database is properly set up with demo users and the RBAC system is fully functional. You can now test all the role-based features of the application!
