const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { AppError } = require('../utils/errorHandler');

/**
 * GET /api/products
 * Fetch all products
 */
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 * Fetch single product by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
