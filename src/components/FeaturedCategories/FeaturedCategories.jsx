import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API_URL from '../../config/apiConfig';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/categories`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        // Only take the first 5 categories for the featured section
        setCategories(data.slice(0, 5));
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  // Decorative elements variants
  const decorativeCircleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, // Changed from 0.05 to 1 since we're using CSS opacity now
      transition: { 
        duration: 1.5, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 right-0 w-72 h-72 rounded-full bg-blue-500 opacity-10 -mr-20 -mt-20"
        variants={decorativeCircleVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-indigo-500 opacity-10 -ml-20 -mb-20"
        variants={decorativeCircleVariants}
        initial="initial"
        animate="animate"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            <span className="inline-block relative">
              <span className="relative z-10">Featured Categories</span>
              <motion.span 
                className="absolute bottom-2 left-0 w-full h-3 opacity-20 z-0 rounded-lg"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.4 }}
              />
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Discover our curated selection of premium wholesale products across top-performing categories</p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <motion.div 
              className="rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
              variants={spinnerVariants}
              animate="animate"
            ></motion.div>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-12 bg-red-50 rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-500 font-medium text-lg">{error}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.length === 0 ? (
              <motion.div 
                className="col-span-5 text-center py-12 bg-gray-50 rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 font-medium">No categories available</p>
              </motion.div>
            ) : (
              categories.map((category) => (
                <Link to={`/category/${category._id}`} key={category._id} className="block h-full">
                  <motion.div 
                    className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transform transition-all duration-300"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="relative pb-[100%] overflow-hidden bg-gray-100">
                      <motion.img 
                        src={category.image} 
                        alt={category.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                        variants={imageVariants}
                        whileHover="hover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-5 text-center flex flex-col justify-between flex-grow">
                      <motion.h3 
                        className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1"
                        whileHover={{ color: "#2563eb" }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.name}
                      </motion.h3>
                      <div className="mt-2">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                          {category.productCount || 0} Products
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
        )}
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            to="/categories" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;