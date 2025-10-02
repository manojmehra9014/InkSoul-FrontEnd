import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { gsap } from 'gsap';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  total: 0,
  itemCount: 0,
  isOpen: false
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item._id === action.payload._id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      );

      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item._id === action.payload._id && 
          item.size === action.payload.size && 
          item.color === action.payload.color
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, cartId: Date.now() }];
      }

      return {
        ...state,
        items: newItems
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.cartId !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cartId === action.payload.cartId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    case 'CALCULATE_TOTALS':
      const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      const total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        itemCount,
        total: parseFloat(total.toFixed(2))
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Calculate totals whenever items change
  useEffect(() => {
    dispatch({ type: 'CALCULATE_TOTALS' });
  }, [state.items]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product, quantity = 1, size = 'M', color = 'Default') => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || product.images[0],
      quantity,
      size,
      color,
      stock: product.stock
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });

    // GSAP animation for add to cart feedback
    gsap.fromTo('.cart-icon', 
      { scale: 1 }, 
      { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 }
    );

    // Show success message with animation
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Added to cart!';
    document.body.appendChild(successMsg);

    gsap.fromTo(successMsg, 
      { opacity: 0, x: 100 }, 
      { opacity: 1, x: 0, duration: 0.3 }
    );

    setTimeout(() => {
      gsap.to(successMsg, { 
        opacity: 0, 
        x: 100, 
        duration: 0.3, 
        onComplete: () => document.body.removeChild(successMsg) 
      });
    }, 2000);
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartId });
    
    // GSAP animation for remove feedback
    gsap.fromTo('.cart-icon', 
      { scale: 1 }, 
      { scale: 0.8, duration: 0.2, yoyo: true, repeat: 1 }
    );
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        getCartItemsCount,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};