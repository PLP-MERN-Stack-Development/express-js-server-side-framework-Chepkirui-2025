// routes/productRoutes.js - Product routes

const express = require('express');
const router = express.Router();

// Import controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Import middleware
const { authenticate } = require('../middleware/auth');
const { validateProduct, validateProductUpdate } = require('../middleware/validator');

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering, pagination, and search
 * @access  Public
 * @query   search, category, inStock, minPrice, maxPrice, page, limit
 */
router.get('/', getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 * @access  Public
 */
router.get('/:id', getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (requires authentication)
 * @body    name, description, price, category, inStock
 */
router.post('/', authenticate, validateProduct, createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 * @access  Private (requires authentication)
 * @body    name, description, price, category, inStock (all optional)
 */
router.put('/:id', authenticate, validateProductUpdate, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (requires authentication)
 */
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;