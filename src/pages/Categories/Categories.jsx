import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import API_URL from '../../config/apiConfig';

const Categories = () => {
  // Set document title for Categories page
  useDocumentTitle('Product Categories');

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Replace the fetch URL with the centralized API_URL
        const response = await fetch(`${API_URL}/categories`);

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
    document.title = 'Categories | TradeNest';
  }, []);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of wholesale products for your business
</p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
            <span className="loading loading-bars loading-lg text-blue-500 animate-pulse"></span>
            <p className="mt-4 text-gray-600 font-medium">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 animate-slide-up">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-600 text-xl">No categories found.</p>
              </div>
            ) : (
              categories.map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`}
                  className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col border border-gray-100 hover:border-blue-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Category Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">{category.description}</p>

                    {/* Product Count & Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-50 rounded-lg p-2 group-hover:bg-blue-100 transition-colors duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <span className="text-blue-600 font-semibold text-sm">{category.productCount?.toLocaleString() || 0} Products</span>
                      </div>

                      <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                        <span>View</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;