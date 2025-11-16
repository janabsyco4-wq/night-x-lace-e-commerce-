import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

// GET - Fetch review statistics
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const [total, approved, pending, rejected, avgRatingResult] = await Promise.all([
      Review.countDocuments(),
      Review.countDocuments({ status: 'approved' }),
      Review.countDocuments({ status: 'pending' }),
      Review.countDocuments({ status: 'rejected' }),
      Review.aggregate([
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' }
          }
        }
      ])
    ]);

    const avgRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        approved,
        pending,
        rejected,
        avgRating: avgRating.toFixed(1)
      }
    });
  } catch (error: any) {
    console.error('Error fetching review stats:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
