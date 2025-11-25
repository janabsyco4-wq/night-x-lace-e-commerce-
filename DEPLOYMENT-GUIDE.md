# Night × Lace - Deployment Guide

Complete guide to deploy your e-commerce website to GitHub and Vercel.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ GitHub account (create at https://github.com)
- ✅ Vercel account (create at https://vercel.com - can sign up with GitHub)
- ✅ MongoDB Atlas account (for production database)
- ✅ Git installed on your computer

---

## 🚀 Part 1: Push to GitHub

### Step 1: Initialize Git Repository

Open your terminal in the project folder and run:

```bash
# Initialize git repository
git init

# Add all files to git
git add .

# Create first commit
git commit -m "Initial commit - Night x Lace E-commerce"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in details:
   - **Repository name**: `night-x-lace` (or your preferred name)
   - **Description**: "Premium women's lingerie e-commerce website"
   - **Visibility**: Choose **Private** or **Public**
   - **DO NOT** initialize with README, .gitignore, or license
4. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/night-x-lace.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

### Step 4: Verify Upload

- Refresh your GitHub repository page
- You should see all your project files uploaded

---

## 🌐 Part 2: Deploy to Vercel

### Step 1: Create MongoDB Atlas Database (Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a **FREE** cluster:
   - Click **"Build a Database"**
   - Choose **"M0 FREE"** tier
   - Select a region close to you
   - Click **"Create"**

4. Create Database User:
   - Go to **"Database Access"**
   - Click **"Add New Database User"**
   - Username: `nightxlace` (or your choice)
   - Password: Generate a strong password (SAVE THIS!)
   - User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

5. Allow Network Access:
   - Go to **"Network Access"**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

6. Get Connection String:
   - Go to **"Database"** → Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string (looks like):
   ```
   mongodb+srv://nightxlace:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **Replace `<password>` with your actual password!**
   - Add database name: `...mongodb.net/nightxlace?retryWrites=true...`

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub

4. Import Your Project:
   - Click **"Add New..."** → **"Project"**
   - Find your `night-x-lace` repository
   - Click **"Import"**

5. Configure Project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

6. Add Environment Variables:
   Click **"Environment Variables"** and add these:

   ```
   MONGODB_URI=mongodb+srv://nightxlace:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/nightxlace?retryWrites=true&w=majority
   
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
   
   ADMIN_EMAIL=admin@nightxlace.com
   
   ADMIN_PASSWORD=your-secure-admin-password
   
   NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app
   ```

   **Important Notes:**
   - Replace `YOUR_PASSWORD` with your MongoDB password
   - Replace `your-super-secret-jwt-key-change-this-to-random-string` with a random string (at least 32 characters)
   - Replace `your-secure-admin-password` with a strong password for admin login
   - `NEXT_PUBLIC_API_URL` will be updated after first deployment

7. Click **"Deploy"**

### Step 3: Wait for Deployment

- Vercel will build and deploy your app (takes 2-5 minutes)
- You'll see a progress screen
- Once done, you'll get a URL like: `https://night-x-lace.vercel.app`

### Step 4: Update API URL

1. Copy your Vercel URL
2. Go to **"Settings"** → **"Environment Variables"**
3. Edit `NEXT_PUBLIC_API_URL` and paste your Vercel URL
4. Click **"Save"**
5. Go to **"Deployments"** → Click **"..."** → **"Redeploy"**

---

## 🗄️ Part 3: Seed Production Database

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Run seed scripts:
```bash
# Seed categories
vercel env pull .env.local
node scripts/seed-categories.js

# Seed products
node scripts/seed-products.js
```

### Option 2: Manual Database Setup

1. Go to MongoDB Atlas → **"Browse Collections"**
2. Create collections manually:
   - `categories`
   - `products`
   - `users`
   - `orders`
   - `coupons`
   - `reviews`
   - `contacts`
   - `newsletters`
   - `settings`

3. Import data from your local database or use MongoDB Compass

---

## ✅ Part 4: Verify Deployment

### Test Your Live Website:

1. **Homepage**: Visit your Vercel URL
2. **Shop Page**: Check products are loading
3. **Admin Login**: Go to `/admin/login`
   - Email: `admin@nightxlace.com`
   - Password: (the one you set in environment variables)
4. **Test Order**: Place a test order
5. **Check Admin Panel**: Verify order appears in admin

### Common Issues & Solutions:

#### Issue: "Database connection failed"
**Solution**: 
- Check MongoDB connection string in Vercel environment variables
- Ensure IP whitelist includes 0.0.0.0/0 in MongoDB Atlas
- Verify database user has correct permissions

#### Issue: "Images not loading"
**Solution**:
- Upload images to `/public/images/` folder
- Push changes to GitHub
- Vercel will auto-deploy

#### Issue: "Admin login not working"
**Solution**:
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in Vercel environment variables
- Ensure JWT_SECRET is set
- Try redeploying

---

## 🔄 Part 5: Future Updates

### To Update Your Live Website:

1. Make changes locally
2. Test changes: `npm run dev`
3. Commit changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```
4. Vercel will **automatically deploy** your changes!

### To Rollback:

1. Go to Vercel Dashboard
2. Click **"Deployments"**
3. Find previous working deployment
4. Click **"..."** → **"Promote to Production"**

---

## 🔐 Security Checklist

Before going live, ensure:

- ✅ Changed default admin password
- ✅ JWT_SECRET is a strong random string
- ✅ MongoDB password is strong
- ✅ Environment variables are set in Vercel (not in code)
- ✅ `.env.local` is in `.gitignore` (never commit secrets!)
- ✅ MongoDB network access is configured
- ✅ Test all payment flows
- ✅ Test admin panel access

---

## 📱 Custom Domain (Optional)

### To Add Your Own Domain:

1. Buy domain from (Namecheap, GoDaddy, etc.)
2. In Vercel Dashboard → **"Settings"** → **"Domains"**
3. Add your domain (e.g., `nightxlace.com`)
4. Follow Vercel's DNS configuration instructions
5. Wait for DNS propagation (can take 24-48 hours)

---

## 📊 Monitoring & Analytics

### Vercel Analytics:
- Go to your project → **"Analytics"**
- View page views, performance, etc.

### Error Monitoring:
- Check **"Logs"** tab in Vercel for errors
- Set up email notifications for deployment failures

---

## 🆘 Need Help?

### Resources:
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

### Support:
- Vercel Support: https://vercel.com/support
- MongoDB Support: https://support.mongodb.com

---

## 🎉 Congratulations!

Your Night × Lace e-commerce website is now live on the internet!

**Your URLs:**
- **Website**: https://your-app-name.vercel.app
- **Admin Panel**: https://your-app-name.vercel.app/admin/login
- **GitHub Repo**: https://github.com/YOUR-USERNAME/night-x-lace

Share your website with the world! 🚀
