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

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our top categories for wholesale products at competitive prices</p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div 
              className="rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"
              variants={spinnerVariants}
              animate="animate"
            ></motion.div>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-500">{error}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.length === 0 ? (
              <motion.div 
                className="col-span-5 text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600">No categories available</p>
              </motion.div>
            ) : (
              categories.map((category) => (
                <Link to={`/category/${category._id}`} key={category._id}>
                  <motion.div 
                    className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="relative pb-[100%] overflow-hidden">
                      <motion.img 
                        src={category.image} 
                        alt={category.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                        variants={imageVariants}
                        whileHover="hover"
                      />
                    </div>
                    <div className="p-4 text-center flex flex-col justify-between">
                      <motion.h3 
                        className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1"
                        whileHover={{ color: "#2563eb" }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.name}
                      </motion.h3>
                      <p className="text-sm text-blue-600 font-medium">{category.productCount || 0} Products</p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;