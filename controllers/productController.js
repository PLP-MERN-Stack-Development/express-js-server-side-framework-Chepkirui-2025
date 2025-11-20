// controllers/productController.js - Product business logic

const { v4: uuidv4 } = require('uuid');

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

/**
 * Get all products with filtering, pagination, and search
 * @route GET /api/products
 */
const getAllProducts = (req, res) => {
  try {
    let filteredProducts = [...products];
    
    // Search functionality
    const { search } = req.query;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    const { category } = req.query;
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by stock status
    const { inStock } = req.query;
    if (inStock !== undefined) {
      const stockStatus = inStock === 'true';
      filteredProducts = filteredProducts.filter(p => p.inStock === stockStatus);
    }
    
    // Filter by price range
    const { minPrice, maxPrice } = req.query;
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      count: paginatedProducts.length,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      data: paginatedProducts
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
};

/**
 * Get a single product by ID
 * @route GET /api/products/:id
 */
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Product not found',
        message: `No product found with id: ${id}` 
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
};

/**
 * Create a new product
 * @route POST /api/products
 */
const createProduct = (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    
    const newProduct = {
      id: uuidv4(),
      name: name.trim(),
      description: description?.trim() || '',
      price,
      category: category.trim(),
      inStock: inStock !== undefined ? inStock : true
    };
    
    products.push(newProduct);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
};

/**
 * Update an existing product
 * @route PUT /api/products/:id
 */
const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        error: 'Product not found',
        message: `No product found with id: ${id}` 
      });
    }
    
    const { name, description, price, category, inStock } = req.body;
    
    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...(name && { name: name.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(price !== undefined && { price }),
      ...(category && { category: category.trim() }),
      ...(inStock !== undefined && { inStock })
    };
    
    products[productIndex] = updatedProduct;
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
};

/**
 * Delete a product
 * @route DELETE /api/products/:id
 */
const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        error: 'Product not found',
        message: `No product found with id: ${id}` 
      });
    }
    
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};