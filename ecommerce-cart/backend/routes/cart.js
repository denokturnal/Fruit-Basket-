const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { authMiddleware } = require('../middleware/auth');
const { AppError } = require('../utils/errorHandler');

/**
 * POST /api/cart
 * Add item to cart or update quantity if already exists
 */
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    // Validate input
    if (!productId || !quantity || quantity < 1) {
      throw new AppError('Invalid productId or quantity', 400);
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.stock < quantity) {
      throw new AppError('Insufficient stock available', 400);
    }

    // Find or create cart for user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
      });
    } else {
      // Check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newQuantity = cart.items[existingItemIndex].quantity + quantity;
        
        if (product.stock < newQuantity) {
          throw new AppError('Insufficient stock for requested quantity', 400);
        }
        
        cart.items[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item to cart
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    // Populate product details
    await cart.populate('items.productId');

    res.status(200).json({
      message: 'Item added to cart successfully',
      cart,
      cartCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/cart
 * Fetch current user's cart with populated product details
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.userId;

    let cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(200).json({
        items: [],
        cartCount: 0
      });
    }

    // Filter out items where product no longer exists
    cart.items = cart.items.filter(item => item.productId !== null);

    const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    res.status(200).json({
      items: cart.items,
      cartCount
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/cart/:productId
 * Remove item from cart
 */
router.delete('/:productId', authMiddleware, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();

    await cart.populate('items.productId');

    res.status(200).json({
      message: 'Item removed from cart',
      cart,
      cartCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
