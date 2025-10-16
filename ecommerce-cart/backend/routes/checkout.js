const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');
const { AppError } = require('../utils/errorHandler');

/**
 * POST /api/payment
 * Simulate payment processing
 * Returns success after 2 seconds delay
 */
router.post('/payment', authMiddleware, async (req, res, next) => {
  try {
    const { amount } = req.body;

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate 95% success rate
    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.status(200).json({
        success: true,
        paymentId,
        amount,
        message: 'Payment processed successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed. Please try again.'
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/checkout
 * Process checkout:
 * 1. Validate stock availability
 * 2. Calculate totals (subtotal, tax, total)
 * 3. Create order
 * 4. Deduct stock from products
 * 5. Clear user's cart
 */
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId;
    const { paymentId } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      throw new AppError('Cart is empty', 400);
    }

    // Validate stock and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;

      if (!product) {
        throw new AppError('One or more products no longer exist', 400);
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        throw new AppError(
          `Insufficient stock for ${product.name}. Only ${product.stock} available.`,
          400
        );
      }

      // Calculate item total
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    // Calculate tax (10% for example)
    const taxRate = 0.10;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      subtotal,
      tax,
      total,
      paymentStatus: 'completed',
      paymentId: paymentId || `pay_${Date.now()}`
    });

    await order.save();

    // Deduct stock from products
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        orderId: order._id,
        items: order.items,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/checkout/orders
 * Get user's order history
 */
router.get('/orders', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.productId');

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
