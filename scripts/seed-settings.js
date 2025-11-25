require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: String,
  email: String,
  phone: String,
  address: String,
  description: String,
  freeShippingThreshold: Number,
  standardShipping: Number,
  expressShipping: Number,
  logoFirstPart: String,
  logoSecondPart: String,
}, { timestamps: true });

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

async function seedSettings() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected!');

    // Check if settings exist
    const existing = await Settings.findOne();
    
    if (existing) {
      console.log('⚠️  Settings already exist');
    } else {
      await Settings.create({
        storeName: 'Night × Lace',
        email: 'info@nightxlace.com',
        phone: '+92 300 1234567',
        address: 'Karachi, Pakistan',
        description: "Premium women's undergarments and lingerie",
        freeShippingThreshold: 3000,
        standardShipping: 200,
        expressShipping: 500,
        logoFirstPart: 'Night',
        logoSecondPart: 'Lace',
      });
      console.log('✅ Settings created!');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedSettings();
