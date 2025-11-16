import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Customer from '@/models/Customer';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    // Generate order number
    const orderNumber = `NXL${Date.now()}`;

    // Create or update customer
    let customer = await Customer.findOne({ email: data.customer.email });
    
    if (!customer) {
      customer = await Customer.create({
        name: data.customer.name,
        email: data.customer.email,
        phone: data.customer.phone,
        addresses: [{
          street: data.customer.address.street,
          city: data.customer.address.city,
          state: data.customer.address.state,
          zipCode: data.customer.address.zipCode,
          country: data.customer.address.country,
          isDefault: true,
        }],
      });
    }

    // Create order
    const order = await Order.create({
      orderNumber,
      userId: data.userId || null, // Add userId if provided
      customer: data.customer,
      items: data.items,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      discount: data.discount || 0,
      couponCode: data.couponCode || null,
      total: data.total,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'pending',
      status: 'pending',
      timeline: [{
        status: 'pending',
        timestamp: new Date(),
        note: 'Order placed',
      }],
    });

    // Update customer stats
    await Customer.findByIdAndUpdate(customer._id, {
      $push: { orders: order._id },
      $inc: { orderCount: 1 },
    });

    // Update product stock
    for (const item of data.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Update coupon usage if coupon was used
    if (data.couponCode) {
      try {
        const mongoose = await import('mongoose');
        const db = mongoose.default.connection.db;
        
        if (db) {
          await db.collection('coupons').updateOne(
            { code: data.couponCode },
            { 
              $inc: { usedCount: 1 },
              $set: { updatedAt: new Date() }
            }
          );
        }
      } catch (couponError) {
        console.error('Error updating coupon usage:', couponError);
        // Don't fail the order if coupon update fails
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
      },
      message: 'Order placed successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
      ];
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
