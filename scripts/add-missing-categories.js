/**
 * Add Missing Categories Script
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  productCount: { type: Number, default: 0 },
}, { timestamps: true });

async function addMissingCategories() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

    const missingCategories = [
      {
        name: 'Nightwear',
        slug: 'nightwear',
        description: 'Comfortable and elegant nightwear collection',
      },
      {
        name: 'Shapewear',
        slug: 'shapewear',
        description: 'Body shaping and contouring undergarments',
      },
    ];

    console.log('📂 Adding missing categories...\n');

    for (const cat of missingCategories) {
      try {
        const existing = await Category.findOne({ name: cat.name });
        
        if (existing) {
          console.log(`⚠️  Category "${cat.name}" already exists`);
        } else {
          await Category.create(cat);
          console.log(`✅ Added category: ${cat.name}`);
        }
      } catch (error) {
        console.log(`❌ Failed to add ${cat.name}: ${error.message}`);
      }
    }

    console.log('\n✅ Categories updated successfully!');
    
    // Show all categories
    const allCategories = await Category.find().sort({ name: 1 });
    console.log('\n📋 All Categories:');
    allCategories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.productCount} products)`);
    });

    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMissingCategories();
