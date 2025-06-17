import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import API_URL from '../../config/apiConfig';

const Cart = () => {
  // Set document title for Cart page
  useDocumentTitle('Shopping Cart');
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Replace the fetch URLs with the centralized API_URL
        const response = await fetch(`${API_URL}/cart?email=${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        
        const data = await response.json();
        setCartItems(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError(err.message || 'Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleRemoveFromCart = async (cartItemId, quantity, productId) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will remove the product from your cart and increase the product quantity in inventory.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      });

      if (!result.isConfirmed) return;

      // Show loading state
      Swal.fire({
        title: 'Processing',
        text: 'Removing item from cart...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Send request to remove from cart and increase product quantity
      const response = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          quantity
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove item from cart');
      }

      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item._id !== cartItemId));

      // Show success message
      Swal.fire({
        title: 'Removed!',
        text: 'The product has been removed from your cart.',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to remove item from cart',
        icon: 'error'
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-16">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't purchased any products yet.</p>
          <Link 
            to="/categories" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Cart</h1>
        <p className="text-gray-600">Products you have purchased</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {item.product.category}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">{item.product.name}</h3>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {item.product.brandName}
                </span>
              </div>
              
              <div className="flex items-center mb-3 bg-gray-50 p-2 rounded-lg">
                <span className="text-xs text-gray-500 mr-2">Rating:</span>
                <div className="flex items-center">
                  <Rating
                    initialValue={item.product.rating}
                    readonly={true}
                    size={18}
                    fillColor="#f59e0b"
                    emptyColor="#e5e7eb"
                    allowFraction={true}
                    className="mr-2"
                    style={{ display: 'flex', flexDirection: 'row' }}
                    SVGstyle={{ display: 'inline-block', marginRight: '2px' }}
                  />
                  <span className="font-semibold text-gray-800">{item.product.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-600 text-sm line-clamp-2">{item.product.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="block text-xs text-gray-500">Purchased</span>
                  <span className="font-semibold text-gray-800">{new Date(item.purchaseDate).toLocaleDateString()}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="block text-xs text-gray-500">Quantity</span>
                  <span className="font-semibold text-gray-800">{item.quantity} units</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="block text-xs text-gray-500">Min. Order</span>
                  <span className="font-semibold text-gray-800">{item.product.minSellingQuantity} units</span>
                </div>
                <div className="bg-gray-50 p-2 rounded-lg">
                  <span className="block text-xs text-gray-500">Price</span>
                  <span className="font-semibold text-gray-800">${item.product.price}/unit</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Link 
                  to={`/product/${item.product._id}`} 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleRemoveFromCart(item._id, item.quantity, item.product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;