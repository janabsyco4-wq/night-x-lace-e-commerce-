import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();

    const contact = await Contact.create(data);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      contact,
    }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const messages = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
