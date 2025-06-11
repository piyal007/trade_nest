import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Successfully logged out!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className='w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Website Name */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">B2B Wholesale</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Home</Link>
            <Link to="/categories" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Categories</Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Cart</Link>
            
            {/* Protected Routes - Only visible when logged in */}
            {user && (
              <>
                <Link to="/all-products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">All Products</Link>
                <Link to="/add-product" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Add Product</Link>
                <Link to="/my-products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">My Products</Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img 
                    src={user?.photoURL || 'https://via.placeholder.com/40'} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:border-blue-600 transition-colors"
                  />
                  <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs py-2 px-3 rounded -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap shadow-lg">
                    {user?.displayName || 'User'}
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                stroke="currentColor" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Home</Link>
            <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Categories</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Cart</Link>
            
            {user && (
              <>
                <Link to="/all-products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">All Products</Link>
                <Link to="/add-product" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">Add Product</Link>
                <Link to="/my-products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors">My Products</Link>
              </>
            )}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={user?.photoURL || 'https://via.placeholder.com/40'} 
                      alt="Profile" 
                      className="h-10 w-10 rounded-full border-2 border-blue-500"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.displayName || 'User'}</div>
                    <button 
                      onClick={handleLogout}
                      className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Link 
                    to="/login"
                    className="block w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register"
                    className="block w-full border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
};

export default Navbar;