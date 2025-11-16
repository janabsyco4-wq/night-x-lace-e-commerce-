import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import Product from '@/models/Product';
import User from '@/models/User';

// GET - Fetch all reviews (with filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const productId = searchParams.get('product');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query: any = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (productId) {
      query.product = productId;
    }

    const reviews = await Review.find(query)
      .populate('product', 'name images')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({
      success: true,
      reviews
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new review
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { productId, author, email, rating, comment, userId } = body;

    if (!productId || !author || !email || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if user has purchased the product (for verified badge)
    let verified = false;
    if (userId) {
      // You can add logic here to check if user has purchased this product
      verified = false; // Set to true if user has purchased
    }

    const review = await Review.create({
      product: productId,
      user: userId || null,
      author,
      email,
      rating,
      comment,
      verified,
      status: 'approved' // Auto-approve reviews
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully and published!',
      review
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
