import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { formatPrice, calculateDiscount } from '../utils/currency';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['all']);
  const { addToCart } = useCart();
  const productsRef = useRef();
  const filtersRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data.products);
          setFilteredProducts(data.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products/categories`);
        const data = await response.json();
        
        if (data.success) {
          setCategories(['all', ...data.data]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchTerm) {
          params.append('search', searchTerm);
        }
        if (sortBy) {
          params.append('sort', sortBy === 'price-low' || sortBy === 'price-high' ? 'price' : sortBy);
          params.append('order', sortBy === 'price-high' ? 'desc' : 'asc');
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products?${params}`
        );
        const data = await response.json();
        
        if (data.success) {
          setFilteredProducts(data.data.products);
        }
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, searchTerm, sortBy]);


  useEffect(() => {
    if (!loading && filteredProducts.length > 0) {
      // Animate filters
      gsap.fromTo(filtersRef.current.children,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
      );

      // Animate products
      gsap.fromTo(productsRef.current.children,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [loading, filteredProducts]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-ink-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our complete collection of premium printed apparel and accessories
          </p>
        </div>

        {/* Filters */}
        <div 
          ref={filtersRef}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-ink-600 to-soul-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category === 'all' ? 'All Products' : category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div 
            ref={productsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => {
              const discount = calculateDiscount(product.comparePrice, product.price);
              
              return (
                <div 
                  key={product._id}
                  className="product-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]?.url || '/api/placeholder/400/400'}
                      alt={product.images[0]?.alt || product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                        >
                          Add to Cart
                        </button>
                        <Link
                          to={`/products/${product._id}`}
                          className="bg-gradient-to-r from-ink-600 to-soul-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                    {product.stock < 10 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        Low Stock
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        {discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <span className="text-sm text-ink-600 dark:text-ink-400 font-medium">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-ink-600 dark:text-ink-400">
                          {formatPrice(product.price)}
                        </span>
                        {product.comparePrice && product.comparePrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.comparePrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                        {product.colors && product.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary px-8 py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;