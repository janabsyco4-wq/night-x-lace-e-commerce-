import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Coupon from '@/models/Coupon';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { code, orderTotal, userToken } = await request.json();

    // Check if user is logged in
    if (!userToken) {
      return NextResponse.json(
        { success: false, message: 'Please login to use coupon codes', requiresLogin: true },
        { status: 401 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'Coupon code is required' },
        { status: 400 }
      );
    }

    // Find coupon
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid coupon code' },
        { status: 404 }
      );
    }

    // Check if active
    if (!coupon.active) {
      return NextResponse.json(
        { success: false, message: 'This coupon is no longer active' },
        { status: 400 }
      );
    }

    // Check validity dates
    const now = new Date();
    if (now < new Date(coupon.validFrom)) {
      return NextResponse.json(
        { success: false, message: 'This coupon is not yet valid' },
        { status: 400 }
      );
    }

    if (now > new Date(coupon.validUntil)) {
      return NextResponse.json(
        { success: false, message: 'This coupon has expired' },
        { status: 400 }
      );
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        { success: false, message: 'This coupon has reached its usage limit' },
        { status: 400 }
      );
    }

    // Check minimum order value
    if (coupon.minOrderValue && orderTotal < coupon.minOrderValue) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Minimum order value of Rs. ${coupon.minOrderValue} required` 
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (orderTotal * coupon.value) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return NextResponse.json({
      success: true,
      message: 'Coupon applied successfully!',
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount: Math.round(discount),
      },
    });
  } catch (error) {
    console.error('Validate coupon error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
