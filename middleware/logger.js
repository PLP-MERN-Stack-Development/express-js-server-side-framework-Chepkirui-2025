// middleware/logger.js - Request logging middleware

/**
 * Request logger middleware
 * Logs all incoming requests with timestamp, method, URL, query params, and body
 */
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  
  console.log('\n========================================');
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log('========================================');
  
  // Log query parameters if present
  if (Object.keys(req.query).length > 0) {
    console.log('Query Parameters:', JSON.stringify(req.query, null, 2));
  }
  
  // Log request body if present
  if (Object.keys(req.body).length > 0) {
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Log headers (excluding sensitive information)
  if (req.headers['x-api-key']) {
    console.log('Authentication: API Key provided');
  }
  
  console.log('========================================\n');
  
  next();
};

module.exports = { requestLogger };