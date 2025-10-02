import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatPrice } from '../../utils/currency';
import ProductModal from '../../components/ProductModal';
import AuthDebug from '../../components/AuthDebug';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    category: 'T-Shirts',
    productCode: '',
    sku: '',
    stock: '',
    images: [{ url: '', alt: '', isPrimary: true }],
    colors: [{ name: '', hex: '', stock: 0 }],
    sizes: [{ name: 'M', stock: 0 }],
    tags: [],
    isFeatured: false,
    material: '',
    careInstructions: ''
  });

  const categories = ['T-Shirts', 'Handkerchiefs', 'Socks', 'Gloves', 'Accessories'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, [currentPage, searchTerm, categoryFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        category: categoryFilter
      });

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products?${params}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        }
      );

      if (response.data.success) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Mock data for development
      setProducts([
        {
          _id: '1',
          name: 'Artistic Expression T-Shirt',
          price: 2499,
          comparePrice: 2999,
          category: 'T-Shirts',
          sku: 'ART-TSH-001',
          stock: 50,
          isActive: true,
          isFeatured: true,
          images: [{ url: '/api/placeholder/400/400', isPrimary: true }],
          createdAt: '2024-01-15T10:30:00Z'
        },
        {
          _id: '2',
          name: 'Premium Silk Handkerchief',
          price: 1599,
          comparePrice: 1899,
          category: 'Handkerchiefs',
          sku: 'SLK-HKF-001',
          stock: 5,
          isActive: true,
          isFeatured: false,
          images: [{ url: '/api/placeholder/400/400', isPrimary: true }],
          createdAt: '2024-01-10T08:20:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats for now
      setStats({
        totalProducts: 156,
        activeProducts: 142,
        lowStockProducts: 12,
        outOfStockProducts: 3
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const addArrayItem = (field, defaultItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultItem]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.price || !formData.productCode || !formData.sku || !formData.stock) {
        alert('Please fill in all required fields');
        return;
      }

      // Filter out empty colors and sizes
      const validColors = formData.colors?.filter(color => 
        color.name && color.name.trim() && color.hex && color.hex.trim()
      ) || [];
      
      const validSizes = formData.sizes?.filter(size => 
        size.name && size.name.trim() && size.stock >= 0
      ) || [];

      
      // Prepare data for API
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : undefined,
        category: formData.category,
        productCode: formData.productCode.trim().toUpperCase(),
        sku: formData.sku.trim().toUpperCase(),
        stock: parseInt(formData.stock),
        images: formData.images || [],
        colors: validColors,
        sizes: validSizes,
        tags: formData.tags || [],
        isFeatured: formData.isFeatured || false,
        material: formData.material ? formData.material.trim() : '',
        careInstructions: formData.careInstructions ? formData.careInstructions.trim() : ''
      };
      // Remove undefined values
      Object.keys(productData).forEach(key => {
        if (productData[key] === undefined) {
          delete productData[key];
        }
      });

      console.log('Sending product data:', productData);

      const url = selectedProduct 
        ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products/${selectedProduct._id}`
        : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`;
      
      const method = selectedProduct ? 'PUT' : 'POST';
      
      const response = await axios({
        method,
        url,
        data: productData,
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert(`Product ${selectedProduct ? 'updated' : 'created'} successfully!`);
        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
        fetchProducts();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      
      // More detailed error handling
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Server error occurred';
        const validationErrors = error.response.data?.errors;
        
        if (validationErrors && validationErrors.length > 0) {
          const errorMessages = validationErrors.map(err => err.msg).join('\n');
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert(`Error: ${errorMessage}`);
        }
      } else if (error.request) {
        alert('Network error: Unable to connect to server');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      comparePrice: product.comparePrice || '',
      category: product.category || 'T-Shirts',
      productCode: product.productCode || '',
      sku: product.sku || '',
      stock: product.stock || '',
      images: product.images || [{ url: '', alt: '', isPrimary: true }],
      colors: product.colors || [{ name: '', hex: '', stock: 0 }],
      sizes: product.sizes || [{ name: 'M', stock: 0 }],
      tags: product.tags || [],
      isFeatured: product.isFeatured || false,
      material: product.material || '',
      careInstructions: product.careInstructions || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products/${productId}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          }
        );

        if (response.data.success) {
          alert('Product deleted successfully!');
          fetchProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.response?.data?.message || 'Error deleting product');
      }
    }
  };

  const handleImageUpload = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      comparePrice: '',
      category: 'T-Shirts',
      productCode: '',
      sku: '',
      stock: '',
      images: [],
      colors: [{ name: '', hex: '', stock: 0 }],
      sizes: [{ name: 'M', stock: 0 }],
      tags: [],
      isFeatured: false,
      material: '',
      careInstructions: ''
    });
    setSelectedProduct(null);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' };
    if (stock <= 10) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' };
    return { text: 'In Stock', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' };
  };

  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Products Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary px-6 py-3 rounded-lg"
        >
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalProducts}
              </p>
            </div>
            <div className="text-4xl opacity-80">📦</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Active Products
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeProducts}
              </p>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Low Stock
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.lowStockProducts}
              </p>
            </div>
            <div className="text-4xl opacity-80">⚠️</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Out of Stock
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.outOfStockProducts}
              </p>
            </div>
            <div className="text-4xl opacity-80">❌</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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

          <div className="flex gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Products List
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-ink-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.images?.[0]?.url || '/api/placeholder/400/400'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatPrice(product.price)}
                        </div>
                        {product.comparePrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.comparePrice)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        show={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Product"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        selectedProduct={selectedProduct}
        categories={categories}
      />

      <ProductModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Edit Product"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        selectedProduct={selectedProduct}
        categories={categories}
      />

      {/* Debug component - remove in production */}
      <AuthDebug />
    </div>
  );
};

export default ProductsManagement;