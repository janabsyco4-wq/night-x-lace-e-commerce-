import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Import models
import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';
import Order from '../models/Order';
import Coupon from '../models/Coupon';
import Contact from '../models/Contact';
import Newsletter from '../models/Newsletter';
import Settings from '../models/Settings';

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Sample data
const categories = [
  { name: 'Bras', slug: 'bras', description: 'Comfortable and stylish bras' },
  { name: 'Panties', slug: 'panties', description: 'Elegant panties collection' },
  { name: 'Lingerie Sets', slug: 'lingerie-sets', description: 'Complete lingerie sets' },
  { name: 'Sleepwear', slug: 'sleepwear', description: 'Comfortable sleepwear' },
  { name: 'Bodysuits', slug: 'bodysuits', description: 'Sexy bodysuits' },
  { name: 'Accessories', slug: 'accessories', description: 'Lingerie accessories' },
];

const users = [
  {
    name: 'Admin User',
    email: 'admin@nightxlace.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Test Customer',
    email: 'customer@test.com',
    password: 'customer123',
    role: 'customer',
  },
  {
    name: 'Jane Doe',
    email: 'jane@test.com',
    password: 'jane123',
    role: 'customer',
  },
];

const coupons = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 1000,
    maxDiscount: 500,
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    usageLimit: 1000,
    usedCount: 0,
    isActive: true,
  },
  {
    code: 'SAVE20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 3000,
    maxDiscount: 1000,
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    usageLimit: 500,
    usedCount: 0,
    isActive: true,
  },
  {
    code: 'FLAT500',
    discountType: 'fixed',
    discountValue: 500,
    minPurchase: 2000,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 200,
    usedCount: 0,
    isActive: true,
  },
];

const contactMessages = [
  {
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    subject: 'Product Inquiry',
    message: 'I would like to know more about your lingerie sets collection.',
    isRead: false,
  },
  {
    name: 'Ali Khan',
    email: 'ali@example.com',
    subject: 'Shipping Question',
    message: 'How long does shipping take to Karachi?',
    isRead: false,
  },
];

const newsletterSubscribers = [
  { email: 'subscriber1@example.com' },
  { email: 'subscriber2@example.com' },
  { email: 'subscriber3@example.com' },
];

const siteSettings = {
  siteName: 'Night × Lace',
  siteDescription: 'Premium lingerie and intimate wear for the modern woman',
  contactEmail: 'info@nightxlace.com',
  contactPhone: '+92-300-1234567',
  address: 'Karachi, Pakistan',
  currency: 'PKR',
  shippingFee: 200,
  freeShippingThreshold: 3000,
  taxRate: 0,
  socialMedia: {
    facebook: 'https://facebook.com/nightxlace',
    instagram: 'https://instagram.com/nightxlace',
    twitter: 'https://twitter.com/nightxlace',
  },
};

async function seedAll() {
  try {
    await connectDB();

    console.log('\n🗑️  Clearing existing data...');
    
    // Delete all existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    await Coupon.deleteMany({});
    await Contact.deleteMany({});
    await Newsletter.deleteMany({});
    await Settings.deleteMany({});

    console.log('✅ Cleared all collections\n');

    // Seed Categories
    console.log('📂 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Seeded ${createdCategories.length} categories\n`);

    // Seed Products (using existing seed-products logic)
    console.log('🛍️  Seeding products...');
    const products = [];
    const productNames = [
      'Lace Bralette', 'Push-Up Bra', 'Wireless Comfort Bra', 'Sports Bra',
      'Silk Panty', 'Lace Thong', 'Boyshort', 'High-Waist Brief',
      'Satin Set', 'Lace Lingerie Set', 'Bridal Set', 'Romantic Set',
      'Silk Nightgown', 'Cotton Pajama Set', 'Satin Robe', 'Sleep Shorts',
      'Mesh Bodysuit', 'Lace Bodysuit', 'Strappy Bodysuit', 'Sheer Bodysuit',
      'Garter Belt', 'Stockings', 'Sleep Mask', 'Jewelry Set',
    ];

    for (let i = 0; i < 60; i++) {
      const categoryIndex = i % createdCategories.length;
      const nameIndex = i % productNames.length;
      
      products.push({
        name: `${productNames[nameIndex]} ${Math.floor(i / productNames.length) + 1}`,
        slug: `${productNames[nameIndex].toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        description: `Premium quality ${productNames[nameIndex].toLowerCase()} made with finest materials`,
        price: Math.floor(Math.random() * 4000) + 1000,
        category: createdCategories[categoryIndex]._id,
        images: [
          `https://images.unsplash.com/photo-${1500000000000 + i}?w=800&h=800&fit=crop`,
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Red', 'Pink', 'Nude'],
        inStock: true,
        featured: i < 8,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100),
      });
    }

    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products\n`);

    // Seed Users
    console.log('👥 Seeding users...');
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Seeded ${createdUsers.length} users\n`);

    // Orders - Reset to zero (no sample orders)
    console.log('📦 Orders reset to zero (no sample orders)\n');

    // Seed Coupons
    console.log('🎟️  Seeding coupons...');
    await Coupon.insertMany(coupons);
    console.log(`✅ Seeded ${coupons.length} coupons\n`);

    // Seed Contact Messages
    console.log('📧 Seeding contact messages...');
    await Contact.insertMany(contactMessages);
    console.log(`✅ Seeded ${contactMessages.length} contact messages\n`);

    // Seed Newsletter Subscribers
    console.log('📰 Seeding newsletter subscribers...');
    await Newsletter.insertMany(newsletterSubscribers);
    console.log(`✅ Seeded ${newsletterSubscribers.length} newsletter subscribers\n`);

    // Seed Settings
    console.log('⚙️  Seeding site settings...');
    await Settings.create(siteSettings);
    console.log('✅ Seeded site settings\n');

    console.log('🎉 All data seeded successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Orders: 0`);
    console.log(`   - Coupons: ${coupons.length}`);
    console.log(`   - Contact Messages: ${contactMessages.length}`);
    console.log(`   - Newsletter Subscribers: ${newsletterSubscribers.length}`);
    console.log(`   - Settings: 1\n`);

    console.log('🔐 Login Credentials:');
    console.log('   Admin: admin@nightxlace.com / admin123');
    console.log('   Customer: customer@test.com / customer123\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedAll();
