# Express.js RESTful API - Product Management

A complete RESTful API built with Express.js featuring custom middleware, error handling, authentication, filtering, pagination, and search capabilities. Built with a modular, scalable architecture following MVC pattern.

## Features

- Full CRUD operations for products
- Modular architecture (separate routes, controllers, middleware)
- Custom middleware (logging, authentication, validation)
- Comprehensive error handling
- Advanced filtering and search
- Pagination support
- Input validation
- API key authentication

## Project Structure

```
.
├── server.js                      # Main server entry point
├── routes/
│   └── productRoutes.js          # Product routes
├── controllers/
│   └── productController.js      # Product business logic
├── middleware/
│   ├── auth.js                   # Authentication middleware
│   ├── validator.js              # Validation middleware
│   ├── logger.js                 # Request logging middleware
│   └── errorHandler.js           # Error handling middleware
├── .env                          # Environment variables (not committed)
├── package.json                  # Project dependencies
├── README.md                     # This file
└── TESTING_GUIDE.md             # Testing documentation
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install express body-parser uuid dotenv
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start the server:
```bash
node server.js
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Architecture

### MVC Pattern

This project follows the Model-View-Controller (MVC) architectural pattern:

- **Routes** (`routes/`): Define API endpoints and map them to controllers
- **Controllers** (`controllers/`): Contain business logic and handle requests
- **Middleware** (`middleware/`): Process requests before they reach controllers
- **Models**: In-memory data storage (could be replaced with database models)

### Middleware Stack

1. **Request Logger**: Logs all incoming requests
2. **Authentication**: Validates API keys for protected routes
3. **Validation**: Validates request data before processing
4. **Error Handler**: Catches and formats all errors

## API Endpoints

### Root Endpoint

#### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to the Product API!",
  "endpoints": {
    "GET /api/products": "Get all products",
    "GET /api/products/:id": "Get a specific product",
    "POST /api/products": "Create a new product",
    "PUT /api/products/:id": "Update a product",
    "DELETE /api/products/:id": "Delete a product"
  }
}
```

---

### Get All Products

#### GET /api/products

Retrieve all products with optional filtering, pagination, and search.

**Query Parameters:**
- `search` (string): Search in product name and description
- `category` (string): Filter by category
- `inStock` (boolean): Filter by stock status (true/false)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Example Requests:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Search for products
curl http://localhost:3000/api/products?search=laptop

# Filter by category
curl http://localhost:3000/api/products?category=electronics

# Filter by price range
curl http://localhost:3000/api/products?minPrice=100&maxPrice=1000

# Pagination
curl http://localhost:3000/api/products?page=1&limit=5

# Combined filters
curl http://localhost:3000/api/products?category=electronics&inStock=true&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "page": 1,
  "totalPages": 1,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### Get Single Product

#### GET /api/products/:id

Retrieve a specific product by ID.

**Example Request:**
```bash
curl http://localhost:3000/api/products/1
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
```

---

### Create Product

#### POST /api/products

Create a new product. **Requires authentication.**

**Headers:**
- `x-api-key`: Your API key (default: `secret-api-key-123`)
- `Content-Type`: application/json

**Required Fields:**
- `name` (string): Product name
- `price` (number): Product price (non-negative)
- `category` (string): Product category

**Optional Fields:**
- `description` (string): Product description
- `inStock` (boolean): Stock status (default: true)

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": 25,
    "category": "electronics",
    "inStock": true
  }'
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with USB receiver",
    "price": 25,
    "category": "electronics",
    "inStock": true
  }
}
```

---

### Update Product

#### PUT /api/products/:id

Update an existing product. **Requires authentication.**

**Headers:**
- `x-api-key`: Your API key
- `Content-Type`: application/json

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{
    "price": 1100,
    "inStock": false
  }'
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1100,
    "category": "electronics",
    "inStock": false
  }
}
```

---

### Delete Product

#### DELETE /api/products/:id

Delete a product. **Requires authentication.**

**Headers:**
- `x-api-key`: Your API key

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/1 \
  -H "x-api-key: secret-api-key-123"
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
}
```

---

## Middleware Documentation

### 1. Request Logger (`middleware/logger.js`)
Logs all incoming requests with:
- Timestamp
- HTTP method and URL
- Query parameters
- Request body
- Authentication status

### 2. Authentication (`middleware/auth.js`)
- Validates API key in `x-api-key` header
- Returns 401 if no API key provided
- Returns 403 if API key is invalid
- Used on POST, PUT, DELETE routes

### 3. Validation (`middleware/validator.js`)
- **validateProduct**: Validates POST request data
- **validateProductUpdate**: Validates PUT request data
- Checks data types and required fields
- Returns 400 with detailed error messages

### 4. Error Handler (`middleware/errorHandler.js`)
- **notFoundHandler**: Handles 404 errors
- **errorHandler**: Global error handler for all errors
- **asyncHandler**: Wrapper for async route handlers

---

## Error Handling

The API includes comprehensive error handling:

### Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing API key)
- **403**: Forbidden (invalid API key)
- **404**: Not Found
- **500**: Internal Server Error

### Error Response Format
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "details": ["Additional error details"] // for validation errors
}
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
API_KEY=secret-api-key-123
```

---

## Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing examples.

Quick test:
```bash
# Test public endpoint
curl http://localhost:3000/api/products

# Test protected endpoint
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{"name":"Test","price":100,"category":"test"}'
```

---

## Dependencies

- **express**: Web framework for Node.js
- **body-parser**: Parse incoming request bodies
- **uuid**: Generate unique IDs for products
- **dotenv**: Load environment variables from .env file

Install with:
```bash
npm install express body-parser uuid dotenv
```

---

## Development

### Adding New Routes

1. Create controller function in `controllers/productController.js`
2. Add route in `routes/productRoutes.js`
3. Add middleware if needed in `middleware/`
4. Update documentation

### Adding New Middleware

1. Create middleware file in `middleware/`
2. Export middleware function
3. Import and use in `routes/` or `server.js`

---

## Best Practices Implemented

Separation of concerns (routes, controllers, middleware)  
Modular architecture for scalability  
Comprehensive error handling  
Input validation  
Security (API key authentication)  
Request logging  
RESTful design principles  
Consistent response format  
Environment-based configuration  
Clean code structure  

---

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] JWT authentication
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] API versioning
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Caching layer
- [ ] File upload support
- [ ] WebSocket support

---

## License

MIT

## Author

Express.js RESTful API Assignment - Week 2