import React from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaPercent, FaShoppingCart } from 'react-icons/fa';

const SpecialOffers = () => {
  const offers = [
    {
      title: 'Bulk Purchase Discount',
      discount: '25% OFF',
      code: 'BULK25',
      description: 'Save big when you order in bulk quantities. Perfect for restocking your inventory.',
      icon: <FaShoppingCart />,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      title: 'New Customer Special',
      discount: '15% OFF',
      code: 'NEWB2B',
      description: 'First-time customers get an exclusive discount on their initial order.',
      icon: <FaTag />,
      color: 'from-purple-600 to-indigo-700'
    },
    {
      title: 'Seasonal Clearance',
      discount: '40% OFF',
      code: 'SEASON40',
      description: 'Limited time offer on seasonal products. Stock up before they\'re gone!',
      icon: <FaPercent />,
      color: 'from-teal-600 to-blue-700'
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.03,
      y: -2,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.97,
      boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)",
      transition: {
        duration: 0.1
      }
    }
  };

  const discountVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 8 
      }
    }
  };

  const codeVariants = {
    initial: { backgroundColor: "#F3F4F6" }, // gray-100
    hover: { 
      backgroundColor: "#DBEAFE", // blue-100
      scale: 1.05,
      y: -2,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      transition: { type: "spring", stiffness: 500, damping: 10 }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 15, 
      scale: 1.2,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 8 
      }
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-blue-200 opacity-10"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-indigo-200 opacity-10"></div>
        <div className="absolute bottom-10 left-1/3 w-48 h-48 rounded-full bg-blue-300 opacity-10"></div>
        <div className="absolute top-3/4 left-1/4 w-32 h-32 rounded-full bg-teal-200 opacity-10"></div>
        <div className="absolute -bottom-16 right-1/4 w-56 h-56 rounded-full bg-purple-200 opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">Limited Time Only</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Exclusive Special Offers</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Premium deals exclusively for our B2B customers to maximize your business potential</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Offer Cards */}
          {offers.map((offer, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group h-full flex flex-col"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className={`bg-gradient-to-r ${offer.color} text-white py-6 px-6 text-center relative`}
                variants={discountVariants}
                initial="initial"
                whileHover="hover"
              >
                <div className="flex items-center justify-center mb-2">
                  <motion.div 
                    className="text-white text-2xl mr-2"
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {offer.icon}
                  </motion.div>
                  <motion.span 
                    className="font-bold text-3xl inline-block"
                    initial={{ opacity: 0.9 }}
                    whileHover={{ 
                      opacity: 1,
                      textShadow: "0 0 8px rgba(255,255,255,0.5)"
                    }}
                  >
                    {offer.discount}
                  </motion.span>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rotate-45 bg-gradient-to-br ${offer.color}"></div>
              </motion.div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-2xl mb-3 text-gray-800">{offer.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{offer.description}</p>
                
                <div className="mb-6 flex flex-col">
                  <span className="text-gray-700 mb-2 font-medium">Use promo code:</span>
                  <motion.div 
                    className="font-mono font-semibold bg-gray-100 px-4 py-3 rounded-lg text-blue-700 inline-block text-center tracking-wider border border-gray-200"
                    variants={codeVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {offer.code}
                  </motion.div>
                </div>
                
                <motion.button 
                  className={`w-full py-4 bg-gradient-to-r ${offer.color} text-white rounded-xl font-medium shadow-md flex items-center justify-center`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <span className="font-semibold">Claim Offer</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-gray-500 mb-6">*Terms and conditions apply. Offers valid for a limited time only.</p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors duration-200">
            View all offers
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;