import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import CartIcon from './components/CartIcon';
import CartNotification from './components/CartNotification';
import './App.css';

/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          {/* Header */}
          <header className="app-header">
            <div className="header-content">
              <h1 className="app-title" onClick={() => window.location.href = '/'}>
                🍎 The Fruit Basket
              </h1>
              <CartIcon />
            </div>
          </header>

          {/* Main Content */}
          <main className="app-main">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="app-footer">
            <p>&copy; 2025 The Fruit Basket - E-commerce Cart Demo</p>
          </footer>

          {/* Cart Notification Popup */}
          <CartNotification />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
