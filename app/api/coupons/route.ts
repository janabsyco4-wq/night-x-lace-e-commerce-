import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function GET() {
  try {
    await connectDB();
    
    const coupons = await Coupon.find({ active: true }).lean();
    
    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}
