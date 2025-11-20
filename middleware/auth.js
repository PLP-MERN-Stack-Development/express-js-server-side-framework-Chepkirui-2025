// middleware/auth.js - Authentication middleware

/**
 * Authentication middleware
 * Validates API key in the x-api-key header
 */
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY || 'PirateToleration';
  
  if (!apiKey) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please provide an API key in x-api-key header' 
    });
  }
  
  if (apiKey !== validApiKey) {
    return res.status(403).json({ 
      error: 'Invalid API key',
      message: 'The provided API key is not valid' 
    });
  }
  
  // Authentication successful
  next();
};

module.exports = { authenticate };