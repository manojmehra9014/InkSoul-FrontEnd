import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const OrderSuccess = () => {
  const containerRef = useRef();

  useEffect(() => {
    // Animate success page
    gsap.fromTo(containerRef.current.children,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div ref={containerRef} className="max-w-md mx-auto text-center px-4">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Order Successful!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          Thank you for your purchase!
        </p>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your order has been confirmed and will be shipped soon. You'll receive a confirmation email shortly.
        </p>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Details
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Order Number:</span>
              <span className="font-medium text-gray-900 dark:text-white">#INK{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Estimated Delivery:</span>
              <span className="font-medium text-gray-900 dark:text-white">3-5 business days</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="w-full btn-primary py-3 rounded-lg block"
          >
            View Order Status
          </Link>
          
          <Link
            to="/products"
            className="w-full btn-secondary py-3 rounded-lg block"
          >
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="block text-ink-600 hover:text-ink-500 dark:text-ink-400 dark:hover:text-ink-300 font-medium transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;