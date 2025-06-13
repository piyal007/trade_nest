import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProducts = () => {
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
      <div className="flex justify-center items-center min-h-screen" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">You haven't added any products yet</h2>
          <p className="text-gray-600 mb-6">Start adding products to your inventory</p>
          <Link 
            to="/add-product" 
            className="inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Add Your First Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
        <Link 
          to="/add-product" 
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative pb-[60%] overflow-hidden bg-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="absolute h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h2>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">{product.category}</span>
                <span className="text-sm font-medium text-blue-600">{product.brandName}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center mb-3">
                <div className="text-gray-700">
                  <span className="font-bold text-lg">${product.price}</span>
                  <span className="text-xs ml-1">per unit</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                  <span className="font-medium">{product.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-100 p-2 rounded">
                  <span className="block text-gray-500 text-xs">Available</span>
                  <span className="font-medium">{product.mainQuantity} units</span>
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <span className="block text-gray-500 text-xs">Min. Order</span>
                  <span className="font-medium">{product.minSellingQuantity} units</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Link 
                  to={`/update-product/${product._id}`} 
                  className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors duration-300 text-sm font-medium flex-1 mr-2 text-center"
                >
                  Update
                </Link>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 text-sm font-medium flex-1 ml-2"
                >
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