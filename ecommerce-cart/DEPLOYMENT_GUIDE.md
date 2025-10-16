# 🚀 Deployment Guide

Complete guide for deploying your e-commerce cart to production.

---

## 📋 Pre-Deployment Checklist

### Code Preparation
- [ ] All features tested locally
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database seeded with real products
- [ ] Error handling verified
- [ ] Security review completed

### Production Requirements
- [ ] Domain name (optional)
- [ ] MongoDB Atlas account (free tier available)
- [ ] Hosting service accounts (Vercel, Heroku, etc.)
- [ ] SSL certificate (usually provided by hosting)

---

## 🗄️ Database Deployment (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free M0 tier)

### Step 2: Configure Database
1. **Create Database User**
   - Database Access → Add New Database User
   - Username: `ecommerce-user`
   - Password: Generate secure password
   - Save credentials securely

2. **Whitelist IP Addresses**
   - Network Access → Add IP Address
   - Allow access from anywhere: `0.0.0.0/0` (for development)
   - Or add specific IPs for production

3. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce-cart`

### Step 3: Update Environment Variables
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-cart?retryWrites=true&w=majority
```

### Step 4: Seed Production Database
```powershell
# Update backend/.env with Atlas URI
cd backend
npm run seed
```

---

## 🖥️ Backend Deployment

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- [ ] Heroku account
- [ ] Heroku CLI installed

#### Steps
```powershell
# Login to Heroku
heroku login

# Create new app
cd backend
heroku create your-app-name-backend

# Set environment variables
heroku config:set MONGODB_URI="your-atlas-connection-string"
heroku config:set JWT_SECRET="your-production-secret-key"
heroku config:set NODE_ENV=production

# Deploy
git init
git add .
git commit -m "Initial backend deployment"
git push heroku main

# Verify deployment
heroku open
heroku logs --tail
```

#### Your backend URL
```
https://your-app-name-backend.herokuapp.com
```

### Option 2: Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Select backend folder
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` (Railway auto-assigns)
6. Deploy

### Option 3: Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Create Web Service

### Option 4: DigitalOcean App Platform

1. Go to [digitalocean.com](https://www.digitalocean.com)
2. Create → Apps
3. Connect GitHub repository
4. Select backend directory
5. Configure environment variables
6. Deploy

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

#### Prerequisites
- [ ] Vercel account
- [ ] Vercel CLI installed (optional)

#### Steps via Web Interface
1. Go to [vercel.com](https://vercel.com)
2. Import Project → Import Git Repository
3. Select your repository
4. Framework Preset: Create React App
5. Root Directory: `frontend`
6. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
   ```
7. Deploy

#### Steps via CLI
```powershell
cd frontend

# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variable
vercel env add REACT_APP_API_URL

# Deploy to production
vercel --prod
```

### Option 2: Netlify

1. Go to [netlify.com](https://www.netlify.com)
2. New site from Git
3. Connect repository
4. Base directory: `frontend`
5. Build command: `npm run build`
6. Publish directory: `build`
7. Environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
   ```
8. Deploy site

### Option 3: GitHub Pages

```powershell
cd frontend

# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/ecommerce-cart",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

**Note**: Update `REACT_APP_API_URL` in `.env` before building

---

## 🔒 Security Configuration

### Backend Security

#### 1. Update CORS Settings
```javascript
// server.js
const allowedOrigins = [
  'https://your-frontend-domain.vercel.app',
  'https://www.your-domain.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

#### 2. Generate Strong JWT Secret
```powershell
# Generate random secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. Environment Variables
Never commit `.env` files. Use hosting platform's environment variable settings.

### Frontend Security

#### 1. Environment Variables
```env
# Production .env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

#### 2. Build Optimization
```powershell
npm run build
```
This creates optimized production build.

---

## 🧪 Post-Deployment Testing

### Backend Tests
```bash
# Health check
curl https://your-backend-url.com/api/health

# Get products
curl https://your-backend-url.com/api/products

# Check logs
heroku logs --tail  # For Heroku
```

### Frontend Tests
1. Visit deployed URL
2. Check all pages load
3. Test add to cart
4. Test checkout flow
5. Verify API calls work
6. Test on mobile devices

### Integration Tests
- [ ] Products load from production database
- [ ] Add to cart works
- [ ] Checkout completes successfully
- [ ] Stock updates in database
- [ ] Orders are created
- [ ] No CORS errors
- [ ] HTTPS enabled
- [ ] Fast load times

---

## 📊 Monitoring & Maintenance

### Application Monitoring

#### Heroku
```bash
# View logs
heroku logs --tail

# Check app status
heroku ps

# Restart app
heroku restart
```

#### Error Tracking
Consider adding:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Google Analytics** - User analytics

### Database Monitoring

#### MongoDB Atlas
1. Go to Atlas Dashboard
2. Metrics → View performance
3. Set up alerts for:
   - High CPU usage
   - Storage limits
   - Connection issues

### Performance Optimization

#### Backend
```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

#### Frontend
- Enable React production build
- Optimize images (use CDN)
- Lazy load components
- Enable caching

---

## 🔄 CI/CD Setup (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "your-app-name"
          heroku_email: "your-email@example.com"
          appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          working-directory: ./frontend
```

---

## 🌍 Custom Domain Setup

### Backend (Heroku)
```bash
# Add custom domain
heroku domains:add api.yourdomain.com

# Configure DNS
# Add CNAME record: api.yourdomain.com → your-app.herokuapp.com
```

### Frontend (Vercel)
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain: `www.yourdomain.com`
3. Configure DNS as instructed
4. SSL automatically provisioned

---

## 📝 Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-min-32-chars
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## 🐛 Troubleshooting Deployment

### Common Issues

#### 1. Build Fails
**Solution**: Check build logs, ensure all dependencies in package.json

#### 2. API Not Connecting
**Solution**: 
- Verify REACT_APP_API_URL is correct
- Check CORS settings
- Ensure backend is running

#### 3. Database Connection Error
**Solution**:
- Verify MongoDB Atlas connection string
- Check IP whitelist
- Verify database user credentials

#### 4. Environment Variables Not Working
**Solution**:
- Restart application after setting variables
- Rebuild frontend after changing REACT_APP_* variables
- Check variable names (case-sensitive)

#### 5. CORS Errors
**Solution**:
- Update CORS origin in backend
- Ensure frontend URL is whitelisted
- Check protocol (http vs https)

---

## 💰 Cost Estimation

### Free Tier Options
- **MongoDB Atlas**: 512MB storage (free forever)
- **Heroku**: 550-1000 dyno hours/month (free)
- **Vercel**: Unlimited deployments (free for personal)
- **Netlify**: 100GB bandwidth/month (free)

### Paid Options (if scaling)
- **MongoDB Atlas**: $9/month (2GB storage)
- **Heroku**: $7/month per dyno
- **Vercel Pro**: $20/month
- **DigitalOcean**: $5/month

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] Database migrated to Atlas
- [ ] Security review completed
- [ ] Performance optimized

### Backend Deployment
- [ ] Hosting platform selected
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Database connected
- [ ] Deployment successful
- [ ] Health check passes

### Frontend Deployment
- [ ] Hosting platform selected
- [ ] API URL configured
- [ ] Build successful
- [ ] Deployment successful
- [ ] Site accessible

### Post-Deployment
- [ ] All features tested
- [ ] Mobile responsive
- [ ] SSL enabled
- [ ] Monitoring setup
- [ ] Custom domain (optional)
- [ ] Analytics added (optional)

---

## 🎉 Success!

Your e-commerce cart is now live and accessible worldwide!

### Next Steps
1. Share your URL
2. Monitor performance
3. Gather user feedback
4. Plan feature updates
5. Scale as needed

---

**Happy Deploying! 🚀**
