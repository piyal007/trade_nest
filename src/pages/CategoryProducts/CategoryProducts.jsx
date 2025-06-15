import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        
        // First, fetch the category details
        const categoryResponse = await fetch(`http://localhost:3000/categories/${id}`);
        
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category');
        }
        
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);
        
        // Then, fetch products for this category
        // Log the category name for debugging
        console.log('Fetching products for category:', categoryData.name);
        
        // First try exact match
        let productsResponse = await fetch(`http://localhost:3000/products?category=${encodeURIComponent(categoryData.name)}`);
        
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        
        let productsData = await productsResponse.json();
        
        // If no products found with exact match, try case-insensitive search on the client side
        if (productsData.length === 0) {
          // Fetch all products
          const allProductsResponse = await fetch('http://localhost:3000/products');
          
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
    <div className="container mx-auto px-4 pb-8 pt-18">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {category && (
            <div className="mb-8">
              <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Back to Categories
                </Link>
              </div>
            </div>
          )}

          {products.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">There are no products available in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                  <div className="relative group h-48">
                    <div className="h-full w-full overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col justify-between items-start mb-3 gap-2">
                        <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-1">{product.name}</h2>
                        <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1 rounded-lg shadow-sm border border-amber-100 self-start">
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
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-100">
                          <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Price</span>
                          <div className="flex items-baseline">
                            <span className="font-bold text-lg text-gray-800">${product.price}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2 rounded-lg border border-green-100">
                          <span className="block text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">Qty</span>
                          <div className="flex items-baseline">
                            <span className="font-bold text-lg text-gray-800">{product.mainQuantity}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-2 rounded-lg border border-amber-100">
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
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium text-center shadow-md flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v12.59l1.95-2.1a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 111.1-1.02l1.95 2.1V2.75A.75.75 0 0110 2z" clipRule="evenodd" />
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