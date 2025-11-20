// middleware/errorHandler.js - Error handling middleware

/**
 * 404 Not Found handler
 * Handles requests to non-existent routes
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.url}`,
    availableEndpoints: [
      'GET /',
      'GET /api/products',
      'GET /api/products/:id',
      'POST /api/products',
      'PUT /api/products/:id',
      'DELETE /api/products/:id'
    ]
  });
};

/**
 * Global error handler
 * Catches and handles all errors that occur in the application
 */
const errorHandler = (err, req, res, next) => {
  console.error('========================================');
  console.error('ERROR OCCURRED:');
  console.error('========================================');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  console.error('Stack trace:', err.stack);
  console.error('========================================\n');
  
  // Determine status code
  const statusCode = err.status || err.statusCode || 500;
  
  // Build error response
  const errorResponse = {
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong on the server'
  };
  
  // Include stack trace in development mode
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }
  
  res.status(statusCode).json(errorResponse);
};

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors and pass them to error handler
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { 
  notFoundHandler,
  errorHandler,
  asyncHandler
};