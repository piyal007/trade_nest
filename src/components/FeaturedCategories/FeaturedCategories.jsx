import React from 'react';

const FeaturedCategories = () => {
  const categories = [
    'Electronics', 
    'Fashion', 
    'Home & Kitchen', 
    'Beauty',
    'Office Supplies' // Added fifth category to meet the minimum requirement
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our top categories for wholesale products at competitive prices</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Category Cards */}
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-5xl">🛒</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800">{category}</h3>
                <p className="text-sm text-gray-600 mt-1">Wholesale deals</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;