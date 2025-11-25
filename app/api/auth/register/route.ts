import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, phone } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
    });

    // Link existing orders with the same email to this user account
    try {
      const Order = (await import('@/models/Order')).default;
      const linkedOrders = await Order.updateMany(
        { 
          'customer.email': email.toLowerCase(),
          userId: { $exists: false } // Only update orders without a userId
        },
        { 
          $set: { userId: user._id }
        }
      );
      
      if (linkedOrders.modifiedCount > 0) {
        console.log(`Linked ${linkedOrders.modifiedCount} existing orders to user ${user.email}`);
      }
    } catch (orderLinkError) {
      console.error('Error linking orders:', orderLinkError);
      // Don't fail registration if order linking fails
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create account' },
      { status: 500 }
    );
  }
}
