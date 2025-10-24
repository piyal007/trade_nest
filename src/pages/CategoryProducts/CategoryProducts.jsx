import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import API_URL from '../../config/apiConfig';

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set a default title, will be updated when category data is loaded
  useDocumentTitle(category ? `${category.name} Products` : 'Category Products');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);

        // First, fetch the category details
        const categoryResponse = await fetch(`${API_URL}/categories/${id}`);

        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category');
        }

        const categoryData = await categoryResponse.json();
        setCategory(categoryData);

        // Add a function to convert category names to slugs
        const categoryToSlug = (categoryName) => {
          return categoryName.toLowerCase().replace(/[&\s]+/g, '_');
        };

        // Then, fetch products for this category
        // Log the category name for debugging
        console.log('Fetching products for category:', categoryData.name);

        // Generate slug from category name
        const categorySlug = categoryToSlug(categoryData.name);

        // First try with slug
        let productsResponse = await fetch(`${API_URL}/products?category=${encodeURIComponent(categorySlug)}`);

        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }

        let productsData = await productsResponse.json();

        // If no products found with exact match, try case-insensitive search on the client side
        if (productsData.length === 0) {
          // Fetch all products
          const allProductsResponse = await fetch(`${API_URL}/products`);

          if (!allProductsResponse.ok) {
            throw new Error('Failed to fetch products');
          }

          const allProductsData = await allProductsResponse.json();

          // Filter products by category name (case-insensitive)
          productsData = allProductsData.filter(product =>
            product.category &&
            product.category.toLowerCase() === categoryData.name.toLowerCase()
          );
        }

        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategoryAndProducts();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 pb-8 pt-18 animate-fade-in">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 animate-fade-in">
          <span className="loading loading-bars loading-lg text-blue-500 animate-pulse"></span>
          <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 animate-slide-up">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 font-semibold"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {category && (
            <div className="mb-8 animate-slide-down">
              <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center mb-4 md:mb-0">
                  {category.image && (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-full border-2 border-blue-200 mr-4"
                    />
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
                    <p className="text-gray-600">{products.length} products available</p>
                  </div>
                </div>
                <Link
                  to="/categories"
                  className="ui-btn ui-btn--filled transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  Back to Categories
                </Link>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12 card-surface shadow-sm animate-slide-up">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">There are no products available in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="card-surface shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative group h-48 overflow-hidden">
                    <div className="h-full w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col justify-between items-start mb-3 gap-2">
                        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-1">{product.name}</h2>
                        <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg shadow-sm border border-amber-100 self-start">
                          <Rating
                            initialValue={product.rating}
                            readonly={true}
                            size={18}
                            fillColor="#f59e0b"
                            emptyColor="#e5e7eb"
                            allowFraction={true}
                            className="mr-1 flex flex-row gap-1"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '2px',
                              alignItems: 'center'
                            }}
                            SVGstyle={{
                              display: 'inline-block',
                              marginRight: '1px'
                            }}
                            transition
                          />
                          <span className="font-medium text-amber-700 ml-1 text-sm">{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{product.brandName}</span>
                      </div>

                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{product.description}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-blue-100">
                          <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Price</span>
                          <div className="flex items-baseline">
                            <span className="font-bold text-lg text-gray-800">${product.price}</span>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-100 transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-blue-100">
                          <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Qty</span>
                          <div className="flex items-baseline">
                            <span className="font-bold text-lg text-gray-800">{product.mainQuantity}</span>
                          </div>
                        </div>

                        <div className="bg-amber-50 p-2 rounded-lg border border-amber-100 transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-amber-100">
                          <span className="block text-amber-600 text-xs font-semibold uppercase tracking-wide mb-1">Min</span>
                          <div className="flex items-baseline">
                            <span className="font-bold text-lg text-gray-800">{product.minSellingQuantity}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to={`/product/${product._id}`}
                        className="ui-btn ui-btn--filled w-full justify-center text-sm shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 group/btn"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryProducts;