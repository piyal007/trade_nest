import { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    mainQuantity: 0,
    minSellingQuantity: 0,
    brandName: '',
    category: '',
    description: '',
    price: 0,
    rating: 3
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
    
    // Convert numeric fields to numbers
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you would upload this to a storage service
      // For now, we'll just store the file name
      setFormData({
        ...formData,
        image: file.name
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      if (!formData.image) {
        toast.error('Please upload a product image');
        setLoading(false);
        return;
      }

      if (formData.mainQuantity <= 0) {
        toast.error('Main quantity must be greater than 0');
        setLoading(false);
        return;
      }

      if (formData.minSellingQuantity <= 0) {
        toast.error('Minimum selling quantity must be greater than 0');
        setLoading(false);
        return;
      }

      if (formData.price <= 0) {
        toast.error('Price must be greater than 0');
        setLoading(false);
        return;
      }

      // In a real application, you would send this data to your backend
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      toast.success('Product added successfully!');
      
      // Reset form
      setFormData({
        image: '',
        name: '',
        mainQuantity: 0,
        minSellingQuantity: 0,
        brandName: '',
        category: '',
        description: '',
        price: 0,
        rating: 3
      });
      
      // Reset file input
      document.getElementById('imageUpload').value = '';
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ paddingTop: 'calc(var(--nav-height) + 2rem)' }}>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Product Image</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Enter main quantity"
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
                placeholder="Enter minimum selling quantity"
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
                placeholder="Enter price per unit"
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
                placeholder="Enter rating"
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
              className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
        
        {/* Product Content - Static information */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Wholesale Product Guidelines</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>All products must meet quality standards for B2B wholesale distribution</li>
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