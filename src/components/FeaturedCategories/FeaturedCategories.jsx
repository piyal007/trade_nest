import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/categories');
        
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

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our top categories for wholesale products at competitive prices</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.length === 0 ? (
              <div className="col-span-5 text-center py-8">
                <p className="text-gray-600">No categories available</p>
              </div>
            ) : (
              categories.map((category) => (
                <Link to={`/category/${category._id}`} key={category._id}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.productCount || 0} Products</p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCategories;