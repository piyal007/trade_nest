import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const primaryButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  const secondaryButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      y: -8,
      backgroundColor: "rgba(29, 78, 216, 0.7)", // blue-700 with opacity
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { scale: 0.98 }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          variants={itemVariants}
        >
          Ready to Start Wholesale Shopping?
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
          variants={itemVariants}
        >
          Join thousands of businesses that trust us for their wholesale needs
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <motion.button 
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg text-lg shadow-lg"
            variants={primaryButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Create Business Account
          </motion.button>
          <motion.button 
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg"
            variants={secondaryButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;