import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { checkoutAPI } from '../services/api';
import './Checkout.css';

/**
 * Checkout Component
 * Displays cart items, calculates totals, and processes payment
 */
const Checkout = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const TAX_RATE = 0.10; // 10% tax

  /**
   * Calculate totals whenever cart items change
   */
  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  /**
   * Calculate subtotal, tax, and total
   */
  const calculateTotals = () => {
    const sub = cartItems.reduce((sum, item) => {
      return sum + (item.productId?.price || 0) * item.quantity;
    }, 0);
    
    const taxAmount = sub * TAX_RATE;
    const totalAmount = sub + taxAmount;
    
    setSubtotal(sub);
    setTax(taxAmount);
    setTotal(totalAmount);
  };

  /**
   * Handle remove item from cart
   */
  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  /**
   * Process payment and complete checkout
   */
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      // Step 1: Process payment
      const paymentResult = await checkoutAPI.processPayment(total);
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.message || 'Payment failed');
      }

      // Step 2: Complete checkout
      const checkoutResult = await checkoutAPI.checkout(paymentResult.paymentId);
      
      if (checkoutResult.success) {
        setSuccess(true);
        clearCart();
        
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          navigate('/order-success', { 
            state: { order: checkoutResult.order } 
          });
        }, 2000);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.error || err.message || 'Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-container">
        <div className="success-message">
          <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2>Order Placed Successfully!</h2>
          <p>Redirecting to order confirmation...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart">
          <svg className="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <button className="continue-shopping-btn" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-content">
        {/* Cart Items */}
        <div className="cart-items-section">
          <h2>Your Items</h2>
          {cartItems.map((item) => (
            <div key={item.productId?._id} className="checkout-item">
              <img 
                src={item.productId?.image} 
                alt={item.productId?.name}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <h3>{item.productId?.name}</h3>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <p className="item-price">GH₵{item.productId?.price?.toFixed(2)} each</p>
              </div>
              <div className="checkout-item-total">
                <p className="item-subtotal">
                  GH₵{((item.productId?.price || 0) * item.quantity).toFixed(2)}
                </p>
                <button 
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item.productId?._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>GH₵{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>GH₵{tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total-row">
            <span>Total:</span>
            <span>GH₵{total.toFixed(2)}</span>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="spinner-small"></span>
                Processing...
              </>
            ) : (
              'Complete Purchase'
            )}
          </button>

          <button 
            className="continue-shopping-link"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
