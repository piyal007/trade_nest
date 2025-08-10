import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import API_URL from '../../config/apiConfig';

const AllProducts = () => {
  // Set document title for All Products page
  useDocumentTitle('All Products');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('none'); // none | priceAsc | priceDesc

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products from the server
        const response = await fetch(`${API_URL}/products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllProducts();
  }, []);
  
  // Filter products when showAvailable changes
  useEffect(() => {
    if (showAvailable) {
      // Filter products with minSellingQuantity > 100
      const available = products.filter(product => product.minSellingQuantity > 100);
      setFilteredProducts(available);
    } else {
      // Show all products
      setFilteredProducts(products);
    }
  }, [showAvailable, products]);

  // Compute a sorted list based on current sort selection
  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case 'priceAsc':
        return copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case 'priceDesc':
        return copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      default:
        return copy;
    }
  }, [filteredProducts, sortBy]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 all-products-page" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-solid"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-solid absolute top-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 all-products-page" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div className="card-surface shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex items-center mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Something went wrong</h2>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.reload()} 
              className="ui-btn ui-btn--danger"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if there are no products at all or no products matching the filter
  if (products.length === 0 || (showAvailable && filteredProducts.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50 all-products-page" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
          <div className="card-surface shadow-lg p-10 max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {products.length === 0 ? 'No Products Available' : 'No Products Match Filter'}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {products.length === 0 
              ? 'There are currently no products in the inventory' 
              : 'No products with minimum selling quantity greater than 100'}
          </p>
          {showAvailable && filteredProducts.length === 0 && products.length > 0 && (
            <button 
              onClick={() => setShowAvailable(false)}
              className="ui-btn ui-btn--filled"
            >
              Show All Products
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 all-products-page" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 card-surface card-surface--header p-6 shadow-md">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            All Products
          </h1>
          <p className="text-gray-600 mt-1">Browse all available products</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* View Toggle Dropdown */}
          <div className="relative">
            <button 
              className="toolbar-btn w-full sm:w-auto justify-between"
              onClick={() => document.getElementById('viewDropdown').classList.toggle('hidden')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                {viewMode === 'card' ? (
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                ) : (
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                )}
              </svg>
              {viewMode === 'card' ? 'Card View' : 'Table View'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div id="viewDropdown" className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-700 rounded-md shadow-xl hidden z-50">
              <div className="py-1">
                <button 
                  onClick={() => {
                    setViewMode('card');
                    document.getElementById('viewDropdown').classList.add('hidden');
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${viewMode === 'card' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
                >
                  Card View
                </button>
                <button 
                  onClick={() => {
                    setViewMode('table');
                    document.getElementById('viewDropdown').classList.add('hidden');
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${viewMode === 'table' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}`}
                >
                  Table View
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Button */}
          <button 
            onClick={() => setShowAvailable(!showAvailable)}
            className={`toolbar-btn w-full sm:w-auto ${showAvailable ? 'toolbar-btn--active' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            {showAvailable ? 'Show All Products' : 'Show Available Products'}
          </button>

          {/* Sort Select */}
          <div>
            <label htmlFor="sortSelect" className="sr-only">Sort products</label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="toolbar-select w-full sm:w-auto"
            >
              <option value="none">Sort: Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

            {/* Product Display - Card or Table View */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product._id} className="card-surface shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
              <div className="relative group h-48">
                <div className="h-full w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 radius-card"></div>
                </div>
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.category}
                </div>
                <div className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-blue-500/15 text-blue-300 backdrop-blur-sm ring-1 ring-inset ring-blue-300/30 dark:bg-blue-400/20 dark:text-blue-200">
                  {product.brandName}
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
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  
                   <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                      <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Price</span>
                      <div className="flex items-baseline">
                        <span className="font-bold text-lg text-gray-800">${product.price}</span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                      <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Qty</span>
                      <div className="flex items-baseline">
                        <span className="font-bold text-lg text-gray-800">{product.mainQuantity}</span>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                      <span className="block text-amber-600 text-xs font-semibold uppercase tracking-wide mb-1">Min</span>
                      <div className="flex items-baseline">
                        <span className="font-bold text-lg text-gray-800">{product.minSellingQuantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  {/* <Link 
                    to={`/update-product/${product._id}`} 
                    className="w-full px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-amber-600 transition-all duration-300 text-sm font-medium text-center shadow-md flex items-center justify-center mb-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Update
                  </Link> */}
                  <Link
                    to={`/product/${product._id}`}
                    className="w-full px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm font-medium text-center shadow-md flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      ) : (
        <div className="overflow-x-auto card-surface shadow-lg">
          {/* Mobile card view for small screens */}
          <div className="block md:hidden">
            {sortedProducts.map((product, index) => (
              <div key={product._id} className={`p-4 border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-all duration-200 hover:bg-blue-50`}>
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 h-20 w-20 mr-4">
                    <img className="h-20 w-20 rounded-lg object-cover shadow-sm border border-gray-200" src={product.image} alt={product.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 truncate">
                        {product.category}
                      </span>
                      <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-700 truncate">
                        {product.brandName}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1.5">Rating</span>
                    <div className="inline-flex items-center bg-amber-50 px-2.5 py-1.5 rounded-md w-full">
                      <Rating
                        initialValue={product.rating}
                        readonly={true}
                        size={14}
                        fillColor="#f59e0b"
                        emptyColor="#e5e7eb"
                        allowFraction={true}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '1px',
                          alignItems: 'center'
                        }}
                        SVGstyle={{
                          display: 'inline-block',
                          marginRight: '1px'
                        }}
                      />
                      <span className="text-xs font-medium text-amber-700 ml-1.5">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1.5">Price</span>
                    <span className="text-base font-bold text-blue-600 block text-center">${product.price}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1.5">Available</span>
                    <span className="text-sm font-medium text-gray-700 bg-blue-50 px-2.5 py-1.5 rounded-md inline-block w-full text-center">{product.mainQuantity}</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="block text-xs font-medium text-gray-500 mb-1.5">Min Order</span>
                    <span className="text-sm font-medium text-gray-700 bg-amber-50 px-2.5 py-1.5 rounded-md inline-block w-full text-center">{product.minSellingQuantity}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  {/* <Link to={`/update-product/${product._id}`} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-md transition-colors duration-200 inline-block text-center text-sm font-medium w-full shadow-sm">
                    Update
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop table view for medium screens and up */}
          <table className="hidden md:table w-full table-fixed divide-y divide-gray-200">
            <colgroup>
              <col className="w-1/4" /> {/* Product - wider */}
              <col className="w-1/6" /> {/* Category & Brand */}
              <col className="w-1/12" /> {/* Rating */}
              <col className="w-1/12" /> {/* Price */}
              <col className="w-1/12" /> {/* Available */}
              <col className="w-1/12" /> {/* Min Order */}
              <col className="w-1/12" /> {/* Actions */}
            </colgroup>
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th scope="col" className="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Category & Brand</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Rating</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Available</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Min Order</th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedProducts.map((product, index) => (
                <tr key={product._id} className={`hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-5 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 mr-3">
                        <img className="h-12 w-12 rounded-lg object-cover shadow-sm border border-gray-200" src={product.image} alt={product.name} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-semibold text-gray-900 truncate">{product.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 mt-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-5 border-b border-gray-100">
                    <div className="flex flex-col space-y-2">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 truncate">
                        {product.category}
                      </span>
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-gray-100 text-gray-700 truncate">
                        {product.brandName}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-5 border-b border-gray-100">
                    <div className="inline-flex items-center bg-amber-50 px-3 py-1.5 rounded-md">
                      <Rating
                        initialValue={product.rating}
                        readonly={true}
                        size={14}
                        fillColor="#f59e0b"
                        emptyColor="#e5e7eb"
                        allowFraction={true}
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
                      />
                      <span className="text-xs font-medium text-amber-700 ml-2">{product.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-3 py-5 border-b border-gray-100 text-sm font-bold text-blue-600">${product.price}</td>
                   <td className="px-3 py-5 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-blue-50 px-3 py-1.5 rounded-md inline-block text-center">{product.mainQuantity}</span>
                  </td>
                  <td className="px-3 py-5 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-700 bg-amber-50 px-3 py-1.5 rounded-md inline-block text-center">{product.minSellingQuantity}</span>
                  </td>
                  <td className="px-3 py-5 border-b border-gray-100 text-sm font-medium">
                    {/* <Link to={`/update-product/${product._id}`} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md transition-colors duration-200 inline-block text-center text-xs font-medium">
                      Update
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;