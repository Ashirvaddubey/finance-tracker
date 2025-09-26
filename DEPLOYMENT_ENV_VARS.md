# Environment Variables for Deployment

## ❌ **DON'T USE (Local Only)**
```bash
MONGO_URI=mongodb://localhost:27017/Expense-Management-System
JWT_SECRET=mySuperSecretKey123!
PORT=5000
```

## ✅ **USE FOR DEPLOYMENT**

### **Option 1: MongoDB Atlas (Free)**
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=mySuperSecretKey123!
PORT=5000
```

### **Option 2: Railway MongoDB (Easiest)**
```bash
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/expense-tracker
JWT_SECRET=mySuperSecretKey123!
PORT=5000
```

## 🚀 **Quick Deployment Steps**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Create new project**
4. **Deploy from GitHub repo**
5. **Add these environment variables:**
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker`
   - `JWT_SECRET=mySuperSecretKey123!`
   - `PORT=5000`

## 📋 **After Backend Deployment**

1. **Get your backend URL** (e.g., `https://your-app.railway.app`)
2. **Update frontend:**
   ```bash
   vercel env rm VITE_REACT_APP_API_URL production
   vercel env add VITE_REACT_APP_API_URL
   # Enter your backend URL
   vercel --prod
   ```

## 🎯 **Result**

- ✅ **Backend deployed** with proper database
- ✅ **Frontend connected** to backend
- ✅ **Full functionality** working
- ✅ **Demo credentials** ready to use
