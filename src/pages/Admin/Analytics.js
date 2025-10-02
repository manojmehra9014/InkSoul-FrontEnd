import React, { useState, useEffect } from 'react';
import { formatPrice } from '../../utils/currency';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');
  const [analytics, setAnalytics] = useState({
    salesData: [],
    topProducts: [],
    categoryData: [],
    customerInsights: {},
    inventoryAlerts: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Mock analytics data
      setTimeout(() => {
        setAnalytics({
          salesData: [
            { date: '2024-01-01', sales: 45000, orders: 23 },
            { date: '2024-01-02', sales: 52000, orders: 28 },
            { date: '2024-01-03', sales: 38000, orders: 19 },
            { date: '2024-01-04', sales: 67000, orders: 34 },
            { date: '2024-01-05', sales: 71000, orders: 38 },
            { date: '2024-01-06', sales: 59000, orders: 31 },
            { date: '2024-01-07', sales: 83000, orders: 42 }
          ],
          topProducts: [
            {
              _id: '1',
              name: 'Artistic Expression T-Shirt',
              category: 'T-Shirts',
              totalSold: 156,
              revenue: 389844,
              stock: 44,
              trend: 'up'
            },
            {
              _id: '2',
              name: 'Premium Silk Handkerchief',
              category: 'Handkerchiefs',
              totalSold: 89,
              revenue: 142311,
              stock: 5,
              trend: 'up'
            },
            {
              _id: '3',
              name: 'Cozy Winter Socks',
              category: 'Socks',
              totalSold: 134,
              revenue: 174066,
              stock: 23,
              trend: 'down'
            },
            {
              _id: '4',
              name: 'Leather Winter Gloves',
              category: 'Gloves',
              totalSold: 67,
              revenue: 194233,
              stock: 12,
              trend: 'up'
            },
            {
              _id: '5',
              name: 'Cotton Pocket Square',
              category: 'Handkerchiefs',
              totalSold: 98,
              revenue: 97902,
              stock: 0,
              trend: 'down'
            }
          ],
          categoryData: [
            { category: 'T-Shirts', sales: 1245000, percentage: 35, orders: 234 },
            { category: 'Handkerchiefs', sales: 892000, percentage: 25, orders: 167 },
            { category: 'Socks', sales: 678000, percentage: 19, orders: 145 },
            { category: 'Gloves', sales: 567000, percentage: 16, orders: 98 },
            { category: 'Accessories', sales: 178000, percentage: 5, orders: 45 }
          ],
          customerInsights: {
            totalCustomers: 1247,
            newCustomers: 89,
            returningCustomers: 234,
            avgOrderValue: 4250,
            customerLifetimeValue: 12750
          },
          inventoryAlerts: [
            { name: 'Premium Silk Handkerchief', stock: 5, status: 'low' },
            { name: 'Cotton Pocket Square', stock: 0, status: 'out' },
            { name: 'Leather Winter Gloves', stock: 12, status: 'low' },
            { name: 'Athletic Performance Socks', stock: 8, status: 'low' }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? '📈' : '📉';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  const getStockAlertColor = (status) => {
    switch (status) {
      case 'out':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="w-8 h-8 border-4 border-ink-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights into your business performance
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(analytics.salesData.reduce((sum, day) => sum + day.sales, 0))}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +12.5% from last period
              </p>
            </div>
            <div className="text-4xl opacity-80">💰</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.salesData.reduce((sum, day) => sum + day.orders, 0)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +8.2% from last period
              </p>
            </div>
            <div className="text-4xl opacity-80">📦</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                Avg Order Value
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(analytics.customerInsights.avgOrderValue)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +3.8% from last period
              </p>
            </div>
            <div className="text-4xl opacity-80">💳</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                New Customers
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.customerInsights.newCustomers}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                +15.3% from last period
              </p>
            </div>
            <div className="text-4xl opacity-80">👥</div>
          </div>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Sales Trend
        </h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-600 dark:text-gray-400">
              Sales chart visualization would go here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Integration with Chart.js or similar library needed
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={product._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-ink-600 to-soul-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category} • {product.totalSold} sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(product.revenue)}
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-sm ${getTrendColor(product.trend)}`}>
                      {getTrendIcon(product.trend)}
                    </span>
                    <span className={`text-sm ${product.stock === 0 ? 'text-red-600' : product.stock <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Category Performance
          </h2>
          <div className="space-y-4">
            {analytics.categoryData.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {category.category}
                  </span>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatPrice(category.sales)}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({category.orders} orders)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-ink-600 to-soul-600 h-2 rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {category.percentage}% of total sales
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Inventory Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analytics.inventoryAlerts.map((alert, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {alert.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockAlertColor(alert.status)}`}>
                  {alert.status === 'out' ? 'Out of Stock' : 'Low Stock'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stock: {alert.stock} units
              </p>
              <button className="mt-2 text-ink-600 hover:text-ink-500 dark:text-ink-400 dark:hover:text-ink-300 text-sm font-medium">
                Restock Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Customer Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {analytics.customerInsights.totalCustomers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {analytics.customerInsights.returningCustomers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Returning Customers
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {formatPrice(analytics.customerInsights.customerLifetimeValue)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Avg Customer LTV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;