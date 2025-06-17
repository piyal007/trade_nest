import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const MyProducts = () => {
  // Set document title for My Products page
  useDocumentTitle('My Products');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Fetch products from the server
        const response = await fetch(`http://localhost:3000/products?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProducts();
  }, [user]);

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:3000/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // Remove the deleted product from the state
        setProducts(products.filter(product => product._id !== productId));

        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire(
        'Error!',
        'Failed to delete product. Please try again.',
        'error'
      );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-solid"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-solid absolute top-0"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading your products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
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
              className="inline-flex items-center bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition-colors duration-300"
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

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gray-50" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Product Shelf is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Start building your inventory by adding your first product</p>
          <Link 
            to="/add-product" 
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Your First Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            My Products
          </h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Link 
          to="/add-product" 
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Product
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row w-full transform hover:-translate-y-1">
            <div className="md:w-1/4 relative group">
              <div className="h-full w-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 min-h-[240px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.category}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start mb-3 gap-2">
                  <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">{product.name}</h2>
                  <div className="flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2 rounded-lg shadow-sm border border-amber-100 self-start">
                    <Rating
                      initialValue={product.rating}
                      readonly={true}
                      size={24}
                      fillColor="#f59e0b"
                      emptyColor="#e5e7eb"
                      allowFraction={true}
                      className="mr-2 flex flex-row gap-1"
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '4px',
                        alignItems: 'center'
                      }}
                      SVGstyle={{
                        display: 'inline-block',
                        marginRight: '2px'
                      }}
                      transition
                    />
                    <span className="font-medium text-amber-700 ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.brandName}</span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <span className="block text-blue-600 text-xs font-semibold uppercase tracking-wide mb-1">Price</span>
                    <div className="flex items-baseline">
                      <span className="font-bold text-2xl text-gray-800">${product.price}</span>
                      <span className="text-xs ml-1 text-gray-500">per unit</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                    <span className="block text-green-600 text-xs font-semibold uppercase tracking-wide mb-1">Available</span>
                    <div className="flex items-baseline">
                      <span className="font-bold text-xl text-gray-800">{product.mainQuantity}</span>
                      <span className="text-xs ml-1 text-gray-500">units</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                    <span className="block text-amber-600 text-xs font-semibold uppercase tracking-wide mb-1">Min. Order</span>
                    <div className="flex items-baseline">
                      <span className="font-bold text-xl text-gray-800">{product.minSellingQuantity}</span>
                      <span className="text-xs ml-1 text-gray-500">units</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-auto">
                <Link 
                  to={`/update-product/${product._id}`} 
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm font-medium text-center shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Update
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="cursor-pointer px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 text-sm font-medium shadow-md flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;