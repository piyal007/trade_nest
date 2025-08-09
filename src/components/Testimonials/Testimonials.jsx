import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    { 
      name: 'Sarah Johnson', 
      company: 'Tech Solutions Inc.', 
      position: 'Procurement Manager',
      text: 'The wholesale electronics we purchased were of excellent quality and arrived on time. Their inventory selection is impressive and pricing competitive.', 
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    { 
      name: 'Michael Chen', 
      company: 'Fashion Forward', 
      position: 'Supply Chain Director',
      text: 'We\'ve been sourcing our inventory here for over a year. Competitive pricing and reliable shipping every time. Their customer service team is always responsive.', 
      rating: 4,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    { 
      name: 'Emma Rodriguez', 
      company: 'Home Essentials Co.', 
      position: 'CEO',
      text: 'The customer service team went above and beyond to help with our bulk order. Will definitely order again. Their product quality exceeds expectations.', 
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    { 
      name: 'David Thompson', 
      company: 'Global Retail Partners', 
      position: 'Purchasing Agent',
      text: 'Exceptional service and product quality. Their wholesale platform is intuitive and makes ordering in bulk a breeze. Highly recommended for any retailer.', 
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    { 
      name: 'Aisha Patel', 
      company: 'Modern Gadgets', 
      position: 'Operations Manager',
      text: 'Their wholesale prices allowed us to maintain healthy margins while offering competitive retail prices. The shipping is always on time and packaging is secure.', 
      rating: 4,
      image: 'https://randomuser.me/api/portraits/women/37.jpg'
    },
    { 
      name: 'Robert Kim', 
      company: 'Electro Distributors', 
      position: 'Founder',
      text: 'As a distributor, finding reliable wholesale partners is crucial. This platform has consistently delivered quality products at great prices with excellent support.', 
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/52.jpg'
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      borderColor: "#3B82F6", // blue-500
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const avatarVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const quoteVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  // Function to render star ratings
  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'} inline-block`} 
      />
    ));
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-24 left-1/4 w-72 h-72 bg-blue-100 rounded-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Trusted by businesses worldwide for quality wholesale products and exceptional service</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Testimonial Cards */}
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col h-full relative"
              variants={cardVariants}
              whileHover="hover"
            >
              <FaQuoteLeft className="text-blue-100 text-4xl absolute top-6 left-6" />
              
              <motion.div 
                className="mb-6 relative z-10"
                variants={quoteVariants}
                initial="initial"
                animate="animate"
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  {testimonial.text}
                </p>
                <div className="mb-2">
                  {renderRating(testimonial.rating)}
                </div>
              </motion.div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center">
                <motion.div 
                  className="mr-4 overflow-hidden rounded-full border-2 border-blue-100 flex-shrink-0"
                  variants={avatarVariants}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 object-cover"
                  />
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-blue-600 font-medium">{testimonial.company}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              
              <FaQuoteRight className="text-blue-100 text-4xl absolute bottom-6 right-6" />
            </motion.div>
          ))}
        </motion.div>
        
        
      </div>
    </section>
  );
};

export default Testimonials;