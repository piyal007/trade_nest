import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import API_URL from '../config/apiConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerCategories, setFooterCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        if (isMounted) setFooterCategories(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch {
        if (isMounted) setFooterCategories([]);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-400">TradeNest</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Your trusted global TradeNest marketplace connecting suppliers with buyers worldwide.
              Quality products, secure transactions, and reliable logistics.
            </p>
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com/tradenest" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaFacebook size={24}/>
              </Link>
              <Link to="https://www.instagram.com/tradenest" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaInstagram size={24}/>
              </Link>
              <Link to="https://www.twitter.com/tradenest" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaTwitter size={24}/>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link to="/all-products" className="text-gray-400 hover:text-blue-400 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-blue-400 transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerCategories.length > 0 ? (
                footerCategories.map((cat) => (
                  <li key={cat._id}>
                    <Link to={`/category/${cat._id}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link to="/categories" className="text-gray-400 hover:text-blue-400 transition-colors">All Categories</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                123 Business Street, City, Country
              </p>
              <p className="text-gray-400 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                contact@tradenest.com
              </p>
              <p className="text-gray-400 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +1 234 567 8900
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} TradeNest. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms of Service</Link>
              <Link to="/shipping" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Shipping Policy</Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;