import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipCode: user?.address?.zipCode || '',
      country: user?.address?.country || ''
    }
  });
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    // Initialize profile data when user changes
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          zipCode: user.address?.zipCode || '',
          country: user.address?.country || ''
        }
      });
    }
  }, [user]);

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      setOrders([
        {
          _id: '1',
          orderNumber: 'INK202401001',
          totalPrice: 89.97,
          status: 'delivered',
          createdAt: '2024-01-15T10:30:00Z',
          orderItems: [
            { name: 'Artistic T-Shirt', quantity: 2, price: 29.99 },
            { name: 'Premium Handkerchief', quantity: 1, price: 18.99 }
          ]
        },
        {
          _id: '2',
          orderNumber: 'INK202401002',
          totalPrice: 45.98,
          status: 'processing',
          createdAt: '2024-01-20T14:15:00Z',
          orderItems: [
            { name: 'Cozy Socks', quantity: 2, price: 14.99 },
            { name: 'Cotton Handkerchief', quantity: 1, price: 12.99 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfileSave = async () => {
    setProfileLoading(true);
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        setIsEditingProfile(false);
        alert('Profile updated successfully!');
      } else {
        alert(result.error || 'Error updating profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileCancel = () => {
    // Reset to original user data
    setProfileData({
      name: user?.name || '',
      phone: user?.phone || '',
      address: {
        street: user?.address?.street || '',
        city: user?.address?.city || '',
        state: user?.address?.state || '',
        zipCode: user?.address?.zipCode || '',
        country: user?.address?.country || ''
      }
    });
    setIsEditingProfile(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: '👤' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'wishlist', name: 'Wishlist', icon: '❤️' },
    { id: 'addresses', name: 'Addresses', icon: '📍' }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and view your order history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-ink-600 to-soul-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-ink-50 dark:bg-ink-900/20 text-ink-600 dark:text-ink-400 border-r-2 border-ink-600'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <span className="text-lg">🚪</span>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Profile Information
                    </h2>
                    {!isEditingProfile && (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="btn-primary px-4 py-2 rounded-lg"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          readOnly={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-600 dark:text-white"
                          readOnly
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Email cannot be changed
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          placeholder="Enter your phone number"
                          readOnly={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          name="address.country"
                          value={profileData.address.country}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          placeholder="Enter your country"
                          readOnly={!isEditingProfile}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={profileData.address.street}
                        onChange={handleProfileChange}
                        className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                          !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                        }`}
                        placeholder="Enter your street address"
                        readOnly={!isEditingProfile}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={profileData.address.city}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          placeholder="Enter your city"
                          readOnly={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="address.state"
                          value={profileData.address.state}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          placeholder="Enter your state"
                          readOnly={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="address.zipCode"
                          value={profileData.address.zipCode}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                            !isEditingProfile ? 'bg-gray-50 dark:bg-gray-600' : ''
                          }`}
                          placeholder="Enter your ZIP code"
                          readOnly={!isEditingProfile}
                        />
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleProfileSave}
                          disabled={profileLoading}
                          className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {profileLoading ? (
                            <div className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Saving...
                            </div>
                          ) : (
                            'Save Changes'
                          )}
                        </button>
                        <button
                          onClick={handleProfileCancel}
                          disabled={profileLoading}
                          className="btn-secondary px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Order History
                  </h2>
                  
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="w-8 h-8 border-4 border-ink-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start shopping to see your orders here
                      </p>
                      <Link
                        to="/products"
                        className="btn-primary px-6 py-3 rounded-lg"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Order #{order.orderNumber}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                ${order.totalPrice.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {order.orderItems.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {item.name} × {item.quantity}
                                </span>
                                <span className="text-gray-900 dark:text-white">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex space-x-3">
                            <Link
                              to={`/orders/${order._id}`}
                              className="btn-secondary px-4 py-2 text-sm rounded-lg"
                            >
                              View Details
                            </Link>
                            {order.status === 'delivered' && (
                              <button className="text-ink-600 hover:text-ink-500 dark:text-ink-400 dark:hover:text-ink-300 font-medium text-sm">
                                Leave Review
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Wishlist
                  </h2>
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Save items you love to your wishlist
                    </p>
                    <Link
                      to="/products"
                      className="btn-primary px-6 py-3 rounded-lg"
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Saved Addresses
                  </h2>
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No saved addresses
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Add addresses for faster checkout
                    </p>
                    <button className="btn-primary px-6 py-3 rounded-lg">
                      Add Address
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;