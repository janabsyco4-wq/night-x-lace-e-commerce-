# 🚀 Quick Deployment Checklist

Use this checklist to deploy Night × Lace to production.

---

## ☑️ Pre-Deployment Checklist

### Local Setup
- [ ] Project runs successfully locally (`npm run dev`)
- [ ] All features tested and working
- [ ] No console errors
- [ ] `.env.local` file exists with all variables
- [ ] `.env.local` is in `.gitignore`

### Code Quality
- [ ] Remove any test/debug code
- [ ] Remove console.logs (or keep only important ones)
- [ ] Check for hardcoded passwords or secrets
- [ ] Verify all API endpoints work

---

## 📦 GitHub Deployment

### Step 1: Initialize Git
```bash
git init
git add .
git commit -m "Initial commit - Night x Lace E-commerce"
```
- [ ] Git repository initialized
- [ ] All files committed

### Step 2: Create GitHub Repository
- [ ] GitHub account created
- [ ] New repository created on GitHub
- [ ] Repository name: `night-x-lace`
- [ ] Visibility set (Public/Private)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/night-x-lace.git
git branch -M main
git push -u origin main
```
- [ ] Remote repository added
- [ ] Code pushed to GitHub
- [ ] Files visible on GitHub

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create Cluster
- [ ] MongoDB Atlas account created
- [ ] Free M0 cluster created
- [ ] Region selected

### Step 2: Database Access
- [ ] Database user created
- [ ] Username: ________________
- [ ] Password saved securely: ________________
- [ ] User has "Read and write" permissions

### Step 3: Network Access
- [ ] IP whitelist configured
- [ ] 0.0.0.0/0 added (allow from anywhere)

### Step 4: Connection String
- [ ] Connection string copied
- [ ] Password replaced in connection string
- [ ] Database name added: `/nightxlace?`
- [ ] Final connection string: ________________

---

## 🌐 Vercel Deployment

### Step 1: Vercel Account
- [ ] Vercel account created
- [ ] Signed up with GitHub
- [ ] GitHub authorized

### Step 2: Import Project
- [ ] Project imported from GitHub
- [ ] Repository selected: `night-x-lace`
- [ ] Framework detected: Next.js

### Step 3: Environment Variables
Add these in Vercel:

- [ ] `MONGODB_URI` = (your MongoDB connection string)
- [ ] `JWT_SECRET` = (random 32+ character string)
- [ ] `ADMIN_EMAIL` = admin@nightxlace.com
- [ ] `ADMIN_PASSWORD` = (your secure password)
- [ ] `NEXT_PUBLIC_API_URL` = (will update after deployment)

**Save these values:**
```
JWT_SECRET: ________________________________
ADMIN_PASSWORD: ____________________________
```

### Step 4: Deploy
- [ ] Clicked "Deploy"
- [ ] Deployment successful
- [ ] Vercel URL received: ________________

### Step 5: Update API URL
- [ ] Copied Vercel URL
- [ ] Updated `NEXT_PUBLIC_API_URL` in Vercel
- [ ] Redeployed project

---

## 🌱 Database Seeding

### Option 1: Local Seeding (Recommended)
```bash
# Update .env.local with production MongoDB URI
node scripts/seed-categories.js
node scripts/seed-products.js
```
- [ ] Categories seeded
- [ ] Products seeded

### Option 2: Manual Import
- [ ] Collections created in MongoDB Atlas
- [ ] Data imported manually

---

## ✅ Testing Checklist

### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Shop page shows products
- [ ] Product details page works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Order success page displays

### Admin Testing
- [ ] Admin login works (`/admin/login`)
- [ ] Dashboard displays correctly
- [ ] Can view orders
- [ ] Can manage products
- [ ] Can view messages
- [ ] All admin features work

### User Testing
- [ ] User registration works
- [ ] User login works
- [ ] User dashboard shows orders
- [ ] Guest checkout works
- [ ] Order linking works (register with same email)

### Mobile Testing
- [ ] Website responsive on mobile
- [ ] All features work on mobile
- [ ] Images load correctly
- [ ] Forms work properly

---

## 🔐 Security Verification

- [ ] No secrets in GitHub repository
- [ ] `.env.local` not committed
- [ ] Strong admin password set
- [ ] JWT_SECRET is random and secure
- [ ] MongoDB password is strong
- [ ] All environment variables in Vercel only

---

## 📝 Post-Deployment Tasks

### Documentation
- [ ] Save all passwords securely
- [ ] Document Vercel URL
- [ ] Document MongoDB connection details
- [ ] Save admin credentials

### Monitoring
- [ ] Check Vercel Analytics
- [ ] Monitor error logs
- [ ] Set up deployment notifications

### Optional Enhancements
- [ ] Add custom domain
- [ ] Set up email service (SendGrid, etc.)
- [ ] Add Google Analytics
- [ ] Set up backup strategy
- [ ] Configure CDN for images

---

## 🎯 Final Verification

### Live Website Check
- [ ] Visit: https://________________.vercel.app
- [ ] Homepage loads in < 3 seconds
- [ ] No console errors
- [ ] All images load
- [ ] Navigation works
- [ ] Forms submit correctly

### Admin Panel Check
- [ ] Visit: https://________________.vercel.app/admin/login
- [ ] Login successful
- [ ] Dashboard loads
- [ ] Can create/edit products
- [ ] Can view orders
- [ ] All features functional

### Order Flow Check
- [ ] Place test order as guest
- [ ] Receive order confirmation
- [ ] Order appears in admin panel
- [ ] Register with same email
- [ ] Order appears in user dashboard

---

## 🎉 Success!

If all items are checked, your website is successfully deployed!

**Your Live URLs:**
- Website: https://________________.vercel.app
- Admin: https://________________.vercel.app/admin/login
- GitHub: https://github.com/________________/night-x-lace

**Next Steps:**
1. Share your website
2. Monitor for issues
3. Gather user feedback
4. Plan future updates

---

## 📞 Emergency Contacts

**If something goes wrong:**

1. **Check Vercel Logs**: Dashboard → Logs
2. **Check MongoDB**: Atlas → Metrics
3. **Rollback**: Vercel → Deployments → Promote previous version
4. **Support**: 
   - Vercel: https://vercel.com/support
   - MongoDB: https://support.mongodb.com

---

**Date Deployed**: ________________
**Deployed By**: ________________
**Version**: 1.0.0
