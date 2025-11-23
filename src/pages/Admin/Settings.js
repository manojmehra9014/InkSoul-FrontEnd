import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { } = useAuth(); // Keep useAuth for future use
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'InkSoul',
      siteDescription: 'Premium printed apparel and accessories',
      contactEmail: 'admin@inksoul.com',
      supportEmail: 'support@inksoul.com',
      phoneNumber: '+91 98765 43210',
      address: '123 Fashion Street, Mumbai, Maharashtra 400001',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      language: 'en'
    },
    shipping: {
      freeShippingThreshold: 2000,
      standardShippingCost: 99,
      expressShippingCost: 199,
      internationalShipping: false,
      shippingRegions: ['India'],
      estimatedDelivery: '3-5 business days'
    },
    payment: {
      razorpayEnabled: true,
      stripeEnabled: true,
      codEnabled: true,
      paypalEnabled: false,
      razorpayKeyId: 'rzp_test_xxxxxxxxxx',
      stripePublishableKey: 'pk_test_xxxxxxxxxx',
      taxRate: 18,
      taxName: 'GST'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUsername: 'noreply@inksoul.com',
      smtpPassword: '••••••••••••',
      fromName: 'InkSoul Team',
      fromEmail: 'noreply@inksoul.com',
      orderConfirmationEnabled: true,
      shippingNotificationEnabled: true,
      marketingEmailsEnabled: true
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: 30,
      passwordMinLength: 6,
      requireStrongPassword: true,
      allowUserRegistration: true,
      emailVerificationRequired: false,
      maxLoginAttempts: 5,
      lockoutDuration: 15
    },
    seo: {
      metaTitle: 'InkSoul - Premium Printed Apparel',
      metaDescription: 'Discover premium printed t-shirts, handkerchiefs, socks and accessories at InkSoul. Quality products with unique designs.',
      metaKeywords: 'printed t-shirts, handkerchiefs, socks, gloves, apparel, fashion',
      googleAnalyticsId: 'GA-XXXXXXXXX',
      facebookPixelId: '',
      googleTagManagerId: '',
      sitemapEnabled: true,
      robotsTxtEnabled: true
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'shipping', name: 'Shipping', icon: '🚚' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'seo', name: 'SEO', icon: '🔍' }
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (section) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Site Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.general.siteName}
              onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.general.contactEmail}
              onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={settings.general.phoneNumber}
              onChange={(e) => handleInputChange('general', 'phoneNumber', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={settings.general.currency}
              onChange={(e) => handleInputChange('general', 'currency', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.general.siteDescription}
            onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address
          </label>
          <textarea
            value={settings.general.address}
            onChange={(e) => handleInputChange('general', 'address', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <button
        onClick={() => handleSave('general')}
        disabled={loading}
        className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save General Settings'}
      </button>
    </div>
  );

  const ShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Shipping Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.shipping.freeShippingThreshold}
              onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Standard Shipping Cost (₹)
            </label>
            <input
              type="number"
              value={settings.shipping.standardShippingCost}
              onChange={(e) => handleInputChange('shipping', 'standardShippingCost', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Express Shipping Cost (₹)
            </label>
            <input
              type="number"
              value={settings.shipping.expressShippingCost}
              onChange={(e) => handleInputChange('shipping', 'expressShippingCost', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Delivery
            </label>
            <input
              type="text"
              value={settings.shipping.estimatedDelivery}
              onChange={(e) => handleInputChange('shipping', 'estimatedDelivery', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.shipping.internationalShipping}
              onChange={(e) => handleInputChange('shipping', 'internationalShipping', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Enable International Shipping
            </span>
          </label>
        </div>
      </div>
      <button
        onClick={() => handleSave('shipping')}
        disabled={loading}
        className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Shipping Settings'}
      </button>
    </div>
  );

  const PaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Payment Methods
        </h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payment.razorpayEnabled}
              onChange={(e) => handleInputChange('payment', 'razorpayEnabled', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Enable Razorpay
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payment.stripeEnabled}
              onChange={(e) => handleInputChange('payment', 'stripeEnabled', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Enable Stripe
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payment.codEnabled}
              onChange={(e) => handleInputChange('payment', 'codEnabled', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Enable Cash on Delivery
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              value={settings.payment.taxRate}
              onChange={(e) => handleInputChange('payment', 'taxRate', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tax Name
            </label>
            <input
              type="text"
              value={settings.payment.taxName}
              onChange={(e) => handleInputChange('payment', 'taxName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleSave('payment')}
        disabled={loading}
        className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Payment Settings'}
      </button>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Security Configuration
        </h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => handleInputChange('security', 'twoFactorEnabled', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Enable Two-Factor Authentication
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.requireStrongPassword}
              onChange={(e) => handleInputChange('security', 'requireStrongPassword', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Require Strong Passwords
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.allowUserRegistration}
              onChange={(e) => handleInputChange('security', 'allowUserRegistration', e.target.checked)}
              className="h-4 w-4 text-ink-600 focus:ring-ink-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-900 dark:text-white">
              Allow User Registration
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => handleSave('security')}
        disabled={loading}
        className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Security Settings'}
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'shipping':
        return <ShippingSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {tabs.find(tab => tab.id === activeTab)?.name} Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This section is under development
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your store settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-ink-50 dark:bg-ink-900/20 text-ink-600 dark:text-ink-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;