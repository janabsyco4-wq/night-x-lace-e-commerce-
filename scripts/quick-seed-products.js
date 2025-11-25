require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  salePrice: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [String],
  sizes: [String],
  colors: [String],
  stock: Number,
  inStock: Boolean,
  featured: Boolean,
  rating: Number,
  reviewCount: Number,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Category = mongoose.models.Category || mongoose.model('Category', new mongoose.Schema({ name: String, slug: String }));

async function seedProducts() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected!');

    // Get categories
    const categories = await Category.find();
    console.log(`📂 Found ${categories.length} categories`);

    const bras = categories.find(c => c.slug === 'bras');
    const panties = categories.find(c => c.slug === 'panties');
    const lingerie = categories.find(c => c.slug === 'lingerie');
    const nightwear = categories.find(c => c.slug === 'nightwear');
    const shapewear = categories.find(c => c.slug === 'shapewear');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const products = [
      {
        name: 'Luxury Lace Bra',
        slug: 'luxury-lace-bra',
        description: 'Elegant lace bra with underwire support and adjustable straps',
        price: 2500,
        salePrice: 1999,
        category: bras?._id,
        images: ['/images/products/bra-1.jpg', '/images/products/bra-2.jpg'],
        sizes: ['32A', '32B', '34A', '34B', '34C', '36B', '36C'],
        colors: ['Black', 'White', 'Red', 'Nude'],
        stock: 50,
        inStock: true,
        featured: true,
        rating: 4.5,
        reviewCount: 12,
      },
      {
        name: 'Silk Comfort Panty',
        slug: 'silk-comfort-panty',
        description: 'Soft silk panty with comfortable fit',
        price: 1200,
        salePrice: 899,
        category: panties?._id,
        images: ['/images/products/panty-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Pink', 'Nude'],
        stock: 100,
        inStock: true,
        featured: true,
        rating: 4.7,
        reviewCount: 25,
      },
      {
        name: 'Romantic Lingerie Set',
        slug: 'romantic-lingerie-set',
        description: 'Beautiful lingerie set with bra and panty',
        price: 4500,
        salePrice: 3499,
        category: lingerie?._id,
        images: ['/images/products/set-1.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Red', 'Black', 'White'],
        stock: 30,
        inStock: true,
        featured: true,
        rating: 4.8,
        reviewCount: 18,
      },
      {
        name: 'Satin Nightgown',
        slug: 'satin-nightgown',
        description: 'Luxurious satin nightgown for comfortable sleep',
        price: 3500,
        salePrice: 2799,
        category: nightwear?._id,
        images: ['/images/products/nightgown-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Blue'],
        stock: 40,
        inStock: true,
        featured: false,
        rating: 4.6,
        reviewCount: 15,
      },
      {
        name: 'Body Shaper',
        slug: 'body-shaper',
        description: 'Comfortable body shaper for perfect silhouette',
        price: 3000,
        salePrice: 2499,
        category: shapewear?._id,
        images: ['/images/products/shaper-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Nude'],
        stock: 35,
        inStock: true,
        featured: false,
        rating: 4.4,
        reviewCount: 10,
      },
    ];

    let added = 0;
    for (const productData of products) {
      if (productData.category) {
        await Product.create(productData);
        console.log(`✅ Added: ${productData.name}`);
        added++;
      } else {
        console.log(`⚠️  Skipped: ${productData.name} (category not found)`);
      }
    }

    console.log(`\n🎉 Successfully added ${added} products!`);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedProducts();
