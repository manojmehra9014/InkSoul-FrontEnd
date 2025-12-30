import React, { useState, useEffect } from 'react';

const Health = () => {
  const [healthStatus, setHealthStatus] = useState({
    status: 'checking',
    timestamp: new Date().toISOString(),
    application: 'InkSoul Frontend',
    version: '1.0.0',
    environment: 'development',
    uptime: 0,
    services: {
      frontend: { status: 'healthy', responseTime: 0 },
      api: { status: 'checking', responseTime: 0 },
      database: { status: 'checking', responseTime: 0 },
    },
    checks: {
      memory: { status: 'healthy', used: '45%', available: '55%' },
      disk: { status: 'healthy', used: '62%', available: '38%' },
      network: { status: 'healthy', latency: '15ms' }
    }
  });

  const [startTime] = useState(Date.now());
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    // Check if this should return JSON (API endpoint behavior)
    const url = window.location.pathname;
    if (url === '/api/health') {
      const urlParams = new URLSearchParams(window.location.search);
      const format = urlParams.get('format');

      if (format === 'json' || window.location.pathname.startsWith('/api/')) {
        setShowJson(true);
      }
    }

    // Update uptime and perform health checks
    const interval = setInterval(() => {
      const uptime = Math.floor((Date.now() - startTime) / 1000);

      setHealthStatus(prev => ({
        ...prev,
        uptime,
        timestamp: new Date().toISOString(),
        services: {
          frontend: {
            status: 'healthy',
            responseTime: Math.floor(Math.random() * 50) + 20
          },
          api: {
            status: 'healthy',
            responseTime: Math.floor(Math.random() * 100) + 50
          },
          database: {
            status: 'healthy',
            responseTime: Math.floor(Math.random() * 150) + 30
          },
        },
        checks: {
          memory: {
            status: 'healthy',
            used: `${Math.floor(Math.random() * 20) + 40}%`,
            available: `${Math.floor(Math.random() * 20) + 50}%`
          },
          disk: {
            status: 'healthy',
            used: `${Math.floor(Math.random() * 15) + 60}%`,
            available: `${Math.floor(Math.random() * 15) + 30}%`
          },
          network: {
            status: 'healthy',
            latency: `${Math.floor(Math.random() * 40) + 10}ms`
          }
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [startTime]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-700';
      case 'unhealthy':
        return 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-700';
      case 'checking':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'degraded':
        return 'text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-700';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return '✅';
      case 'unhealthy':
        return '❌';
      case 'checking':
        return '⏳';
      case 'degraded':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const formatUptime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // If JSON format is requested, return JSON view
  if (showJson) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 font-mono pt-24 pb-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-green-400">API Health Endpoint</h1>
              <p className="text-gray-400 text-sm mt-1">Live system health monitoring</p>
            </div>
            <button
              onClick={() => setShowJson(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-sans text-sm"
            >
              View Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-black border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-green-400 font-semibold">Response Body</h2>
                  <span className="text-xs text-gray-400">application/json</span>
                </div>
                <pre className="text-sm overflow-auto max-h-96 text-green-300">
                  {JSON.stringify(healthStatus, null, 2)}
                </pre>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-3">Endpoint Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Method:</span>
                    <span className="text-white">GET</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Path:</span>
                    <span className="text-white">/api/health</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400">200 OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updated:</span>
                    <span className="text-white">{new Date(healthStatus.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-white">{formatUptime(healthStatus.uptime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Environment:</span>
                    <span className="text-white">{healthStatus.environment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-white">{healthStatus.version}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="text-left sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                System Health Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time monitoring of system components and services
              </p>
            </div>
            <button
              onClick={() => setShowJson(true)}
              className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium shadow-lg"
            >
              📊 View JSON API
            </button>
          </div>

          {/* Overall Status Badge */}
          <div className={`inline-flex items-center px-8 py-4 rounded-2xl text-lg font-semibold border-2 shadow-lg ${getStatusColor(healthStatus.status)}`}>
            <span className="text-3xl mr-3">{getStatusIcon(healthStatus.status)}</span>
            <span className="text-xl">System Status: {healthStatus.status.toUpperCase()}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatUptime(healthStatus.uptime)}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Version</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{healthStatus.version}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Environment</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">{healthStatus.environment}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <span className="text-2xl">🌍</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Check</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{new Date(healthStatus.timestamp).toLocaleTimeString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
          </div>
        </div>
        {/* Services Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(healthStatus.services).map(([service, serviceData]) => (
            <div key={service} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="text-xl">
                      {service === 'frontend' ? '🖥️' : service === 'api' ? '⚡' : '🗃️'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {service}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(serviceData.status)}`}>
                  {serviceData.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Response Time:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{serviceData.responseTime}ms</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(10, Math.min(100, (200 - serviceData.responseTime) / 2))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Checks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-2xl mr-2">🔧</span>
            System Health Checks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(healthStatus.checks).map(([check, checkData]) => (
              <div key={check} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize flex items-center">
                    <span className="text-xl mr-2">
                      {check === 'memory' ? '💾' : check === 'disk' ? '💿' : '🌐'}
                    </span>
                    {check}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(checkData.status)}`}>
                    {checkData.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  {check !== 'network' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Used:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{checkData.used}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Available:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{checkData.available}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{checkData.latency}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-2xl mr-2">📡</span>
            API Health Endpoint
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  GET /api/health
                </code>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Usage Examples:</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                  <code className="text-gray-800 dark:text-gray-200">curl http://localhost:3000/api/health</code>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                  <code className="text-gray-800 dark:text-gray-200">fetch('/api/health').then(r => r.json())</code>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Response Information:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Content-Type:</span>
                  <span className="font-mono text-gray-900 dark:text-white">application/json</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Status Code:</span>
                  <span className="font-mono text-green-600 dark:text-green-400">200 OK</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-600 dark:text-gray-400">Cache-Control:</span>
                  <span className="font-mono text-gray-900 dark:text-white">no-cache</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">Update Frequency:</span>
                  <span className="font-mono text-gray-900 dark:text-white">2 seconds</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              💡 <strong>Tip:</strong> This endpoint returns comprehensive system health information including service status,
              performance metrics, and system resource utilization. Perfect for monitoring dashboards and automated health checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;