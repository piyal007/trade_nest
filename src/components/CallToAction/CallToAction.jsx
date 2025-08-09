import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaHandshake, FaShieldAlt, FaTags, FaHeadset, FaBoxOpen, FaUsers } from 'react-icons/fa';

const CallToAction = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 22 } }
  };

  const features = [
    { icon: <FaHandshake />, title: 'Verified Suppliers', desc: 'We vet every supplier to ensure quality, reliability, and compliance.' },
    { icon: <FaTags />, title: 'Better Bulk Pricing', desc: 'Unlock aggressive wholesale discounts as your order volume increases.' },
    { icon: <FaShieldAlt />, title: 'Secure Transactions', desc: 'End-to-end encrypted payments and secure buyer protection on every order.' },
    { icon: <FaHeadset />, title: 'Priority Support', desc: 'Dedicated business support to help you source and resolve issues quickly.' },
  ];

  const stats = [
    { icon: <FaBoxOpen />, label: 'Products', value: '10k+' },
    { icon: <FaUsers />, label: 'Retail Buyers', value: '5k+' },
    { icon: <FaShieldAlt />, label: 'Satisfaction', value: '98%' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4" variants={itemVariants}>
            Why Businesses Choose TradeNest
          </motion.h2>
          <motion.p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" variants={itemVariants}>
            Scale confidently with a marketplace designed for B2B. Transparent pricing, verified partners, and dedicated support.
          </motion.p>
        </motion.div>

        {/* Feature grid - purely informational, no buttons/links */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((f, idx) => (
            <motion.div key={idx} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-full" variants={itemVariants}>
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 text-xl">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((s, idx) => (
            <motion.div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center" variants={itemVariants}>
              <div className="mx-auto mb-2 w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
                <span className="text-base">{s.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{s.value}</div>
              <div className="text-gray-600 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;