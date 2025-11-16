const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

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

const categories = [
  { name: 'Bras', slug: 'bras', description: 'Comfortable and stylish bras' },
  { name: 'Panties', slug: 'panties', description: 'Elegant panties collection' },
  { name: 'Lingerie Sets', slug: 'lingerie-sets', description: 'Complete lingerie sets' },
  { name: 'Sleepwear', slug: 'sleepwear', description: 'Comfortable sleepwear' },
  { name: 'Bodysuits', slug: 'bodysuits', description: 'Sexy bodysuits' },
  { name: 'Accessories', slug: 'accessories', description: 'Lingerie accessories' },
];

// Define schemas inline
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: mongoose.Schema.Types.ObjectId,
  images: [String],
  sizes: [String],
  colors: [String],
  inStock: Boolean,
  featured: Boolean,
  rating: Number,
  reviewCount: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedBasic() {
  try {
    await connectDB();

    console.log('\n🗑️  Clearing all existing data...');
    
    // Delete ALL existing data from collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const collection of collections) {
      await mongoose.connection.db.collection(collection.name).deleteMany({});
    }

    console.log('✅ Cleared all collections\n');

    // Seed Admin User
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@nightxlace.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Admin user created\n');

    // Seed Categories
    console.log('📂 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Seeded ${createdCategories.length} categories\n`);

    // Seed Products
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

    // Curated Unsplash image IDs for lingerie/fashion products
    const imageIds = [
      'photo-1566206091558-7f218b696731', // Fashion model
      'photo-1485968579580-b6d095142e6e', // Fashion
      'photo-1539533018447-63fcce2678e3', // Model
      'photo-1496747611176-843222e1e57c', // Fashion
      'photo-1515886657613-9f3515b0c78f', // Fashion
      'photo-1509631179647-0177331693ae', // Fashion
      'photo-1558769132-cb1aea1f1c8e', // Fashion
      'photo-1490481651871-ab68de25d43d', // Fashion
      'photo-1483985988355-763728e1935b', // Fashion
      'photo-1469334031218-e382a71b716b', // Fashion
      'photo-1487222477894-8943e31ef7b2', // Fashion
      'photo-1445205170230-053b83016050', // Fashion
      'photo-1434389677669-e08b4cac3105', // Fashion
      'photo-1529139574466-a303027c1d8b', // Fashion
      'photo-1502716119720-b23a93e5fe1b', // Fashion
      'photo-1492707892479-7bc8d5a4ee93', // Fashion
      'photo-1524504388940-b1c1722653e1', // Fashion
      'photo-1467043237213-65f2da53396f', // Fashion
      'photo-1515886657613-9f3515b0c78f', // Fashion
      'photo-1558769132-cb1aea1f1c8e', // Fashion
    ];

    for (let i = 0; i < 60; i++) {
      const categoryIndex = i % createdCategories.length;
      const nameIndex = i % productNames.length;
      const imageIndex = i % imageIds.length;
      
      products.push({
        name: `${productNames[nameIndex]} ${Math.floor(i / productNames.length) + 1}`,
        slug: `${productNames[nameIndex].toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
        description: `Premium quality ${productNames[nameIndex].toLowerCase()} made with finest materials. Comfortable, elegant, and designed for the modern woman.`,
        price: Math.floor(Math.random() * 4000) + 1000,
        category: createdCategories[categoryIndex]._id,
        images: [
          `https://images.unsplash.com/${imageIds[imageIndex]}?w=800&h=800&fit=crop&q=80`,
          `https://images.unsplash.com/${imageIds[(imageIndex + 1) % imageIds.length]}?w=800&h=800&fit=crop&q=80`,
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

    console.log('🎉 Basic seeding completed!\n');
    console.log('📊 Summary:');
    console.log(`   - Admin User: 1`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Orders: 0`);
    console.log(`   - Coupons: 0`);
    console.log(`   - Contact Messages: 0`);
    console.log(`   - Newsletter Subscribers: 0\n`);

    console.log('🔐 Admin Login:');
    console.log('   Email: admin@nightxlace.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedBasic();
