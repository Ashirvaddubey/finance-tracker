import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://project-kdt4fvs6o-ashirvaddubeys-projects.vercel.app',
    'https://project-fvmvw80et-ashirvaddubeys-projects.vercel.app',
    'https://project-fasmd7y5o-ashirvaddubeys-projects.vercel.app',
    'https://project-2lg1tlbjs-ashirvaddubeys-projects.vercel.app',
    'https://project-qud3uzhcy-ashirvaddubeys-projects.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    // Check if MONGO_URI is properly configured
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<username>') || process.env.MONGO_URI.includes('<password>')) {
      console.error('❌ MongoDB connection string not properly configured!');
      console.log('📝 Please update your MONGO_URI in server/.env file:');
      console.log('   1. Go to https://cloud.mongodb.com/');
      console.log('   2. Create a free cluster');
      console.log('   3. Go to Database > Connect > Connect your application');
      console.log('   4. Copy the connection string and replace <username> and <password>');
      console.log('   5. Update the MONGO_URI in server/.env');
      console.log('\n⏳ Server will continue running without database connection...');
      
      // Start server without database connection
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} (without database)`);
        console.log('💡 Configure MongoDB Atlas to enable full functionality');
      });
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n📝 Troubleshooting steps:');
    console.log('   1. Check your internet connection');
    console.log('   2. Verify your MongoDB Atlas cluster is running');
    console.log('   3. Ensure your IP address is whitelisted in MongoDB Atlas');
    console.log('   4. Check that your username and password are correct');
    console.log('   5. Make sure your connection string is properly formatted');
    
    // Start server without database connection for development
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (without database)`);
      console.log('💡 Fix MongoDB connection to enable full functionality');
    });
  }
};

connectDB();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});