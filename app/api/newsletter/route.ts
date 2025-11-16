import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.subscribed) {
        return NextResponse.json(
          { success: false, message: 'Already subscribed' },
          { status: 400 }
        );
      } else {
        // Resubscribe
        existing.subscribed = true;
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = undefined;
        await existing.save();

        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed!',
        });
      }
    }

    // Create new subscriber
    await Newsletter.create({
      email: email.toLowerCase(),
      subscribed: true,
      subscribedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
    }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const subscribers = await Newsletter.find({ subscribed: true })
      .sort({ subscribedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      subscribers,
      count: subscribers.length,
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
