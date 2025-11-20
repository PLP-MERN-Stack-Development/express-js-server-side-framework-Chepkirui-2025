// middleware/validator.js - Validation middleware

/**
 * Product validation middleware for POST requests
 * Validates required fields: name, price, category
 */
const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];
  
  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  // Validate price
  if (price === undefined || typeof price !== 'number' || price < 0) {
    errors.push('Price is required and must be a non-negative number');
  }
  
  // Validate category
  if (!category || typeof category !== 'string' || category.trim().length === 0) {
    errors.push('Category is required and must be a non-empty string');
  }
  
  // If there are validation errors, return 400
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors 
    });
  }
  
  // Validation passed
  next();
};

/**
 * Validation for PUT requests
 * Validates fields if they are provided
 */
const validateProductUpdate = (req, res, next) => {
  const { name, price, category } = req.body;
  
  // Validate name if provided
  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Name must be a non-empty string' 
    });
  }
  
  // Validate price if provided
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Price must be a non-negative number' 
    });
  }
  
  // Validate category if provided
  if (category !== undefined && (typeof category !== 'string' || category.trim().length === 0)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      message: 'Category must be a non-empty string' 
    });
  }
  
  // Validation passed
  next();
};

module.exports = { 
  validateProduct,
  validateProductUpdate
};