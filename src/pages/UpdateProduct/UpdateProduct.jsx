import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    mainQuantity: '',
    minSellingQuantity: '',
    brandName: '',
    category: '',
    description: '',
    price: '',
    rating: ''
  });
  
  // Set document title for Update Product page
  useDocumentTitle(`Update Product`);

  const categories = [
    'Electronics & Gadgets',
    'Home & Kitchen Appliances',
    'Fashion & Apparel',
    'Industrial Machinery & Tools',
    'Health & Beauty',
    'Automotive Parts & Accessories',
    'Office Supplies & Stationery'
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        
        const product = await response.json();
        setFormData({
          image: product.image || '',
          name: product.name || '',
          mainQuantity: product.mainQuantity || '',
          minSellingQuantity: product.minSellingQuantity || '',
          brandName: product.brandName || '',
          category: product.category || '',
          description: product.description || '',
          price: product.price || '',
          rating: product.rating || ''
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load product details. Please try again.'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // For numeric fields, allow empty strings but convert valid numbers
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : parseFloat(value) || ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate form data
      if (!formData.image) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a product image URL'
        });
        setSubmitting(false);
        return;
      }

      // Basic URL validation
      try {
        new URL(formData.image);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a valid image URL'
        });
        setSubmitting(false);
        return;
      }

      if (!formData.mainQuantity || parseFloat(formData.mainQuantity) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Main quantity must be greater than 0'
        });
        setSubmitting(false);
        return;
      }

      if (!formData.minSellingQuantity || parseFloat(formData.minSellingQuantity) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Minimum selling quantity must be greater than 0'
        });
        setSubmitting(false);
        return;
      }

      if (!formData.price || parseFloat(formData.price) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Price must be greater than 0'
        });
        setSubmitting(false);
        return;
      }
      
      if (!formData.rating || parseFloat(formData.rating) < 1 || parseFloat(formData.rating) > 5) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Rating must be between 1 and 5'
        });
        setSubmitting(false);
        return;
      }

      // Send update request to the server
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to all-products product');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product updated successfully!'
      });
      
      // Navigate back to My Products page
      navigate('/all-products');
      
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update product. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Update Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Product Image URL</label>
            <input
              id="imageUpload"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Two-column layout for quantities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Main Quantity */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Main Quantity</label>
              <input
                type="number"
                name="mainQuantity"
                value={formData.mainQuantity}
                onChange={handleChange}
                min="1"
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Minimum Selling Quantity */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Minimum Selling Quantity</label>
              <input
                type="number"
                name="minSellingQuantity"
                value={formData.minSellingQuantity}
                onChange={handleChange}
                min="1"
                placeholder="0"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Two-column layout for brand and category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Name */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Enter brand name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Category */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Two-column layout for price and rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Price (per unit)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                placeholder="0.0"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Rating */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                placeholder="Enter rating (1.0 - 5.0)"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          {/* Submit Button */}
          <div className="pt-4 flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/my-products')}
              className="cursor-pointer w-1/2 bg-gray-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`cursor-pointer w-1/2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;