# 🌙 NightXlace - Modern E-Commerce Platform

A full-stack e-commerce web application built with Next.js 16, React 19, MongoDB, and Tailwind CSS. Features include product catalog, shopping cart, secure authentication, admin dashboard, and cloud image management.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://night-x-lace-e-commerce.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

## 🌟 Features

### Customer Features
- 🛍️ **Product Catalog** - Browse products with filtering and search
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 🔐 **User Authentication** - Secure JWT-based authentication
- 💳 **Checkout System** - Seamless order placement
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🖼️ **Image Gallery** - High-quality product images with Cloudinary

### Admin Features
- 📊 **Admin Dashboard** - Manage products, orders, and users
- ➕ **Product Management** - Add, edit, delete products
- 📦 **Order Management** - View and process customer orders
- 👥 **User Management** - Role-based access control
- 📈 **Analytics** - Sales and inventory tracking

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Image Optimization:** Next Cloudinary

### Backend
- **Runtime:** Node.js
- **API:** Next.js API Routes (RESTful)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js + JWT
- **Password Hashing:** bcryptjs
- **Email:** Nodemailer

### DevOps
- **Deployment:** Vercel
- **Database Hosting:** MongoDB Atlas
- **Image Storage:** Cloudinary
- **Testing:** Puppeteer for E2E tests

## 📂 Project Structure

```
night-x-lace/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── products/        # Product CRUD
│   │   ├── cart/            # Cart management
│   │   └── orders/          # Order processing
│   ├── products/            # Product pages
│   ├── cart/                # Shopping cart
│   ├── admin/               # Admin dashboard
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
│   ├── ui/                  # UI components
│   ├── ProductCard.tsx      # Product display
│   ├── CartItem.tsx         # Cart item
│   └── Navbar.tsx           # Navigation
├── contexts/                # React contexts
│   ├── AuthContext.tsx      # Authentication state
│   └── CartContext.tsx      # Cart state
├── models/                  # MongoDB schemas
│   ├── User.js              # User model
│   ├── Product.js           # Product model
│   └── Order.js             # Order model
├── lib/                     # Utilities
│   ├── mongodb.js           # Database connection
│   └── auth.js              # Auth helpers
└── types/                   # TypeScript types
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Cloudinary account (for images)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (optional)
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

### Installation

```bash
# Clone the repository
git clone https://github.com/janabsyco4-wq/night-x-lace-e-commerce.git

# Navigate to project directory
cd night-x-lace-e-commerce

# Install dependencies
npm install

# Seed database with sample products
npm run seed:products

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📱 Key Features Details

### Authentication System
- User registration and login
- JWT-based session management
- Password encryption with bcryptjs
- Role-based access control (User/Admin)
- Protected routes and API endpoints

### Product Management
- Product CRUD operations
- Category filtering
- Search functionality
- Image upload and optimization
- Inventory tracking

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time price calculation
- Persistent cart (localStorage)
- Cart state management with Context API

### Order System
- Checkout process
- Order creation and tracking
- Order history for users
- Admin order management
- Email notifications

## 🎨 Design Features

- **Modern UI/UX** - Clean, intuitive interface
- **Responsive Layout** - Mobile-first design approach
- **Dark Theme** - Eye-friendly dark color scheme
- **Smooth Animations** - CSS transitions and hover effects
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages

## 🔒 Security Features

- Secure password hashing
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/signup      # Register new user
POST   /api/auth/login       # User login
GET    /api/auth/profile     # Get user profile
```

### Products
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (Admin)
PUT    /api/products/:id      # Update product (Admin)
DELETE /api/products/:id      # Delete product (Admin)
```

### Cart
```
GET    /api/cart              # Get user cart
POST   /api/cart              # Add to cart
PUT    /api/cart/:id          # Update cart item
DELETE /api/cart/:id          # Remove from cart
```

### Orders
```
GET    /api/orders            # Get user orders
POST   /api/orders            # Create order
GET    /api/orders/:id        # Get order details
PUT    /api/orders/:id        # Update order status (Admin)
```

## 🧪 Testing

```bash
# Run API endpoint tests
npm run test:api
```

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL:** [https://night-x-lace-e-commerce.vercel.app/](https://night-x-lace-e-commerce.vercel.app/)

## 📈 Performance Optimization

- Server-side rendering (SSR) with Next.js
- Image optimization with Next/Image and Cloudinary
- Code splitting and lazy loading
- API route caching
- MongoDB indexes for faster queries

## 🔧 Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm start              # Start production server
npm run lint           # Run ESLint
npm run test:api       # Test API endpoints
npm run seed:products  # Seed database with products
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Shehrooz Hafeez**
- Computer Science Student at COMSATS University Islamabad
- Full Stack Developer
- GitHub: [@janabsyco4-wq](https://github.com/janabsyco4-wq)
- Email: shehroozhafeezpriv@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Note:** This is a learning project built to demonstrate full-stack development skills with modern technologies.
