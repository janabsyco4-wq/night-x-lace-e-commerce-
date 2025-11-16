const mongoose = require('mongoose');
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

async function resetDatabase() {
  try {
    await connectDB();

    console.log('\n🗑️  Deleting all data from database...\n');

    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    for (const collection of collections) {
      const collectionName = collection.name;
      const result = await mongoose.connection.db.collection(collectionName).deleteMany({});
      console.log(`✅ Deleted ${result.deletedCount} documents from ${collectionName}`);
    }

    console.log('\n🎉 Database reset complete! All entries deleted.\n');

    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();
