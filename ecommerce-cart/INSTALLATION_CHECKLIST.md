# ✅ Installation & Verification Checklist

## Pre-Installation Requirements

### 1. Software Installation
- [ ] Node.js (v14+) installed - `node --version`
- [ ] npm installed - `npm --version`
- [ ] MongoDB installed - `mongod --version`
- [ ] Git installed (optional) - `git --version`

### 2. MongoDB Setup
- [ ] MongoDB service running
  - Windows: `net start MongoDB` or run `mongod`
  - Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`
- [ ] Can connect to MongoDB at `mongodb://localhost:27017`

---

## Backend Installation

### Step 1: Navigate to Backend
```powershell
cd "C:\Users\De Nokturnal\Desktop\The Fruit Basket\ecommerce-cart\backend"
```
- [ ] In backend directory

### Step 2: Install Dependencies
```powershell
npm install
```
- [ ] express installed
- [ ] mongoose installed
- [ ] cors installed
- [ ] dotenv installed
- [ ] jsonwebtoken installed
- [ ] nodemon installed (dev)
- [ ] No errors during installation

### Step 3: Environment Setup
```powershell
copy .env.example .env
```
- [ ] .env file created
- [ ] MONGODB_URI set correctly
- [ ] PORT set (default: 5000)
- [ ] JWT_SECRET set

### Step 4: Seed Database
```powershell
npm run seed
```
- [ ] Connected to MongoDB message appears
- [ ] "8 products added to database" message appears
- [ ] No errors

### Step 5: Start Backend Server
```powershell
npm run dev
```
- [ ] "✅ Connected to MongoDB" appears
- [ ] "🚀 Server running on http://localhost:5000" appears
- [ ] "📦 API endpoints available" appears
- [ ] No errors in console

### Step 6: Test Backend
Open browser: `http://localhost:5000/api/health`
- [ ] Returns JSON: `{"status":"OK","message":"Server is running"}`

Test products: `http://localhost:5000/api/products`
- [ ] Returns JSON with products array
- [ ] 8 products visible

---

## Frontend Installation

### Step 1: Navigate to Frontend (New Terminal)
```powershell
cd "C:\Users\De Nokturnal\Desktop\The Fruit Basket\ecommerce-cart\frontend"
```
- [ ] In frontend directory

### Step 2: Install Dependencies
```powershell
npm install
```
- [ ] react installed
- [ ] react-dom installed
- [ ] react-router-dom installed
- [ ] axios installed
- [ ] react-scripts installed
- [ ] No errors during installation

### Step 3: Environment Setup
```powershell
copy .env.example .env
```
- [ ] .env file created
- [ ] REACT_APP_API_URL set to `http://localhost:5000/api`

### Step 4: Start Frontend
```powershell
npm start
```
- [ ] "Compiled successfully!" message appears
- [ ] Browser opens automatically to `http://localhost:3000`
- [ ] No compilation errors

---

## Application Verification

### Visual Checks
- [ ] Page loads without errors
- [ ] Header displays "🍎 The Fruit Basket"
- [ ] Cart icon visible in header
- [ ] Products grid displays
- [ ] 8 product cards visible
- [ ] Product images load
- [ ] Product names display
- [ ] Prices show (GH₵)
- [ ] "Add to Cart" buttons visible
- [ ] Page is responsive (resize browser)

### Functionality Tests

#### Test 1: Add to Cart
- [ ] Click "Add to Cart" on any product
- [ ] Green notification popup appears
- [ ] "Item added to cart!" message shows
- [ ] Cart badge appears with number "1"
- [ ] Notification disappears after 3 seconds

#### Test 2: Add Multiple Items
- [ ] Click "Add to Cart" on different product
- [ ] Cart badge updates to "2"
- [ ] Click same product again
- [ ] Cart badge updates to "3"

#### Test 3: View Cart
- [ ] Click cart icon in header
- [ ] Redirects to `/checkout` page
- [ ] "Checkout" title displays
- [ ] Cart items show with images
- [ ] Product names correct
- [ ] Quantities correct
- [ ] Prices correct
- [ ] Subtotal calculates correctly
- [ ] Tax (10%) calculates correctly
- [ ] Total = Subtotal + Tax

#### Test 4: Remove from Cart
- [ ] Click "Remove" button on an item
- [ ] Item disappears from cart
- [ ] Totals recalculate
- [ ] Cart badge updates

#### Test 5: Complete Purchase
- [ ] Add items to cart
- [ ] Go to checkout
- [ ] Click "Complete Purchase" button
- [ ] Button shows "Processing..." with spinner
- [ ] Wait 2 seconds
- [ ] Success message appears
- [ ] Redirects to order confirmation page
- [ ] Order details display correctly
- [ ] Order ID shown
- [ ] Items listed
- [ ] Totals correct
- [ ] Order date/time shown

#### Test 6: Stock Deduction
- [ ] Note stock count of a product (e.g., 15)
- [ ] Add 2 to cart
- [ ] Complete checkout
- [ ] Return to home page (click logo)
- [ ] Stock should now be 13 (15 - 2)

#### Test 7: Empty Cart
- [ ] Complete a purchase (cart clears)
- [ ] Click cart icon
- [ ] "Your cart is empty" message shows
- [ ] "Continue Shopping" button visible
- [ ] Click button, returns to home

#### Test 8: Low Stock Warning
- [ ] Find product with stock < 5
- [ ] Orange badge shows "Only X left!"

#### Test 9: Out of Stock
- [ ] If any product has 0 stock
- [ ] Red badge shows "Out of Stock"
- [ ] "Add to Cart" button disabled

#### Test 10: Error Handling
- [ ] Try to add more than available stock
- [ ] Error message should appear

---

## Browser Console Checks

### Backend Console (Terminal 1)
- [ ] No error messages
- [ ] Request logs appear when using app
- [ ] Format: `2025-10-09T... - GET /api/products`

### Frontend Console (Browser DevTools)
- [ ] No red error messages
- [ ] No warnings (yellow)
- [ ] Network tab shows successful API calls (200 status)

---

## Database Verification

### Using MongoDB Compass (Optional)
- [ ] Connect to `mongodb://localhost:27017`
- [ ] Database `ecommerce-cart` exists
- [ ] Collections visible:
  - [ ] products (8 documents)
  - [ ] carts (1+ documents)
  - [ ] orders (1+ documents after purchase)

### Using MongoDB Shell (Optional)
```javascript
use ecommerce-cart
db.products.count()  // Should return 8
db.carts.find()      // Should show cart data
db.orders.find()     // Should show orders
```

---

## API Endpoint Tests (Optional)

### Using Browser or Postman

#### GET Products
```
GET http://localhost:5000/api/products
```
- [ ] Status: 200 OK
- [ ] Returns products array

#### GET Cart
```
GET http://localhost:5000/api/cart
```
- [ ] Status: 200 OK
- [ ] Returns cart data

#### Health Check
```
GET http://localhost:5000/api/health
```
- [ ] Status: 200 OK
- [ ] Returns `{"status":"OK"}`

---

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Error**: `connect ECONNREFUSED 127.0.0.1:27017`
**Solution**: 
- [ ] Start MongoDB service
- [ ] Check MongoDB is running on port 27017

### Issue: Port Already in Use
**Error**: `EADDRINUSE :::5000`
**Solution**:
- [ ] Change PORT in backend/.env to 5001
- [ ] Update REACT_APP_API_URL in frontend/.env

### Issue: Module Not Found
**Error**: `Cannot find module 'express'`
**Solution**:
- [ ] Run `npm install` in backend directory
- [ ] Delete node_modules and run `npm install` again

### Issue: React Not Starting
**Error**: `react-scripts: command not found`
**Solution**:
- [ ] Run `npm install` in frontend directory
- [ ] Clear cache: `npm cache clean --force`

### Issue: CORS Error
**Error**: `Access-Control-Allow-Origin`
**Solution**:
- [ ] Backend must be running
- [ ] Check REACT_APP_API_URL matches backend URL

### Issue: Products Not Loading
**Solution**:
- [ ] Check backend is running
- [ ] Check browser console for errors
- [ ] Verify database was seeded
- [ ] Test API directly: `http://localhost:5000/api/products`

---

## Final Verification

### All Systems Go ✅
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] MongoDB connected
- [ ] Products display
- [ ] Add to cart works
- [ ] Checkout works
- [ ] Payment processes
- [ ] Order confirmation shows
- [ ] Stock updates correctly
- [ ] No console errors

### Performance Check
- [ ] Page loads in < 2 seconds
- [ ] Images load properly
- [ ] Smooth animations
- [ ] Responsive on mobile (resize browser)

---

## 🎉 Success Criteria

If all items above are checked, your e-commerce cart system is:
- ✅ Fully installed
- ✅ Properly configured
- ✅ Working correctly
- ✅ Ready for use/development

---

## Next Steps

1. **Customize**: Modify products in `backend/seedData.js`
2. **Style**: Update CSS files to match your brand
3. **Extend**: Add new features from FEATURES.md
4. **Deploy**: Follow deployment guides for production
5. **Learn**: Review code comments and documentation

---

**Congratulations! Your e-commerce cart is ready! 🚀**
