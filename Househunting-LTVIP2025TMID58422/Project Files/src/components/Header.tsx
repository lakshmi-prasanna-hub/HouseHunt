import React, { useState } from 'react';
import { Home, User, LogOut, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  onAddPropertyClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onAddPropertyClick }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">HouseHunt</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700">Welcome, {user?.name}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                  {user?.role}
                </span>
                {user?.role === 'owner' && onAddPropertyClick && (
                  <button
                    onClick={onAddPropertyClick}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="px-4">
                  <p className="text-gray-700 font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.role} Account</p>
                </div>
                {user?.role === 'owner' && onAddPropertyClick && (
                  <button
                    onClick={() => {
                      onAddPropertyClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Property</span>
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                <User className="h-4 w-4" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;