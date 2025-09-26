# Expense Tracker with Role-Based Access Control (RBAC)

A modern, enterprise-grade expense management platform with comprehensive role-based access control. Perfect for individuals, teams, and organizations that need secure, scalable expense tracking with different user permission levels.

## 🔑 **DEMO CREDENTIALS** (Ready to Use!)

| Role | Email | Password | Features |
|------|-------|----------|----------|
| **👑 Admin** | `admin@demo.com` | `admin123` | Full system access + User management |
| **👤 User** | `user@demo.com` | `user123` | Standard expense management |
| **👁️ Read-Only** | `readonly@demo.com` | `readonly123` | View-only access |

**🚀 [Live Demo](http://localhost:5173)** | **📱 Mobile Responsive** | **🔒 Enterprise Security**

### **🎬 For Deployment Viewers**
**Copy & paste these credentials to test the application:**

```
Admin Account:
Email: admin@demo.com
Password: admin123

User Account:
Email: user@demo.com  
Password: user123

Read-Only Account:
Email: readonly@demo.com
Password: readonly123
```

---

## 🎯 **Quick Start Demo**

### **🔑 Demo Account Credentials**

**Ready-to-use accounts for testing all features:**

| Role | Email | Password | What You Can Do |
|------|-------|----------|-----------------|
| **👑 Admin** | `admin@demo.com` | `admin123` | • Manage all users<br>• Access admin dashboard<br>• Full CRUD on all expenses<br>• System statistics |
| **👤 User** | `user@demo.com` | `user123` | • Create/edit/delete own expenses<br>• View personal analytics<br>• Update profile |
| **👁️ Read-Only** | `readonly@demo.com` | `readonly123` | • View own expenses only<br>• Disabled form fields<br>• No edit/delete buttons |

### **🚀 Try the Live Demo**
**Frontend:** [http://localhost:5173](http://localhost:5173) (after running the app)

### **📋 Quick Test Flow**
1. **Login as Admin** → See user management dashboard
2. **Switch to User** → Test expense management
3. **Switch to Read-Only** → See disabled UI elements

### **🧪 Testing Guide for Each Role**

#### **👑 Admin Account Testing**
1. **Login** with `admin@demo.com` / `admin123`
2. **Click "Admin" tab** - Access user management dashboard
3. **View all users** - See 9+ demo users in the system
4. **Change user roles** - Switch between admin/user/read-only
5. **Search users** - Use the search and filter functionality
6. **View statistics** - Check system-wide analytics
7. **Test expense management** - Full CRUD operations

#### **👤 User Account Testing**
1. **Login** with `user@demo.com` / `user123`
2. **Notice no "Admin" tab** - Only admins see this
3. **Add new expense** - Test expense creation
4. **Edit existing expense** - Test expense modification
5. **Delete expense** - Test expense deletion
6. **View analytics** - Check personal spending insights
7. **Update profile** - Test profile management

#### **👁️ Read-Only Account Testing**
1. **Login** with `readonly@demo.com` / `readonly123`
2. **Notice "Read Only" indicators** - UI shows permission level
3. **Try adding expense** - Form fields are disabled
4. **Try editing expense** - Form opens in read-only mode
5. **Notice no action buttons** - No edit/delete buttons visible
6. **View analytics** - Can only view, not modify data

### **🎯 What You'll See in the Demo**

#### **🔐 Security Features**
- **Role-based UI** - Interface changes based on user permissions
- **JWT Authentication** - Secure token-based login system
- **Data Isolation** - Users can only access their own data
- **Real-time Role Switching** - Admin can change user roles instantly

#### **👑 Admin Dashboard Features**
- **User Management** - View, edit, delete all users
- **Role Management** - Change user roles (admin/user/read-only)
- **Search & Filter** - Find users by name, email, or role
- **System Statistics** - Organization-wide analytics
- **User Analytics** - Individual user spending patterns

#### **📊 Expense Management**
- **CRUD Operations** - Create, read, update, delete expenses
- **Category Management** - 10+ predefined categories
- **Date Filtering** - Filter expenses by date ranges
- **Real-time Analytics** - Interactive charts and insights
- **Multi-currency Support** - USD, EUR, GBP, INR, CAD, AUD

#### **📱 User Experience**
- **Responsive Design** - Works on desktop, tablet, mobile
- **Dark/Light Theme** - Toggle between themes
- **Smooth Animations** - Framer Motion animations
- **Loading States** - Professional loading indicators
- **Error Handling** - Clear error messages

---

## 🔐 **Role-Based Access Control (RBAC)**

### **Three User Roles**

#### 👑 **Admin Role**
- **Full system access** - Manage all users and data
- **User Management Dashboard** - View, edit, delete users
- **Role Management** - Change user roles in real-time
- **System Analytics** - View organization-wide statistics
- **All CRUD Operations** - Create, read, update, delete any expense

#### 👤 **User Role** 
- **Standard privileges** - Full CRUD on own expenses
- **Personal Analytics** - View own spending patterns
- **Profile Management** - Update personal information
- **Expense Management** - Add, edit, delete personal expenses

#### 👁️ **Read-Only Role**
- **View-only access** - Can only view own data
- **Disabled UI Elements** - Form fields are disabled
- **No Action Buttons** - Cannot create, edit, or delete
- **Audit Trail** - Perfect for auditors and stakeholders

---

## 🚀 **Key Features**

### **Core Functionality**
- ✅ **Expense Management** - Add, edit, delete, categorize expenses
- ✅ **Real-time Analytics** - Interactive charts and spending insights
- ✅ **Multi-Currency Support** - USD, EUR, GBP, INR, CAD, AUD
- ✅ **Category Management** - 10+ predefined expense categories
- ✅ **Date Filtering** - Filter expenses by date ranges
- ✅ **Search & Filter** - Find expenses quickly

### **RBAC Security Features**
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-based UI** - Interface adapts to user permissions
- ✅ **Server-side Validation** - All permissions validated on backend
- ✅ **Data Isolation** - Users can only access their own data
- ✅ **Admin Dashboard** - Complete user management interface

### **User Experience**
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Dark/Light Theme** - Toggle between themes
- ✅ **Real-time Updates** - Changes reflect immediately
- ✅ **Loading States** - Smooth user experience
- ✅ **Error Handling** - Clear error messages and feedback

---

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client with interceptors
- **React Router** - Client-side routing

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### **Security**
- **Role-based Access Control** - Three-tier permission system
- **JWT Tokens** - Secure authentication
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Server-side validation
- **CORS Protection** - Configured for production

---

## 📦 **Installation & Setup**

### **1. Clone Repository**
```bash
git clone <your-repo-url>
cd expense-tracker
```

### **2. Install Dependencies**

#### **Frontend Dependencies**
```bash
npm install
```

#### **Backend Dependencies**
```bash
cd server
npm install
```

### **3. Environment Configuration**

#### **Backend Environment** (`server/.env`)
```env
# Database
MONGO_URI=mongodb://localhost:27017/expense-tracker
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server
PORT=5000
NODE_ENV=development
```

#### **Frontend Environment** (`.env`)
```env
VITE_REACT_APP_API_URL=http://localhost:5000
```

### **4. Database Setup**

#### **Create Demo Users**
```bash
cd server
npm run create-demo-extended
```

This creates 9 demo users perfect for testing:
- 1 Admin user
- 5 Regular users  
- 3 Read-only users

#### **Verify Database**
```bash
npm run check-users
```

---

## ▶️ **Running the Application**

### **Development Mode**

#### **1. Start Backend Server**
```bash
cd server
npm run dev
```
**Backend runs on:** http://localhost:5000

#### **2. Start Frontend Server**
```bash
# In a new terminal
npm run dev
```
**Frontend runs on:** http://localhost:5173

### **Production Mode**

#### **Build Frontend**
```bash
npm run build
```

#### **Start Backend**
```bash
cd server
npm start
```

---

## 🎮 **Demo & Testing**

### **Admin Dashboard Demo**
1. **Login as Admin** (`admin@demo.com` / `admin123`)
2. **Click "Admin" tab** - Access user management
3. **View all users** - See 9+ demo users
4. **Change user roles** - Switch between admin/user/read-only
5. **Search & filter** - Find specific users
6. **View statistics** - System-wide analytics

### **Role Testing**
1. **Admin User** - Full access to all features
2. **Regular User** - Standard expense management
3. **Read-Only User** - View-only with disabled forms

### **API Testing**
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test with authentication
curl -H "Authorization: Bearer <token>" http://localhost:5000/api/users
```

---

## 📁 **Project Structure**

```
expense-tracker/
├── server/                    # Backend (Node.js + Express)
│   ├── models/               # Database models
│   │   ├── User.js          # User model with RBAC
│   │   └── Expense.js       # Expense model
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── users.js         # User management (admin only)
│   │   └── expenses.js      # Expense CRUD operations
│   ├── middleware/           # Custom middleware
│   │   ├── auth.js          # JWT authentication
│   │   └── rbac.js          # Role-based access control
│   ├── create-demo-users-extended.js  # Demo user creation
│   ├── check-demo-users.js  # Database verification
│   └── server.js            # Main server file
├── src/                      # Frontend (React + TypeScript)
│   ├── components/           # Reusable components
│   │   ├── AdminDashboard.tsx    # Admin user management
│   │   ├── ExpenseForm.tsx       # Expense creation/editing
│   │   ├── ExpenseList.tsx       # Expense display
│   │   ├── RoleGuard.tsx         # Role-based rendering
│   │   └── ...
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication & RBAC
│   ├── pages/                # Page components
│   │   ├── Dashboard.tsx     # Main dashboard
│   │   ├── Login.tsx         # Authentication
│   │   └── ...
│   └── App.tsx              # Main app component
├── docs/                     # Documentation
│   ├── RBAC_IMPLEMENTATION.md    # RBAC documentation
│   ├── VERCEL_DEMO_GUIDE.md      # Deployment guide
│   └── DEPLOYMENT_CHECKLIST.md   # Deployment checklist
└── README.md                # This file
```

---

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Expenses** (Role-based)
- `GET /api/expenses` - Get user's expenses (all roles)
- `GET /api/expenses/stats` - Get user's statistics (all roles)
- `POST /api/expenses` - Create expense (admin, user)
- `PUT /api/expenses/:id` - Update expense (admin, user)
- `DELETE /api/expenses/:id` - Delete expense (admin, user)

### **Users** (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - System statistics

---

## 🚀 **Deployment**

### **Vercel (Frontend)**
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `VITE_REACT_APP_API_URL` - Your backend URL
3. Deploy automatically on push

### **Railway/Render (Backend)**
1. Connect GitHub repository
2. Set environment variables:
   - `MONGO_URI` - MongoDB Atlas connection
   - `JWT_SECRET` - Secure JWT secret
   - `NODE_ENV=production`
3. Deploy and get backend URL

### **MongoDB Atlas**
1. Create free cluster
2. Get connection string
3. Update `MONGO_URI` in backend

---

## 📊 **Database Schema**

### **User Model**
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

### **Expense Model**
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

---

## 🧪 **Testing**

### **Manual Testing**
- ✅ **Authentication** - Login/logout with different roles
- ✅ **RBAC** - Test role-based UI and permissions
- ✅ **CRUD Operations** - Create, read, update, delete expenses
- ✅ **Admin Dashboard** - User management functionality
- ✅ **Responsive Design** - Test on different screen sizes

### **API Testing**
```bash
# Health check
curl http://localhost:5000/api/health

# Test with admin token
curl -H "Authorization: Bearer <admin-token>" http://localhost:5000/api/users
```

---

## 🔒 **Security Features**

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Role-based Access** - Three-tier permission system
- **Input Validation** - Server-side validation
- **CORS Protection** - Configured for production
- **Data Isolation** - Users only access own data
- **Admin Controls** - Secure user management

---

## 📱 **Screenshots**

### **Admin Dashboard**
![Admin Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Admin+Dashboard)

### **User Management**
![User Management](https://via.placeholder.com/800x400/059669/FFFFFF?text=User+Management)

### **Expense Management**
![Expense Management](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Expense+Management)

### **Role-based UI**
![Role-based UI](https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Role-based+UI)

---

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

---

## 📞 **Contact & Support**

- **Developer:** Ashirvad Dubey
- **LinkedIn:** [https://www.linkedin.com/in/ashirvad-dubey-a43bb7253/](https://www.linkedin.com/in/ashirvad-dubey-a43bb7253/)
- **Issues:** [GitHub Issues](https://github.com/your-username/expense-tracker/issues)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 **Acknowledgments**

- **React** - For the amazing UI library
- **Express.js** - For the robust backend framework
- **MongoDB** - For the flexible database
- **Tailwind CSS** - For the beautiful styling
- **Framer Motion** - For smooth animations

---

**🚀 Ready to take control of your expenses with enterprise-grade security and role-based access control!**