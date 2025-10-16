# 🚀 Quick Start Guide

Get the e-commerce cart running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+) - Run `node --version` to check
- ✅ MongoDB installed and running - Run `mongod --version` to check
- ✅ npm installed - Run `npm --version` to check

## Step-by-Step Setup

### 1️⃣ Start MongoDB

**Windows:**
```powershell
# Start MongoDB service
net start MongoDB

# OR if installed manually, run:
mongod
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# OR
brew services start mongodb-community
```

### 2️⃣ Setup Backend

Open a terminal in the project root:

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Seed the database with sample products
npm run seed

# Start the backend server
npm run dev
```

✅ Backend should now be running on **http://localhost:5000**

### 3️⃣ Setup Frontend

Open a **NEW** terminal window:

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start React app
npm start
```

✅ Frontend should open automatically at **http://localhost:3000**

## 🎉 You're Ready!

The application should now be running. Try:

1. **Browse products** on the home page
2. **Click "Add to Cart"** on any product
3. **View cart** by clicking the cart icon (top right)
4. **Complete checkout** and see the order confirmation

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Start it with `mongod` or `net start MongoDB`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in `backend/.env` to a different number (e.g., 5001)

### React App Won't Start
```
Error: Cannot find module 'react'
```
**Solution:** Make sure you ran `npm install` in the frontend directory

### API Connection Failed
**Solution:** 
1. Check backend is running on port 5000
2. Verify `REACT_APP_API_URL` in `frontend/.env` matches backend URL

## 📝 Default Configuration

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000
- **MongoDB:** mongodb://localhost:27017/ecommerce-cart
- **Sample Products:** 8 fruit hampers (auto-seeded)

## 🔄 Resetting the Database

To reset and re-seed the database:

```powershell
cd backend
npm run seed
```

This will clear all products and add fresh sample data.

## 📚 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the API endpoints at http://localhost:5000/api
- Customize products in `backend/seedData.js`
- Modify styles in `frontend/src/components/*.css`

---

**Need help?** Check the main README.md or review the code comments!
