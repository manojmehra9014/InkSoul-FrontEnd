import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuthDebug = () => {
  const [authInfo, setAuthInfo] = useState({
    token: null,
    user: null,
    error: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuthInfo({
          token: null,
          user: null,
          error: 'No token found in localStorage'
        });
        return;
      }

      try {
        // Test the token with a simple API call
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/me`,
          {
            headers: {
              'x-auth-token': token
            }
          }
        );

        setAuthInfo({
          token: token.substring(0, 20) + '...',
          user: response.data.data,
          error: null
        });
      } catch (error) {
        setAuthInfo({
          token: token.substring(0, 20) + '...',
          user: null,
          error: error.response?.data?.message || error.message
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Auth Debug</h3>
      <div className="text-xs space-y-1">
        <div>
          <span className="font-medium">Token:</span> {authInfo.token || 'None'}
        </div>
        <div>
          <span className="font-medium">User:</span> {authInfo.user ? `${authInfo.user.name} (${authInfo.user.role})` : 'None'}
        </div>
        {authInfo.error && (
          <div className="text-red-600">
            <span className="font-medium">Error:</span> {authInfo.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;