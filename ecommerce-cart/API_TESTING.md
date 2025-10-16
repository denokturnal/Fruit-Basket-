# 🧪 API Testing Guide

Test all API endpoints using tools like **Postman**, **Thunder Client**, or **curl**.

## Base URL
```
http://localhost:5000/api
```

---

## 📦 Products API

### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Tropical Paradise Hamper",
      "price": 400.00,
      "stock": 15,
      "image": "https://...",
      "description": "Banana, Pawpaw, Pineapple...",
      "createdAt": "2025-10-09T...",
      "updatedAt": "2025-10-09T..."
    }
  ]
}
```

### Get Single Product
```http
GET /api/products/:id
```

**Example:**
```http
GET /api/products/6527abc123def456789
```

---

## 🛒 Cart API

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

**Response:**
```json
{
  "items": [
    {
      "productId": {
        "_id": "product_id",
        "name": "Berry Delight",
        "price": 800.00,
        "image": "https://..."
      },
      "quantity": 2,
      "_id": "cart_item_id"
    }
  ],
  "cartCount": 2
}
```

### Add Item to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "6527abc123def456789",
  "quantity": 1
}
```

**Response:**
```json
{
  "message": "Item added to cart successfully",
  "cart": {
    "userId": "user_123",
    "items": [...]
  },
  "cartCount": 3
}
```

**Error Response (Insufficient Stock):**
```json
{
  "error": "Insufficient stock available"
}
```

### Remove Item from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <token>
```

**Example:**
```http
DELETE /api/cart/6527abc123def456789
```

---

## 💳 Checkout API

### Process Payment (Mock)
```http
POST /api/checkout/payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 500.00
}
```

**Success Response (after 2 seconds):**
```json
{
  "success": true,
  "paymentId": "pay_1696854321_abc123",
  "amount": 500.00,
  "message": "Payment processed successfully"
}
```

**Failure Response (5% chance):**
```json
{
  "success": false,
  "message": "Payment failed. Please try again."
}
```

### Complete Checkout
```http
POST /api/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "pay_1696854321_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "orderId": "order_id_123",
    "items": [
      {
        "productId": "product_id",
        "name": "Berry Delight",
        "price": 800.00,
        "quantity": 2
      }
    ],
    "subtotal": 1600.00,
    "tax": 160.00,
    "total": 1760.00,
    "createdAt": "2025-10-09T..."
  }
}
```

**Error Response (Empty Cart):**
```json
{
  "error": "Cart is empty"
}
```

**Error Response (Insufficient Stock):**
```json
{
  "error": "Insufficient stock for Berry Delight. Only 5 available."
}
```

### Get Order History
```http
GET /api/checkout/orders
Authorization: Bearer <token>
```

**Response:**
```json
{
  "orders": [
    {
      "_id": "order_id",
      "userId": "user_123",
      "items": [...],
      "subtotal": 1600.00,
      "tax": 160.00,
      "total": 1760.00,
      "paymentStatus": "completed",
      "paymentId": "pay_123",
      "createdAt": "2025-10-09T..."
    }
  ]
}
```

---

## 🔐 Authentication

The API uses JWT tokens. For testing:

### Option 1: Let the System Generate Guest Token
Simply make requests without an `Authorization` header. The system will automatically create a guest session.

### Option 2: Use a Custom Token
Generate a token and include it in requests:

**Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Purchase Flow
1. **Get products:** `GET /api/products`
2. **Add to cart:** `POST /api/cart` with productId
3. **View cart:** `GET /api/cart`
4. **Process payment:** `POST /api/checkout/payment`
5. **Complete checkout:** `POST /api/checkout` with paymentId
6. **View orders:** `GET /api/checkout/orders`

### Scenario 2: Stock Validation
1. Add product to cart with quantity = 100
2. Should receive error: "Insufficient stock available"

### Scenario 3: Empty Cart Checkout
1. Remove all items from cart
2. Try to checkout
3. Should receive error: "Cart is empty"

### Scenario 4: Multiple Items
1. Add Product A (quantity: 2)
2. Add Product B (quantity: 1)
3. Add Product A again (quantity: 1)
4. Cart should show Product A with quantity: 3

---

## 📋 Postman Collection

### Import These Requests

**1. Get All Products**
- Method: GET
- URL: `{{baseUrl}}/products`

**2. Add to Cart**
- Method: POST
- URL: `{{baseUrl}}/cart`
- Body (JSON):
```json
{
  "productId": "{{productId}}",
  "quantity": 1
}
```

**3. Get Cart**
- Method: GET
- URL: `{{baseUrl}}/cart`

**4. Process Payment**
- Method: POST
- URL: `{{baseUrl}}/checkout/payment`
- Body (JSON):
```json
{
  "amount": 500
}
```

**5. Complete Checkout**
- Method: POST
- URL: `{{baseUrl}}/checkout`
- Body (JSON):
```json
{
  "paymentId": "{{paymentId}}"
}
```

**Environment Variables:**
- `baseUrl`: `http://localhost:5000/api`
- `productId`: (copy from GET products response)
- `paymentId`: (copy from payment response)

---

## 🐛 Common Errors

### 400 Bad Request
- Invalid request body
- Missing required fields
- Insufficient stock

### 404 Not Found
- Product doesn't exist
- Cart not found

### 500 Internal Server Error
- Database connection issue
- Server error (check backend logs)

---

## 💡 Tips

1. **Use Environment Variables** in Postman for baseUrl and tokens
2. **Save Responses** to use IDs in subsequent requests
3. **Test Edge Cases** like negative quantities, invalid IDs
4. **Monitor Backend Logs** for detailed error messages
5. **Reset Database** with `npm run seed` if needed

---

**Happy Testing! 🚀**
