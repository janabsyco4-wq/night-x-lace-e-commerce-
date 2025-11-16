import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import loadModels from '@/lib/loadModels';

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  let products: any[] = [];
  
  try {
    // Connect to database and load all models
    await connectDB();
    const { Product } = loadModels();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sizes = searchParams.get('sizes')?.split(',').filter(Boolean);
    const colors = searchParams.get('colors')?.split(',').filter(Boolean);
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured');

    const query: any = { inStock: true };

    // Featured filter
    if (featured === 'true') {
      query.featured = true;
    }

    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Size filter
    if (sizes && sizes.length > 0) {
      query.sizes = { $in: sizes };
    }

    // Color filter
    if (colors && colors.length > 0) {
      query.colors = { $in: colors };
    }

    // Sorting
    let sortOption: any = { createdAt: -1 }; // Default: newest
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'popular':
        sortOption = { reviewCount: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
    }

    // Fetch products with timeout protection
    const queryPromise = Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .lean()
      .exec();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), 8000)
    );

    products = await Promise.race([queryPromise, timeoutPromise]) as any[];

    // Load Review model and aggregate review data for each product
    const Review = (await import('@/models/Review')).default;
    
    const productsWithReviews = await Promise.all(
      products.map(async (product) => {
        try {
          const reviews = await Review.find({ 
            product: product._id, 
            status: 'approved' 
          }).lean();
          
          const reviewCount = reviews.length;
          const rating = reviewCount > 0 
            ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount 
            : 0;

          return {
            ...product,
            rating: Math.round(rating * 10) / 10, // Round to 1 decimal
            reviewCount
          };
        } catch (err) {
          // If review aggregation fails, return product with default values
          return {
            ...product,
            rating: 0,
            reviewCount: 0
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      products: Array.isArray(productsWithReviews) ? productsWithReviews : [],
      count: Array.isArray(productsWithReviews) ? productsWithReviews.length : 0,
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    
    // Always return success with empty array to prevent frontend errors
    return NextResponse.json({
      success: true,
      products: [],
      count: 0,
      message: error.message || 'Unable to load products',
    }, { status: 200 });
  }
}
