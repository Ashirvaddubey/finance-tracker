import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, Shield, Users, ArrowRight, Star, Sparkles, BarChart3, LockKeyhole } from 'lucide-react';

export default function Layout() {
  const features = [
    {
      icon: <Wallet className="w-7 h-7 text-blue-400" />,
      title: 'Instant Expense Capture',
      description: 'Snap a photo of your bill or receipt and let our smart system auto-categorize and log your expense in seconds.'
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-green-400" />,
      title: 'Goal-Based Planning',
      description: 'Set savings goals for travel, gadgets, or festivals and track your progress visually every month.'
    },
    {
      icon: <Star className="w-7 h-7 text-yellow-400" />,
      title: 'Rewards & Badges',
      description: 'Earn badges and rewards for smart spending, consistent tracking, and hitting your savings targets.'
    },
    {
      icon: <Users className="w-7 h-7 text-purple-400" />,
      title: 'Split & Settle Instantly',
      description: 'Easily split bills with friends or family and settle up with a tap—no more awkward reminders.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Generative Background Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/20 blur-3xl opacity-60 animate-pulse" />
      </div>
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Wallet className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">ExpenseTracker</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link
              to="/login"
              className="px-4 py-2 text-white hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="relative z-10 px-4 py-24 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg"
        >
          <span className="block">Empower Your</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">Financial Story</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
        >
          Track, analyze, and optimize your expenses with a platform designed for modern India. Get AI-powered insights, beautiful analytics, and total control over your money.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <span>Start Tracking Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border border-gray-300 text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for Smarter Spending
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Modern features, beautiful design, and real results for your financial life.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <div className="mb-4 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
                <div className="text-gray-300">Active Users</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-purple-400 mb-2">₹15Cr+</div>
                <div className="text-gray-300">Expenses Tracked</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who have already transformed their financial habits
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}