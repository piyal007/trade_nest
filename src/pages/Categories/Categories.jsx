import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  // In a real application, this data would come from an API
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Electronics & Gadgets',
      description: 'Wholesale electronics including smartphones, laptops, and accessories',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 1250
    },
    {
      id: 2,
      name: 'Fashion & Apparel',
      description: 'Clothing, footwear, and fashion accessories for all ages',
      image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 2340
    },
    {
      id: 3,
      name: 'Home & Kitchen Appliances',
      description: 'Appliances, kitchenware, and home improvement products',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80',
      productCount: 1870
    },
    {
      id: 4,
      name: 'Industrial Machinery & Tools',
      description: 'Industrial equipment, machinery, and professional tools',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 980
    },
    {
      id: 5,
      name: 'Health & Beauty',
      description: 'Cosmetics, personal care, and health products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 1560
    },
    {
      id: 6,
      name: 'Automotive Parts & Accessories',
      description: 'Car parts, accessories, and automotive supplies',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1283&q=80',
      productCount: 1120
    },
    {
      id: 7,
      name: 'Office Supplies & Stationery',
      description: 'Office equipment, stationery, and business supplies',
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      productCount: 890
    }
  ]);

  // Animation variants removed as framer-motion is not installed

  // Update document title when component mounts
  useEffect(() => {
    document.title = 'Categories | B2B Wholesale';
  }, []);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Browse our extensive range of wholesale product categories for your business needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">{category.productCount.toLocaleString()} Products</span>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;