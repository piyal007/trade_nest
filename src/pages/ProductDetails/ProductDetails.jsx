import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { useAuth } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, axiosSecure } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  
  // Set a default title, will be updated when product data is loaded
  useDocumentTitle(product ? `${product.name}` : 'Product Details');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
        // Initialize quantity with minimum selling quantity
        setQuantity(data.minSellingQuantity);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleIncreaseQuantity = () => {
    if (product && quantity < product.mainQuantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > product.minSellingQuantity) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  // Validate quantity when it changes directly
  const validateQuantity = (value) => {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return product.minSellingQuantity;
    }
    if (parsedValue < product.minSellingQuantity) {
      return product.minSellingQuantity;
    }
    if (parsedValue > product.mainQuantity) {
      return product.mainQuantity;
    }
    return parsedValue;
  };

  const handleBuy = () => {
    if (!user) {
      Swal.fire({
        title: 'Authentication Required',
        text: 'Please log in to purchase products',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    // Check if quantity is valid
    if (quantity < product.minSellingQuantity) {
      Swal.fire({
        title: 'Invalid Quantity',
        text: `Minimum order quantity is ${product.minSellingQuantity}`,
        icon: 'error'
      });
      return;
    }

    // Ensure quantity doesn't exceed available inventory
    if (quantity > product.mainQuantity) {
      Swal.fire({
        title: 'Invalid Quantity',
        text: `Maximum available quantity is ${product.mainQuantity}`,
        icon: 'error'
      });
      // Reset quantity to maximum available
      setQuantity(product.mainQuantity);
      return;
    }

    // Show purchase form modal
    Swal.fire({
      title: 'Complete Your Purchase',
      html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${user.displayName || ''}" readonly />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" value="${user.email || ''}" readonly />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
            <textarea id="address" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" rows="3" placeholder="Enter your shipping address"></textarea>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Enter your phone number" />
          </div>
          <div class="text-left bg-blue-50 p-4 rounded-md">
            <div class="flex justify-between mb-2">
              <span class="font-medium">Product:</span>
              <span>${product.name}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="font-medium">Price per unit:</span>
              <span>$${product.price}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="font-medium">Quantity:</span>
              <span>${quantity}</span>
            </div>
            <div class="flex justify-between font-bold border-t border-blue-200 pt-2 mt-2">
              <span>Total:</span>
              <span>$${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Confirm Purchase',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      preConfirm: () => {
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        
        if (!address) {
          Swal.showValidationMessage('Please enter your shipping address');
          return false;
        }
        
        if (!phone) {
          Swal.showValidationMessage('Please enter your phone number');
          return false;
        }
        
        return { address, phone };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Show loading state
          Swal.fire({
            title: 'Processing',
            text: 'Processing your purchase...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
          
          // Final validation before sending request
          if (quantity > product.mainQuantity) {
            throw new Error(`Cannot purchase more than the available quantity (${product.mainQuantity} units)`);
          }
          
          // Send purchase request with authorization token
          const response = await axiosSecure.post(`/products/purchase/${id}`, {
            quantity,
            address: result.value.address,
            phone: result.value.phone,
            userEmail: user.email,
            userName: user.displayName
          });
          
          const data = response.data;
          
          // Update the local product state with the new quantity
          setProduct(prev => ({
            ...prev,
            mainQuantity: data.updatedQuantity
          }));
          
          // Reset quantity to minimum selling quantity
          setQuantity(product.minSellingQuantity);
          
          // Show success message
          Swal.fire({
            title: 'Order Placed!',
            text: 'Your order has been successfully placed.',
            icon: 'success'
          });
        } catch (error) {
          console.error('Purchase error:', error);
          Swal.fire({
            title: 'Purchase Failed',
            text: error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to process your purchase. Please try again.',
            icon: 'error'
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
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

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link 
            to="/categories" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 pt-18">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/2 relative overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center lg:h-[600px]"
            />
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.category}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2 p-6 lg:p-10 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.brandName}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <Rating
                  initialValue={product.rating}
                  readonly={true}
                  size={24}
                  fillColor="#f59e0b"
                  emptyColor="#e5e7eb"
                  allowFraction={true}
                  className="mr-2"
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
                <span className="font-medium text-amber-700">{product.rating.toFixed(1)}</span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                    <span className="font-bold text-2xl text-gray-800">{product.mainQuantity}</span>
                    <span className="text-xs ml-1 text-gray-500">units</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                  <span className="block text-amber-600 text-xs font-semibold uppercase tracking-wide mb-1">Min. Order</span>
                  <div className="flex items-baseline">
                    <span className="font-bold text-2xl text-gray-800">{product.minSellingQuantity}</span>
                    <span className="text-xs ml-1 text-gray-500">units</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Select Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= product.minSellingQuantity}
                    className="w-10 h-10 rounded-l-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(validateQuantity(e.target.value))}
                    min={product.minSellingQuantity}
                    max={product.mainQuantity}
                    className="w-16 h-10 text-center border-t border-b border-gray-300 text-lg font-medium"
                  />
                  <button 
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.mainQuantity}
                    className="w-10 h-10 rounded-r-lg bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="ml-4 text-gray-600">
                    Total: <span className="font-bold text-gray-800">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                </div>
                {quantity < product.minSellingQuantity && (
                  <p className="text-red-500 text-sm mt-2">
                    Minimum order quantity is {product.minSellingQuantity} units
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBuy}
                  className="cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-base font-medium shadow-md flex-1 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Buy Now
                </button>
                
                <Link 
                  to={`/categories`}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 text-base font-medium flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;