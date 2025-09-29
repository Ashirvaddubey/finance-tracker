# Expense Tracker with RBAC

A full-stack expense tracking application with Role-Based Access Control (RBAC) built with React, Node.js, and MongoDB.

## 🚀 Live Demo

**Frontend:** https://project-tau-sooty.vercel.app/  
**Backend:** https://finance-tracker-18ib.onrender.com

## 🎯 Demo Credentials

### Admin Account (Full Access)
- **Email:** `admin@demo.com`
- **Password:** `admin123`
- **Features:** User management, role changes, system statistics, admin dashboard

### User Account (Standard Access)
- **Email:** `testuser@test.com`
- **Password:** `test123`
- **Features:** Create/edit/delete expenses, view analytics

### Read-Only Account (View Only)
- **Email:** `demo-readonly@test.com`
- **Password:** `readonly123`
- **Features:** View expenses and analytics only, restricted UI

## ✨ Features

### 🔐 Role-Based Access Control (RBAC)
- **Admin:** Full system access, user management, role assignment
- **User:** Standard CRUD operations on own data
- **Read-Only:** View-only access with disabled forms

### 💰 Expense Management
- Add, edit, delete expenses
- Categorize expenses
- Date-based filtering
- Real-time analytics

### 📊 Analytics & Dashboard
- Interactive charts and graphs
- Expense trends and insights
- Category-wise breakdown
- Monthly/yearly summaries

### 🎨 Modern UI/UX
- Responsive design
- Dark/light theme support
- Smooth animations
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/Ashirvaddubey/finance-tracker.git
   cd finance-tracker
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
```

4. **Set up environment variables**
   ```bash
   # Create .env file in server directory
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**
```bash
   # Terminal 1 - Backend
cd server
npm run dev

   # Terminal 2 - Frontend
   cd ..
npm run dev
```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
finance-tracker/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   └── main.tsx           # Entry point
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Users (Admin Only)
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variable: `VITE_REACT_APP_API_URL=your_backend_url`
3. Deploy automatically

### Backend (Render)
1. Connect GitHub repository to Render
2. Set root directory to `server`
3. Add environment variables:
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `NODE_ENV=production`
   - `PORT=5000`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling
- MongoDB for the database
- Vercel and Render for hosting
