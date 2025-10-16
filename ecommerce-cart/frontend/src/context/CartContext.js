import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';

/**
 * Cart Context
 * Manages global cart state and provides cart operations
 */
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  /**
   * Fetch cart from backend
   */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartAPI.get();
      setCartItems(data.items || []);
      setCartCount(data.cartCount || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add item to cart
   */
  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const data = await cartAPI.addItem(productId, quantity);
      setCartItems(data.cart.items || []);
      setCartCount(data.cartCount || 0);
      
      // Show notification
      showCartNotification('Item added to cart!');
      
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      showCartNotification(error.response?.data?.error || 'Failed to add item', true);
      return { success: false, error: error.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const data = await cartAPI.removeItem(productId);
      setCartItems(data.cart.items || []);
      setCartCount(data.cartCount || 0);
      
      showCartNotification('Item removed from cart');
      
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error: error.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear cart (after successful checkout)
   */
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  /**
   * Show cart notification popup
   */
  const showCartNotification = (message, isError = false) => {
    setNotificationMessage(message);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const value = {
    cartItems,
    cartCount,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    showNotification,
    notificationMessage
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
