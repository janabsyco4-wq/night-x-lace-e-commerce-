const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const productSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  images: [String],
  sizes: [String],
  colors: [String],
  stock: { type: Number, default: 100 },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  image: String,
  productCount: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all existing products
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Get categories
    const categories = await Category.find();
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    const products = [
      // Bras (10 products)
      {
        name: 'Classic Lace Bra',
        slug: 'classic-lace-bra',
        description: 'Elegant lace bra with underwire support and adjustable straps. Perfect for everyday wear.',
        price: 2499,
        category: categoryMap['bras'],
        images: ['/images/products/bra-1.jpg'],
        sizes: ['32A', '32B', '34A', '34B', '34C', '36B', '36C'],
        colors: ['Black', 'White', 'Nude', 'Red'],
        featured: true,
        rating: 4.5,
        reviewCount: 24
      },
      {
        name: 'Push-Up Lace Bra',
        slug: 'push-up-lace-bra',
        description: 'Enhancing push-up bra with delicate lace detailing.',
        price: 2799,
        category: categoryMap['bras'],
        images: ['/images/products/bra-2.jpg'],
        sizes: ['32A', '32B', '34A', '34B', '34C', '36B', '36C'],
        colors: ['Black', 'Red', 'Nude'],
        rating: 4.6,
        reviewCount: 41
      },
      {
        name: 'Wireless Comfort Bra',
        slug: 'wireless-comfort-bra',
        description: 'Ultra-comfortable wireless bra for all-day wear.',
        price: 2199,
        category: categoryMap['bras'],
        images: ['/images/products/bra-3.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Beige'],
        featured: true,
        rating: 4.8,
        reviewCount: 67
      },
      {
        name: 'Sports Bra Pro',
        slug: 'sports-bra-pro',
        description: 'High-impact sports bra with moisture-wicking fabric.',
        price: 2999,
        category: categoryMap['bras'],
        images: ['/images/products/bra-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Pink', 'Blue'],
        featured: true,
        rating: 4.9,
        reviewCount: 89
      },
      {
        name: 'Balconette Bra',
        slug: 'balconette-bra',
        description: 'Elegant balconette style with beautiful embroidery.',
        price: 2899,
        category: categoryMap['bras'],
        images: ['/images/products/bra-5.jpg'],
        sizes: ['32B', '34B', '34C', '36B', '36C'],
        colors: ['Black', 'White', 'Pink'],
        rating: 4.4,
        reviewCount: 33
      },
      {
        name: 'T-Shirt Bra',
        slug: 't-shirt-bra',
        description: 'Seamless bra perfect for wearing under t-shirts.',
        price: 2399,
        category: categoryMap['bras'],
        images: ['/images/products/bra-6.jpg'],
        sizes: ['32A', '32B', '34A', '34B', '34C', '36B'],
        colors: ['Nude', 'Black', 'White'],
        rating: 4.7,
        reviewCount: 56
      },
      {
        name: 'Strapless Bra',
        slug: 'strapless-bra',
        description: 'Secure strapless bra with silicone grip.',
        price: 2699,
        category: categoryMap['bras'],
        images: ['/images/products/bra-7.jpg'],
        sizes: ['32B', '34B', '34C', '36B', '36C'],
        colors: ['Nude', 'Black'],
        rating: 4.3,
        reviewCount: 28
      },
      {
        name: 'Bralette Lace',
        slug: 'bralette-lace',
        description: 'Soft lace bralette for comfort and style.',
        price: 1899,
        category: categoryMap['bras'],
        images: ['/images/products/bra-8.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'White', 'Pink', 'Red'],
        rating: 4.6,
        reviewCount: 45
      },
      {
        name: 'Minimizer Bra',
        slug: 'minimizer-bra',
        description: 'Full coverage minimizer bra for support.',
        price: 2999,
        category: categoryMap['bras'],
        images: ['/images/products/bra-9.jpg'],
        sizes: ['34C', '36C', '36D', '38C', '38D'],
        colors: ['Black', 'White', 'Nude'],
        rating: 4.5,
        reviewCount: 38
      },
      {
        name: 'Plunge Bra',
        slug: 'plunge-bra',
        description: 'Deep plunge bra for low-cut outfits.',
        price: 2799,
        category: categoryMap['bras'],
        images: ['/images/products/bra-10.jpg'],
        sizes: ['32B', '34B', '34C', '36B', '36C'],
        colors: ['Black', 'Red', 'Nude'],
        rating: 4.7,
        reviewCount: 52
      },

      // Panties (10 products)
      {
        name: 'Silk Comfort Panty',
        slug: 'silk-comfort-panty',
        description: 'Smooth silk panty with lace trim.',
        price: 899,
        category: categoryMap['panties'],
        images: ['/images/products/panty-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Pink', 'Nude'],
        featured: true,
        rating: 4.7,
        reviewCount: 45
      },
      {
        name: 'Lace Thong',
        slug: 'lace-thong',
        description: 'Minimal coverage thong with beautiful lace design.',
        price: 799,
        category: categoryMap['panties'],
        images: ['/images/products/panty-2.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'White', 'Red', 'Pink'],
        rating: 4.3,
        reviewCount: 28
      },
      {
        name: 'Bikini Brief',
        slug: 'bikini-brief',
        description: 'Classic bikini style with comfortable fit.',
        price: 699,
        category: categoryMap['panties'],
        images: ['/images/products/panty-3.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Nude', 'Pink'],
        rating: 4.5,
        reviewCount: 62
      },
      {
        name: 'Boyshort Panty',
        slug: 'boyshort-panty',
        description: 'Full coverage boyshort style.',
        price: 999,
        category: categoryMap['panties'],
        images: ['/images/products/panty-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'White'],
        rating: 4.6,
        reviewCount: 41
      },
      {
        name: 'High-Waist Brief',
        slug: 'high-waist-brief',
        description: 'Comfortable high-waist design.',
        price: 1099,
        category: categoryMap['panties'],
        images: ['/images/products/panty-5.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'Nude', 'White'],
        rating: 4.8,
        reviewCount: 55
      },
      {
        name: 'Seamless Panty',
        slug: 'seamless-panty',
        description: 'No-show seamless underwear.',
        price: 899,
        category: categoryMap['panties'],
        images: ['/images/products/panty-6.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Nude', 'Black', 'White'],
        rating: 4.7,
        reviewCount: 48
      },
      {
        name: 'Cotton Brief',
        slug: 'cotton-brief',
        description: 'Breathable cotton everyday brief.',
        price: 599,
        category: categoryMap['panties'],
        images: ['/images/products/panty-7.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey', 'Pink'],
        rating: 4.4,
        reviewCount: 71
      },
      {
        name: 'Lace Hipster',
        slug: 'lace-hipster',
        description: 'Trendy hipster style with lace details.',
        price: 899,
        category: categoryMap['panties'],
        images: ['/images/products/panty-8.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red', 'White', 'Pink'],
        rating: 4.5,
        reviewCount: 39
      },
      {
        name: 'G-String',
        slug: 'g-string',
        description: 'Minimal coverage g-string.',
        price: 699,
        category: categoryMap['panties'],
        images: ['/images/products/panty-9.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Red', 'White'],
        rating: 4.2,
        reviewCount: 25
      },
      {
        name: 'Cheeky Brief',
        slug: 'cheeky-brief',
        description: 'Flirty cheeky style panty.',
        price: 799,
        category: categoryMap['panties'],
        images: ['/images/products/panty-10.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'White', 'Red'],
        rating: 4.6,
        reviewCount: 44
      },

      // Lingerie (10 products)
      {
        name: 'Midnight Lace Set',
        slug: 'midnight-lace-set',
        description: 'Seductive lace lingerie set with bra and panty.',
        price: 4999,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red', 'White'],
        featured: true,
        rating: 4.8,
        reviewCount: 67
      },
      {
        name: 'Satin Babydoll',
        slug: 'satin-babydoll',
        description: 'Elegant satin babydoll with lace trim.',
        price: 3999,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red', 'Pink'],
        rating: 4.7,
        reviewCount: 53
      },
      {
        name: 'Mesh Teddy',
        slug: 'mesh-teddy',
        description: 'Sheer mesh teddy with snap closure.',
        price: 3499,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-3.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Red'],
        rating: 4.5,
        reviewCount: 38
      },
      {
        name: 'Chemise Nightgown',
        slug: 'chemise-nightgown',
        description: 'Flowing chemise with delicate details.',
        price: 3799,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Pink'],
        rating: 4.6,
        reviewCount: 42
      },
      {
        name: 'Corset Set',
        slug: 'corset-set',
        description: 'Structured corset with matching panty.',
        price: 5999,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-5.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red'],
        rating: 4.9,
        reviewCount: 78
      },
      {
        name: 'Bodysuit Lingerie',
        slug: 'bodysuit-lingerie',
        description: 'Sexy lace bodysuit.',
        price: 4499,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-6.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'White', 'Red'],
        rating: 4.7,
        reviewCount: 61
      },
      {
        name: 'Camisole Set',
        slug: 'camisole-set',
        description: 'Satin camisole with matching shorts.',
        price: 3299,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-7.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'White'],
        rating: 4.5,
        reviewCount: 47
      },
      {
        name: 'Robe & Nightie Set',
        slug: 'robe-nightie-set',
        description: 'Matching robe and nightie set.',
        price: 4799,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-8.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red', 'Pink'],
        rating: 4.8,
        reviewCount: 55
      },
      {
        name: 'Lace Bralette Set',
        slug: 'lace-bralette-set',
        description: 'Delicate lace bralette with matching panty.',
        price: 2999,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-9.jpg'],
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'White', 'Pink', 'Red'],
        rating: 4.6,
        reviewCount: 49
      },
      {
        name: 'Sheer Negligee',
        slug: 'sheer-negligee',
        description: 'Flowing sheer negligee with lace.',
        price: 3999,
        category: categoryMap['lingerie'],
        images: ['/images/products/lingerie-10.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Red', 'White'],
        rating: 4.7,
        reviewCount: 52
      },

      // Sleepwear (10 products)
      {
        name: 'Cotton Sleep Set',
        slug: 'cotton-sleep-set',
        description: 'Soft cotton nightwear set for comfortable sleep.',
        price: 3499,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Pink', 'Blue', 'Grey', 'White'],
        rating: 4.6,
        reviewCount: 32
      },
      {
        name: 'Silk Pajama Set',
        slug: 'silk-pajama-set',
        description: 'Luxurious silk pajama set.',
        price: 5999,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Burgundy'],
        rating: 4.9,
        reviewCount: 68
      },
      {
        name: 'Sleep Shirt',
        slug: 'sleep-shirt',
        description: 'Comfortable oversized sleep shirt.',
        price: 1999,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-3.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Grey', 'Pink', 'White'],
        rating: 4.5,
        reviewCount: 44
      },
      {
        name: 'Nightgown Long',
        slug: 'nightgown-long',
        description: 'Long flowing nightgown.',
        price: 2999,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Pink', 'Blue'],
        rating: 4.7,
        reviewCount: 51
      },
      {
        name: 'Shorts Pajama Set',
        slug: 'shorts-pajama-set',
        description: 'Summer shorts pajama set.',
        price: 2799,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-5.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Pink', 'Blue', 'Grey'],
        rating: 4.6,
        reviewCount: 39
      },
      {
        name: 'Robe Fleece',
        slug: 'robe-fleece',
        description: 'Cozy fleece robe for winter.',
        price: 3999,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-6.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Grey', 'Pink', 'Navy'],
        rating: 4.8,
        reviewCount: 63
      },
      {
        name: 'Sleep Dress',
        slug: 'sleep-dress',
        description: 'Comfortable sleep dress.',
        price: 2499,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-7.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Pink', 'White', 'Grey'],
        rating: 4.5,
        reviewCount: 36
      },
      {
        name: 'Thermal Pajama Set',
        slug: 'thermal-pajama-set',
        description: 'Warm thermal pajama set.',
        price: 3799,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-8.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Grey', 'Navy', 'Black'],
        rating: 4.7,
        reviewCount: 47
      },
      {
        name: 'Satin Sleep Set',
        slug: 'satin-sleep-set',
        description: 'Elegant satin sleep set.',
        price: 4499,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-9.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Burgundy'],
        rating: 4.8,
        reviewCount: 58
      },
      {
        name: 'Lounge Set',
        slug: 'lounge-set',
        description: 'Casual lounge wear set.',
        price: 3299,
        category: categoryMap['sleepwear'],
        images: ['/images/products/sleepwear-10.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Grey', 'Pink', 'Black'],
        rating: 4.6,
        reviewCount: 42
      },

      // Shapewear (10 products)
      {
        name: 'Body Shaper Brief',
        slug: 'body-shaper-brief',
        description: 'High-waist shaping brief for smooth silhouette.',
        price: 1999,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.4,
        reviewCount: 18
      },
      {
        name: 'Full Body Shaper',
        slug: 'full-body-shaper',
        description: 'Complete body shaping bodysuit.',
        price: 3999,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.7,
        reviewCount: 56
      },
      {
        name: 'Waist Cincher',
        slug: 'waist-cincher',
        description: 'Waist cinching shapewear.',
        price: 2499,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-3.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.5,
        reviewCount: 41
      },
      {
        name: 'Thigh Shaper',
        slug: 'thigh-shaper',
        description: 'Thigh and tummy shaping shorts.',
        price: 2299,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.6,
        reviewCount: 48
      },
      {
        name: 'Shaping Camisole',
        slug: 'shaping-camisole',
        description: 'Smoothing camisole top.',
        price: 1799,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-5.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Nude', 'Black', 'White'],
        rating: 4.4,
        reviewCount: 33
      },
      {
        name: 'Butt Lifter',
        slug: 'butt-lifter',
        description: 'Butt lifting shapewear shorts.',
        price: 2599,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-6.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.5,
        reviewCount: 37
      },
      {
        name: 'Control Slip',
        slug: 'control-slip',
        description: 'Full slip with control panels.',
        price: 2999,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-7.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Nude', 'Black'],
        rating: 4.6,
        reviewCount: 44
      },
      {
        name: 'Shaping Leggings',
        slug: 'shaping-leggings',
        description: 'High-waist shaping leggings.',
        price: 2799,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-8.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black'],
        rating: 4.7,
        reviewCount: 52
      },
      {
        name: 'Arm Shaper',
        slug: 'arm-shaper',
        description: 'Arm slimming shapewear.',
        price: 1599,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-9.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Nude', 'Black'],
        rating: 4.3,
        reviewCount: 28
      },
      {
        name: 'Postpartum Shaper',
        slug: 'postpartum-shaper',
        description: 'Postpartum recovery shapewear.',
        price: 3499,
        category: categoryMap['shapewear'],
        images: ['/images/products/shapewear-10.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Nude', 'Black'],
        rating: 4.8,
        reviewCount: 61
      },

      // Activewear (10 products)
      {
        name: 'Sports Bra High Impact',
        slug: 'sports-bra-high-impact',
        description: 'Maximum support sports bra.',
        price: 2999,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Pink', 'Blue'],
        featured: true,
        rating: 4.9,
        reviewCount: 89
      },
      {
        name: 'Yoga Sports Bra',
        slug: 'yoga-sports-bra',
        description: 'Medium support yoga bra.',
        price: 2499,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Purple', 'Pink'],
        rating: 4.7,
        reviewCount: 64
      },
      {
        name: 'Running Sports Bra',
        slug: 'running-sports-bra',
        description: 'Breathable running sports bra.',
        price: 2699,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-3.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Blue', 'Grey'],
        rating: 4.8,
        reviewCount: 72
      },
      {
        name: 'Seamless Sports Bra',
        slug: 'seamless-sports-bra',
        description: 'Comfortable seamless design.',
        price: 2299,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-4.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Pink'],
        rating: 4.6,
        reviewCount: 55
      },
      {
        name: 'Compression Sports Bra',
        slug: 'compression-sports-bra',
        description: 'High compression support.',
        price: 2899,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-5.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy'],
        rating: 4.7,
        reviewCount: 48
      },
      {
        name: 'Racerback Sports Bra',
        slug: 'racerback-sports-bra',
        description: 'Stylish racerback design.',
        price: 2399,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-6.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Blue'],
        rating: 4.6,
        reviewCount: 51
      },
      {
        name: 'Padded Sports Bra',
        slug: 'padded-sports-bra',
        description: 'Lightly padded sports bra.',
        price: 2599,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-7.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey', 'Pink'],
        rating: 4.5,
        reviewCount: 43
      },
      {
        name: 'Strappy Sports Bra',
        slug: 'strappy-sports-bra',
        description: 'Trendy strappy back design.',
        price: 2499,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-8.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Purple'],
        rating: 4.7,
        reviewCount: 59
      },
      {
        name: 'Mesh Sports Bra',
        slug: 'mesh-sports-bra',
        description: 'Breathable mesh panels.',
        price: 2699,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-9.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Grey'],
        rating: 4.6,
        reviewCount: 46
      },
      {
        name: 'Crop Sports Bra',
        slug: 'crop-sports-bra',
        description: 'Stylish crop top sports bra.',
        price: 2399,
        category: categoryMap['activewear'],
        images: ['/images/products/activewear-10.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Pink', 'Blue', 'Grey'],
        rating: 4.8,
        reviewCount: 67
      }
    ];

    // Insert products
    await Product.insertMany(products);
    console.log('Seeded 60 products successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
