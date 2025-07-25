import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserEdit,
  FaTachometerAlt,
  FaGlobe,
  FaChevronDown
} from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';
import useTheme from '../../../hooks/useTheme';
import { getCartItems } from '../../../utils/addToCart';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const navigate = useNavigate();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeDropdowns = () => {
    setIsProfileDropdownOpen(false);
    setIsLanguageDropdownOpen(false);
  };

  // Cart items count
  const cartCount = getCartItems().length;


  return (
    <nav className="print:hidden bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="hidden lg:inline-block text-xl font-bold text-gray-800 dark:text-white">
                MediStore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Categories
            </Link>
          </div>





          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Language Dropdown */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => {
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className="flex items-center space-x-1 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <FaGlobe className="w-5 h-5" />
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <FaChevronDown className="w-3 h-3" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FaShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>





            {/* User Authentication */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsLanguageDropdownOpen(false);
                  }}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <FaUser className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <FaChevronDown className="w-3 h-3 text-gray-500" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/update-profile"
                      onClick={closeDropdowns}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaUserEdit className="w-4 h-4 mr-2" />
                      Update Profile
                    </Link>
                    <Link
                      to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'seller' ? '/dashboard/seller' : '/dashboard'}
                      onClick={closeDropdowns}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaTachometerAlt className="w-4 h-4 mr-2" />
                      {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'seller' ? 'Seller Dashboard' : 'Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Join Us
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Shop
              </Link>
              <Link
                to="/categories"
                onClick={toggleMenu}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                Categories
              </Link>
              {!user && (
                <Link
                  to="/auth/login"
                  onClick={toggleMenu}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 text-center"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for closing dropdowns */}
      {(isProfileDropdownOpen || isLanguageDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeDropdowns}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
