import React from 'react';
import { useCart } from '../context/CartContext';
import './CartNotification.css';

/**
 * CartNotification Component
 * Shows a popup notification when items are added/removed from cart
 */
const CartNotification = () => {
  const { showNotification, notificationMessage } = useCart();

  if (!showNotification) return null;

  return (
    <div className="cart-notification">
      <div className="notification-content">
        <svg 
          className="notification-icon" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span>{notificationMessage}</span>
      </div>
    </div>
  );
};

export default CartNotification;
