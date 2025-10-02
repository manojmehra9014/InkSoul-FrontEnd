import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currency';

const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal 
  } = useCart();
  const { isAuthenticated } = useAuth();
  const sidebarRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Animate sidebar in
      gsap.set(sidebarRef.current, { x: '100%' });
      gsap.set(overlayRef.current, { opacity: 0 });
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.to(sidebarRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' });
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Animate sidebar out
      gsap.to(sidebarRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    updateQuantity(cartId, newQuantity);
  };

  const handleRemoveItem = (cartId) => {
    const itemElement = document.querySelector(`[data-sidebar-cart-id="${cartId}"]`);
    if (itemElement) {
      gsap.to(itemElement, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        onComplete: () => removeFromCart(cartId)
      });
    } else {
      removeFromCart(cartId);
    }
  };

  const handleCheckout = () => {
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add some products to get started
              </p>
              <Link
                to="/products"
                onClick={closeCart}
                className="btn-primary px-6 py-2 rounded-lg"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartId}
                  data-sidebar-cart-id={item.cartId}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image?.url || item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.color}</span>
                    </div>
                    <p className="text-sm font-bold text-ink-600 dark:text-ink-400">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.cartId)}
                    className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total:
              </span>
              <span className="text-xl font-bold text-ink-600 dark:text-ink-400">
                {formatPrice(getCartTotal())}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/cart"
                onClick={handleCheckout}
                className="w-full btn-secondary text-center py-3 rounded-lg block"
              >
                View Cart
              </Link>
              
              {isAuthenticated ? (
                <Link
                  to="/checkout"
                  onClick={handleCheckout}
                  className="w-full btn-primary text-center py-3 rounded-lg block"
                >
                  Checkout
                </Link>
              ) : (
                <Link
                  to="/login"
                  state={{ from: { pathname: '/checkout' } }}
                  onClick={handleCheckout}
                  className="w-full btn-primary text-center py-3 rounded-lg block"
                >
                  Sign In to Checkout
                </Link>
              )}
            </div>

            {/* Continue Shopping */}
            <Link
              to="/products"
              onClick={closeCart}
              className="block text-center text-ink-600 hover:text-ink-500 dark:text-ink-400 dark:hover:text-ink-300 font-medium transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;