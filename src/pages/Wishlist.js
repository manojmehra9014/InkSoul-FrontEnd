import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/wishlist/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.ok) {
        setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.images[0]?.url || '/placeholder.png',
      size: item.sizes[0]?.name || 'One Size',
      color: item.colors[0]?.name || 'Default',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to view your wishlist
          </h2>
          <Link
            to="/login"
            className="btn-primary px-6 py-3 rounded-lg inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Wishlist
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-32 h-32 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start adding products you love to your wishlist
            </p>
            <Link
              to="/products"
              className="btn-primary px-6 py-3 rounded-lg inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                  title="Remove from wishlist"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} />
                  </svg>
                </button>

                {/* Product Image */}
                <Link to={`/products/${item._id}`} className="block">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={item.images[0]?.url || '/placeholder.png'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {item.comparePrice && item.comparePrice > item.price && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
                        -{Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)}%
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/products/${item._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-ink-600 dark:hover:text-ink-400">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-ink-600 dark:text-ink-400">
                        {formatPrice(item.price)}
                      </span>
                      {item.comparePrice && item.comparePrice > item.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatPrice(item.comparePrice)}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    {item.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  {item.stock > 0 ? (
                    <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                      In Stock {item.stock < 10 && `(Only ${item.stock} left)`}
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">Out of Stock</p>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock === 0}
                    className="w-full btn-primary py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {wishlistItems.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-ink-600 to-soul-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Love these products?
            </h2>
            <p className="text-ink-100 mb-6">
              Add them to your cart and complete your purchase today!
            </p>
            <Link
              to="/cart"
              className="bg-white text-ink-600 px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all inline-block"
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
