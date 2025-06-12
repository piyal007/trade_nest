import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Update document title when component mounts
  useEffect(() => {
    document.title = 'Categories | B2B Wholesale';
  }, []);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our extensive range of wholesale product categories for your business needs</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-600 text-xl">No categories found.</p>
              </div>
            ) : (
              categories.map((category) => (
                <div 
                  key={category._id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl relative flex flex-col h-[600px] border border-gray-100 hover:border-blue-100"
                >
                  {/* Category Image */}
                  <div className="h-96 overflow-hidden bg-gray-50">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  {/* Popular Tag */}
                  {category.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-red-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                        Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Category Content */}
                  <div className="p-8 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-2xl text-gray-800 mb-3 hover:text-blue-600 transition-colors">{category.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{category.description}</p>
                    </div>
                    
                    {/* Product Count */}
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                      <span className="text-blue-600 font-semibold">{category.productCount?.toLocaleString() || 0} Products</span>
                    </div>
                    
                    {/* Popular Items */}
                    <div>
                      {category.subcategories && category.subcategories.length > 0 ? (
                        <>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">POPULAR ITEMS</p>
                          <div className="flex flex-wrap gap-2">
                            {category.subcategories.map((item, index) => (
                              <span key={index} className="bg-gray-50 text-gray-700 text-xs px-4 py-1.5 rounded-full font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                {item}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-8"></div>
                      )}
                    </div>
                    
                    {/* View Products Button */}
                    <Link 
                      to={`/category/${category._id}`} 
                      className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors font-semibold shadow-sm hover:shadow-md"
                    >
                      VIEW PRODUCTS
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;