import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-email/${token}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);

        // Auto-login user
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          login(data.user, data.token);

          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      setMessage('An error occurred during verification. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ink-50 via-white to-soul-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Email Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Verifying your email address...
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {status === 'verifying' && (
            <div className="text-center py-8">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Please wait while we verify your email...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Email Verified!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {message}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to your dashboard...
              </p>
              <div className="mt-6">
                <Link
                  to="/dashboard"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-ink-600 to-soul-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verification Failed
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {message}
              </p>
              <div className="space-y-3">
                <Link
                  to="/resend-verification"
                  className="block px-6 py-3 bg-gradient-to-r from-ink-600 to-soul-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Resend Verification Email
                </Link>
                <Link
                  to="/login"
                  className="block px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
