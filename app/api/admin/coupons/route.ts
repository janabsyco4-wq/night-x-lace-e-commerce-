import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

// GET all coupons
export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error('Get coupons error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST - Create new coupon
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    // Check if code already exists
    const existing = await Coupon.findOne({ code: body.code.toUpperCase() });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    const coupon = await Coupon.create({
      ...body,
      code: body.code.toUpperCase(),
    });

    return NextResponse.json({
      success: true,
      message: 'Coupon created successfully',
      coupon,
    }, { status: 201 });
  } catch (error) {
    console.error('Create coupon error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
