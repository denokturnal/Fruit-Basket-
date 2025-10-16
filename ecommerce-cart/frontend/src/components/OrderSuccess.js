import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

/**
 * OrderSuccess Component
 * Displays order confirmation after successful checkout
 */
const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="order-success-container">
        <div className="no-order">
          <h2>No order found</h2>
          <button onClick={() => navigate('/')} className="home-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-header">
          <svg className="success-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1>Order Placed Successfully!</h1>
          <p className="order-id">Order ID: {order.orderId}</p>
        </div>

        <div className="order-details">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">GH₵{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>GH₵{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>GH₵{order.tax.toFixed(2)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total:</span>
              <span>GH₵{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-date">
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="success-actions">
          <button onClick={() => navigate('/')} className="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
