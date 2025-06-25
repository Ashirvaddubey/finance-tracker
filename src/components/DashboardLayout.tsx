import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wallet, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Settings
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
          transition: { type: 'tween', duration: 0.3 }
        }}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 shadow-xl lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-8">
            <Wallet className="w-8 h-8 text-blue-500" />
            <h1 className="ml-3 text-xl font-bold text-gray-900">ExpenseTracker</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActivePath(item.path)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center px-4 py-2 mb-2">
              <div className="text-2xl mr-3">{user?.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Dashboard Title (aligned with content) */}
        <div className="px-4 pt-4 lg:px-8 lg:pt-6">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-2">
            <h1 className="text-3xl font-bold text-white tracking-wide py-2">Expense Tracker</h1>
          </div>
        </div>

        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="lg:hidden"></div>
            
            <div className="flex items-center space-x-4 ml-auto">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                onClick={() => setShowNotificationsModal(true)}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                onClick={() => setShowSettingsModal(true)}
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  ref={profileBtnRef}
                  className="flex items-center p-2 rounded-full bg-white border border-gray-200 shadow hover:shadow-md transition-all focus:outline-none"
                  onClick={() => setShowProfileDropdown((v) => !v)}
                  aria-label="Profile"
                >
                  <span className="text-2xl">{user?.avatar || '👤'}</span>
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => { setShowProfileDropdown(false); handleLogout(); }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {showSettingsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowSettingsModal(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p className="text-gray-600">Settings functionality coming soon!</p>
            </div>
          </div>
        )}

        {showNotificationsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowNotificationsModal(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold mb-4">Notifications</h2>
              <p className="text-gray-600">No notifications yet.</p>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="pt-4 pb-4 px-4 lg:pt-6 lg:pb-8 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}