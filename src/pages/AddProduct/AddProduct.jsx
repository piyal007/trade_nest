import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import API_URL from '../../config/apiConfig';

const AddProduct = () => {
  // Set document title for Add Product page
  useDocumentTitle('Add Product');
  
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
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

  const categories = [
    'Electronics & Gadgets',
    'Home & Kitchen Appliances',
    'Fashion & Apparel',
    'Industrial Machinery & Tools',
    'Health & Beauty',
    'Automotive Parts & Accessories',
    'Office Supplies & Stationery'
  ];

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

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      image: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (!formData.image) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a product image URL'
        });
        setLoading(false);
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
        setLoading(false);
        return;
      }

      if (!formData.mainQuantity || parseFloat(formData.mainQuantity) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Main quantity must be greater than 0'
        });
        setLoading(false);
        return;
      }

      if (!formData.minSellingQuantity || parseFloat(formData.minSellingQuantity) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Minimum selling quantity must be greater than 0'
        });
        setLoading(false);
        return;
      }

      if (!formData.price || parseFloat(formData.price) <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Price must be greater than 0'
        });
        setLoading(false);
        return;
      }
      
      if (!formData.rating || parseFloat(formData.rating) < 1 || parseFloat(formData.rating) > 5) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Rating must be between 1 and 5'
        });
        setLoading(false);
        return;
      }

      // Add a function to convert category names to slugs
      const categoryToSlug = (categoryName) => {
        return categoryName.toLowerCase().replace(/[&\s]+/g, '_');
      };

      // Add user email to the product data
      const productData = {
        ...formData,
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        categorySlug: categoryToSlug(formData.category)
      };

      // Send data to the backend
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product added successfully!'
      });
      
      // Reset form
      setFormData({
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
      
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add product. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Product Image URL</label>
            <input
              id="imageUpload"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleImageChange}
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
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
        
        {/* Product Content - Static information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Information</h2>
          <p className="text-gray-700 mb-4">Products listed on TradeNest marketplace are available for wholesale purchase by retailers and business buyers. Our platform specializes in connecting quality suppliers with business customers looking for bulk inventory.</p>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Benefits of Listing Your Products</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
            <li>Reach thousands of verified business buyers</li>
            <li>Sell in larger quantities with fewer transactions</li>
            <li>Build long-term business relationships</li>
            <li>Reduce marketing costs with our built-in promotion tools</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-4">Wholesale Product Guidelines</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>All products must meet quality standards for TradeNest distribution</li>
            <li>Set competitive pricing for bulk purchases to attract retailers</li>
            <li>Ensure accurate inventory counts to prevent stockouts</li>
            <li>Minimum selling quantity should reflect wholesale business model</li>
            <li>Provide detailed product descriptions to help buyers make informed decisions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;