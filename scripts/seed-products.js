/**
 * Product Seeding Script
 * Adds sample products to the database
 */

const BASE_URL = 'http://localhost:3000';

// Sample products data
const sampleProducts = [
  {
    name: 'Luxury Lace Bra',
    description: 'Premium lace bra with underwire support and adjustable straps. Perfect blend of comfort and elegance.',
    price: 2499,
    salePrice: 1999,
    category: 'Bras',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['32A', '32B', '34A', '34B', '36A', '36B'],
    colors: ['Black', 'White', 'Red', 'Nude'],
    stock: 50,
    inStock: true,
    featured: true,
  },
  {
    name: 'Silk Comfort Panty',
    description: 'Soft silk panty with seamless design. Ultimate comfort for everyday wear.',
    price: 899,
    salePrice: 699,
    category: 'Panties',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Pink', 'Blue'],
    stock: 100,
    inStock: true,
    featured: true,
  },
  {
    name: 'Romantic Lingerie Set',
    description: 'Complete lingerie set with matching bra and panty. Perfect for special occasions.',
    price: 3999,
    salePrice: 3199,
    category: 'Lingerie Sets',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'Black', 'White'],
    stock: 30,
    inStock: true,
    featured: true,
  },
  {
    name: 'Satin Nightgown',
    description: 'Elegant satin nightgown with lace trim. Luxurious sleepwear for ultimate comfort.',
    price: 3499,
    salePrice: 2799,
    category: 'Nightwear',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Champagne', 'Navy'],
    stock: 40,
    inStock: true,
    featured: false,
  },
  {
    name: 'Body Shaper',
    description: 'High-waist body shaper for smooth silhouette. Comfortable all-day wear.',
    price: 1999,
    salePrice: 1599,
    category: 'Shapewear',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Nude', 'Black'],
    stock: 60,
    inStock: true,
    featured: false,
  },
  {
    name: 'Lace Garter Belt',
    description: 'Delicate lace garter belt with adjustable straps. Perfect accessory for special occasions.',
    price: 1299,
    category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1583419944008-d8d7b4b10d6f?w=500'],
    sizes: ['One Size'],
    colors: ['Black', 'Red', 'White'],
    stock: 25,
    inStock: true,
    featured: false,
  },
];

async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  // First, login as admin to get token
  console.log('🔐 Logging in as admin...');
  const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@nightxlace.com',
      password: 'admin123',
    }),
  });

  const loginData = await loginResponse.json();
  
  if (!loginData.success) {
    console.error('❌ Failed to login as admin');
    return;
  }

  const adminToken = loginData.token;
  console.log('✅ Admin login successful\n');

  // Get categories
  console.log('📂 Fetching categories...');
  const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
  const categoriesData = await categoriesResponse.json();
  
  if (!categoriesData.success || !categoriesData.categories) {
    console.error('❌ Failed to fetch categories');
    return;
  }

  const categories = categoriesData.categories;
  console.log(`✅ Found ${categories.length} categories\n`);

  // Create a map of category names to IDs
  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.name] = cat._id;
  });

  // Add products
  let successCount = 0;
  let failCount = 0;

  for (const product of sampleProducts) {
    try {
      // Find category ID
      const categoryId = categoryMap[product.category];
      
      if (!categoryId) {
        console.log(`⚠️  Skipping "${product.name}" - Category "${product.category}" not found`);
        failCount++;
        continue;
      }

      // Create product
      const response = await fetch(`${BASE_URL}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          ...product,
          category: categoryId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log(`✅ Added: ${product.name} (Rs ${product.price})`);
        successCount++;
      } else {
        console.log(`❌ Failed: ${product.name} - ${data.message}`);
        failCount++;
      }
    } catch (error) {
      console.log(`❌ Error adding ${product.name}: ${error.message}`);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 SEEDING SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully added: ${successCount} products`);
  console.log(`❌ Failed: ${failCount} products`);
  console.log(`📦 Total: ${sampleProducts.length} products`);
  console.log('='.repeat(50) + '\n');

  if (successCount > 0) {
    console.log('🎉 Products are now available in your store!');
    console.log('🔗 Visit: http://localhost:3000/shop\n');
  }
}

// Run the seeding
seedProducts().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
