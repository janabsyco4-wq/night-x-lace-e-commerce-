const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  image: String,
  productCount: { type: Number, default: 0 },
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

const categories = [
  {
    name: 'Bras',
    slug: 'bras',
    description: 'Comfortable and supportive bras in various styles',
    icon: '👙',
    image: '/images/categories/bras.jpg'
  },
  {
    name: 'Panties',
    slug: 'panties',
    description: 'Everyday comfort and elegant designs',
    icon: '🩲',
    image: '/images/categories/panties.jpg'
  },
  {
    name: 'Lingerie',
    slug: 'lingerie',
    description: 'Sensual and elegant lingerie sets',
    icon: '�',
    image: '/images/categories/lingerie.jpg'
  },
  {
    name: 'Sleepwear',
    slug: 'sleepwear',
    description: 'Comfortable nightwear for restful sleep',
    icon: '🌙',
    image: '/images/categories/sleepwear.jpg'
  },
  {
    name: 'Shapewear',
    slug: 'shapewear',
    description: 'Body shaping and smoothing essentials',
    icon: '👗',
    image: '/images/categories/shapewear.jpg'
  },
  {
    name: 'Activewear',
    slug: 'activewear',
    description: 'Sports bras and active undergarments',
    icon: '🏃',
    image: '/images/categories/activewear.jpg'
  }
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing categories
    await Category.deleteMany({});
    console.log('Deleted existing categories');

    // Insert new categories
    await Category.insertMany(categories);
    console.log('Seeded categories successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();
