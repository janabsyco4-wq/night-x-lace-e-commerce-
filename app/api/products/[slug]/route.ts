import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await context.params;

    const product = await Product.findOne({ slug })
      .populate('category', 'name slug')
      .populate('relatedProducts')
      .lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Aggregate review data
    const Review = (await import('@/models/Review')).default;
    const reviews = await Review.find({ 
      product: (product as any)._id, 
      status: 'approved' 
    }).lean();
    
    const reviewCount = reviews.length;
    const rating = reviewCount > 0 
      ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount 
      : 0;

    const productWithReviews = {
      ...product,
      rating: Math.round(rating * 10) / 10,
      reviewCount
    };

    return NextResponse.json({
      success: true,
      product: productWithReviews,
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
