# 🛒 E-Commerce Cart & Checkout System

A complete full-stack e-commerce cart and checkout application built with **React**, **Express.js**, and **MongoDB**.

## 📋 Features

### Frontend (React)
- ✅ Product listing with real-time stock updates
- ✅ Add to cart functionality with instant feedback
- ✅ Real-time cart count badge
- ✅ Cart notification popup
- ✅ Checkout page with item management
- ✅ Automatic calculation of subtotal, tax (10%), and total
- ✅ Mock payment processing with 2-second delay
- ✅ Order confirmation page
- ✅ Responsive design for mobile and desktop

### Backend (Express.js)
- ✅ RESTful API endpoints
- ✅ JWT-based authentication with guest session support
- ✅ MongoDB integration with Mongoose ODM
- ✅ Stock validation before checkout
- ✅ Automatic stock deduction after purchase
- ✅ Order creation and management
- ✅ Error handling and validation

### Database (MongoDB)
- ✅ Product model with stock tracking
- ✅ Cart model with user association
- ✅ Order model with payment status
- ✅ Seed data for quick setup

## 🏗️ Project Structure

```
ecommerce-cart/
├── backend/
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   ├── Cart.js          # Cart schema
│   │   └── Order.js         # Order schema
│   ├── routes/
│   │   ├── products.js      # Product endpoints
│   │   ├── cart.js          # Cart endpoints
│   │   └── checkout.js      # Checkout & payment endpoints
│   ├── middleware/
│   │   └── auth.js          # JWT authentication
│   ├── server.js            # Express server setup
│   ├── seedData.js          # Database seeding script
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ProductList.js       # Product grid
    │   │   ├── ProductList.css
    │   │   ├── CartIcon.js          # Cart icon with badge
    │   │   ├── CartIcon.css
    │   │   ├── CartNotification.js  # Popup notification
    │   │   ├── CartNotification.css
    │   │   ├── Checkout.js          # Checkout page
    │   │   ├── Checkout.css
    │   │   ├── OrderSuccess.js      # Order confirmation
    │   │   └── OrderSuccess.css
    │   ├── context/
    │   │   └── CartContext.js       # Global cart state
    │   ├── services/
    │   │   └── api.js               # API service layer
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone or navigate to the project directory

```bash
cd "C:\Users\De Nokturnal\Desktop\The Fruit Basket\ecommerce-cart"
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/ecommerce-cart
# PORT=5000
# JWT_SECRET=your-secret-key-change-in-production

# Seed the database with sample products
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on **http://localhost:5000**

#### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env file if needed
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React development server
npm start
```

The frontend will start on **http://localhost:3000**

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": "product_id_here",
    "quantity": 1
  }
  ```
- `DELETE /api/cart/:productId` - Remove item from cart

### Checkout
- `POST /api/checkout/payment` - Process payment (mock)
  ```json
  {
    "amount": 500.00
  }
  ```
- `POST /api/checkout` - Complete checkout
  ```json
  {
    "paymentId": "pay_123456"
  }
  ```
- `GET /api/checkout/orders` - Get user's order history

## 🔐 Authentication

The system uses JWT tokens for authentication with automatic guest session support:

- **Guest Users**: Automatically assigned a temporary session token
- **Token Storage**: Stored in `localStorage`
- **Token Expiry**: 7 days
- **Auto-Renewal**: Token refreshed on API responses

## 💾 Database Models

### Product
```javascript
{
  name: String,
  price: Number,
  stock: Number,
  image: String,
  description: String,
  timestamps: true
}
```

### Cart
```javascript
{
  userId: String,
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number
  }],
  timestamps: true
}
```

### Order
```javascript
{
  userId: String,
  items: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  subtotal: Number,
  tax: Number,
  total: Number,
  paymentStatus: String,
  paymentId: String,
  timestamps: true
}
```

## 🎯 Usage Flow

1. **Browse Products**: View all available fruit hampers on the home page
2. **Add to Cart**: Click "Add to Cart" button on any product
3. **View Cart**: Click the cart icon to navigate to checkout
4. **Review Items**: See all cart items with quantities and prices
5. **Complete Purchase**: Click "Complete Purchase" to process payment
6. **Payment Processing**: Mock payment takes 2 seconds
7. **Order Confirmation**: View order details on success page
8. **Stock Update**: Product stock automatically decreases
9. **Cart Cleared**: Cart is emptied after successful order

## 🧪 Testing the Application

### Test Scenarios

1. **Add Multiple Items**
   - Add different products to cart
   - Verify cart count updates
   - Check notification popup appears

2. **Stock Validation**
   - Try adding more items than available stock
   - Verify error message appears

3. **Checkout Process**
   - Navigate to checkout
   - Review cart items
   - Complete purchase
   - Verify order confirmation

4. **Payment Simulation**
   - Click "Complete Purchase"
   - Wait for 2-second processing
   - Check success message

5. **Stock Deduction**
   - Note product stock before purchase
   - Complete checkout
   - Refresh page and verify stock decreased

## 🛠️ Development Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Seed database with sample data
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce-cart
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📦 Dependencies

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **jsonwebtoken**: JWT authentication
- **nodemon**: Development auto-reload (dev)

### Frontend
- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client

## 🎨 Styling

- Custom CSS with modern design
- Responsive grid layouts
- Smooth animations and transitions
- Mobile-first approach
- Green color scheme matching fruit theme

## ⚠️ Error Handling

The application includes comprehensive error handling:

- **Stock Validation**: Prevents over-ordering
- **Network Errors**: Graceful API error handling
- **Empty Cart**: Prevents checkout with no items
- **Payment Failures**: 5% simulated failure rate
- **Missing Products**: Filters out deleted products

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use a production MongoDB instance (MongoDB Atlas)
3. Change JWT_SECRET to a secure random string
4. Enable CORS for your frontend domain only
5. Use a process manager like PM2

### Frontend Deployment
1. Update REACT_APP_API_URL to production backend URL
2. Run `npm run build`
3. Deploy build folder to hosting service (Vercel, Netlify, etc.)

## 📝 Notes

- Tax rate is set to 10% (configurable in Checkout.js)
- Payment simulation has 95% success rate
- Guest sessions expire after 7 days
- Stock is validated both on add-to-cart and checkout
- All monetary values use 2 decimal precision

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Built with ❤️ using React, Express.js, and MongoDB**
