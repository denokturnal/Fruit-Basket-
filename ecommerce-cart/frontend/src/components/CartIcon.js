import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartIcon.css';

/**
 * CartIcon Component
 * Displays cart icon with item count badge
 * Navigates to checkout page on click
 */
const CartIcon = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-icon-wrapper" onClick={handleClick}>
      <svg 
        className="cart-icon" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </div>
  );
};

export default CartIcon;
