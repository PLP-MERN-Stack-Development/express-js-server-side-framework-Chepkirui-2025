const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');

// Import middleware
const { requestLogger } = require('./middleware/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(requestLogger);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Product API!',
    endpoints: {
      'GET /api/products': 'Get all products (supports filtering, pagination, search)',
      'GET /api/products/:id': 'Get a specific product',
      'POST /api/products': 'Create a new product (requires authentication)',
      'PUT /api/products/:id': 'Update a product (requires authentication)',
      'DELETE /api/products/:id': 'Delete a product (requires authentication)'
    },
    authentication: 'Include x-api-key header for POST, PUT, DELETE operations',
    documentation: 'See README.md for detailed API documentation'
  });
});

// API Routes
app.use('/api/products', productRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`API Key: ${process.env.API_KEY || 'secret-api-key-123'}`);
  });
}

// Export the app for testing purposes
module.exports = app;