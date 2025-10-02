import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../../utils/currency';
import UsersManagement from './UsersManagement';
import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import Analytics from './Analytics';
import Settings from './Settings';

const AdminDashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for dashboard stats
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalProducts: 156,
        totalOrders: 892,
        totalRevenue: 3789567 // INR amount
      });
      setLoading(false);
    }, 1000);
  }, []);

  const sidebarItems = [
    { name: 'Overview', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Orders', path: '/admin/orders', icon: '🛒' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="text-4xl opacity-80">
          {icon}
        </div>
      </div>
    </div>
  );

  const Overview = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the InkSoul admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={loading ? '...' : stats.totalUsers.toLocaleString()}
          icon="👥"
          color="border-blue-500"
        />
        <StatCard
          title="Total Products"
          value={loading ? '...' : stats.totalProducts.toLocaleString()}
          icon="📦"
          color="border-green-500"
        />
        <StatCard
          title="Total Orders"
          value={loading ? '...' : stats.totalOrders.toLocaleString()}
          icon="🛒"
          color="border-yellow-500"
        />
        <StatCard
          title="Total Revenue"
          value={loading ? '...' : formatPrice(stats.totalRevenue)}
          icon="💰"
          color="border-purple-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Orders
          </h2>
          <div className="space-y-4">
            {[
              { id: 1, customer: 'Rahul Sharma', items: 2, amount: 4998 },
              { id: 2, customer: 'Priya Patel', items: 1, amount: 2499 },
              { id: 3, customer: 'Amit Kumar', items: 3, amount: 7497 },
              { id: 4, customer: 'Sneha Singh', items: 1, amount: 1599 },
              { id: 5, customer: 'Vikash Gupta', items: 2, amount: 3598 }
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Order #INK{Date.now() + order.id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.customer} • {order.items} items
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(order.amount)}
                  </p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Top Products
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Artistic T-Shirt', sales: 156, revenue: 389844 },
              { name: 'Premium Handkerchief', sales: 89, revenue: 142311 },
              { name: 'Cozy Socks', sales: 134, revenue: 174066 },
              { name: 'Winter Gloves', sales: 67, revenue: 194233 },
              { name: 'Cotton Tee', sales: 98, revenue: 195902 }
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.sales} sales
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/products"
            className="flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">📦</span>
            <span className="font-medium">Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">🛒</span>
            <span className="font-medium">View Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">👥</span>
            <span className="font-medium">Manage Users</span>
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-200"
          >
            <span className="text-2xl mr-3">📈</span>
            <span className="font-medium">View Analytics</span>
          </Link>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          System Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white">Database: Online</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white">Payment Gateway: Active</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-900 dark:text-white">Email Service: Running</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-ink-600 to-soul-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Admin Panel
              </span>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${location.pathname === item.path
                    ? 'bg-ink-50 dark:bg-ink-900/20 text-ink-600 dark:text-ink-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/products" element={<ProductsManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;