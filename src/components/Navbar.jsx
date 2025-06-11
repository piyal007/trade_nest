import React, { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = false;
  const user = null;

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
            {isLoggedIn && (
              <>
                <Link to="/all-products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">All Products</Link>
                <Link to="/add-product" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">Add Product</Link>
                <Link to="/my-products" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">My Products</Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
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
                  onClick={() => {/* TODO: Add logout handler */}} 
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
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-4 pt-2">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">Home</Link>
            <Link to="/categories" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">Categories</Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">Cart</Link>
            
            {isLoggedIn && (
              <>
                <Link to="/all-products" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">All Products</Link>
                <Link to="/add-product" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">Add Product</Link>
                <Link to="/my-products" className="text-gray-600 hover:text-blue-600 transition-colors text-base font-medium">My Products</Link>
              </>
            )}

            {/* Mobile Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex flex-col space-y-4 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <img 
                    src={user?.photoURL || 'https://via.placeholder.com/40'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border-2 border-blue-500"
                  />
                  <span className="text-gray-800 text-sm font-medium">{user?.displayName || 'User'}</span>
                </div>
                <button 
                  onClick={() => {/* TODO: Add logout handler */}} 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-red-600 transition-colors w-full text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 pt-2 border-t border-gray-200">
                <Link 
                  to="/login" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-600 transition-colors w-full text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-500 hover:text-white transition-colors w-full text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;