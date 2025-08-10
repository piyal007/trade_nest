import React, { useState, forwardRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Swal from 'sweetalert2';

const Navbar = forwardRef((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out of your account.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3B82F6',
        cancelButtonColor: '#EF4444',
        confirmButtonText: 'Yes, logout!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        await signOut(); // Using the signOut function from AuthContext
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully logged out!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  return (
    // Apply the ref to the nav element
    <nav ref={ref} className="bg-gray-50 dark:bg-gray-900 fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between h-16 items-center">
          {/* Logo/Website Name */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              TradeNest
            </span>
          </Link>

          {/* Desktop Navigation (centered independently) */}
          <div className="hidden md:flex items-center gap-6 whitespace-nowrap absolute left-1/2 -translate-x-1/2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium text-sm"
                  : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium text-sm"
                  : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              }
            >
              Categories
            </NavLink>
            <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium text-sm"
                      : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                  }
                >
                  All Products
              </NavLink>
            {/* Protected Routes - Only visible when logged in */}
            {user && (
              <>
                
                <NavLink
                  to="/add-product"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium text-sm"
                      : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                  }
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/my-products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium text-sm"
                      : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                  }
                >
                  My Products
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium text-sm"
                      : "text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                  }
                >
                  Cart
                </NavLink>
              </>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4 justify-self-end">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                // Sun icon for dark mode
                <svg
                  className="w-5 h-5 transition-transform duration-300 hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // Moon icon for light mode
                <svg
                  className="w-5 h-5 transition-transform duration-300 hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.postimg.cc/yxzXkbkL/avatar.jpg"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:border-blue-600 transition-colors"
                  />
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-2 px-3 rounded -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap shadow-lg">
                    {user?.displayName || "User"}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ui-btn ui-btn--filled bg-[var(--color-danger)] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="ui-btn ui-btn--filled"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ui-btn ui-btn--outline"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                  : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              }
            >
              Categories
            </NavLink>
            <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  }
                >
                  All Products
                </NavLink>
            {user && (
              <>
                
                <NavLink
                  to="/add-product"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  }
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/my-products"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  }
                >
                  My Products
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800"
                      : "block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  }
                >
                  Cart
                </NavLink>
              </>
            )}
            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {/* Mobile Theme Toggle */}
              <div className="px-3 mb-3">
                <button
                  onClick={toggleTheme}
                  className="flex items-center w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {isDarkMode ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-3 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-3 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
              
              {user ? (
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-blue-500"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                      {user?.displayName || "User"}
                    </div>
                    <button
                      onClick={handleLogout}
                  className="mt-2 w-full ui-btn ui-btn--filled bg-[var(--color-danger)] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Link
                    to="/login"
                  className="block w-full ui-btn ui-btn--filled"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                  className="block w-full ui-btn ui-btn--outline"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;