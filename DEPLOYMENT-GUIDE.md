# 🚀 Night × Lace - Deployment Guide

## Complete Step-by-Step Deployment to Production

---

## 📋 Pre-Deployment Checklist

✅ All 30 APIs tested and working
✅ Database connected (MongoDB Atlas)
✅ Environment variables configured
✅ Ready to deploy!

---

## 🎯 Step 1: Push to GitHub

### 1.1 Initialize Git (if not already done)

```bash
cd night-x-lace
git init
```

### 1.2 Create .gitignore (already exists, verify it includes)

```
node_modules/
.next/
.env.local
.DS_Store
*.log
```

### 1.3 Commit Your Code

```bash
git add .
git commit -m "Initial commit - Night x Lace E-commerce Platform"
```

### 1.4 Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `night-x-lace`
3. Description: `Premium lingerie e-commerce platform`
4. Keep it **Private** (recommended for e-commerce)
5. Click **"Create repository"**

### 1.5 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/night-x-lace.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy to Vercel

### 2.1 Sign Up for Vercel

1. Go to: https://vercel.com/signup
2. Sign up with **GitHub** (easiest option)
3. Authorize Vercel to access your repositories

### 2.2 Import Your Project

1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Find and select `night-x-lace`
4. Click **"Import"**

### 2.3 Configure Project Settings

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** `./` (leave as is)
**Build Command:** `npm run build` (auto-filled)
**Output Directory:** `.next` (auto-filled)

### 2.4 Add Environment Variables

Click **"Environment Variables"** and add these:

```env
MONGODB_URI=mongodb+srv://nightxlace_admin:adminxlace@nightxlace.simyedv.mongodb.net/?retryWrites=true&w=majority&appName=nightxlace

NEXTAUTH_URL=https://your-site.vercel.app
NEXTAUTH_SECRET=nightxlace_super_secret_key_2025_change_in_production

ADMIN_EMAIL=admin@nightxlace.com
ADMIN_PASSWORD=ChangeThisPassword123!

NEXT_PUBLIC_APP_URL=https://your-site.vercel.app

# Cloudinary (if you set it up)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** 
- Replace `your-site.vercel.app` with your actual Vercel URL (you'll get this after deployment)
- Change `ADMIN_PASSWORD` to something secure!

### 2.5 Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://night-x-lace.vercel.app`

---

## 🔄 Step 3: Update Environment Variables

### 3.1 Get Your Vercel URL

After deployment, copy your Vercel URL (e.g., `https://night-x-lace.vercel.app`)

### 3.2 Update Environment Variables

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Update these variables:

```env
NEXTAUTH_URL=https://night-x-lace.vercel.app
NEXT_PUBLIC_APP_URL=https://night-x-lace.vercel.app
```

### 3.3 Redeploy

1. Go to **"Deployments"** tab
2. Click the three dots on the latest deployment
3. Click **"Redeploy"**

---

## 🗄️ Step 4: Verify Database Connection

Your MongoDB Atlas is already set up! Just verify:

1. Go to: https://cloud.mongodb.com
2. Check your cluster is running
3. Verify connection string in Vercel environment variables

---

## 📸 Step 5: Set Up Cloudinary (Optional but Recommended)

### 5.1 Sign Up

1. Go to: https://cloudinary.com/users/register/free
2. Sign up for free account

### 5.2 Get Credentials

1. Go to Dashboard: https://cloudinary.com/console
2. Copy:
   - Cloud Name
   - API Key
   - API Secret

### 5.3 Add to Vercel

1. Go to Vercel → Settings → Environment Variables
2. Add the three Cloudinary variables
3. Redeploy

---

## ✅ Step 6: Test Your Live Site

### 6.1 Visit Your Site

Open: `https://your-site.vercel.app`

### 6.2 Test Key Features

- [ ] Homepage loads
- [ ] Shop page shows products
- [ ] Product details work
- [ ] Add to cart works
- [ ] Checkout process works
- [ ] Admin login: `https://your-site.vercel.app/admin/login`
- [ ] Admin dashboard loads
- [ ] Create/edit products
- [ ] View orders
- [ ] Analytics page

### 6.3 Seed Production Data (Optional)

If you want to add products to production:

```bash
# Update MONGODB_URI in .env.local to production
# Then run:
node scripts/seed-categories.js
node scripts/seed-products.js
```

---

## 🎨 Step 7: Custom Domain (Optional)

### 7.1 Buy a Domain

Buy from:
- Namecheap: https://www.namecheap.com
- GoDaddy: https://www.godaddy.com
- Google Domains: https://domains.google

### 7.2 Add to Vercel

1. Go to Vercel → Settings → Domains
2. Click **"Add Domain"**
3. Enter your domain (e.g., `nightxlace.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

---

## 🔒 Step 8: Security Checklist

### 8.1 Change Default Credentials

Update in Vercel environment variables:

```env
ADMIN_PASSWORD=YourSecurePassword123!
NEXTAUTH_SECRET=generate-a-new-random-secret-key
```

### 8.2 Generate New Secret

```bash
# Run this to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as `NEXTAUTH_SECRET`

---

## 📊 Step 9: Monitor Your Site

### 9.1 Vercel Analytics

1. Go to Vercel → Analytics
2. View traffic, performance, and errors
3. Free tier includes basic analytics

### 9.2 MongoDB Monitoring

1. Go to MongoDB Atlas → Metrics
2. Monitor database usage
3. Set up alerts for high usage

---

## 🎉 Step 10: You're Live!

### Your Live URLs:

- **Store:** `https://your-site.vercel.app`
- **Admin:** `https://your-site.vercel.app/admin/login`
- **Shop:** `https://your-site.vercel.app/shop`

### Admin Credentials:

- **Email:** `admin@nightxlace.com`
- **Password:** (the one you set in environment variables)

---

## 🔄 Continuous Deployment

Every time you push to GitHub, Vercel will automatically:
1. Build your site
2. Run tests
3. Deploy to production
4. Give you a preview URL

```bash
# Make changes
git add .
git commit -m "Update products"
git push

# Vercel automatically deploys!
```

---

## 🆘 Troubleshooting

### Build Fails

1. Check Vercel build logs
2. Verify all environment variables are set
3. Test build locally: `npm run build`

### Database Connection Error

1. Check MongoDB Atlas is running
2. Verify MONGODB_URI in Vercel
3. Check IP whitelist in MongoDB (allow all: `0.0.0.0/0`)

### Images Not Loading

1. Check Cloudinary credentials
2. Verify image URLs are correct
3. Check browser console for errors

---

## 📈 Next Steps

1. **Add Products:** Upload your product catalog
2. **Test Orders:** Place test orders
3. **Marketing:** Share your site!
4. **SEO:** Add meta tags and descriptions
5. **Analytics:** Set up Google Analytics
6. **Payment:** Integrate Stripe/PayPal

---

## 💰 Cost Summary

| Service | Free Tier | Your Cost |
|---------|-----------|-----------|
| Vercel | Unlimited hobby projects | **$0/month** |
| MongoDB Atlas | 512MB storage | **$0/month** |
| Cloudinary | 25GB storage | **$0/month** |
| **Total** | | **$0/month** |

---

## 🎊 Congratulations!

Your e-commerce platform is now live and ready to accept orders!

**Share your site:**
- Social media
- WhatsApp
- Email marketing
- Google My Business

**Need help?** Check Vercel docs: https://vercel.com/docs

---

**Built with ❤️ using Next.js, MongoDB, and Vercel**
