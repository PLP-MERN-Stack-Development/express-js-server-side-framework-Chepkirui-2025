# API Testing Guide

This guide provides comprehensive examples for testing all API endpoints.

## Setup

1. Start the server:
```bash
node server.js
```

2. The API will be available at `http://localhost:3000`

3. Default API key: `secret-api-key-123`

---

## Test Scenarios

### 1. Test Root Endpoint

**Request:**
```bash
curl http://localhost:3000/
```

**Expected Response:**
```json
{
  "message": "Welcome to the Product API!",
  "endpoints": {...}
}
```

---

### 2. Test GET All Products (Basic)

**Request:**
```bash
curl http://localhost:3000/api/products
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 3,
  "page": 1,
  "totalPages": 1,
  "data": [...]
}
```

---

### 3. Test Search Functionality

**Request:**
```bash
curl "http://localhost:3000/api/products?search=laptop"
```

**Expected:** Should return only products containing "laptop" in name or description

---

### 4. Test Category Filter

**Request:**
```bash
curl "http://localhost:3000/api/products?category=electronics"
```

**Expected:** Should return only electronics products

---

### 5. Test Price Range Filter

**Request:**
```bash
curl "http://localhost:3000/api/products?minPrice=100&maxPrice=900"
```

**Expected:** Should return products priced between 100 and 900

---

### 6. Test Stock Filter

**Request:**
```bash
curl "http://localhost:3000/api/products?inStock=true"
```

**Expected:** Should return only in-stock products

---

### 7. Test Pagination

**Request:**
```bash
curl "http://localhost:3000/api/products?page=1&limit=2"
```

**Expected:** Should return only 2 products with pagination info

---

### 8. Test Combined Filters

**Request:**
```bash
curl "http://localhost:3000/api/products?category=electronics&inStock=true&minPrice=500&page=1&limit=5"
```

**Expected:** Should return filtered and paginated results

---

### 9. Test GET Single Product (Success)

**Request:**
```bash
curl http://localhost:3000/api/products/1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Laptop",
    ...
  }
}
```

---

### 10. Test GET Single Product (Not Found)

**Request:**
```bash
curl http://localhost:3000/api/products/999
```

**Expected Response (404):**
```json
{
  "error": "Product not found",
  "message": "No product found with id: 999"
}
```

---

### 11. Test POST Without Authentication

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":100,"category":"test"}'
```

**Expected Response (401):**
```json
{
  "error": "Authentication required",
  "message": "Please provide an API key in x-api-key header"
}
```

---

### 12. Test POST With Invalid API Key

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: wrong-key" \
  -d '{"name":"Test Product","price":100,"category":"test"}'
```

**Expected Response (403):**
```json
{
  "error": "Invalid API key",
  "message": "The provided API key is not valid"
}
```

---

### 13. Test POST With Validation Errors

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{"name":"","price":-10}'
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "details": [
    "Name is required and must be a non-empty string",
    "Category is required and must be a non-empty string"
  ]
}
```

---

### 14. Test POST Success

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{
    "name": "Wireless Keyboard",
    "description": "Mechanical wireless keyboard",
    "price": 89.99,
    "category": "electronics",
    "inStock": true
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "...",
    "name": "Wireless Keyboard",
    ...
  }
}
```

---

### 15. Test PUT Without Authentication

**Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1000}'
```

**Expected Response (401):**
```json
{
  "error": "Authentication required",
  "message": "Please provide an API key in x-api-key header"
}
```

---

### 16. Test PUT Product Not Found

**Request:**
```bash
curl -X PUT http://localhost:3000/api/products/999 \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{"price":1000}'
```

**Expected Response (404):**
```json
{
  "error": "Product not found",
  "message": "No product found with id: 999"
}
```

---

### 17. Test PUT With Validation Error

**Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{"price":-100}'
```

**Expected Response (400):**
```json
{
  "error": "Validation failed",
  "message": "Price must be a non-negative number"
}
```

---

### 18. Test PUT Success

**Request:**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: secret-api-key-123" \
  -d '{
    "price": 1150,
    "inStock": false
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "1",
    "name": "Laptop",
    "price": 1150,
    "inStock": false,
    ...
  }
}
```

---

### 19. Test DELETE Without Authentication

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

**Expected Response (401):**
```json
{
  "error": "Authentication required",
  "message": "Please provide an API key in x-api-key header"
}
```

---

### 20. Test DELETE Product Not Found

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/999 \
  -H "x-api-key: secret-api-key-123"
```

**Expected Response (404):**
```json
{
  "error": "Product not found",
  "message": "No product found with id: 999"
}
```

---

### 21. Test DELETE Success

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/products/3 \
  -H "x-api-key: secret-api-key-123"
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": "3",
    "name": "Coffee Maker",
    ...
  }
}
```

---

### 22. Test 404 for Invalid Endpoint

**Request:**
```bash
curl http://localhost:3000/api/invalid
```

**Expected Response (404):**
```json
{
  "error": "Not found",
  "message": "Cannot GET /api/invalid",
  "availableEndpoints": [...]
}
```

---

## Testing with Postman

### Import Collection

Create a new collection in Postman with the following requests:

1. **GET All Products**
   - Method: GET
   - URL: `http://localhost:3000/api/products`

2. **GET Single Product**
   - Method: GET
   - URL: `http://localhost:3000/api/products/1`

3. **POST Create Product**
   - Method: POST
   - URL: `http://localhost:3000/api/products`
   - Headers: 
     - `Content-Type: application/json`
     - `x-api-key: secret-api-key-123`
   - Body (raw JSON):
     ```json
     {
       "name": "Test Product",
       "description": "Test description",
       "price": 99.99,
       "category": "test",
       "inStock": true
     }
     ```

4. **PUT Update Product**
   - Method: PUT
   - URL: `http://localhost:3000/api/products/1`
   - Headers: 
     - `Content-Type: application/json`
     - `x-api-key: secret-api-key-123`
   - Body (raw JSON):
     ```json
     {
       "price": 1199,
       "inStock": false
     }
     ```

5. **DELETE Product**
   - Method: DELETE
   - URL: `http://localhost:3000/api/products/1`
   - Headers: 
     - `x-api-key: secret-api-key-123`

---

## Automated Testing Script

Save this as `test.sh` and run with `bash test.sh`:

```bash
#!/bin/bash

API_URL="http://localhost:3000"
API_KEY="secret-api-key-123"

echo "=== Testing Express.js RESTful API ==="
echo ""

echo "1. Testing root endpoint..."
curl -s $API_URL/ | jq
echo ""

echo "2. Testing GET all products..."
curl -s $API_URL/api/products | jq
echo ""

echo "3. Testing GET single product..."
curl -s $API_URL/api/products/1 | jq
echo ""

echo "4. Testing search..."
curl -s "$API_URL/api/products?search=laptop" | jq
echo ""

echo "5. Testing POST without auth (should fail)..."
curl -s -X POST $API_URL/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":100,"category":"test"}' | jq
echo ""

echo "6. Testing POST with auth..."
curl -s -X POST $API_URL/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"name":"Test Product","price":199,"category":"test"}' | jq
echo ""

echo "7. Testing PUT..."
curl -s -X PUT $API_URL/api/products/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: $API_KEY" \
  -d '{"price":1199}' | jq
echo ""

echo "8. Testing invalid endpoint (should return 404)..."
curl -s $API_URL/api/invalid | jq
echo ""

echo "=== All tests completed ==="
```

---

## Checklist

- [ ] Server starts successfully
- [ ] Root endpoint returns API info
- [ ] GET all products works
- [ ] Search functionality works
- [ ] Filtering by category works
- [ ] Filtering by price works
- [ ] Filtering by stock status works
- [ ] Pagination works
- [ ] GET single product works
- [ ] GET returns 404 for non-existent product
- [ ] POST without auth returns 401
- [ ] POST with wrong API key returns 403
- [ ] POST with invalid data returns 400
- [ ] POST with valid data creates product
- [ ] PUT without auth returns 401
- [ ] PUT updates product successfully
- [ ] DELETE without auth returns 401
- [ ] DELETE removes product successfully
- [ ] Invalid endpoints return 404
- [ ] Request logging appears in console

---

## Notes

- All timestamps in logs should be in ISO format
- All responses should be valid JSON
- Error messages should be descriptive
- Status codes should be appropriate
- Authentication is required for POST, PUT, DELETE
- Validation runs before authentication for POST requests